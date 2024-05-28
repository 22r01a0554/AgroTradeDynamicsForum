import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import postContext from '../context/posts/postContext';
import { useLocation } from 'react-router-dom';
const Postitem = (props) => {
    const location=useLocation();
    const context = useContext(postContext);
    const { deletePost } = context;
    const { post, updatePost } = props;
    // Define paths where icons should not be displayed
    const hideIconsPaths = ['/buy','/vegetables', '/fruits','/pulses','/grains','/oils',
    '/dairyfarm','/dryfruits','/masalas','villagestaples','/villagespecials','/sweets','/buycategories','/airentals','/villagegoods','/agriculturetools'];
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <img src="/img/home3.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title: {post.title}</h5>
                    <p className="card-text">{post.category}</p>
                    <p className="card-text">{post.quantity}</p>
                    <p className="card-text">{post.expectedprice}</p>
                    <p className="card-text">{post.mobilenumber}</p>
                    <p className="card-text">{post.address}, {post.state}, {post.district}, {post.subdistrict}, {post.village}</p>
                    <div className="d-flex align-items-center">
                        <Link to="/" className="btn btn-primary">Go somewhere</Link>
                        {!hideIconsPaths.includes(location.pathname) && (
                            // Conditionally render update and delete buttons if user is authenticated
                            <>
                                <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updatePost(post); }}></i>
                                <i className="fa-solid fa-trash mx-2" onClick={() => { deletePost(post._id); }}></i>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Postitem;

// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import postContext from '../context/posts/postContext';
// import { useLocation } from 'react-router-dom';

// const Postitem = (props) => {
//     const location = useLocation();
//     const context = useContext(postContext);
//     const { deletePost } = context;
//     const { post, updatePost } = props;

//     // Define paths where icons should not be displayed
//     const hideIconsPaths = [
//         '/buy', '/vegetables', '/fruits', '/pulses', '/grains', '/oils',
//         '/dairyfarm', '/dryfruits', '/masalas', '/villagestaples', '/villagespecials', '/sweets', '/buycategories'
//     ];

//     return (
//         <div className="col-md-3">
//             <div className="card my-3">
//                 <img src={`http://localhost:5000/${post.imageUrl}`} className="card-img-top" alt="Post Image" />
//                 <div className="card-body">
//                     <h5 className="card-title">Card title: {post.title}</h5>
//                     <p className="card-text">{post.category}</p>
//                     <p className="card-text">{post.quantity}</p>
//                     <p className="card-text">{post.expectedprice}</p>
//                     <p className="card-text">{post.mobilenumber}</p>
//                     <p className="card-text">{post.address}, {post.state}, {post.district}, {post.subdistrict}, {post.village}</p>
//                     <div className="d-flex align-items-center">
//                         <Link to="/" className="btn btn-primary">Go somewhere</Link>
//                         {!hideIconsPaths.includes(location.pathname) && (
//                             <>
//                                 <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updatePost(post); }}></i>
//                                 <i className="fa-solid fa-trash mx-2" onClick={() => { deletePost(post._id); }}></i>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Postitem;

