import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.js';
import styles from './Profile.module.css';

const Profile = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData({ name: data.name, email: data.email ,mobilenumber:data.mobilenumber,profession:data.profession,address:data.address});
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className={styles.profileContainer}>
      <div className={styles.profileForm}>
        <div className={styles.profileIcon}>
          <i className="fas fa-user-circle"></i>
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Name:</span>
            <span className={styles.profileData}>{userData.name}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Email:</span>
            <span className={styles.profileData}>{userData.email}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Mobile Number:</span>
            <span className={styles.profileData}>{userData.mobilenumber}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Profession:</span>
            <span className={styles.profileData}>{userData.profession}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Address:</span>
            <span className={styles.profileData}>{userData.address}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;

