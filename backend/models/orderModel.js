const mongoose=require('mongoose')
// const uuidv1=require('uuidv1')
// const crypto=require('crypto')
const {ObjectId}=mongoose.Schema

const orderSchema=new mongoose.Schema({
    orderItems:[{

        type:ObjectId,
        required:true,
        ref:'OrderItem'
 } ],
    shippingAddress1:{
        type:String,
        required:true,
    },
    shippingAddress2:{
        type:String,

    },
    city:{
        type:String,
        required:true,
    },
    zip:{
        type:Number,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }, 
    phone:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:'Pending'
    }, 
    totalPrice:{
        type:Number,
        required:true,
    },
    user:{
        type:ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true})

module.exports=mongoose.model('Order', orderSchema)