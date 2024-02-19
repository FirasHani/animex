const express = require('express')
const router = express.Router()
const {
    orderProduct,
    getOrderProduct
}=require('../controller/orderController')
const {
    protect,
    admin
}=require('../middleware/auth')
router.put('/product/addProduct/:id',protect,orderProduct)
router.get('/product/getOrderProduct',protect,getOrderProduct)
module.exports = router