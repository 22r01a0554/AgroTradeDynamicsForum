import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./AddPost.module.css";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:"",mobilenumber:"",profession:"",address:""})
    const history=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password,mobilenumber,profession,address}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({name,email,password,mobilenumber,profession,address})
        });
        const json=await response.json()
        console.log(json)
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            history("/home")
            props.showAlert("Account Created Successfully","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const loginClick=(e)=>{
        history("/login")
    }
  return (
    <>
    <div className={`${styles.container} mb-3`}>
    <h1 className='mb-3'>Sign Up </h1>
    <form onSubmit={handleSubmit} className={`${styles.container} my-3`}>
    <div className="mb-3">
        <label htmlFor="name" className={`${styles["form-label"]}`}>Name</label>
        <input type="text" className={`${styles["form-control"]}`} id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="email" className={`${styles["form-label"]}`}>Email address</label>
        <input type="email" className={`${styles["form-control"]}`} id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className={styles.formText}>We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlFor="mobilenumber" className={`${styles["form-label"]}`}>Mobile Number</label>
        <input type="text" className={`${styles["form-control"]}`} id="mobilenumber" name="mobilenumber" onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="profession" className={`${styles["form-label"]}`}>Profession</label>
        <input type="text" className={`${styles["form-control"]}`} id="profession" name="profession" onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="address" className={`${styles["form-label"]}`}>Address</label>
        <input type="text" className={`${styles["form-control"]}`} id="address" name="address" onChange={onChange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="password" className={`${styles["form-label"]}`}>Password</label>
        <input type="password" className={`${styles["form-control"]}`} id="password" name="password" onChange={onChange} minLength={5} required/>
    </div>
    <div className="mb-3">
        <label htmlFor="cpassword" className={`${styles["form-label"]}`}>Confirm Password</label>
        <input type="password" className={`${styles["form-control"]}`} id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
    </div>    
    <button type="submit" className={`${styles.btn} btn-primary`}>Submit</button>
    </form>
    <button onClick={loginClick} className={`${styles.signupbtn}`}>Click here to Login</button>
    </div>
    </>
  )
}

export default Signup
