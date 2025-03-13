import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS module

const Navbar = () => {
  let navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  const profileClick = () => {
    navigate("/profile")
  }

  let location = useLocation();

  return (
    <>
      <div>
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
          <div className={`container-fluid ${styles.containerFluid}`}>
            <Link className={`navbar-brand ${styles.navbarBrand}`} to="/home">Agro</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/allStoryBooks' ? styles.active : ''} ${styles.navLink}`} to="/allStoryBooks">Storybook</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/about' ? styles.active : ''} ${styles.navLink}`} to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/learning' ? styles.active : ''} ${styles.navLink}`} to="/learning">Learning</Link>
                </li>
              </ul>
              {localStorage.getItem('token') && (
                <>
                  <button onClick={profileClick} className={`btn ${styles.button}`}>Profile</button>
                  <button onClick={handleLogout} className={`btn ${styles.button}`}>Logout</button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

// import React from 'react'
// // import Home from './Home';
// import {  Link,useLocation } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// const Navbar = () => {
//   let history=useNavigate();
//   const handleLogout=()=>{
//     localStorage.removeItem('token');
//     history("/login");
//   }
//   const profileClick=()=>{
//     history("/profile")
//   }
//   let location = useLocation();
//   return (
//     <>
//     <div>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <Link className="navbar-brand" to="/home">Navbar</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//         <Link className={`nav-link ${location.pathname==='/home'?"active":""}`} to="/home">Home</Link>
//         </li>
//         <li className="nav-item">
//         <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
//         </li>
//         <li className="nav-item">
//         <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/learning">Learning</Link>
//         </li>
//       </ul>
//       {!localStorage.getItem('token')? "":<button onClick={profileClick} className='btn btn-primary'>Profile</button>
//       }
//       {!localStorage.getItem('token')? "":<button onClick={handleLogout} className='btn btn-primary'>Logout</button>
//       }
//     </div>
//   </div>
// </nav>
//     </div>

//     </>
//   )
// }

// export default Navbar
