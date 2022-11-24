const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const avatarSchema = new Schema({
    link: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
    },
},
    {
        timestamps: true
    })

const Avatar = mongoose.model('Avatar', avatarSchema)

module.exports = Avatar