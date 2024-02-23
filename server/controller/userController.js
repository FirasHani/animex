const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User =require('../model/userModel')
const Order =require('../model/cartModel')
var nodemailer = require('nodemailer')
// @desc registerUser
// @route POST user/registerUser
// @access public
const registerUser=asyncHandler(async(req,res)=>{
    const{name,email,password,isAdmain}=req.body
    const checkUser=await User.findOne({email})
    if(checkUser){
        res.send("user exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user= await User.create({
        name,
        email,
        isAdmain,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmain,
            token: generateToken(user._id),
          })
          await Order.create({
            user:{
                id:user.id,
                name:user.name
            }
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})
// @desc loginUser
// @route POST user/loginUser
// @access public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    //check for user 
    const user=await User.findOne({email})
    if(!user) res.json("User Dosenot exists")
    if(user && await bcrypt.compare(password, user.password)){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user login')
    }
})
// @desc    Get user data
// @route   GET /user/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
  })
// @desc    post forget passwrod request
// @route   POST /user/forgetPaswwordRequest
// @access  public
const forgetPaswwordRequest=asyncHandler(async(req,res)=>{
    const {email}=req.body
  try{
    const olderUser=await User.findOne({email})
    if(!olderUser){
      res.json("user donot exixsts!! ")
    }
    const secret = process.env.JWT_SECRET + olderUser.password
    const token = jwt.sign({ email: olderUser.email, id: olderUser._id }, secret, {
      expiresIn: "10m",
    })
    const link = `http://localhost:5000/user/getForgetPasswordPage/${olderUser._id}/${token}`
    console.log(link)
    var nodemailer = require('nodemailer')
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testnode184@gmail.com',
        pass: process.env.PASWORED_SECRET,
  }
})
var mailOptions = {
  from: 'testnode184@gmail.com',
  to: 'aezakmi1234567@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'Hiiiiiiiiiii'
}
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response)  
  }
})
  }catch(error){
    console.log(error)
  }
})
// @desc    get forget passwrod JWT
// @route   GET /user/forgetPaswword/:id/:token
// @access  public
const getForgetPasswordPage=asyncHandler(async(req,res)=>{
  const {id,token}=req.params
  console.log(" id ", id ," token " , token)
  const olderUser=await User.findOne({_id:id})
  if(!olderUser){
    res.json("user dosenot exists!! ")
  }
  const secret = process.env.JWT_SECRET + olderUser.password
  try{
    const verify = jwt.verify(token, secret)
    res.send("verify")
  }catch(error){
    res.send("not verify")
  }
})
// @desc    post forget passwrod JWT / update password
// @route   PUT /user/updateOlderPassword/:id/:token
// @access  public
const updateOlderPassword=asyncHandler(async(req,res)=>{
  const { id, token } = req.params
  const { password } = req.body

  const oldUser = await User.findOne({ _id: id })
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" })
  }
  const secret =process.env.JWT_SECRET + oldUser.password
  try {
    const verify = jwt.verify(token, secret)
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    )
      res.json('done')
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
})
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgetPaswwordRequest,
    getForgetPasswordPage,
    updateOlderPassword
  }