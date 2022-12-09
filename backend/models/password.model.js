const { mongoose } = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const passwordSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minLength: 8,
    }
},
    {
        timestamps: true
    })

// Before Saving password, encrypt it
passwordSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const Password = mongoose.model('Password', passwordSchema)

module.exports = Password