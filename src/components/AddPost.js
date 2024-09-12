import React, { useState, useContext, useEffect } from "react";
import postContext from "../context/posts/postContext";
import Posts from "./Posts";
import styles from "./AddPost.module.css";

const AddPost = (props) => {
    const context = useContext(postContext);
    const { addPost } = context;
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({
        category: "", title: "", description: "", quantity: "", expectedprice: "", mobilenumber: "",
        address: "", state: "", district: "", subdistrict: "", village: "", image: null
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/api/post/categories')
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
                setPost({ ...post, image: resizedImage });
                setError(""); // Clear any previous error messages
            } catch (error) {
                console.error('Error resizing image:', error);
                setError('Error resizing image.');
            }
        } else {
            setPost({ ...post, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post.image) {
            setError("Please upload a valid image.");
            return;
        }
        const formData = new FormData();
        formData.append("category", post.category);
        formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("quantity", post.quantity);
        formData.append("expectedprice", post.expectedprice);
        formData.append("mobilenumber", post.mobilenumber);
        formData.append("address", post.address);
        formData.append("state", post.state);
        formData.append("district", post.district);
        formData.append("subdistrict", post.subdistrict);
        formData.append("village", post.village);
        formData.append("file", post.image);

        addPost(formData);
        setPost({
            category: "", title: "", description: "", quantity: "", expectedprice: "", mobilenumber: "",
            address: "", state: "", district: "", subdistrict: "", village: "", image: null
        });
    };

    return (
        <>
            <div className={`${styles.container} my-3`}>
                <h1>Add a Product</h1>
                <form onSubmit={handleSubmit} className={`${styles.container} my-3`}>
                    <div className="mb-3">
                        <label htmlFor="category" className={`${styles["form-label"]}`}>Category</label>
                        <select className={`${styles["form-control"]}`}  name="category" id="category" value={post.category} onChange={handleChange} required>
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className={`${styles["form-label"]}`}>Title</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="title" id="title" value={post.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className={`${styles["form-label"]}`}>Description</label>
                        <input type="text" className={`${styles["form-control"]}`} name="description" id="description" value={post.description} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className={`${styles["form-label"]}`}>Quantity</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="quantity" id="quantity" value={post.quantity} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expectedprice" className={`${styles["form-label"]}`}>Expected Price</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="expectedprice" id="expectedprice" value={post.expectedprice} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobilenumber" className={`${styles["form-label"]}`}>Mobile Number</label>
                        <input type="number" className={`${styles["form-control"]}`}  name="mobilenumber" id="mobilenumber" value={post.mobilenumber} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className={`${styles["form-label"]}`}>Address</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="address" id="address" value={post.address} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className={`${styles["form-label"]}`}>State</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="state" id="state" value={post.state} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="district" className={`${styles["form-label"]}`}>District</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="district" id="district" value={post.district} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subdistrict" className={`${styles["form-label"]}`}>SubDistrict</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="subdistrict" id="subdistrict" value={post.subdistrict} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="village" className={`${styles["form-label"]}`}>Village</label>
                        <input type="text" className={`${styles["form-control"]}`}  name="village" id="village" value={post.village} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                    <label htmlFor="image" className={`${styles["form-label"]}`}>Upload Image</label>
                    <input type="file" accept="image/*" className={`${styles["form-control"]}`}  name="image" onChange={handleChange} required />
                    {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <button type="submit" className={`${styles.btn} btn-primary`}>Add Product</button>
                </form>
            </div>
            <Posts />
        </>
    );
};

export default AddPost;
