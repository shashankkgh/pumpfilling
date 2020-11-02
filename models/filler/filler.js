const mongoose = require('mongoose')
const baseModel = require('../base')
const Schema = mongoose.Schema
const FILLER_COLLECTION = 'filler_detail'
const FILLER_SCHEMA = new Schema({
    user_name: String,
    profile_pic: String,
    user_email: String,
    pump_id: String,
    password: String,
    status: { type: String, default: 'Active'},
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()}
})

const MODEL = mongoose.model(FILLER_COLLECTION, FILLER_SCHEMA)

class fillerModel extends baseModel {
    constructor(){
        super(MODEL, FILLER_COLLECTION, FILLER_SCHEMA)
    }

    findFillerByPumpId(id) {
        return this.model.findOne({ pump_id: id, status: 'Active'})
    }
}

module.exports = fillerModel