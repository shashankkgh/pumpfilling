const mongoose = require('mongoose')
const baseModel = require('../base')
const Schema = mongoose.Schema
const BOOKING_COLLECTION = 'pump_booking'
const BOOKING_SCHEMA = new Schema({
    fule_type: String,
    pump_id: String,
    user_id: String,
    vehicle_type: String,
    vehicle_registration_number: String,
    fule_quantity: Number,
    filler_name: String,
    filler_id: String,
    booking_date_and_Time: { type: Date, default: new Date() },
    booking_status: String
})

const MODEL = mongoose.model(BOOKING_COLLECTION, BOOKING_SCHEMA)

class BookingModel extends baseModel {
    constructor() {
        super(MODEL, BOOKING_COLLECTION, BOOKING_SCHEMA)
    }
}

module.exports = BookingModel