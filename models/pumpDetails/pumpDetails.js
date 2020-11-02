const mongoose = require('mongoose')
const baseModel = require('../base')
const Schema = mongoose.Schema
const PUMP_COLLECTION = 'pump_details'
const PUMP_SCHEMA = new Schema({
    pump_lat: Number,
    pump_lng: Number,
    pump_name: String,
    pump_id: String,
    user_rating: Number,
    createdAT: { type: Date, default: new Date() },
    deletedAt: { type: Date, default: new Date() },
})

const MODEL = mongoose.model(PUMP_COLLECTION, PUMP_SCHEMA)

class PUMP_MODEL extends baseModel {
    constructor() {
        super(MODEL, PUMP_COLLECTION, PUMP_SCHEMA)
    }

    getPumpDetailById (id) {
        return this.model.findOne({ pump_id: id })
    }

    getPumpBooking(id) {
        return this.model.aggregate([
            {
                $match:{
                    pump_id: id
                }
            },
            {
                $lookup:{
                    from: 'pump_bookings',
                    localField: 'pump_id',
                    foreignField: 'pump_id',
                    as: 'Bookings'
                }
            }
        ])
    }
}

module.exports = PUMP_MODEL