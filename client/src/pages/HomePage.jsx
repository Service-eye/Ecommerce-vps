import React, {useState, useEffect} from 'react'
import { API_URL } from '../config'
import CardContainer from '../components/CardContainer'
import axios from 'axios'

const HomePage = () => {
  console.log(import.meta.env.VITE_APP_NAME)
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

    <CardContainer/>

    </>
  )
}

export default HomePage