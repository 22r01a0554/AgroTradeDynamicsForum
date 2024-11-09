import React,{useContext,useEffect} from 'react'
import videoContext from '../context/videos/videoContext';
import Videoitem from './Videoitem';
const AllVideos = () => {
const context=useContext(videoContext);
const {videos,getAllVideos}=context;
useEffect(() => {
    getAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); 
  return (
   <>
    <div className='row my-3 mx-2'>
      <h2>All Videos</h2>
      <div className="container">
      {videos.length===0 &&'No posts to display'}
      </div>
        {videos.map((video,index)=>{
        return <Videoitem key={video._id} 
        // showAlert={props.showAlert} 
        video={video}/>
      })}
    </div>
    </>
  )
}
export default AllVideos
