const asyncHandler = require('express-async-handler')
const Order =require('../model/cartModel')
const Product=require('../model/productModel')
// @desc  add to cart
// @route POST cart/addToCart/:id
// @access Private
const addToCart =asyncHandler(async(req,res) => {
    const userId=req.user.id
    let orderProducts=[]
    const idParm=req.params.id  
   const product= await Product.findById(idParm)
   console.log(product)
   console.log(product.productName)
   if(product){
    const products={
      productID:idParm,
      productName:product.productName,
      productPrice:product.productPrice,
      productQuantity:product.productQuantity
    }
    orderProducts.push(products)
   }
      await Order.updateOne({"user.id":userId},{$addToSet:{"orderProducts":orderProducts}})
      .then(res.json("added to cart"))
})
// @desc  delete a single product in cart 
// @route GET cart/deleteProductInCart/:id
// @access Private
const deleteProductInCart=asyncHandler(async(req,res)=>{
  const userId=req.user.id
  const checkCart=  await Order.findOne({
    "user.id":userId,
    })
    if(checkCart){
      console.log(req.params)
    await Order.updateOne({"_id":checkCart._id},{$pull:{"orderProducts":{"id":req.params}}},{multi:true})
            .then(res.json("product reomoved")) 
          }
          else{
            res.json("no products to remove")
          }
})
// @desc  get total ammount
// @route GET cart/getTotalAmmount
// @access Private
const getTotalAmmount =asyncHandler(async(req,res)=>{
  const userId=req.user.id
  console.log(userId)
  const checkCart=  await Order.findOne({
  "user.id":userId,
})
let ammount=0 
if(checkCart){
  if (checkCart.orderProducts && checkCart.orderProducts.length >= 0) {
    for (let i = 0; i < checkCart.orderProducts.length; i++) {
        ammount += checkCart.orderProducts[i].productPrice
    }
    res.json({"ammount":ammount})
}
}
else{
 res.json("user has no products")
}
})
module.exports={
    addToCart,
    getTotalAmmount,
    deleteProductInCart
}