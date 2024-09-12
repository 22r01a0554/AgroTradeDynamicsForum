import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import sellerContext from '../context/sellers/sellerContext';
import styles from './Selleritem.module.css';

const Selleritem = (props) => {
  const location = useLocation();
  const context = useContext(sellerContext);
  const { deleteAgriProductSeller } = context;
  const { seller, updateAgriProductSeller } = props;
  const hideIconsPaths = [];
  return (
    <div className="col-md-4">
      <div className={`${styles.card} card my-3`}>
        <img src={`http://localhost:5000/sellerimages/${seller.filename}`} className={`${styles.cardImgTop} card-img-top`} alt={seller.name} />
        <div className={`${styles.cardBody} card-body`}>
          <div className={styles.profileDetails}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Category:</span>
              <span className={`${styles.cardTitle} card-title`}>{seller.category}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Name:</span>
              <span className={`${styles.cardText} card-text`}>{seller.name}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Email:</span>
              <span className={`${styles.cardText} card-text`}>{seller.email}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Mobile Number:</span>
              <span className={`${styles.cardText} card-text`}>{seller.mobilenumber}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Address:</span>
              <span className={`${styles.cardText} card-text`}>{seller.address}</span>
            </div>
            <div className={`${styles.dFlex} d-flex align-items-center`}>
            <Link 
            to={`/seller/fetchagriproductseller/${seller._id}`} className={styles.btn}>About Seller</Link>
              {!hideIconsPaths.includes(location.pathname) && (
                <>
                  <i className={`fa-solid fa-pen-to-square mx-2 ${styles.faPen}`}  onClick={() => updateAgriProductSeller(seller)}></i>
                  <i className={`fa-solid fa-trash mx-2 ${styles.faTrash}`} onClick={() => deleteAgriProductSeller(seller._id)}></i>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selleritem;
