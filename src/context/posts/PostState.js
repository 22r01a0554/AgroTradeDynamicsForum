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
      const addPost=async (category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village)=>{
        //TODO: API CALL
        //API Call
        const response = await fetch(`${host}/api/post/addpost`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village}), 
        });
        const post=await response.json();
        setPosts(posts.concat(post))
      }
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
      const editPost=async(id,category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village)=>{
        //API Call
        const response = await fetch(`${host}/api/post/updatepost/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village}), 
        });
        const json=await response.json(); 
        console.log(json)
        let newPosts=JSON.parse(JSON.stringify(posts))
        //Logic to edit in client
        for (let index = 0; index < posts.length; index++) {
          const element = posts[index];
          if(element._id===id){
            newPosts[index].title=title;
            newPosts[index].category=category;
            newPosts[index].description=description;
            newPosts[index].quantity=quantity;
            newPosts[index].expectedprice=expectedprice;
            newPosts[index].mobilenumber=mobilenumber
            newPosts[index].address=address;
            newPosts[index].state=state;
            newPosts[index].district=district;
            newPosts[index].subdistrict=subdistrict;
            newPosts[index].village=village
            break;
          }
        }
        setPosts(newPosts);
      }
      //Get all VegetablePosts of all Users
      const vegetableposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/vegetableposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all FruitsPosts of all Users
      const fruitsposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/fruitsposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all CropsPosts of all Users
      const cropposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/cropposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Pulsesposts of all Users
      const pulsesposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/pulsesposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Grainsposts of all Users
      const grainsposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/grainsposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Oilsposts of all Users
      const oilsposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/oilsposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Dairy Farm posts of all Users
      const dairyfarmposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/dairyfarmposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Dry Fruits posts of all Users
      const dryfruitposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/dryfruitposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all masala posts of all Users
      const masalaposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/masalaposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Village Staple posts of all Users
      const villagestapleposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/villagestapleposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Village Specials posts of all Users
      const villagespecialposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/villagespecialposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Village Specials posts of all Users
      const sweetsposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/sweetsposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Village Specials posts of all Users
      const airentalsposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/airentalsposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Village Specials posts of all Users
      const villagegoodsposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/villagegoodsposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
      //Get all Agriculture Tools posts of all Users
      const agriculturetoolsposts=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/post/agriculturetoolsposts`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setPosts(json)
      }
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


// import PostContext from "./postContext";
// import { useState } from "react";
// const PostState=(props)=>{
//   const host="http://localhost:5000"
//     const postsInitial=[]
//       const [posts, setPosts] = useState(postsInitial)
//        //Get all Posts Of a Specific User
//        const getPosts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/fetchposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token":localStorage.getItem('token')
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       } 
//       //Get all Posts of all Users
//       const getAllPosts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/fetchallposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Add a Post
//       const addPost=async (category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village)=>{
//         //TODO: API CALL
//         //API Call
//         const response = await fetch(`${host}/api/post/addpost`, {
//           method: "POST", 
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token":localStorage.getItem('token')
//           },
//           body: JSON.stringify({category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village}), 
//         });
//         const post=await response.json();
//         setPosts(posts.concat(post))
//       }
//       //Delete a Post
//       const deletePost=async (id)=>{
//         //TODO: API CALL
//         const response = await fetch(`${host}/api/post/deletepost/${id}`, 
//         {
//           method: "DELETE", 
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token":localStorage.getItem('token')
//           },
//         });
//         const json= response.json(); 
//         console.log(json)
//         const newPosts=posts.filter((post)=>{return post._id!==id})
//         setPosts(newPosts)
//       }
//       //Edit a Post
//       const editPost=async(id,category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village)=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/updatepost/${id}`, {
//           method: "PUT", 
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token":localStorage.getItem('token')
//           },
//           body: JSON.stringify({category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village}), 
//         });
//         const json=await response.json(); 
//         console.log(json)
//         let newPosts=JSON.parse(JSON.stringify(posts))
//         //Logic to edit in client
//         for (let index = 0; index < posts.length; index++) {
//           const element = posts[index];
//           if(element._id===id){
//             newPosts[index].title=title;
//             newPosts[index].category=category;
//             newPosts[index].description=description;
//             newPosts[index].quantity=quantity;
//             newPosts[index].expectedprice=expectedprice;
//             newPosts[index].mobilenumber=mobilenumber
//             newPosts[index].address=address;
//             newPosts[index].state=state;
//             newPosts[index].district=district;
//             newPosts[index].subdistrict=subdistrict;
//             newPosts[index].village=village
//             break;
//           }
//         }
//         setPosts(newPosts);
//       }
//       //Get all VegetablePosts of all Users
//       const vegetableposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/vegetableposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all FruitsPosts of all Users
//       const fruitsposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/fruitsposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all CropsPosts of all Users
//       const cropposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/cropposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Pulsesposts of all Users
//       const pulsesposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/pulsesposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Grainsposts of all Users
//       const grainsposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/grainsposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Oilsposts of all Users
//       const oilsposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/oilsposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Dairy Farm posts of all Users
//       const dairyfarmposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/dairyfarmposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Dry Fruits posts of all Users
//       const dryfruitposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/dryfruitposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all masala posts of all Users
//       const masalaposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/masalaposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Village Staple posts of all Users
//       const villagestapleposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/villagestapleposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Village Specials posts of all Users
//       const villagespecialposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/villagespecialposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//       //Get all Village Specials posts of all Users
//       const sweetsposts=async ()=>{
//         //API Call
//         const response = await fetch(`${host}/api/post/sweetsposts`, {
//           method: "GET", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const json=await response.json()
//         setPosts(json)
//       }
//     return(
//         <PostContext.Provider value={{
//           posts,getPosts,getAllPosts,addPost,deletePost,editPost,
//           vegetableposts,fruitsposts,cropposts,pulsesposts,grainsposts,
//           oilsposts,dairyfarmposts,dryfruitposts,masalaposts,villagestapleposts,
//           villagespecialposts,sweetsposts
//         }}>
//             {props.children}
//         </PostContext.Provider>
//     )
// }
// export default PostState