class BaseModel {
    constructor(model = null, collection = null, schema = {}) {
        this.model = model
        this.collection = collection
        this.schema = schema
    }

    create(data) {
        return this.model(data).save()
    }

    findUserById(email) {
        return this.model.findOne({ user_email: email, status: 'Active' })
    }

    updateUserById (id, data) {
        return this.model.update({ user_email: id }, { $set: data })
    }
}

module.exports = BaseModel