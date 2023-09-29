import React from 'react'
import { isAuthenticated } from '../auth'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../config'


const ConfirmOrder = () => {
    const navigate = useNavigate()
    const cartItems = JSON.parse(localStorage.getItem('cart')) // db baata pani lyauna milxa
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const { user } = isAuthenticated()
    const totalPrice = cartItems.reduce((ac, item) => (ac + item.quantity * item.price), 0)

    const processToPayment=()=>{
        const data={
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    return (
        <>

            <div className="container my-5 ">
                <div className="row d-flex justify-content-evenly mb-3">
                    <div className="col-md-8 shadow p-3">
                        <h2 className="text-center">
                            Shipping Info
                        </h2>
                        <div className="col-6 offset-md-3">
                            <div>
                                {/* name */}
                                <b>Name</b>:
                                <span className='text-muted'>
                                    {user.name}
                                </span>
                            </div>
                            {/* email */}
                            <div>
                                <b>Email</b>:
                                <span className='text-muted'>
                                    {user.email}
                                </span>
                            </div>
                            {/*  address */}
                            <div>

                                <b>Shipping Address</b>:
                                <span className="text-muted">
                                    {shippingInfo.shippingAddress1}, {shippingInfo.shippingAddress2}
                                </span>
                            </div>
                            {/* city */}
                            <div>
                                <b>City</b>:
                                <span className='text-muted'>
                                    {shippingInfo.city}
                                </span>
                            </div>
                            <div>
                                <b>Phone Number</b>:
                                <span className='text-muted'>
                                    {shippingInfo.phone}
                                </span>
                            </div>
                            <div>
                                <b>Country</b>:
                                <span className='text-muted'>
                                    {shippingInfo.country}
                                </span>
                            </div>
                            {/* Zip */}
                            <div>
                                <b>Zip Code</b>:
                                <span className='text-muted'>
                                    {shippingInfo.zip}
                                </span>
                            </div>


                        </div>
                        <hr />
                        <h2 className='text-center'>
                            Your Cart Items
                        </h2>
                        {cartItems && cartItems.map((item, i) => (
                            < >
                                <hr />
                                <div className='row  d-flex align-items-center'>
                                    <div className="col-3">
                                        <img src={`${IMG_URL}/${item.image}`} alt={item.name} width={80} />

                                    </div>
                                    <div className="col-3">
                                        <p className='text-muted'>
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className="col-2">
                                        <p className="text-primary">
                                            Rs. {item.price} X {item.quantity}= <b>Rs. {item.quantity * item.price}</b>
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}

                    </div>

                    <div className="col-md-3">
                        <h4 className='text-center'>Order Summary</h4>
                        <hr />
                        <p>SubTotal: 
                            <span>
                                {cartItems && cartItems.reduce((ac, item) => (ac + Number(item.quantity)), 0)} (Units)
                            </span>
                        </p>
                        <b>TotalPrice: <span>{totalPrice}</span></b>
                        <hr />
                        <button className="btn btn-success mx-4 my-1" onClick={processToPayment}>
                            Proceed to Payment
                        </button>
                    </div>

                </div>

            </div>



        </>
    )
}

export default ConfirmOrder