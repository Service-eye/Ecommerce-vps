// const mongoose=require('mongoose')
// const {ObjectId} =mongoose.Schema //eauta table ko data arko table ko data sangga link garauna ObjectId.

// const productSchema=new mongoose.Schema(
//     {
//         product_name:{
//             type:String,
//             required:true,
//             trim:true
//         },
//         product_price:{
//             type:Number,
//             required:true,
//         },
//         countInstock:{
//             type:Number,
//             required:true,
//         },
//         product_description:{
//             type:String,
//             required:true
//         },
//         product_image:{
//             type:String,
//             required:true,
//         },
//         rating:{
//             type:Number,
//             default:0,
//             required:true
//         },
//         category:{
//             type: ObjectId,
//             required:true,
//             ref:'Category'
//         }
//     }
// ,{timestamps:true})


// module.exports=mongoose.model('Product',productSchema)

const mongoose=require('mongoose')

const {ObjectId}=mongoose.Schema

const productSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        trim:true
    },
    product_price:{
        type:Number,
        required:true,
    },

    countInStock:{
        type:Number,
        required:true,
    },

    product_description:{
        type:String,
        required:true,
    },
    product_image:{
        type:String,
        required:true,
    },
    product_rating:{
        type:Number,
        default:0,
        max:5
    },

    category:{
        type:ObjectId,
        required:true,
        ref:'Category'
    }
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)