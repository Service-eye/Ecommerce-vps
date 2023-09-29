import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { API_URL, IMG_URL } from "../config";
import { isAuthenticated } from "../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const Product = () => {
  const { token } = isAuthenticated();
  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/productlist`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // delete category:
  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this product?"
    );
    if (confirmed) {
      axios
        .delete(`${API_URL}/deleteproduct/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Product deleted successfully.");
          setProduct(products.filter((p) => p._id !== id));
        })
        .catch((err) => {
          toast.error("Failed to delete.");
          toast.error(err.res.data.error);
        });
    }
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" autoClose="1200" />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 shadow">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Price</th>
                  <th scope="col">Stock Quantity</th>
                  <th scope="col">Product Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {products &&
                  products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.product_name}</td>
                      <td>{p.product_price}</td>
                      <td>{p.countInStock}</td>
                      <td>{p.product_description}</td>
                      <td>
                        <img
                          src={`${IMG_URL}/${p.product_image}`}
                          alt={p.product_name}
                          height={80}
                        />
                      </td>
                      <td>{p.category.category_name}</td>
                      <td>
                        <Link to={`/admin/updateproduct/${p._id}`} className="btn btn-success">
                          <FaEdit />
                        </Link>
                        <br />
                        <br />
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(p._id)}
                        >
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

export default Product;
