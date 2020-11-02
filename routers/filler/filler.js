const Router = require('express').Router
const router = new Router()
const bcrypt = require('bcrypt')
const fillerModule = require('../../models').FILLERMODEL
router.post('/filler-registration', async (req, res) => {
    try {
        let { body: { data } } = req
        if (!data) return res.status(422).send({ code: 422, status: 'failed', message: 'data is required.' })
        if (!data.user_name) return res.status(422).send({ code: 422, status: 'failed', message: 'user_name is required.' })
        if (!data.user_email) return res.status(422).send({ code: 422, status: 'failed', message: 'user_email is required.' })
        if (!data.password) return res.status(422).send({ code: 422, status: 'failed', message: 'password is required.' })
        if (!data.pump_id) return res.status(422).send({ code: 422, status: 'failed', message: 'pump_id is required.' })
        data.user_email = data.user_email.toLowerCase()
        data.password = bcrypt.hashSync(data.password, 10)
        const userData = await fillerModule.findUserById(data.user_email)
        if(userData) return res.status(422).send({ code: 422, status: 'failed', message: 'user email already exist.' })
        await fillerModule.create(data)
        return res.status(200).send({ code: 200, status: 'success', message: 'registration succesfully done.' })
    } catch (err) {
        console.log(err)
        return res.status(422).send({ code: 422, status: 'failed', message: err })
    }
})

router.post('/filler-login', async (req, res) => {
    try {
        let user_email = req.body.user_email
        let password = req.body.password
        if (!user_email) return res.status(422).send({ code: 422, status: 'failed', message: 'user_email is required!'})
        if (!password) return res.status(422).send({ code: 422, status: 'failed', message: 'password is required!'})
        user_email = user_email.toLowerCase()
        const data = await fillerModule.findUserById(user_email)
        if (!data) return res.status(422).send({ code: 422, status: 'failed', message: 'invalid user_email!'})
        if (data.status !== 'Active') return res.status(422).send({ code: 422, status: 'failed', message: 'your account is blocked or deleted'})
        const checkPassword = bcrypt.compareSync(password, data.password)
        if (!checkPassword) return res.status(422).send({ code: 422, status: 'failed', message: 'invalid password!'})
        let payload = {
            user_email: user_email,
            roles: 'Filler'
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24hr' })
        return res.status(200).send({ code: 200, status: 'Success', data: token})
    } catch (err) {
        return res.status(422).send({ code: 422, status: 'failed', message: err })   
    }
})

module.exports = router