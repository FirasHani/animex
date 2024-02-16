const express = require('express')
const router = express.Router()
const{
    addTestimonial,
    editTestimonial,
    deleteTestimonial,
    likeTestimonial,
    removeLikeTestimonial
}=require('../controller/testimonialController')
const {protect}=require('../middleware/auth')
router.post('/testimonial/addTestimonial',protect,addTestimonial)
router.post('/testimonial/editTestimonial/:id',protect,editTestimonial)
router.delete('/testimonial/deleteTestimonial/:id',protect,deleteTestimonial)
router.post('/testimonial/likeTestimonial/:id',protect,likeTestimonial)
router.post('/testimonial/removeLikeTestimonial/:id',protect,removeLikeTestimonial)
module.exports = router