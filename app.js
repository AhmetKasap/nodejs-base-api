const express = require('express')
const app = express()
require('dotenv').config()


//! database connection
const mongoDbConnection = require('./src/config/mongodb.connection')
mongoDbConnection()

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is Running on port ${process.env.PORT || 3000}`)
})

//! body-parser
const bodyParser = require('body-parser')    
app.use(bodyParser.urlencoded({extended:false}))  
app.use(bodyParser.json())



//! routes
const routes = require('./src/routes/index.route')
app.use('/api/v1',routes)

app.get('/', (req,res) => {
    res.send('start')
})

