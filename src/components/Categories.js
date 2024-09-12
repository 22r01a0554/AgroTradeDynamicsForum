import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

const Categories = () => {
  let navigate=useNavigate();
  const vegetablesClick=()=>{
    navigate("/vegetables")
  }
  const fruitsClick=()=>{
    navigate("/fruits")
  }
  const cropsClick=()=>{
    navigate("/crops")
  }
  const pulsesClick=()=>{
    navigate("/pulses")
  }
  const grainsClick=()=>{
    navigate("/grains")
  }
  const oilsClick=()=>{
    navigate("/oils")
  }
  const dairyfarmClick=()=>{
    navigate("/dairyfarm")
  }
  const dryFruitsClick=()=>{
    navigate("/dryfruits")
  }
  const masalasClick=()=>{
    navigate("/masalas")
  }
  const villagestaplesClick=()=>{
    navigate("/villagestaples")
  }
  const villagespecialsClick=()=>{
    navigate("/villagespecials")
  }
  const sweetsClick=()=>{
    navigate("/sweets")
  }
  return (
    <>
    <div className="mx-3 my-3" >
    <button type="button"  className="btn btn-outline-primary" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={vegetablesClick}><i className="fa-solid fa-cart-shopping" ></i>Vegetables</button>
    <button type="button" className="btn btn-outline-secondary" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={fruitsClick}><i className="fas fa-shopping-basket mr-2"></i>Fruits</button>
    <button type="button" className="btn btn-outline-success" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={cropsClick}><i className="fa-solid fa-truck-moving"></i>Crops</button>
    <button type="button" className="btn btn-outline-danger" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={pulsesClick}><i className="fa-solid fa-layer-group"></i>Pulses</button>
    <button type="button" className="btn btn-outline-danger" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={grainsClick}><i className="fa-solid fa-layer-group"></i>Grains</button>
    <button type="button" className="btn btn-outline-warning" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={oilsClick}><i className="fas fa-oil-can mr-2"></i>Oils</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={dairyfarmClick}><i className="fas fa-cow mr-2"></i>Dairy Farm</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={dryFruitsClick}><i className="fas fa-seedling mr-2"></i>DryFruits</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={masalasClick}><i className="fas fa-pepper-hot mr-2"></i>Masalas</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={villagestaplesClick}><i className="fas fa-store-alt mr-2"></i>Village Staples</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={villagespecialsClick}><i className="fas fa-store-alt mr-2"></i>Village Specials</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={sweetsClick}><i className="fas fa-candy-cane mr-2"></i>Sweets</button>
    </div>
    
    </>
  )
}

export default Categories
