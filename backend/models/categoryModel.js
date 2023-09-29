const mongoose=require('mongoose')

// collection ko str banaune.
const categorySchema=new mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }
},{timestamps:true})
//  createdAt
// updateAt

module.exports=mongoose.model('Category',categorySchema)