import React,{useContext,useEffect} from 'react'
import postContext from '../context/posts/postContext';
import Postitem from "./Postitem"
import Navbar from './Navbar'
import Categories from './Categories'
const Fruits = () => {
  const context=useContext(postContext);
  const {posts,fruitsposts}=context;
  useEffect(() => {
    fruitsposts(); // Call getAllPosts to fetch all products
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  return (
    <>
    <Navbar/>
    <Categories/>
    <div div className="row my-3 mx-2">
    <h2>Fruits</h2>
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

export default Fruits
