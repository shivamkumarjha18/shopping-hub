const express = require('express')
const mongooose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter=require('./routes/auth/authroutes.js')
const adminProductRouter=require('./routes/admin/products-routes.js')
const shopProductRouter=require('./routes/shop/products-routes.js')
const shopCartRouter=require('./routes/shop/cart-routes.js')
const shopAddressRouter=require('./routes/shop/address-routes.js')
const shopOrderRouter=require('./routes/shop/order-routes.js')
const  adminOrderRouter= require("./routes/admin/order-routes.js")
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
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
app.use('/api/admin/products',adminProductRouter)
app.use('/api/admin/orders',adminOrderRouter)
app.use('/api/shop/products',shopProductRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
//database connection
mongooose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database connection error", err)
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
