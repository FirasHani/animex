const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
  {
    productName:{ 
        type: String
    },
    productPrice:{ 
        type: Number
    },
    productQuantity:{ 
        type:Number
    },
    genre:{
        type:[String]
    },
    productImage:{
        type:String
     }
  }
)
module.exports = mongoose.model('product',productSchema)