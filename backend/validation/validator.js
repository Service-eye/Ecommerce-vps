const {check, validationResult}=require('express-validator')

exports.categoryValidation=[
    check('category_name', 'category is required.').notEmpty()
    .isLength({min:3})
    .withMessage('Category name must be at least of 3 characters.')
]

exports.productValidation=[
    check('product_name', 'product is required.').notEmpty()
    .isLength({min:3})
    .withMessage('Product name must be at least of 3 characters.'),

    check('product_price', 'Price is required.').notEmpty()
    .isNumeric()
    .withMessage('Price must be a numeric value.'),

    check('countInStock', 'Stock is required.').notEmpty()
    .isNumeric()
    .withMessage('Stock must be a numeric value.'),

    check('product_description', 'Product description is required.').notEmpty()
    .isLength({min:20})
    .withMessage('Product Description must be at least 20 characters.'),

    check('category', 'Category is required.')

]

exports.validation=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        next()
    }
    else{
        return res.status(400).json({error:errors.array()[0].msg})
    }
}