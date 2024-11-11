import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./AddPost.module.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history("/home");
      props.showAlert("Logged in Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const signupClick = (e) => {
    history("/signup");
  }

  return (
    <>
      <div className={`${styles.container} my-3`}>
      <h1 className='mb-3'>Login</h1>
        <form onSubmit={handleSubmit} className={`${styles.container} my-3`}>
          <div className="mb-3">
            <label htmlFor="email" className={`${styles["form-label"]}`}>Email address</label>
            <input type="email" className={`${styles["form-control"]}`} id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className={`${styles["form-label"]}`}>Password</label>
            <input type="password" className={`${styles["form-control"]}`} id="password" name="password" onChange={onChange} value={credentials.password} />
          </div>
          <button type="submit" className={`${styles.btn}`}>Submit</button>
        </form>
        <button onClick={signupClick} className={`${styles.signupbtn}`}>Click here to Signup</button>
      </div>
    </>
  );
}

export default Login;
