import React, { useContext ,useState,useEffect,useRef} from 'react'
import postContext from "../context/posts/postContext";
import Postitem from './Postitem';
import { useNavigate } from "react-router-dom"
// import AddPost from "./AddPost"
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
    const [post, setPost] = useState({id:"",ecategory:"",etitle:"",edescription:"",equantity:"",eexpectedprice:"",emobilenumber:"",eaddress:"",estate:"",edistrict:"",esubdistrict:"",evillage:""})
    const updatePost=(currentPost)=>{
      ref.current.click();
      setPost({id:currentPost._id,ecategory:currentPost.category,etitle:currentPost.title,edescription:currentPost.description,equantity:currentPost.quantity,eexpectedprice:currentPost.expectedprice,emobilenumber:currentPost.mobilenumber,eaddress:currentPost.address,estate:currentPost.state,edistrict:currentPost.district,esubdistrict:currentPost.subdistrict,evillage:currentPost.village});
    }
    const handleClick=(e)=>{
      console.log("Updating the post",post)
      editPost(post.id,post.ecategory,post.etitle,post.edescription,post.equantity,post.eexpectedprice,post.emobilenumber,post.eaddress,post.estate,post.edistrict,post.esubdistrict,post.evillage)
      refClose.current.click();
      // props.showAlert("Updated  successfully","success")

    }
    const onChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }
    
    
  return (
    <>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body"></div>
        <form className="container my-3">
        <div className="mb-3">
          <label htmlFor="ecategory" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="ecategory"
            name="ecategory"
            value={post.ecategory}
            className="form-control"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={post.etitle}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="edescription"
            name="edescription"
            value={post.edescription}
            className="form-control"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="equantity" className="form-label">
          Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="equantity"
            name="equantity"
            value={post.equantity}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eexpectedprice" className="form-label">
          Expectedprice
          </label>
          <input
            type="text"
            className="form-control"
            id="eexpectedprice"
            name="eexpectedprice"
            value={post.eexpectedprice}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emobilenumber" className="form-label">
          Mobilenumber
          </label>
          <input
            type="text"
            className="form-control"
            id="emobilenumber"
            name="emobilenumber"
            value={post.emobilenumber}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eaddress" className="form-label">
          Address
          </label>
          <input
            type="text"
            className="form-control"
            id="eaddress"
            name="eaddress"
            value={post.eaddress}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estate" className="form-label">
          State
          </label>
          <input
            type="text"
            className="form-control"
            id="estate"
            name="estate"
            value={post.estate}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edistrict" className="form-label">
          District
          </label>
          <input
            type="text"
            className="form-control"
            id="edistrict"
            name="edistrict"
            value={post.edistrict}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="esubdistrict" className="form-label">
          Subdistrict
          </label>
          <input
            type="text"
            className="form-control"
            id="esubdistrict"
            name="esubdistrict"
            value={post.esubdistrict}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="evillage" className="form-label">
            Village
          </label>
          <input
            type="text"
            className="form-control"
            id="evillage"
            name="evillage"
            value={post.evillage}
            aria-describedby="emailHelp"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        
      </form>
        <div className="modal-footer">
          <button type="button" ref={refClose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button disabled={post.etitle.length<5 || post.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Post</button>
        </div>
      </div>
    </div>
  </div>
    <div className='row my-3 mx-2'>
      <h2>Your Products</h2>
      <div className="container">
      {posts.length===0 &&'No posts to display'}
      </div>
        {posts.map((post)=>{
        return <Postitem key={post._id} updatePost={updatePost} 
        // showAlert={props.showAlert} 
        post={post}/>
      })}
    </div>
    </>
  )
}

export default Posts
