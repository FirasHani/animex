const asyncHandler = require('express-async-handler')
const Order =require('../model/orderModel')
const Product=require('../model/productModel')
// @desc  add product
// @route POST order/orderProduct
// @access Private
const orderProduct =asyncHandler(async(req,res) => {
    const user={  
        idUser:req.user.id,
        name:req.user.name
    }
    const idParm=req.params.id 
    const Products={
        productID:req.body.productID,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
    }
    let orderProducts=[]
    orderProducts.push(Products)
  let x=  await Product.find({idParm:Products.productID})
  console.log(x)
  if(x!=null){
   // await Order.create({user,orderProducts}).then((e) =>res.json(e))

    await Order.updateOne({ "_id": req.params.id }, { $addToSet: { "orderProducts":orderProducts } })
    .then((e)=>res.json(e))
  }
  res.json("no products")
   

})

module.exports={
    orderProduct
}