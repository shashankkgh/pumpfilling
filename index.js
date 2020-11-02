require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//connect to mongodb //
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
    console.log('cennected to DB')
}).catch((err) => {
    console.log('somthing went wrong', err)
})

/** import routers */
const userRouter = require('./routers/user/user')
const pumpRouter = require('./routers/pump/pump')
const fillerRouter = require('./routers/filler/filler')

app.use(userRouter)
app.use(pumpRouter)
app.use(fillerRouter)

/** server listening on port */
app.listen(process.env.PORT, () => {
    console.log('server is running on port:', process.env.PORT)
})

module.exports = app