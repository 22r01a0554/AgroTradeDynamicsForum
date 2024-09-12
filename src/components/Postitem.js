import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import postContext from '../context/posts/postContext';
import styles from './Postitem.module.css';

const Postitem = (props) => {
  const location = useLocation();
  const context = useContext(postContext);
  const { deletePost } = context;
  const { post, updatePost } = props;

  const hideIconsPaths = [
    '/buy', '/vegetables', '/fruits', '/pulses', '/grains', '/oils',
    '/dairyfarm', '/dryfruits', '/masalas', '/villagestaples', '/villagespecials',
    '/sweets', '/buycategories', '/airentals', '/villagegoods', '/agriculturetools'
  ];

  return (
    <div className="col-md-4">
      <div className={`${styles.card} card my-3`}>
        <img src={`http://localhost:5000/images/${post.filename}`} className={`${styles.cardImgTop} card-img-top`} alt={post.title} />
        <div className={`${styles.cardBody} card-body`}>
          <div className={styles.profileDetails}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Title:</span>
              <span className={`${styles.cardTitle} card-title`}>{post.title}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Category:</span>
              <span className={`${styles.cardText} card-text`}>{post.category}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Description:</span>
              <span className={`${styles.cardText} card-text`}>{post.description}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Quantity:</span>
              <span className={`${styles.cardText} card-text`}>{post.quantity}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Expected Price:</span>
              <span className={`${styles.cardText} card-text`}>{post.expectedprice}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Mobile Number:</span>
              <span className={`${styles.cardText} card-text`}>{post.mobilenumber}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Address:</span>
              <span className={`${styles.cardText} card-text`}>{post.address}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>State:</span>
              <span className={`${styles.cardText} card-text`}>{post.state}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>District:</span>
              <span className={`${styles.cardText} card-text`}>{post.district}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Sub District:</span>
              <span className={`${styles.cardText} card-text`}>{post.subdistrict}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Village:</span>
              <span className={`${styles.cardText} card-text`}>{post.village}</span>
            </div>
            <div className={`${styles.dFlex} d-flex align-items-center`}>
            <a href={`tel:${post.mobilenumber}`} className={styles.btn}>Call</a>
              {!hideIconsPaths.includes(location.pathname) && (
                <>
                  <i className={`fa-solid fa-pen-to-square mx-2 ${styles.faPen}`} onClick={() => updatePost(post)}></i>
                  <i className={`fa-solid fa-trash mx-2 ${styles.faTrash}`} onClick={() => deletePost(post._id)}></i>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postitem;
