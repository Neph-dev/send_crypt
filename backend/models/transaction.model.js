const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    txnOwner: {
        type: String,
        required: true,
        trim: true,
    },
    from: {
        type: String,
        required: true,
        trim: true,
    },
    to: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    hash: {
        type: String,
        required: true,
        trim: true,
    },
    ts: {
        type: String,
        required: true,
        trim: true,
    },
},
    {
        timestamps: true
    })

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction