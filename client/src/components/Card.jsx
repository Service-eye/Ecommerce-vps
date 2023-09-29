import React from 'react'
import { Link } from 'react-router-dom'
import { IMG_URL } from '../config'

const Card = (props) => {
  const{_id,product_name,product_price, product_image}=props.data // data baata pass gareko.

  return (
    <>

      <div className="col">
        <div className="card">
          <img src={`${IMG_URL}/${product_image}`} className="card-img-top" alt={product_name} height={200} />
          <div className="card-body">
            <h5 className="card-title">{product_name}</h5>
            <h5>Rs. {product_price}</h5>
            <Link to={`/productdetails/${_id}`} className='btn btn-warning btn-outline-dark px-2 py-1'>View Details</Link>
          {/* url(productdetails) and params(_id) */}

          </div>
        </div>
      </div>

    </>
  )
}

export default Card