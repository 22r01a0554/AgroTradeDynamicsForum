import React from 'react';
import AgriProductSellers from './AgriProductSellers'
import { useNavigate } from 'react-router-dom';
import styles from './sellers.module.css'; 
const AllAgriProductSellers = () => {
  let navigate = useNavigate();

  const agriProductClick = (e) => {
    e.preventDefault();
    navigate("/addAgriProductSellers");
  };

  return (
    <>
    <div className={styles.agroSellerContainer}>
      <div className={styles.agroSellerContent}>
        <h2 className={styles.highlightText}>Want to become an agro seller?</h2>
        <p className={styles.contentText}>Start selling your agricultural products today.</p>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGreen}`}
          onClick={agriProductClick}
        >
          Become a Seller
        </button>
      </div>
    </div>
    <AgriProductSellers />
    </>
  );
};

export default AllAgriProductSellers;
