import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import styles from './AuthorDetails.module.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const AuthorDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/upload/author/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video');
        }
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    
    fetchVideo();
  }, [id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} card my-3`}>
        <img
          src={`http://localhost:5000/images/${video.imageFilename}`}
          className={`${styles.cardImgTop} ${styles.circularImg}`}
          alt="Author"
          onClick={openModal}
        />
        <div className={`${styles.cardBody} card-body`}>
          <div className={styles.profileDetails}>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Author:</span>
              <span className={styles.profileText}>{video.author}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Email:</span>
              <span className={styles.profileText}>{video.email}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Mobile Number:</span>
              <span className={styles.profileText}>{video.mobilenumber}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Address:</span>
              <span className={styles.profileText}>{video.address}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Bio:</span>
              <span className={styles.profileText}>{video.bio}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Website:</span>
              <span className={styles.profileText}>{video.website}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Experience:</span>
              <span className={styles.profileText}>{video.experience}</span>
            </div>
            <div className={styles.profileItem}>
              <span className={styles.profileLabel}>Affiliation:</span>
              <span className={styles.profileText}>{video.affiliation}</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Full Image"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <img
          src={`http://localhost:5000/images/${video.imageFilename}`}
          className={styles.fullImage}
          alt="Author"
        />
        <button onClick={closeModal} className={styles.closeButton}>Close</button>
      </Modal>
    </div>
  );
};

export default AuthorDetails;
