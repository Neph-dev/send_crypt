const router = require('express').Router()
const bcrypt = require('bcrypt')
let Password = require('../models/password.model')


router.route('/update-password/:id').post((req, res) => {
    Password.findById(req.params.id)
        .then((password) => {
            bcrypt.compare(req.body.oldPassword, password.password)
                .then((result) => {
                    if (result === true) {
                        const saltRounds = 10

                        bcrypt.hash(req.body.newPassword, saltRounds)
                            .then((hash) => {
                                password.owner = password.owner
                                password.password = hash

                                // On succeed, add hashed password to the DB
                                password.save()
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
                    }
                    if (result === false) {
                        res.status(400).json({
                            success: false,
                            message: 'Incorrect password.'
                        })
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

module.exports = router
