const router = require('express').Router()
const generator = require('generate-password')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

let User = require('../models/user.model')
let Password = require('../models/password.model')
let checkForUsernameConformity = require('../utils/checkForUsernameConformity')

require('dotenv').config()


// * create reusable transporter object using the default SMTP transport
const fromEmail = 'snephthali@gmail.com'
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: fromEmail,
        pass: process.env.EMAIL_PASSWORD,
    },
})

// * Every user name has to start with 'NF_',
// * Check that this condition is true.
// * Then, generate a password.
// * Encrypt the generated password and store it in the db alond width user information.
// * Send the generated password to the user's email address.
router.route('/add').post((req, res) => {

    const plainTextPassword = generator.generate({
        length: 15,
        numbers: true,
        strict: true
    })
    const username = checkForUsernameConformity(req)
    const avatar = req.body.avatar
    const email = req.body.email
    const status = 1
    const admin = false
    const emailVerified = true
    const emailPending = null
    const verificationCode = null
    const ethAddress = req.body.ethAddress

    const newUser = new User({
        username,
        avatar,
        email,
        status,
        admin,
        ethAddress,
        emailVerified,
        emailPending,
        verificationCode,
    })

    newUser.save()
        .then((user) => {
            // * On succeed, add hashed password to the DB
            // * const password = hash
            const newPassword = new Password({ _id: user._id, owner: user._id, password: plainTextPassword })

            // * Send Email with password to the user's email
            transporter.sendMail({
                from: fromEmail,
                to: email.toLowerCase(),
                subject: 'YOUR GENERATED PASSWORD',
                text: `Your new Send-It password is: ${plainTextPassword}`,
            })
                .then(() => { console.log('Email sent!') })
                .catch((err) => { console.log('Email not sent!', err) })

            newPassword.save()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        status: 200,
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        message: err
                    })
                })
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                message: err
            })
        })
})

router.route('/').get((req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json({
                success: true,
                status: 200,
                data: { users }
            })
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                message: err
            })
        })
})

router.route('/getAdmin').get((req, res) => {
    User.findOne({ admin: true })
        .then((adminUser) => {
            res.status(200).json({
                success: true,
                status: 200,
                data: {
                    adminUsername: adminUser.username,
                    adminEthAddress: adminUser.ethAddress,
                }
            })
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                message: err
            })
        })
})

router.route('/:id').post((req, res) => {

    const token = req.cookies.sijwt

    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err || decodedToken.id !== req.params.id) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Token'
                })
            }
            else {
                User.findOne({ _id: decodedToken.id })
                    .then((user) => {
                        res.status(200).json({
                            success: true,
                            status: 200,
                            data: {
                                user: user._id,
                                avatar: user.avatar,
                                email: user.email,
                                ethAddress: user.ethAddress,
                                username: user.username,
                                emailVerified: user.emailVerified,
                                avatar: user.avatar
                            }
                        })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            success: false,
                            message: err
                        })
                    })
            }
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
})

router.route('/update-avatar/:id').post((req, res) => {
    const token = req.cookies.sijwt

    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err || decodedToken.id !== req.params.id) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Token'
                })
            }
            else {
                User.findById(req.params.id)
                    .then((user) => {

                        user.username = user.username
                        user.avatar = req.body.avatar
                        user.email = user.email
                        user.emailPending = user.emailPending
                        user.emailVerified = user.emailVerified
                        user.verificationCode = user.verificationCode
                        user.status = user.status
                        user.admin = user.admin
                        user.ethAddress = user.ethAddress

                        user.save()
                            .then((userAvatar) => {
                                res.status(200).json({
                                    success: true,
                                    status: 200,
                                    message: 'Avatar Successfully changed',
                                    data: { userAvatar }
                                })
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    success: false,
                                    message: err
                                })
                            })
                    })
            }
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
})

router.route('/update-email/:id').post((req, res) => {
    const token = req.cookies.sijwt

    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err || decodedToken.id !== req.params.id) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Token'
                })
            }
            else {
                const generatedCode = generator.generate({ length: 5, numbers: true })

                User.findById(req.params.id)
                    .then((user) => {
                        user.username = user.username
                        user.avatar = user.avatar
                        user.email = req.body.email
                        user.emailPending = req.body.email
                        user.emailVerified = false
                        user.verificationCode = generatedCode.toUpperCase()
                        user.status = user.status
                        user.admin = user.admin
                        user.ethAddress = user.ethAddress

                        user.save()
                            .then(() => {
                                // Send Email with code to the user's email
                                transporter.sendMail({
                                    from: fromEmail,
                                    to: req.body.email.toLowerCase(),
                                    subject: 'VERIFY YOUR EMAIL',
                                    text: `CODE: ${generatedCode.toUpperCase()}`,
                                })
                                    .then(() => { console.log('Email sent!') })
                                    .catch((err) => { console.log('Email not sent!', err) })

                                res.status(200).json({
                                    success: true,
                                    status: 200,
                                    message: 'Email pending for verification'
                                })
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    success: false,
                                    message: err
                                })
                            })
                    })
            }
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
})

router.route('/verify-email/:id').post((req, res) => {
    const token = req.cookies.sijwt

    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err || decodedToken.id !== req.params.id) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Token'
                })
            }
            else {
                User.findById(req.params.id)
                    .then((user) => {
                        if (user.verificationCode === req.body.verificationCode) {
                            user.username = user.username
                            user.avatar = user.avatar
                            user.email = req.body.email
                            user.emailPending = null
                            user.emailVerified = true
                            user.verificationCode = null
                            user.status = user.status
                            user.admin = user.admin
                            user.ethAddress = user.ethAddress

                            user.save()
                                .then(() => {
                                    res.status(200).json({
                                        success: true,
                                        status: 200,
                                        message: 'Email verified.'
                                    })
                                })
                                .catch((err) => {
                                    res.status(400).json({
                                        success: false,
                                        message: err
                                    })
                                })
                        }
                        else {
                            res.status(400).json({
                                success: false,
                                message: "Verification code is not valid."
                            })
                        }
                    })
                    .catch((err) => {
                        res.status(400).json({
                            success: false,
                            message: err
                        })
                    })
            }
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
})

router.route('/delete-account/:id').post((req, res) => {
    const token = req.cookies.sijwt

    if (token) {
        jwt.verify(token, process.env.JWT_SIGNATURE, async (err, decodedToken) => {
            if (err || decodedToken.id !== req.params.id) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Token'
                })
            }
            else {
                User.findByIdAndDelete(req.params.id)
                    .then(() => {
                        Password.findByIdAndDelete(req.params.id)
                            .then(() => {
                                res.status(200).json({
                                    success: true,
                                    status: 200,
                                    message: 'User Successfully Deleted'
                                })
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    success: false,
                                    message: err
                                })
                            })
                    })
            }
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
})

module.exports = router