import React, { useContext, useState, useEffect, useRef } from 'react';
import videoContext from '../context/videos/videoContext';
import Videoitem from './Videoitem';
import { useNavigate } from "react-router-dom";

const Videos = (props) => {
    const context = useContext(videoContext);
    const { videos, getVideos, editVideo } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getVideos();
        } else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [video, setVideo] = useState({
        id: "",
        etitle: "",
        edescription: "",
        eauthor: "",
        edateUploaded: "",
        eemail: "",
        emobilenumber: "",
        esocialmedialinks: "",
        eaddress: "",
        ebio: "",
        ewebsite: "",
        eexperience: "",
        eaffiliation: "",
        eimage: null,
        evideo: null
    });
    const [error, setError] = useState("");

    const updateVideo = (currentVideo) => {
        ref.current.click();
        setVideo({
            id: currentVideo._id,
            etitle: currentVideo.title,
            edescription: currentVideo.description,
            eauthor: currentVideo.author,
            edateUploaded: currentVideo.dateUploaded,
            eemail: currentVideo.email,
            emobilenumber: currentVideo.mobilenumber,
            esocialmedialinks: currentVideo.socialmedialinks,
            eaddress: currentVideo.address,
            ebio: currentVideo.bio,
            ewebsite: currentVideo.website,
            eexperience: currentVideo.experience,
            eaffiliation: currentVideo.affiliation,
            eimage: null,
            evideo: null
        });
    };

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

    const handleClick = (e) => {
        console.log("Updating the video", video);
        if (!video.eimage) {
            console.log("Please upload a valid image.");
            setError('Please upload a valid image.');
            return;
        }
        editVideo(video.id, video.etitle, video.edescription, video.eauthor, video.edateUploaded, video.eemail, video.emobilenumber, video.esocialmedialinks, video.eaddress, video.ebio, video.ewebsite, video.eexperience, video.eaffiliation, video.eimage, video.evideo);
        refClose.current.click();
        // props.showAlert("Updated successfully", "success");
    };

    const handleFileChange = (e) => {
        setVideo({ ...video, evideo: e.target.files[0] });
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
                setVideo({ ...video, eimage: resizedImage }); // Update eimage property with resized image
            } catch (error) {
                console.error('Error resizing image:', error);
                setError('Error resizing image.');
            }
        } else {
            setVideo({ ...video, [e.target.name]: e.target.value });
        }
    };

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Video</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container my-3">
                                <div className="mb-3">
                                    <input type="file" id="evideo" name="evideo" accept="video/*" onChange={handleFileChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={video.etitle} aria-describedby="emailHelp" minLength={5} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" id="edescription" name="edescription" value={video.edescription} className="form-control" minLength={5} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eauthor" className="form-label">Author</label>
                                    <input type="text" className="form-control" id="eauthor" name="eauthor" value={video.eauthor} aria-describedby="emailHelp" minLength={5} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dateInput">Select Date</label>
                                    <input type="date" className="form-control" id="dateInput" value={video.edateUploaded} name="edateUploaded" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eemail" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="eemail" name="eemail" value={video.eemail} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emobilenumber" className="form-label">Mobilenumber</label>
                                    <input type="text" className="form-control" id="emobilenumber" name="emobilenumber" value={video.emobilenumber} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="esocialmedialinks" className="form-label">SocialMediaLinks</label>
                                    <input type="text" className="form-control" id="esocialmedialinks" name="esocialmedialinks" value={video.esocialmedialinks} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ebio" className="form-label">Bio</label>
                                    <input type="text" className="form-control" id="ebio" name="ebio" value={video.ebio} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ewebsite" className="form-label">Website</label>
                                    <input type="text" className="form-control" id="ewebsite" name="ewebsite" value={video.ewebsite} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eexperience" className="form-label">Experience</label>
                                    <input type="text" className="form-control" id="eexperience" name="eexperience" value={video.eexperience} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eaffiliation" className="form-label">Affiliation</label>
                                    <input type="text" className="form-control" id="eaffiliation" name="eaffiliation" value={video.eaffiliation} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="file" id="eimage" name="eimage" accept="image/*" onChange={onChange} />
                                </div>
                            </form>
                        </div> {/* Closing div added here */}
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={video.etitle.length < 5 || video.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Video</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3 mx-2'>
                <h2>Your Videos</h2>
                <div className="container">
                    {videos.length === 0 && 'No posts to display'}
                </div>
                {videos.map((video, index) => {
                    return <Videoitem key={video._id} updateVideo={updateVideo}
                        // showAlert={props.showAlert}
                        video={video} />
                })}
            </div>
        </>
    );
};

export default Videos;

// import React, { useContext ,useState,useEffect,useRef} from 'react'
// import videoContext from '../context/videos/videoContext'
// import Videoitem from './Videoitem'
// import { useNavigate } from "react-router-dom"
// const Videos = (props) => {
//     const context = useContext(videoContext);
//     const{videos,getVideos,editVideo}=context;
//     let navigate = useNavigate();
//     useEffect(() => {
//       if(localStorage.getItem('token')){
//           getVideos();
//       } else {
//           navigate('/login');
//       }
//     }, []);
  
//     const ref = useRef(null)
//     const refClose = useRef(null)
//     const [video, setVideo] = useState({id:"",etitle:"",edescription:"",eauthor:"",edateUploaded:"",eemail:"",emobilenumber:"",esocialmedialinks:"",eaddress:"",ebio:"",ewebsite:"",eexperience:"",eaffiliation:"",eimage:null,evideo:null})
//     const [error, setError] = useState("");
//     const updateVideo=(currentVideo)=>{
//       ref.current.click();
//       setVideo({id:currentVideo._id,etitle:currentVideo.title,edescription:currentVideo.description,eauthor:currentVideo.author,edateUploaded:currentVideo.dateUploaded,eemail:currentVideo.email,emobilenumber:currentVideo.mobilenumber,
//         esocialmedialinks:currentVideo.socialmedialinks,eaddress:currentVideo.address,ebio:currentVideo.bio,ewebsite:currentVideo.website,eexperience:currentVideo.experience,eaffiliation:currentVideo.affiliation,eimage:null,evideo:null});
//     }
//     const resizeImage = (file, width, height) => {
//       return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onload = (event) => {
//               const img = new Image();
//               img.src = event.target.result;
//               img.onload = () => {
//                   const canvas = document.createElement('canvas');
//                   canvas.width = width;
//                   canvas.height = height;
//                   const ctx = canvas.getContext('2d');
//                   ctx.drawImage(img, 0, 0, width, height);
//                   canvas.toBlob((blob) => {
//                       resolve(blob);
//                   }, file.type);
//               };
//               img.onerror = () => {
//                   reject(new Error('Image load error'));
//               };
//           };
//           reader.onerror = () => {
//               reject(new Error('File read error'));
//           };
//       });
//   };
//     const handleClick=(e)=>{
//       console.log("Updating the video",video)
//       if (!video.eimage) {
//         console.log("Please upload a valid image.");
//     }
//       editVideo(video.id,video.etitle,video.edescription,video.eauthor,video.edateUploaded,video.eemail,video.emobilenumber,video.esocialmedialinks,video.eaddress,video.ebio,video.ewebsite,video.eexperience,video.eaffiliation,video.eimage,video.evideo)
//       refClose.current.click();
//       // props.showAlert("Updated  successfully","success")

//     }
//     const handleFileChange = (e) => {
//       setVideo({...video, evideo: e.target.files[0] });
//     };
    

//     const onChange=async (e)=>{
//       setError(""); // Clear any previous error messages
//     if (e.target.name === "eimage") {
//         const file = e.target.files[0];
//         // Desired dimensions
//         const desiredWidth = 800;
//         const desiredHeight = 800;

//         try {
//             const resizedImage = await resizeImage(file, desiredWidth, desiredHeight);
//             setVideo({ ...video, eimage: resizedImage }); // Update eimage property with resized image
//         } catch (error) {
//             console.error('Error resizing image:', error);
//             setError('Error resizing image.');
//         }
//     } else {
//         setVideo({...video,[e.target.name]:e.target.value})
//     }
//     }
//   return (
//     <>
//     <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
//       Launch demo modal
//     </button>
//   <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
//     <div className="modal-dialog">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title" id="exampleModalLabel">Edit Video</h5>
//           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div className="modal-body"></div>
//         <form className="container my-3">
//         <div className="mb-3">
//         {/* <input type="file" id="evideo" name="evideo" multiple accept="video/*" onChange={handleFileChange} /> */}
//         <input type="file" id="evideo" name="evideo" multiple accept="video/*" onChange={handleFileChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="etitle" className="form-label">Title</label>
//           <input type="text" className="form-control" id="etitle" name="etitle" value={video.etitle} aria-describedby="emailHelp" minLength={5} onChange={onChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="edescription" className="form-label">Description</label>
//           <input type="text" id="edescription" name="edescription" value={video.edescription} className="form-control" minLength={5} onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="eauthor" className="form-label">Author</label>
//           <input type="text" className="form-control" id="eauthor" name="eauthor" value={video.eauthor} aria-describedby="emailHelp" minLength={5}  onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//             <label htmlFor="dateInput">Select Date</label>
//             <input type="date" className="form-control" id="dateInput" value={video.edateUploaded}  name="edateUploaded" onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="eemail" className="form-label">Email</label>
//           <input type="text" className="form-control" id="eemail" name="eemail" value={video.eemail} aria-describedby="emailHelp"   onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="emobilenumber" className="form-label">Mobilenumber</label>
//           <input type="text" className="form-control" id="emobilenumber" name="emobilenumber" value={video.emobilenumber} aria-describedby="emailHelp"  onChange={onChange}/>
//         </div>
//         <div className="mb-3"> 
//           <label htmlFor="esocialmedialinks" className="form-label">SocialMediaLinks</label>
//           <input type="text" className="form-control" id="esocialmedialinks" name="eauthor" value={video.esocialmedialinks} aria-describedby="emailHelp"onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="ebio" className="form-label">Bio</label>
//           <input type="text" className="form-control" id="ebio" name="ebio" value={video.ebio} aria-describedby="emailHelp"  onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="ewebsite" className="form-label">Website</label>
//           <input type="text" className="form-control" id="ewebsite" name="ewebsite" value={video.ewebsite} aria-describedby="emailHelp" onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="eexperience" className="form-label">Experience</label>
//           <input type="text" className="form-control" id="eexperience" name="eexperience" value={video.eexperience} aria-describedby="emailHelp"  onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="eaffiliation" className="form-label">Affiliation</label>
//           <input type="text" className="form-control" id="eaffiliation" name="eaffiliation" value={video.eaffiliation} aria-describedby="emailHelp" onChange={onChange}/>
//         </div>
//         <div className="mb-3">
//           <input type="file" id="eimage" name="eimage" multiple accept="image/*" onChange={onChange} />
//           </div>
//       </form>
//         <div className="modal-footer">
//           <button type="button" ref={refClose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//           <button disabled={video.etitle.length<5 || video.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Video</button>
//         </div>
//       </div>
//     </div>
//   </div>
//     <div className='row my-3 mx-2'>
//       <h2>Your Videos</h2>
//       <div className="container">
//       {videos.length===0 &&'No posts to display'}
//       </div>
//         {videos.map((video,index)=>{
//         return <Videoitem key={video._id} updateVideo={updateVideo} 
//         // showAlert={props.showAlert} 
//         video={video}/>
//       })}
//     </div>
//     </>
//   )
// }

// export default Videos
