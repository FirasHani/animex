const asyncHandler = require('express-async-handler')
const Order =require('../model/orderModel')
const Product=require('../model/productModel')
// @desc  get order page (generate it)
// @route GET order/getOrderProduct
// @access Private
const getOrderProduct =asyncHandler(async(req,res)=>{
    const userId=req.user.id
    const name=req.user.name
    const checkUser=  await Order.findOne({
    "user.id":userId,
})
  if(checkUser){
    res.json("user has a Cart")
  }
  else{
    await Order.create({
        user:{
            id:userId,
            name:req.user.name
        }
    }).then((e)=>res.json(e))
  }
})
// @desc  add product
// @route POST order/orderProduct
// @access Private
const orderProduct =asyncHandler(async(req,res) => {
    const userId=req.user.id
    const Products={
        productID:req.body.productID,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
    }
    let orderProducts=[]
    orderProducts.push(Products)
    const checkCart=  await Order.findOne({
        "user.id":userId,
    })
    if(checkCart){
    await Order.updateOne({ "user.id": userId }, { $addToSet: { "orderProducts":orderProducts } })
    .then((e)=>res.json(e))
    }
  else{
     res.json("no products")
  }
})
module.exports={
    orderProduct,
    getOrderProduct
}