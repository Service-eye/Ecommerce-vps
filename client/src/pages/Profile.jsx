import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { IMG_URL } from '../config';

const Profile = () => {
    const navigate=useNavigate()
    const {user}=isAuthenticated()
  return (
    <>
<div className="container">
        <div className="row d-flex justify-content-center ">
            <div className="col-md-8">
                <form encType='multipart/form-data' className='shadow p-3'>
                  <div className="mb-2">
                <label htmlFor="image">Upload your image</label>
                <input type="file"  required multiple accept='image/*' className='form-control' />
                        
                </div>
                <h4>Name: {user.name}</h4>
                <p>email: {user.email}</p>
                <div className="mb-2">
                  <label htmlFor="username">Username</label>
                  <input type="text" className='form-control' />
                </div>
                <div className="mb-2">
                  <label htmlFor="contact">Contact</label>
                  <input type="tel" name="contact" id="contact" className='form-control'/>
                </div>
                <div className="mb-2">
                  <button className="btn btn-success">Save</button>
                </div>
                
                </form>
             
            </div>
           
        </div>
  
        </div>

    </>
  )
}

export default Profile

// const Profile = () => {
//     const navigate = useNavigate();
//     const { user } = isAuthenticated();
//     const [selectedFile, setSelectedFile] = useState(null);
  
//     const handleFileInputChange = (event) => {
//       const file = event.target.files[0];
//       setSelectedFile(file);
//     };
  
//     const handleFileUpload = () => {
//       if (selectedFile) {
//         // You can handle the file upload here, e.g., send it to a server using FormData.
//         const formData = new FormData();
//         formData.append('image', selectedFile);
  
//         // Replace with your API endpoint for image upload
//         fetch({IMG_URL}, {
//           method: 'POST',
//           body: formData,
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             // Handle the response from the server, e.g., update the user's profile with the image URL.
//             console.log('Image uploaded successfully:', data);
//             // Redirect or perform other actions as needed
//             navigate('/profile'); // Redirect to the profile page
//           })
//           .catch((error) => {
//             console.error('Error uploading image:', error);
//           });
//       }
//     };
  
//     return (
//       <>
//         <div className="container">
//           <div className="row d-flex justify-items-center">
//             <div className="col-md-8">
//               <form encType="multipart/form-data">
//                 <label htmlFor="image">Upload your image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileInputChange}
//                 />
//                 <button type="button" onClick={handleFileUpload}>
//                   Upload
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };
  
//   export default Profile;
  