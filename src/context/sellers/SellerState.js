import React, { useState } from 'react';
import SellerContext from "./sellerContext";
const SellerState=(props)=>{
  const host="http://localhost:5000"
      const sellersInitial=[]
      const [sellers, setSellers] = useState(sellersInitial)
        //Get details Of a Specific User
          const getAgriProductSeller=async ()=>{
              //API Call
              const response = await fetch(`${host}/api/seller/fetchagriproductseller`, {
                method: "GET", 
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
              });
              const json=await response.json()
              setSellers(json)
            } 
            //Get details Of a Specific User With Provided Id
            const getAgriProductSellerid = async (id) => {
              // API Call
              const response = await fetch(`${host}/api/seller/fetchagriproductseller/${id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
                },
              });
              const json = await response.json();
              return json;
            }
            
      //Get all details of all AgriProductSellers
      const getAllAgriProductSellers=async ()=>{
        //API Call
        const response = await fetch(`${host}/api/seller/fetchallagriproductsellers`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json=await response.json()
        setSellers(json)
      }
      //Add a AgriProductSeller
      const addAgriProductSeller=async (formData)=>{
        //TODO: API CALL
        //API Call
        try {
          const response = await fetch(`${host}/api/seller/addAgriProductSeller`, {
            method: "POST",
            headers: {
              // "Content-Type": "application/json", // Remove this line
              "auth-token": localStorage.getItem('token')
            },
            body: formData,
            credentials: 'include'
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            throw new Error(errorText);
          }
      
          const seller = await response.json();
          setSellers([...sellers, seller]);
          // setSellers(seller.concat(seller))
        } catch (error) {
          console.error("Failed to add seller:", error);
        }
        
      }
      //Delete a AgriProductSeller
      const deleteAgriProductSeller=async (id)=>{
        //TODO: API CALL
        const response = await fetch(`${host}/api/seller/deleteagriproductseller/${id}`, 
        {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json= response.json(); 
        console.log(json)
        const newSellers=sellers.filter((seller)=>{return seller._id!==id})
        setSellers(newSellers)
      }
      //Edit a Agri Product Seller
      const editAgriProductSeller=async(id,category,name,email,mobilenumber,address,farmname,farmlocation,typeoffarm,farmingmethods,socialmedialinks,desc,imageFile)=>{
        //API Call
        const formData = new FormData();
        formData.append("category", category);
        formData.append("name",name);
        formData.append("email", email);
        formData.append("mobilenumber", mobilenumber);
        formData.append("address", address);
        formData.append("farmname",farmname);
        formData.append("farmlocation",farmlocation);
        formData.append("typeoffarm",typeoffarm);
        formData.append("farmingmethods",farmingmethods);
        formData.append("socialmedialinks",socialmedialinks);
        formData.append("desc",desc);
        if (imageFile) {
          formData.append('file', imageFile);
      }
        try {
        const response = await fetch(`${host}/api/seller/updateagriproductseller/${id}`, {
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
        const updatedSeller = await response.json();
        const updatedSellers = sellers.map(seller => seller._id === updatedSeller._id ? updatedSeller : seller);
        // let newSellers=JSON.parse(JSON.stringify(sellers))
        //Logic to edit in client
        // for (let index = 0; index < sellers.length; index++) {
        //   const element = newSellers[index];
        //   if(element._id===id){
        //     newSellers[index].name=name;
        //     newSellers[index].email=email;
        //     break;
        //   }
        // }
        setSellers(updatedSellers);
        } catch (error) {
      console.error("Failed to edit seller", error);
    }
      };
    return(
        <SellerContext.Provider value={{
          sellers,addAgriProductSeller,
          getAgriProductSeller,
          getAgriProductSellerid,
          getAllAgriProductSellers,
          deleteAgriProductSeller,
          editAgriProductSeller
        }}>
            {props.children}
        </SellerContext.Provider>
    )
}
export default SellerState


