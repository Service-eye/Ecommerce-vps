// // const mongoose=require('mongoose')
// // const uuidv1=require('uuidv1')
// // const crypto=require('crypto')

// // const userSchema=new mongoose.Schema({
// //     name:{
// //         type:String,
// //         required:true,
// //         trim:true,
// //     },
// //     email:{
// //         type:String,
// //         required:true,
// //         unique:true,
// //         trim:true,
// //     },
// //     role:{
// //         type:Number,
// //         default:0, // for normal user.
// //         required:true,
// //     },
// //     hashed_password:{
// //         type:String,
// //         required:true,

// //     },
// //     salt:String,
// //     isVerified:{
// //         type:Boolean,
// //         default:false,
// //     }

// // },{timestamps:true})


// // // virtual fields.
// // userSchema.virtual('password')
// // .set(function(password){
// //     this._password=password
// //     this.salt=uuidv1()
// //     this.hashed_password=this.encryptPassword(password)
// // })
// // .get(function(){
// //     return this._password
// // })

// // // defining methods.
// // userSchema.methods={
// //     encryptPassword:function(password){
// //         if(!password)
// //             return ''
        
// //         try{
// //             return crypto
// //             .createHmac('sha1',this.salt)
// //             .update(password)
// //             .digest('hex')
// //         }
// //         catch(err){
// //             return ''
// //         }
// //     },
// //     authenticate:function(plainText){
// //         return this.encryptPassword(plainText)===this.hashed_password
// //     }
// //     // authenticate: function (plainText) {
// //     //     const hashedInputPassword = this.encryptPassword(plainText);
// //     //     return hashedInputPassword === this.hashed_password;
// //     //   }
      
// // }

// // module.exports=mongoose.model('User',userSchema)
// // // pcrypt for hashing.


// const mongoose=require('mongoose');
// const uuidv1=require('uuidv1');
// const crypto=require('crypto');

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         trim:true,

//     },

//     role:{
//         type:Number,
//         default:0,
//         required:true
//     },

//     hashed_password:{
//         type:String,
//         required:true

//     },

//     salt:String,

//     isVerified:{
//         type:Boolean,
//         default:false
//     }
        
// },{timestamps:true})

// // virtual fields
// userSchema.virtual('password')

// .set(function(password){
//     this._password=password
//     this.salt=uuidv1()
//     this.hashed_password=this.encryptPassword(password)
// })


// .get(function(){
//     return this.hashed_password
// })

// // defining methods

// userSchema.methods={
//     encryptPassword:function(password){
//         if(!password) return ''

//         try{
//             return crypto
//             .Hmac('sha1',this.salt)
//             .update(password)
//             .digest('hex')
//         }

//         catch(err){
//             return ''
//         }
//     },
//     authenticate:function(plainText){
//         return this.encryptPassword(plainText)===this.hashed_password
//     }
// }

// module.exports =mongoose.model('User',userSchema)



const mongoose=require('mongoose');
const uuidv1=require('uuidv1');
const crypto=require('crypto');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,

    },

    role:{
        type:Number,
        default:0,
        required:true
    },

    hashed_password:{
        type:String,
        required:true

    },

    salt:String,

    isVerified:{
        type:Boolean,
        default:false
    }
        
},{timestamps:true})

// virtual fields
userSchema.virtual('password')

.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.hashed_password=this.encryptPassword(password)
})


.get(function(){
    return this.hashed_password
})

// defining methods

userSchema.methods={
    encryptPassword:function(password){
        if(!password) return ''

        try{
            return crypto
            .Hmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }

        catch(err){
            return ''
        }
    },
    authenticate:function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    }
}

module.exports =mongoose.model('User',userSchema)


