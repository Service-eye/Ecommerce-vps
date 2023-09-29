import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import {API_URL} from '../config'
import Card from './Card'

const CardContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchProduct=async()=>{
      try{
        const response=await axios.get(`${API_URL}/productlist`)
        setProducts(response.data)
        setLoading(false)
      }
      catch (err){
            console.log(err)
      }
    }
    // simulate 2 seconds delay before fetching product
    const delay=setTimeout(()=>{
        fetchProduct()
        clearTimeout(delay)
    },2000)
  },[])

  return (
    <>
    {
      loading? (
        <div className="d-flex justify-content-center align-items-center" style={{height:'50vh'}}>
            <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
        </div>
      )
      :
      (
          
      <div className='container-fluid my-5'>
      <div className="row row-cols-1 row-cols-md-4 g-4">
          {
            products &&
            products.slice(0,8).map((item,i)=>(
              <Card key={i} data={item} />
            ))
          }
      </div>
    </div>

      )

    }

    </>
  )
}

export default CardContainer