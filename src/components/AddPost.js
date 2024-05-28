import React, { useState,useContext } from "react";
import postContext from "../context/posts/postContext";
import Posts from "./Posts";
const AddPost = (props) => {
    console.log('AddPosts component rendered');
  const context=useContext(postContext);
    const {addPost}=context;
    const [post, setPost] = useState({category:"",title:"",description:"",quantity:"",expectedprice:"",mobilenumber:"",address:"",state:"",district:"",subdistrict:"",village:"",image: null})
    const handleClick=(e)=>{
      e.preventDefault()
      addPost(post.category,post.title,post.description,post.quantity,post.expectedprice,post.mobilenumber,post.address,post.state,post.district,post.subdistrict,post.village,post.image);
      setPost({category:"",title:"",description:"",quantity:"",expectedprice:"",mobilenumber:"",address:"",state:"",district:"",subdistrict:"",village:"",image:null})
      // props.showAlert("Added Note successfully","success")
    }
    const onChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
  
    console.log('AddPosts component rendered1');
  return (
    
    <>
    <div className='container my-3'>
    <h1>Add a Product</h1>
    <form className="container my-3">
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input type="text" className="form-control" name="category" id="category" value={post.category} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" name="title" id="title"  value={post.title} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" name="description" id="description" value={post.description} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">Quantity</label>
        <input type="text" className="form-control" name="quantity" id="quantity" value={post.quantity} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="expectedprice" className="form-label">Expected Price</label>
        <input type="text" className="form-control" name="expectedprice" id="expectedprice" value={post.expectedprice} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
        <input type="number" className="form-control" name="mobilenumber" id="mobilenumber" value={post.mobilenumber} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" name="address" id="address" value={post.address} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">State</label>
        <input type="text" className="form-control" name="state" id="state" value={post.state} onChange={onChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="district" className="form-label">District</label>
        <input type="text" className="form-control" name="district" id="district" value={post.district} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="subdistrict" className="form-label">SubDistrict</label>
        <input type="text" className="form-control" name="subdistrict" id="subdistrict" value={post.subdistrict} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="village" className="form-label">Village</label>
        <input type="text" className="form-control" name="village" id="village" value={post.village} onChange={onChange} required aria-describedby="emailHelp"/>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Product</button>
    </form>
    </div>
 <Posts/></>
  )
}

export default AddPost





// import React, { useState, useContext } from "react";
// import postContext from "../context/posts/postContext";
// import Posts from "./Posts";

// const AddPost = (props) => {
//     const context = useContext(postContext);
//     const { addPost } = context;
//     const [post, setPost] = useState({
//         category: "", title: "", description: "", quantity: "", expectedprice: "", mobilenumber: "", address: "", state: "", district: "", subdistrict: "", village: "", image: null
//     });

//     const handleClick = (e) => {
//         e.preventDefault();
//         addPost(
//             post.category, post.title, post.description, post.quantity, post.expectedprice,
//             post.mobilenumber, post.address, post.state, post.district, post.subdistrict, post.village, post.image
//         );
//         setPost({
//             category: "", title: "", description: "", quantity: "", expectedprice: "", mobilenumber: "", address: "",
//             state: "", district: "", subdistrict: "", village: "", image: null
//         });
//     }

//     const onChange = (e) => {
//         if (e.target.name === 'image') {
//             setPost({ ...post, image: e.target.files[0] });
//         } else {
//             setPost({ ...post, [e.target.name]: e.target.value });
//         }
//     };

//     return (
//         <>
//             <div className='container my-3'>
//                 <h1>Add a Product</h1>
//                 <form className="container my-3">
//                     <div className="mb-3">
//                         <label htmlFor="category" className="form-label">Category</label>
//                         <input type="text" className="form-control" name="category" id="category" value={post.category} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="title" className="form-label">Title</label>
//                         <input type="text" className="form-control" name="title" id="title" value={post.title} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="description" className="form-label">Description</label>
//                         <input type="text" className="form-control" name="description" id="description" value={post.description} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="quantity" className="form-label">Quantity</label>
//                         <input type="text" className="form-control" name="quantity" id="quantity" value={post.quantity} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="expectedprice" className="form-label">Expected Price</label>
//                         <input type="text" className="form-control" name="expectedprice" id="expectedprice" value={post.expectedprice} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
//                         <input type="number" className="form-control" name="mobilenumber" id="mobilenumber" value={post.mobilenumber} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="address" className="form-label">Address</label>
//                         <input type="text" className="form-control" name="address" id="address" value={post.address} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="state" className="form-label">State</label>
//                         <input type="text" className="form-control" name="state" id="state" value={post.state} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="district" className="form-label">District</label>
//                         <input type="text" className="form-control" name="district" id="district" value={post.district} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="subdistrict" className="form-label">SubDistrict</label>
//                         <input type="text" className="form-control" name="subdistrict" id="subdistrict" value={post.subdistrict} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="village" className="form-label">Village</label>
//                         <input type="text" className="form-control" name="village" id="village" value={post.village} onChange={onChange} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="image" className="form-label">Upload Image</label>
//                         <input type="file" className="form-control" name="image" id="image" onChange={onChange} required />
//                     </div>
//                     <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Product</button>
//                 </form>
//             </div>
//             <Posts />
//         </>
//     )
// }

// export default AddPost;



























































