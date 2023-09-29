const express=require('express')
const { postRegister, postEmailConfirmation, signIn, forgetPassword, resetPassword, userDetails, requireAdmin, userList, requireSignin, signOut } = require('../controllers/userController')
const router=express.Router()

router.post('/register',postRegister)
router.put('/confirmation/:token',postEmailConfirmation)
router.post('/signin',signIn)
router.post('/forgetpassword',forgetPassword)
router.put('/resetpassword/:token',resetPassword)
router.get('/userlist',requireAdmin, userList)  // user le matrai herna milne.
router.get('/userdetails/:id',requireSignin,userDetails) // user ra admin duitai le herna paune.
router.post('/signout',signOut)

module.exports=router
