import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'
import { isAuthenticated } from '../auth'
const UpdateProduct = () => {
    const params=useParams()
    const id=params.productId
    const [categories, setCategory] = useState([]);
    const [initialValues, setInitialValues]=useState({})
    const{token} =isAuthenticated()

    const [product_name, setProductName]=useState('')
    const [product_price, setProductPrice]=useState('')
    const [countInStock, setCountInStock]=useState('')
    const [product_description, setProductDescription]=useState('')
    const [product_image, setProductImage]=useState(null)
    const [categoryId, setCategoryId]=useState('')

    const [success, setSuccess]=useState(false)
    const [error, setError]=useState('')

   
    useEffect(() => {
        axios
            .get(`${API_URL}/categorylist`)
            .then((res) => {
                setCategory(res.data)
            })
            .catch((err) => console.log(err));
            axios.get(`${API_URL}/productdetails/${id}`)
            .then(res=>{
                setInitialValues(res.data)
                setProductName(res.data.product_name) // product_name from database.
                setProductPrice(res.data.product_price)
                setCountInStock(res.data.countInStock)
                setProductDescription(res.data.product_description)
                setCategoryId(res.data.category._id)

            })
            .catch((err) => console.log(err));
    }, []);


    const handleSubmit= async event=>{
        event.preventDefault()
       // backend maa hit:
       const formData=new FormData();
       formData.append('product_name', product_name)
       formData.append('product_price', product_price)
       formData.append('countInStock', countInStock)
       formData.append('product_description', product_description)
       formData.append('product_image', product_image)
       formData.append('category', categoryId)
   
    try{
        const response=await axios.put(
            `${API_URL}/updateproduct/${id}`,
        formData,
        {
            headers:{
                'content-type':'multipart/form-data',
                authorization:`Bearer ${token}`
            }
        })
        setSuccess(true)
        setError('')
    }
    catch(err){
        setError(err.response.data.error)
        setSuccess('')
    }

    // catch (error) {
    //     if (error.response) {
    //       // Server responded with an error status code (e.g., 4xx, 5xx).
    //       console.error('Server error:', error.response.data);
    //       setError(error.response.data.error); // Set the specific error message from the server.
    //     } else if (error.request) {
    //       // The request was made but no response was received (CORS error).
    //       console.error('CORS error:', error.request);
    //       setError('Cross-Origin Request Blocked: Unable to connect to the server.');
    //     } else {
    //       // Something else happened while setting up the request.
    //       console.error('Request error:', error.message);
    //       setError('An unexpected error occurred.');
    //     }
    //     setSuccess(false);
    //   }
}


    // to show error message:
    const showError = () => (
        error && <div className='alert alert-danger'>{error}</div>
    )
    // to show success message:
    const showSuccess = () => (
        success && <div className='alert alert-success'>
            Product Updated.
        </div>
    )
    return (
        <>

            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <form className="shadow p-3">
                            <h3 className="text-center text-muted ">Add Product</h3>
                            {showError()}
                            {showSuccess()}
                            <div className="mb-2">
                                <label htmlFor="pname">Product Name</label>
                                <input type="text"
                                    name="pname"
                                    id="pname"
                                    className="form-control"
                                    onChange={(e)=>setProductName(e.target.value)}
                                    value={product_name} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="price">Product Price</label>
                                <input type="number"
                                    name="price"
                                    id="price"
                                    className="form-control"
                                    onChange={(e)=>setProductPrice(e.target.value)}
                                    value={product_price} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="qty">Stock Quantity</label>
                                <input type="number"
                                    name="qty"
                                    id="qty"
                                    className="form-control"
                                    onChange={(e)=>setCountInStock(e.target.value)}
                                    value={countInStock} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor='desc' >Product Description</label>
                                <textarea name="desc" id="desc" cols="30" rows="10" className='form-control' onChange={(e)=>setProductDescription(e.target.value)} value={product_description}>

                                </textarea>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="image">Image</label>
                                <input type="file"
                                    name="image"
                                    id="image"
                                    className="form-control"
                                    accept='image/*'
                                    onChange={(e)=>setProductImage(e.target.files[0])}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="category">Category</label>
                                <select className='form-control' onChange={(e)=>setCategoryId(e.target.value)}>
                                   <option value={categoryId}> 
                                            { initialValues.category && initialValues.category.category_name}
                                   </option>
                                        {categories && categories.map((c,i)=>(
                                            <option value={c._id} key={i}>{c.category_name}</option>
                                        ))}
                                    
                                </select>
                            </div>

                            <div className="mb-2">
                                <button className="btn btn-primary px-4 py-2"
                                    onClick={handleSubmit}>
                                    Update Product
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UpdateProduct