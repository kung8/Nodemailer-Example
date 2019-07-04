require('dotenv').config()
const express = require('express')
const {SERVER_PORT} = process.env
const ctrl = require('./controller')
const app = express()
app.use(express.json())
app.post('/api/email',ctrl.email)
app.listen(SERVER_PORT,()=>console.log(`Running on ${SERVER_PORT}`))