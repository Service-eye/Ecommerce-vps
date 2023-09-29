const express=require('express')
const { postOrder, orderList, orderDetails, updateStatus, userOrdersList } = require('../controllers/orderController')
const router=express.Router()

router.post('/postorder',postOrder)
router.get('/orderlist',orderList)
router.get('/orderdetails/:id',orderDetails)
router.put('/updatestatus/:id',updateStatus)
router.get('/userorders/:userid', userOrdersList)


module.exports=router