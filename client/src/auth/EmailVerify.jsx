import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../config'


const EmailVerify = () => {
    const params = useParams()
    const [values, setValues] =useState({
        error:'',
        success:false
    })
    const {error, success}=values

    // verify email
    const token=params.token
    useEffect(()=>{
        fetch(`${API_URL}/confirmation/${token}`,{
            method:'PUT',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            }
        })
        .then(res=>res.json())
        .then (data=> {
            if(data.error){
                setValues({...values, error:data.error})
            }
            else{
                setValues({...values, success:true})
            }
        })
        .catch(err=>console.log(err))
    },[token])

    
  // to show error message:
  const showError=()=>(
    error && <div className='alert alert-danger'>{error}</div>
  )
  // to show success message:
  const showSuccess=()=>(
    success && <div className='alert alert-success'>
        Congratulations, your account has been verified.
    </div>
  )
  return (
    <>

    {showError()}
    {showSuccess()}
    

    </>
  )
}

export default EmailVerify