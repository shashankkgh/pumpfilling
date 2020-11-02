const mongoose = require('mongoose')
const BaseModel = require('../base')
const Schema = mongoose.Schema
const USER_COLLECTION = 'user'
const USER_SCHEMA = new Schema({
    user_name: String,
    profile_pic: String,
    user_email: String,
    password: String,
    status: { type: String, default: 'Active'},
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()}
})

const MODEL = mongoose.model(USER_COLLECTION, USER_SCHEMA)

class userModel extends BaseModel {
    constructor() {
        super(MODEL, USER_COLLECTION, USER_SCHEMA)
    }
}

module.exports = userModel