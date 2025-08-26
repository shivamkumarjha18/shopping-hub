const express= require('express')

const {handleImageUpload,addProduct,editProduct,fetchAllProducts,deleteProduct}=require('../../controllers/admin/product-controller.js')

const {upload}=require('../../config/cloudinary.js')
const router= express.Router()

router.post('/upload-image',upload.single('image'),handleImageUpload)
router.post('/add',addProduct)
router.put('/edit/:id',editProduct)
router.get('/get',fetchAllProducts)
router.delete('/delete/:id',deleteProduct)
module.exports=router