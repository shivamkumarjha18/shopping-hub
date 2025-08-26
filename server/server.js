const express = require('express')
const mongooose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter=require('./routes/auth/authroutes.js')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'cache-control','Expires','pragma']
}))
app.use('/api/auth',authRouter)
//database connection
mongooose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database connection error", err)
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
