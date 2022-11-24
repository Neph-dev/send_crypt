const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const txnSchema = new Schema({
    owner: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    from: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    to: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    dateAndTime: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
},
    {
        timestamps: true
    })

const User = mongoose.model('txn', txnSchema)

module.exports = User