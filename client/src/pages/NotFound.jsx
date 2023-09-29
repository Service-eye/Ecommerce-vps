import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
        <Helmet>
            <title>404 Not Found</title>
        </Helmet>
<div className="container my-5">
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 shadow p-4">
            <h1 className='text-center text-muted'>404 Page Not Found.</h1>
            <Link to ='/' className='btn btn-warning ms-5'>
                Go to HomePage
            </Link>
            </div>
        </div>

</div>

        </>
    )
}

export default NotFound