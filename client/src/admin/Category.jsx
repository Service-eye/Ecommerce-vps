import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { API_URL } from "../config";
import { isAuthenticated } from "../auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const {token}=isAuthenticated()
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/categorylist`)
      .then((res) => {
        setCategory(res.data)
      })
      .catch((err) => console.log(err));
  },[]);

  // delete category:
  const deleteCategory=(id)=>{
    const confirmed=window.confirm('Are you sure want to delete this category?')
    if (confirmed){
      axios.delete(`${API_URL}/deletecategory/${id}`,{
        headers:{
          authorization:`Bearer ${token}`

        }
      })
      .then(res=>{
        toast.success('Category deleted successfully.')
        setCategory(category.filter((c)=>c._id!==id))
      })
      .catch(err=>{
        toast.error('Failed to delete.')
        toast.error(err.res.data.error)
      }
        )
    }
  }

  return (
    <>
    <ToastContainer theme="colored" position="top-center" autoClose="1200"/>

      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 shadow">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {category &&
                  category.map((c, i) => (
                    <tr key={i}>
                      <td>{c.category_name}</td>
                      <td>
                        <button className="btn btn-danger" 
                        onClick={()=>deleteCategory(c._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
