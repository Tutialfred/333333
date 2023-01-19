'use strict'
const router = require('./routes/index.js')
const express = require('express') //s
const app = express()

// Acuérdense de agregar su router o cualquier middleware que necesiten acá.

app.use(express.json())
app.use('/', router)




module.exports = app
