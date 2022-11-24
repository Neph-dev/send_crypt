const router = require('express').Router()

let Txn = require('../models/txn.model')


router.route('/').get((req, res) => {
    Txn.find()
        .then((txn) => {
            res.status(200).json({
                success: true,
                status: 200,
                data: { txn }
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

    const owner = req.body.owner
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount
    const message = req.body.message
    const dateAndTime = req.body.dateAndTime

    const newTxn = new Txn({
        _id: req.body.owner, owner, from, to, amount, message, dateAndTime
    })

    newTxn.save()
        .then((txn) => {
            res.status(200).json({
                success: true,
                status: 200,
                data: { txn }
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