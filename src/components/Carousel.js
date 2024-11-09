import React from 'react'
import styles from './Carousal.module.css'; 

const Carousel = (props) => {
  const images = [
    props.image1, props.image2, props.image3, props.image4, props.image5,
    props.image6, props.image7, props.image8, props.image9, props.image10,
    props.image11, props.image12, props.image13, props.image14, props.image15,
    props.image16, props.image17, props.image18, props.image19, props.image20,
    props.image21, props.image22, props.image23, props.image24, props.image25
  ];

  // Duplicate the images array to create a seamless loop
  const allImages = [...images, ...images];

  return (
    <div className={styles.carousel}>
      <div className={styles.wrap}>
        {allImages.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Image${index + 1}`} />
        ))}
      </div>
    </div>
  )
}

export default Carousel


// import React from 'react'
// import styles from './Carousal.module.css'; 
// const Carousel = (props) => {
//   return (
//     <div className={styles.carousel}>
//         <div className={styles.wrap}>
//         <img src={props.image1} alt="I1"></img>
//         <img src={props.image2} alt="I2"></img>
//         <img src={props.image3} alt="I3"></img>
//         <img src={props.image4} alt="I4"></img>
//         <img src={props.image5} alt="I5"></img>
//         <img src={props.image6} alt="I6"></img>
//         <img src={props.image7} alt="I7"></img>
//         <img src={props.image8} alt="I8"></img>
//         <img src={props.image9} alt="I9"></img>
//         <img src={props.image10} alt="I10"></img>
//         <img src={props.image11} alt="I11"></img>
//         <img src={props.image12} alt="I12"></img>
//         <img src={props.image13} alt="I13"></img>
//         <img src={props.image14} alt="I14"></img>
//         <img src={props.image15} alt="I15"></img>
//         <img src={props.image16} alt="I16"></img>
//         <img src={props.image17} alt="I17"></img>
//         <img src={props.image18} alt="I18"></img>
//         <img src={props.image19} alt="I19"></img>
//         <img src={props.image20} alt="I20"></img>
//         <img src={props.image21} alt="I21"></img>
//         <img src={props.image22} alt="I22"></img>
//         <img src={props.image23} alt="I23"></img>
//         <img src={props.image24} alt="I24"></img>
//         <img src={props.image25} alt="I25"></img>
//       </div>
//     </div>
//   )
// }

// export default Carousel