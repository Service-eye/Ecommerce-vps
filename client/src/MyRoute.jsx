import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import EmailVerify from './auth/EmailVerify'
import AdminSidebar from './admin/AdminSidebar'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './admin/Dashboard'
import NotFound from './pages/NotFound'
import AddCategory from './admin/AddCategory'
import Profile from './pages/Profile'
import Category from './admin/Category'
import AddProduct from './admin/AddProduct'
import Products from './admin/Products'
import UpdateProduct from './admin/UpdateProduct'
import Shipping from './pages/Shipping'
import ConfirmOrder from './pages/ConfirmOrder'
// import { PaymentElement } from '@stripe/react-stripe-js'
import PaymentElements from './pages/PaymentElements'
const MyRoute = () => {
  return (
    <>

<Router>
    <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='products' element={<Product/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='signin' element={<SignIn/>}/>
            <Route path='productdetails/:productId' element={<ProductDetails/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='email/confirmation/:token' element={<EmailVerify/>}/>
            <Route path='shipping' element={<Shipping/>}/>
            <Route path='confirm' element={<ConfirmOrder/>}/>
            <Route path='payment' element={<PaymentElements/>}/>
        </Route>
        {/* admin route */}
       <Route path='/admin/' element={<AdminRoute/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='addcategory' element={<AddCategory/>}/>
        <Route path='category' element={<Category/>}/>
        <Route path='addproduct' element={<AddProduct/>}/>
       <Route path='products' element={<Products/>}/>
     <Route path='updateproduct/:productId' element={<UpdateProduct/>}/>
       </Route>

       <Route path='/profile' element={<Profile/>}/>

       <Route path='/*' element={<NotFound/>}/>
       
        
    </Routes>
</Router>

    </>
  )
}

export default MyRoute