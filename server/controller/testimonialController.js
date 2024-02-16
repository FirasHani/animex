const asyncHandler = require('express-async-handler')
const Testimonial =require('../model/testimonialModel')
// @desc  add testimonial
// @route POST testimonial/addTestimonial
// @access Private
const addTestimonial =asyncHandler(async(req,res) => {
     const  user={
        id:req.user._id,
        name:req.user.name
     }
     const {message}=req.body
        if(!message) res.json("add message please")
        await Testimonial.create({
            user,
            message
         }).then(res.json("message added"))
})
// @desc  edit testimonial
// @route POST testimonial/editTestimonial/:id
// @access Private
const editTestimonial=asyncHandler(async(req,res) => {
    const user={id:req.user._id}
    const id=req.params.id
    const changer= await Testimonial.findById(id)
    const {message}=req.body
    if(JSON.stringify(user.id) === JSON.stringify(changer.user.id) ){
        await Testimonial.findByIdAndUpdate(id,{message},{new:true}).then(res.json("testimonial updated"))
    }
    else{
        res.json("user has no testimonials ")
    }
})
// @desc  delete testimonial
// @route POST testimonial/deleteTestimonial/:id
// @access Private
const deleteTestimonial=asyncHandler(async(req,res) => {
    const user={id:req.user._id}
    const id=req.params.id
    const changer= await Testimonial.findById(id)
    if(JSON.stringify(user.id) === JSON.stringify(changer.user.id) ){
        await Testimonial.deleteOne({ _id: id }).then(res.json("testimonial deleted"))
    }
    else{
        res.json("user has no testimonial ")
    } 
})
// @desc  like testimonial
// @route POST testimonial/likeTestimonial/:id
// @access Private
const likeTestimonial=asyncHandler(async(req,res) => {
    const user={  
        idUser:req.user._id,
        name:req.user.name
    }
    const idParm=req.params.id  
    const testimonial= await Testimonial.findById(idParm)
    let len=testimonial.like
    console.log(len.length)
    console.log(JSON.stringify(user.idUser))
    for(let i=0; i<len.length; i++){
        if(JSON.stringify(testimonial.like[i].idUser) ==  JSON.stringify(user.idUser) )
        res.json("user has a like")
    }
   let like=[]
   like.push(user)
    await Testimonial.updateOne({ "_id": req.params.id }, { $addToSet: { "like": like } }).then(res.json("user like"))
})
// @desc  remove testimonial
// @route POST testimonial/removeLikeTestimonial/:id
// @access Private
const removeLikeTestimonial=asyncHandler(async(req,res) => {
    const user={  
        idUser:req.user._id,
        name:req.user.name
    }
    const idParm=req.params.id  
    const testimonial= await Testimonial.findById(idParm)
    let len=testimonial.like
    let like=[]
    like.push(user)
    for(let i=0; i<len.length; i++){
        if(JSON.stringify(testimonial.like[i].idUser) ==  JSON.stringify(user.idUser) ){
            await Testimonial.updateOne({"_id":idParm},{$pull:{"like":{"idUser":user.idUser}}},{multi:true})
            .then(res.json("like reomoved")) 
        }
    }
    res.json("User has no likes")
})
module.exports={
    addTestimonial,
    editTestimonial,
    deleteTestimonial,
    likeTestimonial,
    removeLikeTestimonial
}