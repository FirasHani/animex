const express = require('express')
const router = express.Router()
const{
    registerUser,
    loginUser,
    getMe,
    forgetPaswwordRequest,
    getForgetPasswordPage,
    updateOlderPassword
}=require('../controller/userController')
router.post('/user/registerUser',registerUser)
router.post('/user/loginUser',loginUser)
router.get('/user/getMe',getMe)
router.post('/user/forgetPaswwordRequest',forgetPaswwordRequest)
router.get('/user/getForgetPasswordPage/:id/:token',getForgetPasswordPage)
router.put('/user/updateOlderPassword/:id/:token',updateOlderPassword)
module.exports = router