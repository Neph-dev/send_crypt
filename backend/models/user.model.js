const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
    },
    emailPending: {
        type: String,
    },
    verificationCode: {
        type: String,
    },
    avatar: {
        type: String,
        required: true,
    },
    // 0 means suspended, 1 means active
    status: {
        type: Number,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    ethAddress: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true
    })

const User = mongoose.model('User', userSchema)

module.exports = User