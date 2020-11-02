const Router = require('express').Router
const router = new Router()
const userModule = require('../../models').USERMODEL
const pumpModule = require('../../models').PUMPMODEL
const bookingModule = require('../../models').BOOKINGMODEL
const fillerModule = require('../../models').FILLERMODEL
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk')
const multer = require('multer')
const upload = multer({ dest: 'upload/' })
const authorize = require('../../authorization/authorization')
const Role = require('../../authorization/role')
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRETE_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

const fs = require('fs')
const { formatFileSize } = require('../../common services/imagesize')
const request = require('request')

router.post('/registration', async (req, res) => {
    try {
        let { body: { data } } = req
        if (!data) return res.status(422).send({ code: 422, status: 'failed', message: 'data is required.' })
        if (!data.user_name) return res.status(422).send({ code: 422, status: 'failed', message: 'user_name is required.' })
        if (!data.user_email) return res.status(422).send({ code: 422, status: 'failed', message: 'user_email is required.' })
        if (!data.password) return res.status(422).send({ code: 422, status: 'failed', message: 'password is required.' })
        data.user_email = data.user_email.toLowerCase()
        data.password = bcrypt.hashSync(data.password, 10)
        const userData = await userModule.findUserById(data.user_email)
        if(userData) return res.status(422).send({ code: 422, status: 'failed', message: 'user email already exist.' })
        await userModule.create(data)
        return res.status(200).send({ code: 200, status: 'success', message: 'registration succesfully done.' })
    } catch (err) {
        return res.status(422).send({ code: 422, status: 'failed', message: err })
    }
})

router.post('/login', async (req, res) => {
    try {
        let user_email = req.body.user_email
        let password = req.body.password
        if (!user_email) return res.status(422).send({ code: 422, status: 'failed', message: 'user_email is required!'})
        if (!password) return res.status(422).send({ code: 422, status: 'failed', message: 'password is required!'})
        user_email = user_email.toLowerCase()
        const data = await userModule.findUserById(user_email)
        if (!data) return res.status(422).send({ code: 422, status: 'failed', message: 'invalid user_email!'})
        if (data.status !== 'Active') return res.status(422).send({ code: 422, status: 'failed', message: 'your account is blocked or deleted'})
        const checkPassword = bcrypt.compareSync(password, data.password)
        if (!checkPassword) return res.status(422).send({ code: 422, status: 'failed', message: 'invalid password!'})
        let payload = {
            user_email: user_email,
            roles: 'User'
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24hr' })
        return res.status(200).send({ code: 200, status: 'Success', data: token})
    } catch (err) {
        return res.status(422).send({ code: 422, status: 'failed', message: err })   
    }
})

router.put('/upload-image', authorize([Role.User, Role.Filler]), upload.single('image'), async (req, res) => {
    try {
        var fileName = req.file.path;
        var imagename = req.file.originalname;
        var stats = fs.lstatSync(fileName)
        const size = stats.size
        const imgSize = formatFileSize(size, 2)
        if (!imgSize) return res .status(422).send({ code: 422, status: 'failed', message: 'image size must be less than 3MB.' })
        if (imgSize.slice(-2) == 'MB' && imgSize > 3) return res .status(422).send({ code: 422, status: 'failed', message: 'image size must be less than 3MB.' })
        const buffer = fs.readFileSync(fileName)
        fs.unlinkSync(fileName)
        let params = {
            Bucket:process.env.AWS_BUCKET,
            Key: imagename,
            Body: buffer,
            ContentType: 'image/jpg',
            ACL: 'public-read'
        }
        s3.upload(params, async (err, data) => {
            if (err) return res.status(422).send({ code: 422, status: 'failed', message: err })
            if (req.userType == 'User') {
                await userModule.updateUserById(req.user.user_email, { profile_pic: data.Location, updatedAt: Date.now() })
            } else {
                await fillerModule.updateUserById(req.user.user_email, { profile_pic: data.Location, updatedAt: new Date() })
            }

            return res.status(200).send({ code: 200, status: 'success', message: 'profile pic uploaded successfully' })
        })
    } catch (err) {
        return res.status(422).send({ code: 422, status: 'failed', message: err })
    }
})

router.get('/get-near-by-pump', authorize(Role.User), (req, res) => {
    try {
        const lattitude = req.query.lattitude
        const longitude = req.query.longitude
        if (!lattitude) return res.status(422).send({ code: 422, status: 'failed', message: 'lattitude is required!'})
        if (!longitude) return res.status(422).send({ code: 422, status: 'failed', message: 'longitude is required!'})
        request.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lattitude}%2C${longitude}&rankby=distance&type=gas_station&key=${process.env.G_M_API}`, (err, resp, body) => {
            if (err) return res.status(422).send({ code: 422, status: 'failed', message: err.message })
            let data = JSON.parse(body)
            let arr = []
            data.results.map(ele => {
                arr.push({
                    pump_lat: ele.geometry.location.lat,
                    pump_lng: ele.geometry.location.lng,
                    pump_name: ele.name,
                    pump_id: ele.place_id,
                    user_rating: ele.user_ratings_total
                })
            })
            return res.status(200).send({ code: 200, status: 'success', data: arr })
        })
    } catch (err) {
        return res.status(422).send({ code: 422, status: 'failed', message: err })
    }
})

router.post('/pump-booking', authorize(Role.User), async (req, res) => {
    try {
        let { body: { data } } = req
        if (!data) return res.status(422).send({ code: 422, status: 'failed', message: 'data is required.' })
        if (!data.pump_lat) return res.status(422).send({ code: 422, status: 'failed', message: 'pump_lat is required.' })
        if (!data.pump_lng) return res.status(422).send({ code: 422, status: 'failed', message: 'pump_lng is required.' })
        if (!data.pump_name) return res.status(422).send({ code: 422, status: 'failed', message: 'pump_name is required.' })
        if (!data.pump_id) return res.status(422).send({ code: 422, status: 'failed', message: 'pump_id is required.' })
        if (!data.user_rating) return res.status(422).send({ code: 422, status: 'failed', message: 'user_rating is required.' })
        if (!data.fule_type) return res.status(422).send({ code: 422, status: 'failed', message: 'fule_type is required.' })
        if (!data.fule_quantity) return res.status(422).send({ code: 422, status: 'failed', message: 'fule_quantity is required.' })
        if (!data.vehicle_type) return res.status(422).send({ code: 422, status: 'failed', message: 'vehicle_type is required.' })
        if (!data.vehicle_registration_number) return res.status(422).send({ code: 422, status: 'failed', message: 'vehicle_registration_number is required.' })
        const pumpDetail = await pumpModule.getPumpDetailById(data.pump_id)
        if (!pumpDetail) await pumpModule.create(data)
        const fillerData = await fillerModule.findFillerByPumpId(data.pump_id)
        if(!fillerData) return res.status(422).send({ code: 422, status: 'failed', message: 'No filler available. Please select another pump.' })
        data.filler_name = fillerData.user_name
        data.filler_id = fillerData.user_email
        data.user_id = req.user.user_email
        data.booking_status = 'Confirmed'
        await bookingModule.create(data)
        return res.status(200).send({ code: 200, status: 'success', message: 'booking Confirmed.' })
    } catch (err) {
        return res.status(422).send({ code: 422, status: 'failed', message: err })
    }
})

module.exports = router