const express = require('express')
const router = express.Router()
const {
    addProduct,
    showProduct,
    editProduct,
    deleteProduct,
}=require('../controller/productController')
const{ searchProduct
}=require('../controller/searchProductController')
const {
    protect,
    admin
}=require('../middleware/auth')
router.post('/product/addProduct',protect,admin,addProduct)
router.get('/product/showProduct',protect,admin,showProduct)
router.put('/product/editProduct/:id',protect,admin,editProduct)
router.delete('/product/deleteProduct/:id',protect,admin,deleteProduct)
router.get('/product/searchProduct',searchProduct)
module.exports = router