const mongoose = require('mongoose')
const cartSchema = mongoose.Schema(
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
    orderProducts:[
        {
            productID:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'product'
            },
            productName:{
                type:String
            },
            productPrice:{
                type:Number
            }
        }
    ],
    totalPrice:{
        type:Number
    }
  }
)
module.exports = mongoose.model('car',cartSchema)