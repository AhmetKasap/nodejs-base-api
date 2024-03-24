const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req,res) => {
    res.send('start')
})

//! database connection
const mongoDbConnection = require('./src/config/mongodb.connection')
mongoDbConnection()

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is Running on port ${process.env.PORT || 3000}`)
})


