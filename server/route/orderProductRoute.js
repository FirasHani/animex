const express = require('express')
const router = express.Router()
const {
    orderProduct
}=require('../controller/orderController')
const {
    protect,
    admin
}=require('../middleware/auth')
router.post('/product/addProduct/:id',protect,orderProduct)
module.exports = router