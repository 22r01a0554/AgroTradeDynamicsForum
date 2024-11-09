import React, { useState,useContext,useEffect } from "react";
import sellerContext from "../context/sellers/sellerContext";
import AgriProductSellers from "./AgriProductSellers"
import styles from './AddPost.module.css'
const AddAgriProductSellers = (props) => {
    console.log('AddSellers component rendered');
    const context=useContext(sellerContext);
    console.log('Context:', context);
    const {addAgriProductSeller}=context;
    const [categories, setCategories] = useState([]);
    const [seller, setSeller] = useState({category:"",name:"",email:"",mobilenumber:"",address:"",farmname:"",farmlocation:"",farmingmethods:"",typeoffarm:"",socialmedialinks:"",desc:"",image:null})
    const [error, setError] = useState("");
    useEffect(() => {
        fetch('http://localhost:5000/api/seller/sellerscategories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);
    const resizeImage = (file, width, height) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
              const img = new Image();
              img.src = event.target.result;
              img.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0, width, height);
                  canvas.toBlob((blob) => {
                      resolve(blob);
                  }, file.type);
              };
              img.onerror = () => {
                  reject(new Error('Image load error'));
              };
          };
          reader.onerror = () => {
              reject(new Error('File read error'));
          };
      });
  };
  const handleChange = async (e) => {
    if (e.target.name === "image") {
        const file = e.target.files[0];
        // Desired dimensions
        const desiredWidth = 800;
        const desiredHeight = 800;
        try {
            const resizedImage = await resizeImage(file, desiredWidth, desiredHeight);
            setSeller({ ...seller, image: resizedImage });
            setError(""); // Clear any previous error messages
        } catch (error) {
            console.error('Error resizing image:', error);
            setError('Error resizing image.');
        }
    } else {
      setSeller({...seller,[e.target.name]:e.target.value});
    }
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!seller.image) {
      setError("Please upload a valid image.");
      return;
  }
  const formData = new FormData();
  formData.append("category", seller.category);
  formData.append("name", seller.name);
  formData.append("email", seller.email);
  formData.append("mobilenumber", seller.mobilenumber);
  formData.append("address", seller.address);
  formData.append("file", seller.image);
  formData.append("farmname",seller.farmname);
  formData.append("farmlocation",seller.farmlocation);
  formData.append("typeoffarm",seller.typeoffarm);
  formData.append("farmingmethods",seller.farmingmethods);
  formData.append("socialmedialinks",seller.socialmedialinks);
  formData.append("desc",seller.desc);
  addAgriProductSeller(formData);
      setSeller({category:"",name:"",email:"",mobilenumber:"",address:"",farmname:"",farmlocation:"",farmingmethods:"",typeoffarm:"",socialmedialinks:"",desc:"",image:null})
  };
  console.log('AddSellers component rendered');
  return (

    <>
        <div className={`${styles.container} my-3`}>
            <h1>Add a Seller</h1>
            <form onSubmit={handleSubmit} className={`${styles.container} my-3`}>
                <div className="mb-3">
                    <label htmlFor="category" className={`${styles["form-label"]}`}>Category</label>
                    <select className={`${styles["form-control"]}`} name="category" id="category" value={seller.category} onChange={handleChange} required>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className={`${styles["form-label"]}`}>Name</label>
                    <input type="text" className={`${styles["form-control"]}`} name="name" id="name" value={seller.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className={`${styles["form-label"]}`}>Email</label>
                    <input type="email" className={`${styles["form-control"]}`} name="email" id="email" value={seller.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobilenumber" className={`${styles["form-label"]}`}>Mobile Number</label>
                    <input type="number" className={`${styles["form-control"]}`} name="mobilenumber" id="mobilenumber" value={seller.mobilenumber} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className={`${styles["form-label"]}`}>Address</label>
                    <input type="text" className={`${styles["form-control"]}`} name="address" id="address" value={seller.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="farmname" className={`${styles["form-label"]}`}>Farm Name(Optional)</label>
                    <input type="text" className={`${styles["form-control"]}`} name="farmname" id="farmname" value={seller.farmname} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="farmlocation" className={`${styles["form-label"]}`}>Farm Location(Optional)</label>
                    <input type="text" className={`${styles["form-control"]}`} name="farmlocation" id="farmlocation" value={seller.farmlocation} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="typeoffarm" className={`${styles["form-label"]}`}>Type Of Farm(Optional)</label>
                    <input type="text" className={`${styles["form-control"]}`} name="typeoffarm" id="typeoffarm" value={seller.typeoffarm} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="farmingmethods" className={`${styles["form-label"]}`}>FarmingMethods</label>
                    <input type="text" className={`${styles["form-control"]}`} name="farmingmethods" id="farmingmethods" value={seller.farmingmethods} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="socialmedialinks" className={`${styles["form-label"]}`}>Social Media Links</label>
                    <input type="text" className={`${styles["form-control"]}`} name="socialmedialinks" id="socialmedialinks" value={seller.socialmedialinks} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className={`${styles["form-label"]}`}>Description About Farmer</label>
                    <input type="text" className={`${styles["form-control"]}`} name="desc" id="desc" value={seller.desc} onChange={handleChange}/>
                </div>
                <label htmlFor="image" className={`${styles["form-label"]}`}>Upload Image</label>
                <input type="file" accept="image/*" className={`${styles["form-control"]}`} name="image" onChange={handleChange} />
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className={`${styles.btn} btn-primary`}>Add Seller</button>
            </form>
        </div>
        <AgriProductSellers/>
    </>
);
}

export default AddAgriProductSellers