const router = require('express').Router()
let Transaction = require('../models/transaction.model')


router.route('/').get((req, res) => {
    Transaction.find()
        .then((transactions) => {
            res.status(200).json({
                success: true,
                status: 200,
                data: { transactions }
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(err.status).json({
                success: false,
                message: err
            })
        })
})

router.route('/add').post((req, res) => {
    const txnOwner = req.body.txnOwner
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount
    const message = req.body.message
    const hash = req.body.hash
    const ts = req.body.ts

    const newTransaction = new Transaction({ txnOwner, from, to, amount, message, hash, ts })

    newTransaction.save().then((transaction) => {
        res.status(200).json({
            success: true,
            status: 200,
            data: { transaction }
        })
    })
        .catch((err) => {
            console.log(err)
            res.status(400).json({
                success: false,
                message: err
            })
        })
})

module.exports = router