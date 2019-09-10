const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: 'string',
    deleted: { type: Boolean, default: false },
    dateAdded: Date
})
const ChrrpModel = mongoose.model('Chrrp', schema)

class Chrrp {
    async create(ownerId, body) {
        return ChrrpModel.create({ ownerId, body, dateAdded: Date.now() })
    }

    async retrieveById(id) {
        return ChrrpModel.findOne({ _id: id, deleted: false })
    }

    async retrieveAllByOwnerId(ownerId) {
        return ChrrpModel.find({ ownerId, deleted: false }).sort([['dateAdded', -1]])
    }

    async update(id, update) {
        delete update.ownerId
        delete update.dateAdded
        return ChrrpModel.findOneAndUpdate({ _id: id }, { ...update }, { useFindAndModify: false, new: true })
    }

    async undelete(id) {
        return ChrrpModel.findOneAndUpdate({ _id: id }, { deleted: false }, { useFindAndModify: false })
    }

    async delete(id) {
        return ChrrpModel.findOneAndUpdate({ _id: id }, { deleted: true }, { useFindAndModify: false })
    }
}
// export a single instance so new ones don't need to be made
module.exports = new Chrrp()