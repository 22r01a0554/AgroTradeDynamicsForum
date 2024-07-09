import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import { useState } from 'react';
const Home = () => {
  let navigate=useNavigate();
  const buyClick =  (e) => {
    e.preventDefault();
    // navigate("/buy"); 
    navigate("/buycategories")
    console.log("BuyClicked");
  };
  const postClick =  (e) => {
    e.preventDefault(); 
    navigate("/addpost"); 
  };
  const productsClick = (e) => {
    e.preventDefault(); 
    navigate("/posts"); 
    
  };
  const communityClick=(e)=>{
    e.preventDefault(); 
    navigate("/whatsapplinks"); 
  };
  const airentalsClick=(e)=>{
    e.preventDefault();
    navigate("/airentals")
  };
  const villagegoodsClick=(e)=>{
    e.preventDefault();
    navigate("/villagegoods")
  };
  const agriculturetoolsClick=(e)=>{
    e.preventDefault();    
    navigate("/agriculturetools")
  }


  
  return (
    <>
    <Navbar/>
    <Carousel/>
    <div className="mx-3 my-3" >
    <button type="button"  className="btn btn-outline-primary" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={proClick}><i className="fa-solid fa-cart-shopping" ></i>Pro</button>
    <button type="button"  className="btn btn-outline-primary" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={buyClick}><i className="fa-solid fa-cart-shopping" ></i>Buy</button>
    <button type="button" className="btn btn-outline-secondary" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={postClick}><i className="fa-solid fa-shop" ></i>Post Item</button>
    <button type="button" className="btn btn-outline-success" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={airentalsClick}><i className="fa-solid fa-truck-moving"></i>AI Rentals</button>
    <button type="button" className="btn btn-outline-danger" style={{ marginRight: '20px',height:'80px',width:'200px' }}><i className="fa-solid fa-layer-group"></i>Categories</button>
    <button type="button" className="btn btn-outline-warning" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={villagegoodsClick}><i className="fa-solid fa-message"></i>VillageGoods</button>
    <button type="button" className="btn btn-outline-info" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={agriculturetoolsClick}>AgricultureProducts And Tools</button>
    <button type="button" className="btn btn-outline-info" style={{ marginRight: '20px',height:'80px',width:'200px' }}>Info</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px', height: '80px', width: '200px' }} ><i className="fa-solid fa-user"></i> Agri Product Sellers</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={communityClick}><i className="fa-solid fa-people-group"></i>Community Groups</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={productsClick}><i className="fa-solid fa-people-group"></i>Your Products</button>
    </div>
    </>
  );
}

export default Home;
