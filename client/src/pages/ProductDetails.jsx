import React, {useState, useEffect} from 'react'
import { json, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL, IMG_URL } from '../config'

// copied from react-toastify:
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const ProductDetails = () => {
  const [product,setProduct]=useState({}) // eauta value chai object maa aauxa.
  const params=useParams()
  const id=params.productId // route bata aako productId

  useEffect(()=>{
      axios.get(`${API_URL}/productdetails/${id}`)
      .then(res=>{
        setProduct(res.data)
      })

      .catch(err=>console.log(err))
  }, [id])


  const addToCart=()=>{
      // fetch item from the localstorage if item exists otherwise assign empty aray.
      const cartItems=JSON.parse(localStorage.getItem('cart')) || []

      // set object for product data:
      const productData={
        id:product._id,
        name:product.product_name,
        image:product.product_image,
        price:product.product_price,
        stock:product.countInStock,
        quantity:1 // surumaa add garda 1 hunuparyo.
      }

      // check if item is already exists in the cart:
      const existingItem=cartItems.find(item=>item.id===product._id)
      if (existingItem){
        toast.error('Product already exist in the cart.')
      }
      else{
        cartItems.push(productData)
        localStorage.setItem('cart',JSON.stringify(cartItems))
        toast.success(`${productData.name} is added to the cart.`)
      }


  }

  return (
    <>
    <Helmet>
      <title>{product.product_name}</title>
    </Helmet>
<ToastContainer theme='colored' position='top-center'autoClose={1000} />
        <div className="container my-3 shadow p-3">
            <div className="row d-flex justify-content-around align-items-center">
              <div className="col-md-3">
                <img src={`${IMG_URL}/${product.product_image}`} alt={product.product_name}  width={'300'}/>
              </div>
              <div className="col-md-8">
                <h1>{product.product_name}</h1>
                <h1>Rs. {product.product_price}</h1>
                <p><strong>Category: {product.category && product.category.category_name}</strong></p>
                <p><strong>Available stock: {product.countInStock}</strong></p>
                <p>{product.product_description}</p>
                <div className="my-3">
                  <button className='btn btn-warning btn-outline-dark mx-2 my-1 ' onClick={addToCart}> 
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
        </div>

    </>
  )
}

export default ProductDetails