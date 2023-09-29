// const multer=require('multer')
// const fs=require('fs')
// const path=require('path')

// const storage=multer.diskStorage({
//     destination:(req,res,cb)=>{
//         let fileDestination='public/uploads'
//         // check if directory exist.
//         if (!fs.existsSync(fileDestination)){
//             fs.mkdirSync(fileDestination,{recursive:true}) 
//             cb(null,fileDestination)
//         }
//         else{
//             cb(null,fileDestination)
//         }
//     },
//     filename:(req,file,cb)=>{
//         let filename=path.basename(file.originalname,path.extname(file.originalname))
//         // path.basename('images/foo/abc.jpg',.jpg)
//         // abc
//         let ext=path.extname(file.originalname)
//         // .jpg, .png, .svg
//         cb(null, filename +'_' + Date.now()+ext)
//     }
// })

// let imageFilter=(req,file,cb)=>{
//     if(!file.originalname.match(/\.(jpg|png|jpeg|svg|jfif|gif|JPG|PNG|SVG|JFIF|GIF)$/)){
//         return cb(new Error('You can upload image file only.'),false)
//     }
//     else{
//         cb(null, true)
//     }
// }

// const upload=multer({
//     storage:storage,
//     fileFilter:imageFilter,
//     limits:{
//         fileSize:3000000 //3mb
//     }
// })

// module.exports=upload

const multer=require('multer')
const fs=require('fs')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        let fileDestination='public/uploads/'
        //check if directory exist 
        if(!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination,{recursive:true})
            cb(null,fileDestination)
        }
        else{
            cb(null,fileDestination)
        }
    },
    filename:(req,file,cb)=>{
        let filename=path.basename(file.originalname,path.extname(file.originalname))
        //path.basename('images/foo/abc.jpg',.jpg)
        //abc 
        let ext=path.extname(file.originalname)
        //.jpg 
        cb(null,filename+'_'+Date.now()+ext)
    }

})

// let imageFilter=(req,file,cb)=>{
//     if(!file.originalname.match(/\.(jpg|png|jpeg|svg|jfif|gif|JPG|PNG|JPEG|SVG|JFIF|GIF)$/)){
//         return cb(new Error('You can upload image file only'),false)
//     }
//     else{
//         cb(null,true)
//     }
// }

const imageFilter = (req, file, cb) => {
    const allowedExtensions = /\.(jpg|png|jpeg|svg|jfif|gif)$/i; // List of allowed extensions
    const isValidExtension = allowedExtensions.test(file.originalname);
    
    if (isValidExtension) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Allowed extensions: jpg, png, jpeg, svg, jfif, gif'), false); // Reject the file
    }
  };
  
  module.exports = imageFilter;
  

const upload=multer({
    storage:storage,
    fileFilter:imageFilter,
    limits:{
        fileSize:3000000 //3mb
    }
})

module.exports=upload 