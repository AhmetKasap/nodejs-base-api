const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req,res) => {
    res.send('start')
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is Running on port ${process.env.PORT || 3000}`)
})