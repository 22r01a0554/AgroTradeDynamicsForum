import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import videoContext from '../context/videos/videoContext';
import styles from './Postitem.module.css';

const Videoitem = (props) => {
  const location = useLocation();
  const context = useContext(videoContext);
  const { deleteVideo } = context;
  const { video, updateVideo } = props;

  const hideIconsPaths = ['/learning'];

  return (
    <div className="col-md-4">
      <div className={`${styles.card} card my-3`}>
        <video controls className={`${styles.cardImgTop} card-img-top`}>
          <source src={`http://localhost:5000/videos/${video.videoFilename}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={`${styles.cardBody} card-body`}>
          <div className={styles.profileDetails}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Title:</span>
              <span className={`${styles.cardTitle} card-title`}>{video.title}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Description:</span>
              <span className={`${styles.cardText} card-text`}>{video.description}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Author:</span>
              <span className={`${styles.cardText} card-text`}>{video.author}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Uploaded on:</span>
              <span className={`${styles.cardText} card-text`}>{new Date(video.dateUploaded).toLocaleDateString()}</span>
            </div>
            <div className={`${styles.dFlex} d-flex align-items-center`}>
            <Link to={`/author/${video._id}`} className={styles.btn}>About Author</Link>
              {!hideIconsPaths.includes(location.pathname) && (
                <>
                  <i  className={`fa-solid fa-pen-to-square mx-2 ${styles.faPen}`}onClick={() => updateVideo(video)}></i>
                  <i className={`fa-solid fa-trash mx-2 ${styles.faTrash}`} onClick={() => deleteVideo(video._id)}></i>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Videoitem;


// import React from 'react'
// import { Link } from 'react-router-dom';
// import videoContext from '../context/videos/videoContext';
// import { useLocation } from 'react-router-dom';
// const Videoitem = (props) => {
//     const location=useLocation();
//     const context = useContext(videoContext);
//     const { deleteVideo } = context;
//     const { video, updateVideo } = props;
//     const hideIconsPaths = [];
//   return (
//     <div className="col-md-3">
//         <div className="card my-3">
//             <h1>Uploaded Videos</h1>
//             {videos.length > 0 ? (
//                 <div>
//                     {videos.map((video, index) => (
//                         <div key={index}>
//                             <h3>{video.filename}</h3>
//                             <video controls>
//                                 <source src={`http://localhost:5000/videos/${video.filename}`} type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No videos uploaded yet.</p>
//             )}
//             <div className="card-body">
//                     <h5 className="card-title">Card title: {video.title}</h5>
//                     <p className="card-text">{video.description}</p>
//                     <p className="card-text">{video.author}</p>
//                     <p className="card-text">{video.dateUploaded}</p>
//                     <div className="d-flex align-items-center">
//                         <Link to="/" className="btn btn-primary">Go somewhere</Link>
//                         {!hideIconsPaths.includes(location.pathname) && (
//                             // Conditionally render update and delete buttons if user is authenticated
//                             <>
//                                 <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateVideo(video); }}></i>
//                                 <i className="fa-solid fa-trash mx-2" onClick={() => { deleteVideo(video._id); }}></i>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default Videoitem
