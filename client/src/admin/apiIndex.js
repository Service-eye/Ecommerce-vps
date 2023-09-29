import { API_URL } from "../config";

// to add the category:
export const addcategory=(token,category)=>{
    return fetch(`${API_URL}/postcategory`,{
        method:"POST",
        headers:{
            accept:"application/json",
            "content-type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}