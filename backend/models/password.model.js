const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const passwordSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    }
},
    {
        timestamps: true
    })

const Password = mongoose.model('Password', passwordSchema)

module.exports = Password