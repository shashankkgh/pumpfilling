const userModel = require('./user/user')
const bookingModel = require('./pumpBooking/pumpBooking')
const pumpModel = require('./pumpDetails/pumpDetails')
const fillerModel = require('./filler/filler')

module.exports = {
    USERMODEL: new userModel(),
    BOOKINGMODEL: new bookingModel(),
    PUMPMODEL: new pumpModel(),
    FILLERMODEL: new fillerModel()
}