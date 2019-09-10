const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const schema = new mongoose.Schema({
    username: { type: String, unique: true },
    hashPassword: 'string', // salted
    imgUrl: { type: 'string', default: 'some image url' },
    location: { type: 'string', default: '' },
    link: { type: 'string', default: 'www.google.com' },
    description: { type: 'string', default: '' },
    dateAdded: Date
})

const UserModel = mongoose.model('User', schema)

class User {
    async create(username, password, imgUrl, location, link, description) {
        const hash = await bcrypt.hash(password, saltRounds)
        return UserModel.create({
            username,
            imgUrl,
            hashPassword: hash,
            location,
            link,
            description,
            dateAdded: Date.now()
        })
    }

    async getAll() {
        return UserModel.find({})
    }

    async retrieveUserByUsername(username) {
        return UserModel.findOne({ username })
    }

    async retrieveUserIdByUsername(username) {
        const user = await UserModel.findOne({ username })
        return user._id
    }

    async retrieve(username, password) {
        const user = await UserModel.findOne({ username })
        if (user) {
            const isSame = await new Promise((resolve, reject) => {
                bcrypt.compare(password, user.hashPassword, (err, res) => {
                    if (err) return reject(err)
                    resolve(res)
                })
            })
            if (isSame) return user
        }
        return null
    }
}
// export a single instance so new ones don't need to be made
module.exports = new User()