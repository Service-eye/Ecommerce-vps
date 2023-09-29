import { API_URL } from "../config";

// signup function
export const signup=user=>{
    return fetch(`${API_URL}/register`,{
        method:'POST',
        headers:{
            accept:'application/json' ,
            'content-type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

// signin function
export const signin=user=>{
    return fetch(`${API_URL}/signin`,{
        method:'POST',
        headers:{
            accept:'application/json' ,
            'content-type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

// authenticate and store token in the local storage:
export const authenticate=(data,next)=>{
    if (typeof window !== undefined){
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

// redirect user by role:
export const isAuthenticated=()=>{
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}
// signout
export const signout=next=>{
    if(typeof window!== 'undefined'){
        localStorage.removeItem('jwt')  // localstorage bata item hatayeko ani matrai next function maa gayera backend maa hit gareko.
        next()
        return fetch(`${API_URL}/signout`,{
            method:'POST'
        })
        .then(res=>{
            console.log('signout',res)
        })
        .catch(err=>console.log(err))
    }
}