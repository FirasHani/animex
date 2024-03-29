const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require("cors")
const port = process.env.PORT || 5000
const app=express()
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('',require('./route/userRoute'))
app.use('',require('./route/testimonialRoute'))
app.use('',require('./route/productRoute'))
app.use('',require('./route/cartProductRoute'))
app.listen(port, () => console.log(`Server started on port ${port}`))