import React, { useEffect, useState, useContext } from 'react';
import { useParams} from 'react-router-dom';
import sellerContext from '../context/sellers/sellerContext';
import styles from './Selleritem.module.css';

const SellerDetails = (props) => {
  const { id } = useParams();
  const context = useContext(sellerContext);
  const { getAgriProductSellerid } = context;
  const [seller, setSeller] = useState(null);
  // Fetch seller details based on ID
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const fetchedSeller = await getAgriProductSellerid(id);
        setSeller(fetchedSeller);
      } catch (error) {
        console.error('Error fetching seller:', error);
      }
    };
    fetchSeller();
  }, [id, getAgriProductSellerid]);

  if (!seller) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className={`${styles.card} card`}>
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
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Farm Name(Optional):</span>
              <span className={`${styles.cardText} card-text`}>{seller.farmname}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Farm Location(Optional):</span>
              <span className={`${styles.cardText} card-text`}>{seller.farmlocation}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Type Of Farm(Optional):</span>
              <span className={`${styles.cardText} card-text`}>{seller.typeoffarm}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>FarmingMethods:</span>
              <span className={`${styles.cardText} card-text`}>{seller.farmingmethods}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Social Media Links:</span>
              <span className={`${styles.cardText} card-text`}>{seller.socialmedialinks}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Description About Farmer:</span>
              <span className={`${styles.cardText} card-text`}>{seller.desc}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;
