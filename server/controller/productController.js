const asyncHandler = require('express-async-handler')
const Product =require('../model/productModel')
// @desc  add product
// @route POST product/addProduct
// @access Admin
const addProduct=asyncHandler(async(req,res) => {
    const {productName,productPrice,productQuantity,genre} = req.body
    await Product.create({
        productName,
        productPrice,
        productQuantity,
        genre
    }).then(res.json("new product added"))
})
// @desc   edit product
// @route  PUT product/editProduct/:id
// @access Admin
const editProduct=asyncHandler(async(req,res) => {
    const user={id:req.user.id}
    const id=req.params.id
    const {productName,productPrice,productQuantity,genre} = req.body
        await Product.findByIdAndUpdate(id,{productName,productPrice,productQuantity,genre},{new:true})
        .then(res.json("product updated"))
})
// @desc  delete product
// @route DELETE product/deleteProduct/:id
// @access Admin
const deleteProduct=asyncHandler(async(req,res) => {
    const id=req.params.id
        await Product.deleteOne({_id:id})
        .then(res.json("product deleted"))
})
// @desc  show product
// @route GET product/showProduct
// @access public
const showProduct=asyncHandler(async(req,res) => {
   await Product.find().then((e)=>res.json(e))
})
module.exports={
    addProduct,
    showProduct,
    editProduct,
    deleteProduct
}