import React, {useState, useEffect, Fragment} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  IMG_URL } from '../config'
import { Helmet } from 'react-helmet';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const navigate=useNavigate()
    const [products, setProducts]=useState([])
    useEffect(()=>{
        const cartData=JSON.parse(localStorage.getItem('cart'))
        if (cartData && cartData.length>0){
            setProducts(cartData)
        }
        else{
            setProducts([])
        }
    },[])

    // increase quantity:
    const increaseQty=id=>{
        const updateProducts=products.map(item=>{
            if(item.id === id && item.quantity<item.stock){
                return {...item, quantity:item.quantity+1}
            }
            return item  
        })
        setProducts(updateProducts)
        localStorage.setItem('cart', JSON.stringify(updateProducts))
    }
    // decrease quantity
    const decreaseQty=(id)=>{
        const updateProducts=products.map(item=>{
            if(item.id === id && item.quantity>1){
                return {...item, quantity:item.quantity-1}
            }
            return item  
        })
        setProducts(updateProducts)
        localStorage.setItem('cart', JSON.stringify(updateProducts))
    }

    // remove from the cart:
    const removeCartHandler=(id)=>{
        const confirmed=window.confirm(`Are you sure want to delete ${products.name} from the cart?`)
        if (confirmed){
            const filterCart=products.filter(item=>item.id!==id)
            localStorage.setItem('cart', JSON.stringify(filterCart))
            setProducts(filterCart)
            toast.success('Item is removed from the cart.')
        }
    }

     // removeCartHandler:
    // const removeCartHandler=(id,name)=>{
    //     const cartItems=JSON.parse(localStorage.getItem('cart'))
    //     const filterCart=cartItems.filter(item=>item.id!==id)
    //     localStorage.setItem('cart', JSON.stringify(filterCart))
    //     setProducts(filterCart)
    //     toast.success('Item is removed from the cart.')
    // }

    // shipping handler:
    const shippingHandler=()=>{
        navigate('/signin?redirect=shipping')

    }

  return (
    <>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <ToastContainer theme='colored' position='top-center' autoClose='1000'/>

            <div className="container">
                <div className="row d-flex justify-content-between my-5">
                    {
                        products && products.length===0? 
                        <h2 className='text-center text-danger mt-3'>Your cart is empty.</h2>
                        :
                        (
                            <>
                            <h2 className="text-center">
                                Your cart Items
                            </h2>
                            {/* cart details side */}
                            <div className="col-md-8 shadow-lg">
                                {
                                    products && products.map((item,i)=>(
                                        <Fragment key={i}>
                                            <div className="d-flex align-items-center p-3">
                                                {/* for image */}
                                                <div className="col-3">
                                                    <img src={`${IMG_URL}/${item.image}`} alt={item.name}  width={80}/> 
                                                    {/* image ra name product data bata/local storage bata liyeko. backend bata haina */}
                                                </div>
                                                {/* for name */}
                                                <div className="col-3">
                                                    <strong>{item.name}</strong>
                                                </div>
                                                <div className="col-2">
                                                    <span className='text-info'>{item.price}</span>
                                                </div>
                                                <div className="col-3">
                                                    <div className="d-flex align-items-center">
                                                        <button className="btn btn-danger" onClick={()=>decreaseQty(item.id)}>-</button>
                                                        &nbsp;
                                                        <span>{item.quantity}</span>
                                                        &nbsp;
                                                        <button className="btn btn-success" onClick={()=>increaseQty(item.id)}>+</button>
                                                    </div>
                                                </div>
                                                <div className="col-1">
                                                    <button className="btn btn-danger" onClick={()=>removeCartHandler(item.id, item.name)}><FaTrash/></button>

                                                </div>
                                            </div>
                                        </Fragment>
                                    ))
                                }
                            </div>

                            {/* summary */}
                            <div className="col-md-3">
                                    <div className="shadow p-3">
                                        <h5>Cart Summary</h5>
                                        <hr />
                                        <p><strong>Units: </strong>{products.reduce((ac,item)=>(ac+ Number(item.quantity)),0)}</p>
                                        <p><strong>Total: </strong> Rs. {products.reduce((ac,item)=>(ac+(item.quantity * item.price)),0)}</p>
                                        <hr />
                                        <button className="btn btn-success" onClick={shippingHandler}>Checkout</button>
                                    </div>
                            </div>
                            </>
                        )
                    }
                </div>
            </div>

    </>
  )
}

export default Cart