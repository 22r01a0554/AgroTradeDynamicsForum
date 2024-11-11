// import React from 'react'
// import styles from './IndexCarousal.module.css'; 
// const IndexCarousal = () => {
//   return (
//     <div className={styles.carousel}>
//         <div className={styles.wrap}>
//         <img src="/img/CF1.jpeg" alt="I1"></img>
//         <img src="/img/home3.jpeg" alt="I2"></img>
//         <img src="/img/a5.png" alt="I3"></img>
//         <img src="/img/r(1).jpg" alt="I4"></img>
//         <img src="/img/r(2).jpg" alt="I5"></img>
//         <img src="/img/home1.jpg" alt="I6"></img>
//         <img src="/img/CF1.jpeg" alt="I7"></img>
//         <img src="/img/home3.jpeg" alt="I8"></img>
//         <img src="/img/a5.png" alt="I9"></img>
//       </div>
//     </div>
//   )
// }

// export default IndexCarousal

import React from 'react';
import PropTypes from 'prop-types';
import styles from './IndexCarousal.module.css';

const IndexCarousal = ({ images = [] }) => {
  return (
    <div className={styles.carousel}>
      <div className={styles.wrap}>
        {images.map((img, index) => (
          <img key={index} src={img} alt={`I${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

IndexCarousal.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

export default IndexCarousal;

