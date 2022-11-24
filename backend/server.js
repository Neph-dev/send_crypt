const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const authenticationRouter = require('./routes/authentication')
const txnRouter = require('./routes/txn')
const avatarsRouter = require('./routes/avatars')

// Load .env file
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => console.log('Connection to MongoDB established successfully.'))

// Define Routes
app.use('/users', usersRouter)
app.use('/authentication', authenticationRouter)
app.use('/txn', txnRouter)
app.use('/avatars', avatarsRouter)

app.listen(port, () => console.log(`Server is listening on port ${port}`))

