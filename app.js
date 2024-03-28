require('express-async-errors');
const express = require('express')
const app = express()
require('dotenv').config()


//! database connection
const mongoDbConnection = require('./src/config/mongodb.connection')
mongoDbConnection()

//! rate limit
const limit = require('./src/middlewares/lib/rateLimit')
app.use('/api/v1',limit)


//! body-parser
const bodyParser = require('body-parser')    
app.use(bodyParser.urlencoded({extended:false}))  
app.use(bodyParser.json())


//! routes and errorHandler
const routes = require('./src/routes/index.route')
app.use('/api/v1',routes)

app.use((req,res, next) => {
    res.send('not found url')
    next()
})

const errorHandler = require('./src/middlewares/errorHandler.middleware')
app.use(errorHandler)


app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is Running on port ${process.env.PORT || 5001}`)
})