const mongoose = require('mongoose')
const testimonialSchema = mongoose.Schema(
  {
    user:{
        id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'user'
        },
        name:{
          type:String
        }
      },
      message:{
         type:String,
      },
      like:[
        {
          idUser:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
          },
          name:{
            type:String
          }
        }
      ]
  },
)
module.exports = mongoose.model('testimonial',testimonialSchema)