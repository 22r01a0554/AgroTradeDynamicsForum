import React,{useContext,useEffect} from 'react'
import postContext from '../context/posts/postContext';
import Postitem from "./Postitem"
import Navbar from './Navbar'
const AgricultureTools= () => {
  const context=useContext(postContext);
  const {posts,agriculturetoolsposts}=context;
  useEffect(() => {
    agriculturetoolsposts(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  return (
    <>
    <Navbar/>
    <div className="row my-3 mx-2">
    <h2>Agriculture Tools</h2>
    <div className="container">
        {posts?.length === 0 && 'No products to display'}
    </div>
        {posts && posts.map((post) => {
        return <Postitem key={post._id} post={post} />
    })}
    </div>
    </>
  )
}

export default AgricultureTools