const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin:{
      type:Boolean,
      default:false,
    }
  },
)
module.exports = mongoose.model('user', userSchema)