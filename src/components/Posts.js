import React, { useContext ,useState,useEffect,useRef} from 'react'
import postContext from "../context/posts/postContext";
import Postitem from './Postitem';
import { useNavigate } from "react-router-dom"
import styles from './Posts.module.css';
const Posts = (props) => {
    const context = useContext(postContext);
    const{posts,getPosts,editPost}=context;
    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getPosts()
        // eslint-disable-next-line
      }
      else{
        navigate('/login')
        
      }   
      // eslint-disable-next-line 
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({id:"",ecategory:"",etitle:"",edescription:"",equantity:"",eexpectedprice:"",emobilenumber:"",eaddress:"",estate:"",edistrict:"",esubdistrict:"",evillage:"",eimage:null})
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

    const updatePost=(currentPost)=>{
      ref.current.click();
      setPost({id:currentPost._id,ecategory:currentPost.category,etitle:currentPost.title,edescription:currentPost.description,equantity:currentPost.quantity,eexpectedprice:currentPost.expectedprice,emobilenumber:currentPost.mobilenumber,eaddress:currentPost.address,estate:currentPost.state,edistrict:currentPost.district,esubdistrict:currentPost.subdistrict,evillage:currentPost.village,eimage:null});
    }
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
  const onChange = async (e) => {
    setError(""); // Clear any previous error messages

    if (e.target.name === "eimage") {
        const file = e.target.files[0];

        // Desired dimensions
        const desiredWidth = 800;
        const desiredHeight = 800;

        try {
            const resizedImage = await resizeImage(file, desiredWidth, desiredHeight);
            setPost({ ...post, eimage: resizedImage }); // Update eimage property with resized image
        } catch (error) {
            console.error('Error resizing image:', error);
            setError('Error resizing image.');
        }
    } else {
        setPost({ ...post, [e.target.name]: e.target.value }); // Update other form fields
    }
};

    const handleSubmit=(e)=>{
      console.log("Updating the post",post)
      e.preventDefault();
      if (!post.eimage) {
            setError("Please upload a valid image.");
            return;
        }
      editPost(post.id,post.ecategory,post.etitle,post.edescription,post.equantity,post.eexpectedprice,post.emobilenumber,post.eaddress,post.estate,post.edistrict,post.esubdistrict,post.evillage,post.eimage)
      refClose.current.click();
      // props.showAlert("Updated  successfully","success")

    }
    
    return (
      <>
        <button ref={ref} type="button" className={`btn btn-primary d-none ${styles.hiddenButton}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className={`modal fade ${styles.modalFade}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className={`modal-dialog ${styles.modalDialog}`}>
            <div className={`modal-content ${styles.modalContent}`}>
              <div className={`modal-header ${styles.modalHeader}`}>
                <h5 className={`modal-title ${styles.modalTitle}`} id="exampleModalLabel">Edit Post</h5>
                <button type="button" className={`btn-close ${styles.btnClose}`} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className={`modal-body ${styles.modalBody}`}>
                <form className={`container my-3 ${styles.formContainer}`}>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <input type="file" id="eimage" name="eimage" multiple accept="image/*" onChange={onChange} className={styles.formControl} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                  <label htmlFor="ecategory" className={`form-label ${styles.formLabel}`}>Category</label>
                        <select className="form-control" name="ecategory" id="ecategory" value={post.ecategory} onChange={onChange} required>
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="etitle" className={`form-label ${styles.formLabel}`}>Title</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="etitle" name="etitle" value={post.etitle} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="edescription" className={`form-label ${styles.formLabel}`}>Description</label>
                    <input type="text" id="edescription" name="edescription" value={post.edescription} className={`form-control ${styles.formControl}`} minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="equantity" className={`form-label ${styles.formLabel}`}>Quantity</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="equantity" name="equantity" value={post.equantity} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="eexpectedprice" className={`form-label ${styles.formLabel}`}>Expected Price</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="eexpectedprice" name="eexpectedprice" value={post.eexpectedprice} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="emobilenumber" className={`form-label ${styles.formLabel}`}>Mobile Number</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="emobilenumber" name="emobilenumber" value={post.emobilenumber} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="eaddress" className={`form-label ${styles.formLabel}`}>Address</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="eaddress" name="eaddress" value={post.eaddress} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="estate" className={`form-label ${styles.formLabel}`}>State</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="estate" name="estate" value={post.estate} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="edistrict" className={`form-label ${styles.formLabel}`}>District</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="edistrict" name="edistrict" value={post.edistrict} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="esubdistrict" className={`form-label ${styles.formLabel}`}>Subdistrict</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="esubdistrict" name="esubdistrict" value={post.esubdistrict} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                  <div className={`mb-3 ${styles.formGroup}`}>
                    <label htmlFor="evillage" className={`form-label ${styles.formLabel}`}>Village</label>
                    <input type="text" className={`form-control ${styles.formControl}`} id="evillage" name="evillage" value={post.evillage} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className={`modal-footer ${styles.modalFooter}`}>
                <button type="button" ref={refClose} className={`btn btn-secondary ${styles.btnSecondary}`} data-bs-dismiss="modal">Close</button>
                <button disabled={post.etitle.length < 5 || post.edescription.length < 5} type="button" className={`btn btn-primary ${styles.btnPrimary}`} onClick={handleSubmit}>Update Post</button>
              </div>
            </div>
          </div>
        </div>
        <div className={`row my-3 mx-2 ${styles.row}`}>
          <h2 className={styles.header}>Your Products</h2>
          <div className={`container ${styles.container}`}>
            {posts.length === 0 && 'No posts to display'}
          </div>
          {posts.map((post) => (
            <Postitem key={post._id} updatePost={updatePost} post={post} />
          ))}
        </div>
      </>
    );
  }    
export default Posts
