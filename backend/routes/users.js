const router = require('express').Router()
const generator = require('generate-password')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

let User = require('../models/user.model')
let Password = require('../models/password.model')

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
            res.status(err.status).json({
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
            res.status(err.status).json({
                success: false,
                message: err
            })
        })
})

// * Every user name has to start with 'NF_',
// * Check that this condition is true.
// * Then, generate a password.
// * Encrypt the generated password and store it in the db alond width user information.
// * Send the generated password to the user's email address.
router.route('/add').post((req, res) => {

    const checkForUsernameConformity = () => {
        if ((req.body.username.toUpperCase()).slice(0, 3) === 'NF_') {
            return req.body.username.toUpperCase()
        }
        else return 'NF_' + req.body.username.toUpperCase()
    }

    const plainTextPassword = generator.generate({ length: 10, numbers: true })
    const saltRounds = 10

    bcrypt.hash(plainTextPassword, saltRounds)
        .then((hash) => {

            const username = checkForUsernameConformity()
            const avatar = req.body.avatar
            const email = req.body.email
            const status = 1
            const admin = false
            const ethAddress = req.body.ethAddress

            const newUser = new User({ username, avatar, email, status, admin, ethAddress })

            newUser.save()
                .then((user) => {
                    // On succeed, add hashed password to the DB
                    const password = hash
                    const newPassword = new Password({ _id: user._id, owner: user._id, password })

                    // Send Email with password to the user's email
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
                                data: { user }
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
                    res.status(err.status).json({
                        success: false,
                        message: err
                    })
                })
        })
})

router.route('/update-avatar/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.username = user.username
            user.avatar = req.body.avatar
            user.email = user.email
            user.status = user.status
            user.admin = user.admin
            user.ethAddress = user.ethAddress

            user.save()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        status: 200,
                        message: 'Avatar Successfully changed'
                    })
                })
                .catch((err) => {
                    res.status(err.status).json({
                        success: false,
                        message: err
                    })
                })
        })
})

router.route('/update-email/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.username = user.username
            user.avatar = user.avatar
            user.email = req.body.email
            user.status = user.status
            user.admin = user.admin
            user.ethAddress = user.ethAddress

            user.save()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        status: 200,
                        message: 'Email Successfully changed'
                    })
                })
                .catch((err) => {
                    res.status(err.status).json({
                        success: false,
                        message: err
                    })
                })
        })
})

router.route('/delete-account/:id').post((req, res) => {
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
                    res.status(err.status).json({
                        success: false,
                        message: err
                    })
                })
        })
})

module.exports = router