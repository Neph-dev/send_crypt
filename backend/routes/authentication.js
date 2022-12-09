const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const Password = require('../models/password.model')
const checkForUsernameConformity = require('../utils/checkForUsernameConformity')

// Load .env file
require('dotenv').config()

// const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SIGNATURE)
}


// * Check if the username exists,
// * If it does, check if the corresponding password is correct.
// * If password is correct, return user information.
// * Else, return error message.
router.route('/login').post((req, res) => {

    User.findOne({ username: checkForUsernameConformity(req) })
        .then((user) => {
            if (user === null) {
                res.json({
                    success: false,
                    message: 'User Not Found'
                })
            }
            else {
                Password.findOne({ owner: user._id })
                    .then((password) => {
                        bcrypt.compare(req.body.password, password.password)
                            .then(async result => {
                                if (result === true) {
                                    const token = createToken(user._id)

                                    res.cookie("sijwt", token, {
                                        withCredentials: true,
                                    })

                                    res.status(200).json({
                                        success: true,
                                        message: 'Logged in successfully.',
                                        data: { user }
                                    })
                                }
                                if (result === false) {
                                    res.status(400).json({
                                        success: false,
                                        message: 'Incorrect password.'
                                    })
                                }
                            })
                    })
            }
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                message: error
            })
        })

})

router.route('/verify-token').post((req, res) => {
    const token = req.cookies.sijwt

    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: err
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: { user_id: decodedToken.id }
                })
            }
        })
    }
})

module.exports = router
