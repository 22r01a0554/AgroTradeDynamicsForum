import PostContext from "./postContext";
import { useState } from "react";
const PostState=(props)=>{
  const host="http://localhost:5000"
    const postsInitial=[]
      const [posts, setPosts] = useState(postsInitial)
       //Get all Posts Of a Specific User
       const getPosts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/fetchposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json=await response.json()
        setPosts(json)
      } 
      //Get all Posts of all Users
      const getAllPosts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/fetchallposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      
      //Add a Post
      const addPost = async (formData) => {
        // Make the API call
        try {
        const response = await fetch(`${host}/api/post/addpost`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem('token')
          },
          body: formData
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error:', errorText);
          throw new Error(errorText);
        }
        const post = await response.json();
        setPosts(posts.concat(post));
      }catch (error) {
        console.error('Error:', error);
    }
    };
      
      //Delete a Post
      const deletePost=async (id)=>{
        //TODO: API CALL
        const response = await fetch(`${host}/api/post/deletepost/${id}`, 
        {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json= response.json(); 
        console.log(json)
        const newPosts=posts.filter((post)=>{return post._id!==id})
        setPosts(newPosts)
      }
      //Edit a Post
      const editPost=async(id,category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village,imageFile)=>{
        //API Call
        const formData = new FormData();
        formData.append("category", category);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("expectedprice", expectedprice);
        formData.append("mobilenumber", mobilenumber);
        formData.append("address", address);
        formData.append("state", state);
        formData.append("district", district);
        formData.append("subdistrict",subdistrict);
        formData.append("village", village);
        if (imageFile) {
          formData.append('file', imageFile);
      }
      try{
        const response = await fetch(`${host}/api/post/updatepost/${id}`, {
          method: "PUT", 
          headers: {
            // "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: formData,
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error:', errorText);
          throw new Error(errorText);
        }
        const updatedPost = await response.json();
        const updatedPosts = posts.map(post => post._id === updatedPost._id ? updatedPost : post);
        setPosts(updatedPosts);

    } catch (error) {
      console.error('Error:', error);
    }
  };
    // Helper function for fetching data
    const fetchData = async (endpoint, method = "GET", headers = {}, body = null) => {
      try {
        const response = await fetch(`${host}${endpoint}`, {
          method,
          headers,
          body,
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Re-throw the error after logging it
      }
    };
  const fetchCategoryPosts = async (endpoint) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const json = await fetchData(endpoint, "GET", headers);
    setPosts(json);
  };

  // Category specific functions
  const vegetableposts = () => fetchCategoryPosts("/api/post/vegetableposts");
  const fruitsposts = () => fetchCategoryPosts("/api/post/fruitsposts");
  const cropposts = () => fetchCategoryPosts("/api/post/cropposts");
  const pulsesposts = () => fetchCategoryPosts("/api/post/pulsesposts");
  const grainsposts = () => fetchCategoryPosts("/api/post/grainsposts");
  const oilsposts = () => fetchCategoryPosts("/api/post/oilsposts");
  const dairyfarmposts = () => fetchCategoryPosts("/api/post/dairyfarmposts");
  const dryfruitposts = () => fetchCategoryPosts("/api/post/dryfruitposts");
  const masalaposts = () => fetchCategoryPosts("/api/post/masalaposts");
  const villagestapleposts = () => fetchCategoryPosts("/api/post/villagestapleposts");
  const villagespecialposts = () => fetchCategoryPosts("/api/post/villagespecialposts");
  const sweetsposts = () => fetchCategoryPosts("/api/post/sweetsposts");
  const airentalsposts = () => fetchCategoryPosts("/api/post/airentalsposts");
  const villagegoodsposts = () => fetchCategoryPosts("/api/post/villagegoodsposts");
  const agriculturetoolsposts = () => fetchCategoryPosts("/api/post/agriculturetoolsposts");
      // //Get all VegetablePosts of all Users
      // const vegetableposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/vegetableposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all FruitsPosts of all Users
      // const fruitsposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/fruitsposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all CropsPosts of all Users
      // const cropposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/cropposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Pulsesposts of all Users
      // const pulsesposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/pulsesposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Grainsposts of all Users
      // const grainsposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/grainsposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Oilsposts of all Users
      // const oilsposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/oilsposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Dairy Farm posts of all Users
      // const dairyfarmposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/dairyfarmposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Dry Fruits posts of all Users
      // const dryfruitposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/dryfruitposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all masala posts of all Users
      // const masalaposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/masalaposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Village Staple posts of all Users
      // const villagestapleposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/villagestapleposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Village Specials posts of all Users
      // const villagespecialposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/villagespecialposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Village Specials posts of all Users
      // const sweetsposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/sweetsposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Village Specials posts of all Users
      // const airentalsposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/airentalsposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Village Specials posts of all Users
      // const villagegoodsposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/villagegoodsposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
      // //Get all Agriculture Tools posts of all Users
      // const agriculturetoolsposts=async ()=>{
      //   //API Call
      //   const response = await fetch(`${host}/api/post/agriculturetoolsposts`, {
      //     method: "GET", 
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const json=await response.json()
      //   setPosts(json)
      // }
    return(
        <PostContext.Provider value={{
          posts,getPosts,getAllPosts,addPost,deletePost,editPost,
          vegetableposts,fruitsposts,cropposts,pulsesposts,grainsposts,
          oilsposts,dairyfarmposts,dryfruitposts,masalaposts,villagestapleposts,
          villagespecialposts,sweetsposts,airentalsposts,villagegoodsposts,agriculturetoolsposts
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
export default PostState


