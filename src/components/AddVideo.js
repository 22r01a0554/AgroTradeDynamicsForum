import React, { useState, useContext, useEffect } from 'react';
import videoContext from '../context/videos/videoContext';
import Videos from './Videos';
import styles from './AddPost.module.css';

const AddVideo = () => {
    const context = useContext(videoContext);
    const { addVideo } = context;
    const [categories, setCategories] = useState([]);
    const [video, setVideo] = useState({
        category: "", title: "", description: "", author: "", email: "", mobilenumber: "",
        socialmedialinks: "", address: "", bio: "", website: "", dateUploaded: "", experience: "",
        affiliation: "", image: null, video: null
    });
    
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch categories from the API
        fetch('http://localhost:5000/api/upload/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

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
    const handleChange = async (e) => {
        if (e.target.name === "video") {
            setVideo({ ...video, video: e.target.files[0] });
        } else if (e.target.name === "image") {
            const file = e.target.files[0];
            // Desired dimensions
            const desiredWidth = 800;
            const desiredHeight = 800;
            try {
                const resizedImage = await resizeImage(file, desiredWidth, desiredHeight);
                setVideo({ ...video, image: resizedImage });
                setError(""); // Clear any previous error messages
            } catch (error) {
                console.error('Error resizing image:', error);
                setError('Error resizing image.');
            }
        } else {
            setVideo({ ...video, [e.target.name]: e.target.value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!video.image) {
            setError("Please upload a valid image.");
            return;
        }
        const formData = new FormData();
        formData.append("category", video.category);
        formData.append('title', video.title);
        formData.append('description', video.description);
        formData.append('author', video.author);
        formData.append('dateUploaded', video.dateUploaded);
        formData.append('email', video.email);
        formData.append('mobilenumber', video.mobilenumber);
        formData.append('address', video.address);
        formData.append('bio', video.bio);
        formData.append('website', video.website);
        formData.append('experience', video.experience);
        formData.append('affiliation', video.affiliation);
        formData.append('socialmedialinks', video.socialmedialinks);
        formData.append('image', video.image); // Use distinct key for image
        formData.append('video', video.video); // Use distinct key for video
        addVideo(formData);
        setVideo({
            category: "", title: "", description: "", author: "", dateUploaded: "", email: "", mobilenumber: "",
            address: "", bio: "", website: "", experience: "", affiliation: "", image: null, video: null
        });
    };

    return (
        <>
            <div className={`${styles.container} my-3`}>
                <h1>Upload Videos</h1>
                <form onSubmit={handleSubmit} className={`${styles.container} my-3`}>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="category" className={`${styles["form-label"]}`}>Category</label>
                        <select className={`${styles["form-control"]}`} name="category" id="category" value={video.category} onChange={handleChange} required>
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="title" className={`${styles["form-label"]}`}>Title</label>
                        <input type="text" className={`${styles["form-control"]}`} name="title" id="title" value={video.title} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="description" className={`${styles["form-label"]}`}>Description</label>
                        <input type="text" className={`${styles["form-control"]}`} name="description" id="description" value={video.description} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="dateUploaded" className={`${styles["form-label"]}`}>Date Uploaded</label>
                        <input type="date" className={`${styles["form-control"]}`} name="dateUploaded" id="dateUploaded" value={video.dateUploaded} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="author" className={`${styles["form-label"]}`}>Author</label>
                        <input type="text" className={`${styles["form-control"]}`} name="author" id="author" value={video.author} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="email" className={`${styles["form-label"]}`}>Email</label>
                        <input type="text" className={`${styles["form-control"]}`} name="email" id="email" value={video.email} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="mobilenumber" className={`${styles["form-label"]}`}>MobileNumber</label>
                        <input type="text" className={`${styles["form-control"]}`} name="mobilenumber" id="mobilenumber" value={video.mobilenumber} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="address" className={`${styles["form-label"]}`}>Address</label>
                        <input type="text" className={`${styles["form-control"]}`} name="address" id="address" value={video.address} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="bio" className={`${styles["form-label"]}`}>Bio</label>
                        <input type="text" className={`${styles["form-control"]}`} name="bio" id="bio" value={video.bio} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="website" className={`${styles["form-label"]}`}>Website</label>
                        <input type="text" className={`${styles["form-control"]}`} name="website" id="website" value={video.website} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="experience" className={`${styles["form-label"]}`}>Experience</label>
                        <input type="text" className={`${styles["form-control"]}`} name="experience" id="experience" value={video.experience} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="affiliation" className={`${styles["form-label"]}`}>Affiliation</label>
                        <input type="text" className={`${styles["form-control"]}`} name="affiliation" id="affiliation" value={video.affiliation} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="video" className={`${styles["form-label"]}`}>Upload Video</label>
                        <input type="file" accept="video/*" className={`${styles["form-control"]}`} id="video" name="video" onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="image" className={`${styles["form-label"]}`}>Upload Image</label>
                        <input type="file" accept="image/*" className={`${styles["form-control"]}`} id="image" name="image" onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <label htmlFor="socialmedialinks" className={`${styles["form-label"]}`}>SocialMedia Links</label>
                        <input type="text" className={`${styles["form-control"]}`} name="socialmedialinks" id="socialmedialinks" value={video.socialmedialinks} onChange={handleChange} required />
                    </div>
                    <div className={`${styles["mb-3"]}`}>
                        <button type="submit" className={`${styles.btn} ${styles["btn-primary"]}`}>Submit</button>
                    </div>
                </form>
                {error && <div className={`${styles.error}`}>{error}</div>}
            </div>
            <Videos />
        </>
    );
};

export default AddVideo;


// import React, { useState,useContext } from 'react';
// import videoContext from '../context/videos/videoContext';
// import Videos from "./Videos"
// const AddVideo= (props) => {
//     console.log('AddVideos component rendered');
//     const context=useContext(videoContext);
//     const {addVideo}=context;
//     const [video, setVideo] = useState({title:"",description:"",author:"",dateUploaded:"",video: null})
//     const handleClick=(e)=>{
//       e.preventDefault()
//       addVideo(video.title,video.description,video.author,video.dateUploaded,video.video);
//       setVideo({title:"",description:"",author:"",dateUploaded:"",video: null})
//       // props.showAlert("Added Note successfully","success")
//     }
//     const [files, setFiles] = useState([]);
//     const handleFileChange = (e) => {
//         setFiles(e.target.files);
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         for (let i = 0; i < files.length; i++) {
//             formData.append('file', files[i]); // Note the singular 'file' here
//         }

//         try {
//             const response = await fetch('http://localhost:5000/api/upload/addvideo', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (response.ok) {
//                 alert('Upload successful!');
//             } else {
//                 const result = await response.json();
//                 alert(`Upload failed: ${result.message}`);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Upload failed! Error: ' + error.message);
//         }
//     };
//     const onChange = (e) => {
//         if (e.target.name === "video") {
//           setVideo({ ...video, video: e.target.files[0] });
//         } else {
//           setVideo({ ...video, [e.target.name]: e.target.value });
//         }
//       };
//     return (
//         <>
//         <div className='container my-3'>
//         <h1>Upload Videos</h1>
//         <form  className="container my-3">
//             <div className="mb-3">
//                 <label htmlFor="title" className="form-label">Title</label>
//                 <input type="text" className="form-control" name="title" id="title"  value={video.title} onChange={onChange} required aria-describedby="emailHelp"/>
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="description" className="form-label">Description</label>
//                 <input type="text" className="form-control" name="description" id="description" value={video.description} onChange={onChange} required aria-describedby="emailHelp"/>
//             </div>
//             <div class="form-group">
//             <label for="dateInput">Select Date</label>
//             <input type="date" class="form-control" id="dateInput" value={video.dateUploaded} onChange={onChange} name="date"/>
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="author" className="form-label">Author</label>
//                 <input type="text" className="form-control" name="author" id="author" value={video.author} onChange={onChange} required aria-describedby="emailHelp"/>
//             </div>
//             <div className="mb-3">
//                 <input type="file" multiple accept="video/*" onChange={handleFileChange} />
//                 <button onSubmit={handleSubmit} type="submit" onClick={handleClick}>Upload</button>
//             </div>
//     </form>
//     </div>
//     <Videos/></>
//     );
// };

// export default AddVideo;