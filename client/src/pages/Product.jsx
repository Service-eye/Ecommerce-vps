import React, { useState, useEffect } from 'react'
import { API_URL } from '../config'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/productlist`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="container-fluid">
        <div className="row d-flex justify-content-evenly">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-8">
            <div className="container-fluid m-3">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products && products.map((item, i) => (
                  <Card key={i} data={item} />
                ))}
              </div>
              {/* load-more  */}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Products