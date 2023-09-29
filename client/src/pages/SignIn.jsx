import React,{useState, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { signin, authenticate, isAuthenticated } from '../auth'

const SignIn = () => {
  const navigate=useNavigate()
  // const {user}=isAuthenticated()

  const [values,setValues]=useState({
    
    email:'',
    password:'',
    error:'',
    redirectTo:false
 
  })
  const {email, password, error, redirectTo}=values

    // handling the input data:
    const handleChange=name=>event=>{
      setValues({
        ...values ,
        error:false,
        [name]:event.target.value
      })
    }
    const handleSubmit=e=>{
      e.preventDefault()
      setValues({...values})
      // call the signin function:
      signin({email,password})
      .then(data=>{
        if(data.error){
          setValues({...values,error:data.error})
        }
        else{
          authenticate(data,()=>{
            setValues({...values,redirectTo:true})
          })
        }
      })
    }

    // redirect by user role:
    // const redirectUser=()=>{
    //   const redirect='/profile'
    //   const searchParams=new URLSearchParams(window.location.search)
    //   const redirectParam=searchParams.get('redirect')
    //   if (redirectTo){
    //     if (user && user.role===1){
    //       return navigate('/admin/dashboard')
    //     }
    //     else if (redirectParam ==='shipping'){
    //            navigate('/shipping')
    //     }
    //     else{
    //        navigate(redirect)
    //     }
    //   }
     
    // }


      // Redirect by user role:
  const redirectUser = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectParam = searchParams.get('redirect');
    const { user } = isAuthenticated();

    if (redirectTo) {
      if (user && user.role === 1) {
        return '/admin/dashboard'; // Return the path string for admin dashboard
      } else if (redirectParam === 'shipping') {
        return '/shipping';
      } else {
        return '/profile';
      }
    }
    return null; // Return null if no redirection is needed
  };

     // to show error message:
  const showError=()=>(
    error && <div className='alert alert-danger'>{error}</div>
  )


  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    
    <div className="container my-5">
  <div className="row d-flex justify-content-center">
  <div className="col-md-5 shadow p-3">
  <form >
    <h1 className="mb-2 text-center">Please Login</h1>
    {showError()}
    {/* {redirectUser()} */}
    {redirectTo && <>{window.location.href = redirectUser()}</>}

    <div className="form-floating mb-2">
      <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={handleChange('email')} value={email} />
      <label htmlFor="email">Email address</label>
    </div>
    <div className="form-floating mb-2">
      <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange('password')} value={password} />
      <label htmlFor="password">Password</label>
    </div>

    <div className="form-check text-start mb-3">
      <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Remember me
      </label>
    </div>
 
    <button className="btn btn-warning w-25 py-2" type="submit" onClick={handleSubmit}>Login</button>
    {/* <p className="mt-5 mb-2 text-body-secondary">&copy; 2023 <span className='font-italic'>SuwasGhale&#10084;</span></p> */}
  </form>

</div>
</div>
</div>
    </>
  )
}

export default SignIn