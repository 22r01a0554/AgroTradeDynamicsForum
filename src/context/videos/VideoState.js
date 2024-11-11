import VideoContext from "./videoContext";
import React, { useState } from 'react';

const VideoState = (props) => {
    const host = "http://localhost:5000";
    const videosInitial = [];
    const [videos, setVideos] = useState(videosInitial);

    // Get all Videos Of a Specific User
    const getVideos = async () => {
        // API Call
        try {
            const response = await fetch(`${host}/api/upload/fetchvideos`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // Get all Posts of all Users
    const getAllVideos = async () => {
        try {
            const response = await fetch(`${host}/api/upload/fetchallvideos`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // Add a Video
    const addVideo = async (formData) => {
        try {
            const response = await fetch(`${host}/api/upload/addvideo`, {
                method: 'POST',
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData, // Directly pass the FormData object
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error:', errorText);
                throw new Error(errorText);
            }

            const video = await response.json();
            setVideos([...videos, video]); //setVideos(videos.concat(video));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Delete a Video
    const deleteVideo = async (id) => {
        try {
            const response = await fetch(`${host}/api/upload/deletevideo/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete video');
            }
            const data = await response.json();
            console.log(data);
            const newVideos = videos.filter((video) => { return video._id !== id });
            setVideos(newVideos);
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    // Edit a video
    const editVideo = async (id, category, title, description, author, dateUploaded, email, mobilenumber, socialmedialinks, address, bio, website, experience, affiliation, imageFile, videoFile) => {
        const formData = new FormData();
        formData.append("category", category);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('author', author);
        formData.append('dateUploaded', dateUploaded);
        formData.append('email', email);
        formData.append('mobilenumber', mobilenumber);
        formData.append('socialmedialinks', socialmedialinks);
        formData.append('address', address);
        formData.append('bio', bio);
        formData.append('website', website);
        formData.append('experience', experience);
        formData.append('affiliation', affiliation);
        if (imageFile) {
            formData.append('imageFile', imageFile); // Correct field name for image file
        }
        if (videoFile) {
            formData.append('videoFile', videoFile); // Correct field name for video file
        }

        try {
            const response = await fetch(`${host}/api/upload/updatevideo/${id}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error:', errorText);
                throw new Error(errorText);
            }

            const updatedVideo = await response.json();
            const updatedVideos = videos.map(v => v._id === updatedVideo._id ? updatedVideo : v);
            setVideos(updatedVideos);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <VideoContext.Provider value={{
            videos,
            getVideos,
            getAllVideos,
            addVideo,
            deleteVideo,
            editVideo
        }}>
            {props.children}
        </VideoContext.Provider>
    );
};
export default VideoState;



// import VideoContext from "./videoContext";
// import React,{useState} from 'react'
// const VideoState = (props) => {
//     const host="http://localhost:5000"
//     const videosInitial=[]
//     const [videos, setVideos] = useState(videosInitial) 
//     //Get all Videos Of a Specific User
//     const getVideos=async ()=>{
//         //API Call
//         try{
//         const response = await fetch(`${host}/api/upload/fetchvideos`, {
//           method: "GET", 
//           headers: {
//             "auth-token":localStorage.getItem('token')
//           },
//         });
//         if (!response.ok) {
//             throw new Error('Failed to fetch videos');
//         }
//         const data=await response.json()
//         setVideos(data)
//       } 
//       catch (error) {
//         console.error('Error fetching videos:', error);
//     }
// };
//     //Get all Posts of all Users
//     const getAllVideos = async () => {
//         try {
//             const response = await fetch(`${host}/api/upload/fetchallvideos`,{
//                 method: 'GET'
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch videos');
//             }
//             const data = await response.json();
//             setVideos(data);
//         } catch (error) {
//             console.error('Error fetching videos:', error);
//         }
//     };
//     //Add a Video
//      const addVideo = async (formData) => {
//       try {
//           const response = await fetch(`${host}/api/upload/addvideo`, {
//               method: 'POST',
//               headers: {
//                   "auth-token": localStorage.getItem('token')
//               },
//               body: formData ,// Directly pass the FormData object
//               credentials: 'include'
//           });
  
//           if (!response.ok) {
//               const errorText = await response.text();
//               console.error('Error:', errorText);
//               throw new Error(errorText);
//           }
  
//           const video = await response.json();
//           setVideos([...videos,video]);//setVideos(videos.concat(video));
//       } catch (error) {
//           console.error('Error:', error);
//       }
//   };
  
//     //Delete a Video
//     const deleteVideo=async (id)=>{
//         //TODO: API CALL
//         const response = await fetch(`${host}/api/upload/deletevideo/${id}`, 
//         {
//           method: "DELETE", 
//           headers: {
//             "auth-token":localStorage.getItem('token')
//           },
//         });
//         const data= response.json(); 
//         console.log(data)
//         const newVideos=videos.filter((video)=>{return video._id!==id})
//         setVideos(newVideos)
//     }

//   // Edit a video
//   const editVideo = async (id, category,title, description, author, dateUploaded,email,mobilenumber,socialmedialinks,address,bio,website,experience,affiliation,imageFile, videoFile) => {
//     const formData = new FormData();
//     formData.append("category", category);
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('author', author);
//     formData.append('dateUploaded', dateUploaded);
//     formData.append('email',email);
//     formData.append('mobilenumber',mobilenumber);
//     formData.append('socialmedialinks',socialmedialinks);
//     formData.append('address',address);
//     formData.append('bio',bio);
//     formData.append('website',website);
//     formData.append('experience',experience);
//     formData.append('affiliation',affiliation);
//     if (imageFile) {
//       formData.append('file', imageFile);
//   }
//     if (videoFile) {
//       formData.append('file', videoFile);
//     }

//     try {
//       const response = await fetch(`${host}/api/upload/updatevideo/${id}`, {
//         method: 'PUT',
//         headers: {
//           "auth-token": localStorage.getItem('token'),
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Error:', errorText);
//         throw new Error(errorText);
//       }

//       const updatedVideo = await response.json();
//       const updatedVideos = videos.map(v => v._id === updatedVideo._id ? updatedVideo : v);
//       setVideos(updatedVideos);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   return (
//     <VideoContext.Provider value={{
//         videos,
//         getVideos,
//         getAllVideos,
//         addVideo,
//         deleteVideo,
//         editVideo
//     }}>
//           {props.children}
//       </VideoContext.Provider>
//   )
// }
// export default VideoState
