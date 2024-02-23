const express = require('express')
const router = express.Router()
const {
    addToCart,
    getTotalAmmount,
    deleteProductInCart
}=require('../controller/cartController')
const {
    protect,
    admin
}=require('../middleware/auth')
router.post('/cart/addToCart/:id',protect,addToCart)
router.get('/cart/getTotalAmmount',protect,getTotalAmmount)
router.delete('/cart/deleteProductInCart/:id',protect,deleteProductInCart)
module.exports = router