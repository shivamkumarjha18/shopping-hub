const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        required:true,
        type:String
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    salePrice:{
        type:Number
       
    },
    totalStock:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;