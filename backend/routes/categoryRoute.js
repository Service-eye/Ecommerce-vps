const express=require('express')
const {postCategory, categoryList, categoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')

const router=express.Router()
const {categoryValidation, validation}=require('../validation/validator')
const { requireAdmin } = require('../controllers/userController')

// naya data insert garnuxa vane post.
router.post('/postcategory',requireAdmin,categoryValidation, validation,postCategory)

router.get('/categorylist',categoryList)

router.get('/categorydetails/:id',categoryDetails)

router.put('/updatecategory/:id',requireAdmin,updateCategory)

router.delete('/deletecategory/:id',requireAdmin,deleteCategory)



// default method to export.
module.exports=router

