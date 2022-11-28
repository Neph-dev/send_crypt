const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let User = require('../models/user.model')
let Password = require('../models/password.model')
let checkForUsernameConformity = require('../utils/checkForUsernameConformity')


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
                            .then(function (result) {
                                if (result === true) {
                                    res.json({
                                        success: true,
                                        message: 'Logged in successfully.',
                                        data: { user }
                                    })
                                }
                                if (result === false) {
                                    res.json({
                                        success: false,
                                        message: 'Incorrect password.'
                                    })
                                }
                            })
                    })
            }
        })
        .catch((error) => {
            res.json({
                success: false,
                message: error
            })
        })

})

module.exports = router
