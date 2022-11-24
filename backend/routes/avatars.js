const router = require('express').Router()

let Avatar = require('../models/avatar.model')


router.route('/').get((req, res) => {
    Avatar.find()
        .then((avatars) => {
            res.status(200).json({
                success: true,
                status: 200,
                data: { avatars }
            })
        })
        .catch((err) => {
            res.status(err.status).json({
                success: false,
                message: err
            })
        })
})

router.route('/add').post((req, res) => {

    const newAvatar = new Avatar({ link: req.body.link })

    newAvatar.save()
        .then((avatars) => {
            res.status(200).json({
                success: true,
                status: 200,
                message: 'Successfully added',
                data: { avatars }
            })
        })
        .catch((err) => {
            res.status(err.status).json({
                success: false,
                message: err
            })
        })
})

module.exports = router
