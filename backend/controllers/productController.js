const Product=require('../models/productModel')

const mongoose=require('mongoose')
// to post the product.
exports.postProduct=async(req,res)=>{
    let product=new Product({
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        countInStock:req.body.countInStock,
        product_description:req.body.product_description,
        product_image:req.file.path,
        category:req.body.category,
    })
    product =await product.save()
    if(!product){
        return res.status(400).json({error:"Something went wrong."})
    }
    res.send(product)
}

// product list
exports.productList=async(req,res)=>{
    const product=await Product.find()
    .populate('category','category_name') // aghadiko product ko model, category_name chai category model ko.
    if (!product){
        return res.status(400).json({error:"Something went wrong."})
    }
    res.send(product)
}
// product details
exports.productDetails=async(req,res)=>{
    const product=await Product.findById(req.params.id)
    .populate('category','category_name')
    if(!product){
        return res.status(400).json({error:"Something went wrong."})

    }
    res.send(product)
}

// update product:
// exports.updateProduct=async(req,res)=>{
//     const product= await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//             product_name:req.body.product_name,
//             product_price:req.body.product_price,
//             countInstock:req.body.countInstock,
//             product_description:req.body.product_description,
//             product_image:req.file.path,
//             category:req.body.category,
//         },
//         {new:true}
//     )
//     product =await product.save()
//     if(!product){
//         return res.status(400).json({error:"Something went wrong."})
//     }
//     res.send(product)
// }

// exports.updateProduct = async (req, res) => {
//     try {
//       const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           product_name: req.body.product_name,
//           product_price: req.body.product_price,
//           countInStock: req.body.countInStock, // Corrected property name
//           product_description: req.body.product_description,
//           product_image: req.file.path,
//           category: req.body.category,
//         },
//         { new: true }
//       );
  
//       if (!product) {
//         return res.status(400).json({ error: "Something went wrong." });
//       }
  
//       res.json(product);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error." });
//     }
//   };

const { validationResult } = require('express-validator');
exports.updateProduct = async (req, res) => {
  try {
    // Validate the request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productId = req.params.id;
    
    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID." });
    }

    // Define the update object based on valid request data
    const update = {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      countInStock: req.body.countInStock,
      product_description: req.body.product_description,
      category: req.body.category,
    };

    // If a file is uploaded, update the product_image path
    if (req.file) {
      update.product_image = req.file.path;
    }

    // Update the product by ID and get the updated product
    const updatedProduct = await Product.findByIdAndUpdate(productId, update, {
      new: true,
    });

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Respond with the updated product
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};


exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then((product) => {
        if (!product) {
          return res
            .status(400)
            .json({ error: "Product with that id no found." });
        } else {
          return res.status(200).json({ message: "Product deleted." });
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  };
  