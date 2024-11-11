import React from 'react'
import { useNavigate } from 'react-router-dom'

const VideoCategories = () => {
  let navigate=useNavigate();
  const typesofcropsClick=()=>{
    navigate("/typesofcrops")
  }
  const raisinganimalsClick=()=>{
    navigate("/raisinganimals")
  }
  const specialplantsandproductsClick=()=>{
    navigate("/specialplantsandproducts")
  }
  const growingtechniquesClick=()=>{
    navigate("/growingtechniques")
  }
  const toolsandresourcesClick=()=>{
    navigate("/toolsandresources")
  }
  const sellingandmarketingClick=()=>{
    navigate("/sellingandmarketing")
  }
  const newideasandinnovationsClick=()=>{
    navigate("/newidesandinnovation")
  }
  const governmentandpoliciesClick=()=>{
    navigate("/governmentandpolicies")
  }
  const learningandeducationClick=()=>{
    navigate("/learningandeducation")
  }
  return (
    <>
    <div className="mx-3 my-3" >
    <button type="button"  className="btn btn-outline-primary" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={typesofcropsClick}><i className="fa-solid fa-cart-shopping" ></i>Types of Crops</button>
    <button type="button" className="btn btn-outline-secondary" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={raisinganimalsClick}><i className="fa-solid fa-shop" ></i>Raising Animals</button>
    <button type="button" className="btn btn-outline-success" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={specialplantsandproductsClick}><i className="fa-solid fa-truck-moving"></i>Special Plants and Products</button>
    <button type="button" className="btn btn-outline-danger" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={growingtechniquesClick}><i className="fa-solid fa-layer-group"></i>Growing Techniques</button>
    <button type="button" className="btn btn-outline-danger" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={toolsandresourcesClick}><i className="fa-solid fa-layer-group"></i>Tools and Resources</button>
    <button type="button" className="btn btn-outline-warning" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={sellingandmarketingClick}><i className="fa-solid fa-message"></i>Selling and Marketing</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={newideasandinnovationsClick}><i className="fa-solid fa-user"></i>New Ideas and Innnovations</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={governmentandpoliciesClick}><i className="fa-solid fa-people-group"></i>Government and Policies</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={learningandeducationClick}><i className="fa-solid fa-people-group"></i>Learning and Education</button>
    </div>
    </>
  )
}

export default VideoCategories
