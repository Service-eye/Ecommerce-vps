import React from 'react'
import { NavLink, Link , useNavigate} from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import {isAuthenticated, signout} from '../auth'
const Header = () => {
  const navigate=useNavigate() // kaha pathaune vanne kura redirect garne.

  return (
    <>

    <Helmet>
      <title>Ecommerce</title>
    </Helmet>

<header className="p-3 " style={{backgroundColor:"#FFAA33"}}>
  
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><NavLink to="/" className="nav-link px-2 text-secondary">Home</NavLink></li>
          <li><NavLink to="products" className="nav-link px-2 text-dark">Products</NavLink></li>
          <li><NavLink to="blogs" className="nav-link px-2 text-dark">Blogs</NavLink></li>
          <li><NavLink to="#" className="nav-link px-2 text-dark">FAQs</NavLink></li>
          <li><NavLink to="#" className="nav-link px-2 text-dark">About</NavLink></li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" className="form-control form-control-dark text-bg-dark-subtle" placeholder="Search..." aria-label="Search" />
        </form>
        <Link to='/cart' className="me-2 fs-1 mb-2 text-decoration-none text-dark">
          <FaCartPlus/>
        </Link>

        <div className="text-end">
          {
            !isAuthenticated () && 
            <>
               <NavLink to="/signin" type="button" className="btn btn-dark me-2">Login</NavLink>
        <NavLink to="/register" type="button" className="btn btn-dark me-2">Register</NavLink>
            </>
          }
          {isAuthenticated() && isAuthenticated().user.role===1 && 
           <NavLink to="/admin/dashboard" type="button" className="btn btn-dark me-2">Admin</NavLink>}
          {isAuthenticated() && isAuthenticated().user.role===0 && 
           <NavLink to="/profile" type="button" className="btn btn-dark me-2">Profile</NavLink>}
           {isAuthenticated() && 
           <button className="btn btn-danger mx-2 my-1" onClick={()=>signout(()=>{
            navigate('/signin')
           })}>Logout</button>
}
    
        </div>
{/* 
        <div className="flex-shrink-0 dropdown ">
          <Link to="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="profile" width={32}  height={32} className="rounded-circle" />
          </Link>
          <ul className="dropdown-menu text-small shadow">
            <li><NavLink className="dropdown-item" to="#">New project...</NavLink></li>
            <li><NavLink className="dropdown-item" to="#">Settings</NavLink></li>
            <li><NavLink className="dropdown-item" to="#">Profile</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to="#">Sign out</NavLink></li>
          </ul>
        </div> */}
      </div>
  
  </header>


    </>
  )
}

export default Header