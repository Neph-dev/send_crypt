const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const usersRouter = require('./routes/users')
const authenticationRouter = require('./routes/authentication')
const transactionsRouter = require('./routes/transactions')
const avatarsRouter = require('./routes/avatars')
const passwordsRouter = require('./routes/passwords')

// Load .env file
require('dotenv').config()

const app = express()
const port = 4000

app.use(cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => console.log('Connection to MongoDB established successfully.'))

// Define Routes
app.use('/users', usersRouter)
app.use('/authentication', authenticationRouter)
app.use('/avatars', avatarsRouter)
app.use('/transactions', transactionsRouter)
app.use('/password', passwordsRouter)

app.listen(port, () => console.log(`Server is listening on port ${port}`))

