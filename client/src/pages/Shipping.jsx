import React, {useState} from 'react'
import { countries } from 'countries-list'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
  const navigate=useNavigate()
  const countriesList=Object.values(countries)
  const shippingInfo=JSON.parse(localStorage.getItem('shippingInfo')) || {}

  const [shippingAddress1, setShippingAddress1]=useState(shippingInfo.shippingAddress1 || '')
  const [shippingAddress2, setShippingAddress2]=useState(shippingInfo.shippingAddress2 || '')
  const [city, setCity] =useState(shippingInfo.city || '')
  const [zip, setZip] =useState(shippingInfo.zip || '')
  const [country, setCountry] =useState(shippingInfo.country || '')
  const [phone, setPhone] =useState(shippingInfo.phone || '')


  // save the shipping infos:
  const submitHandler=(e)=>{
    e.preventDefault()
    const shippingInfos={
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone
    }
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfos))
    navigate('/confirm')
  }

  return (
    <>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 shadow p-3 my-5">
            <form >
              <h2 className='mb-3 text-muted'>Shipping Information</h2>
              <div className='mb-2 '>
                <label htmlFor="address1">ShippingAddress1</label>
                <input type="text" name="address1" id="address1" className="form-control" onChange={(e)=>setShippingAddress1(e.target.value)} value={shippingAddress1} />
              </div>
              <div className='mb-2 '>
                <label htmlFor="address2">ShippingAddress2</label>
                <input type="text" name="address2" id="address2" className="form-control" onChange={(e)=>setShippingAddress2(e.target.value)} value={shippingAddress2} />
              </div>
              <div className='mb-2 '>
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" className="form-control" onChange={(e)=>setCity(e.target.value)} value={city} />
              </div>
              <div className='mb-2 '>
                <label htmlFor="zip">Zip</label>
                <input type="number" name="zip" id="zip" className="form-control" onChange={(e)=>setZip(e.target.value)} value={zip} />
              </div>
              <div className='mb-2 '>
                <label htmlFor="phone">Phone</label>
                <input type="number" name="phone" id="phone" className="form-control" onChange={(e)=>setPhone(e.target.value)} value={phone} />
              </div>
              <div className="mb-2">
                <label htmlFor="country">Country</label>
                <select name="country" id="country" className='form-control' onChange={(e)=>setCountry(e.target.value)}>
                  {/* pahilai set vaisakeko xa vane. */}
                    <option value={country}>{country}</option> 
                    {
                      countriesList.map((c,index)=>(
                        <option value={c.name} key={index}>{c.name}</option>
                      ))
                    }
                </select>
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={submitHandler}>Continue</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  )
}

export default Shipping