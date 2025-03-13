import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import styles from './Home.module.css'
import IndexCarousal from './IndexCarousal';
const Home = () => {
  let navigate=useNavigate();
  const buyClick =  (e) => {
    e.preventDefault();
    // navigate("/buy"); 
    navigate("/buycategories")
    console.log("BuyClicked");
  };
  const postClick =  (e) => {
    e.preventDefault(); 
    navigate("/addpost"); 
  };
  const productsClick = (e) => {
    e.preventDefault(); 
    navigate("/posts"); 
    
  };
  const communityClick=(e)=>{
    e.preventDefault(); 
    navigate("/whatsapplinks"); 
  };
  const airentalsClick=(e)=>{
    e.preventDefault();
    navigate("/airentals")
  };
  const categoriesClick=(e)=>{
    e.preventDefault();
    navigate("/categories")
  };
  const villagegoodsClick=(e)=>{
    e.preventDefault();
    navigate("/villagegoods")
  };
  const agriculturetoolsClick=(e)=>{
    e.preventDefault();    
    navigate("/agriculturetools")
  }
  const agriProductClick = (e) => {
    e.preventDefault();
    navigate("/allAgriProductSellers");
  };
  const videosClick=(e)=>{
    e.preventDefault();
    navigate("/videos")
  }
  const uploadClick=(e)=>{
    e.preventDefault();
    navigate("/addvideo")
  }
  const uploadStoryBooksClick=(e)=>{
    e.preventDefault();
    navigate("/uploadStoryBook")
  }
  const allStoryBooksClick=(e)=>{
    e.preventDefault();
    navigate("/allStoryBooks")
  }
  const Images = [
    "/img/CF1.jpeg",
    "/img/home3.jpeg",
    "/img/a5.png",
    "/img/r(1).jpg",
    "/img/r(2).jpg",
    "/img/home1.jpg",
    "/img/CF1.jpeg",
    "/img/home3.jpeg",
    "/img/a5.png"
  ];
  const bumperBountyImages = [
    "/img/CF1.jpeg",
    "/img/home3.jpeg",
    "/img/a5.png",
    "/img/r(1).jpg",
    "/img/r(2).jpg",
    "/img/home1.jpg",
    "/img/CF1.jpeg",
    "/img/home3.jpeg",
    "/img/a5.png"
  ];
  return (
    <>
    <Navbar/>
    <div style={{marginTop:'20px'}}> 
        <IndexCarousal images={Images} />
    </div>
    <div className="mx-3 my-3" >
    <button type="button"  className="btn btn-outline-primary" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={buyClick}><i className="fa-solid fa-cart-shopping" ></i>Buy</button>
    <button type="button" className="btn btn-outline-secondary" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={postClick}><i className="fa-solid fa-shop" ></i>Post Item</button>
    <button type="button" className="btn btn-outline-success" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={airentalsClick}><i className="fa-solid fa-truck-moving"></i>AI Rentals</button>
    {/* <button type="button" className="btn btn-outline-danger" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={categoriesClick}><i className="fa-solid fa-layer-group"></i>Categories</button> */}
    <button type="button" className="btn btn-outline-warning" style={{marginRight: '20px',height:'80px',width:'200px' }} onClick={villagegoodsClick}><i className="fa-solid fa-message"></i>VillageGoods</button>
    <button type="button" className="btn btn-outline-info" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={agriculturetoolsClick}><i className="fa-solid fa-truck-moving"></i>AgricultureProducts And Tools</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' }} onClick={agriProductClick}><i className="fa-solid fa-user"></i>Agri Product Sellers</button>
    <button type="button" className="btn btn-outline-danger" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={productsClick}><i className="fa-solid fa-layer-group"></i>Your Products</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={communityClick}><i className="fa-solid fa-people-group"></i>Community Groups</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={videosClick}><i class="fa-solid fa-play"></i>Your Videos</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={uploadClick}><i class="fa-solid fa-video"></i> Upload Videos</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={uploadStoryBooksClick}><i class="fa-solid fa-address-book"></i>Upload StoryBooks</button>
    <button type="button" className="btn btn-outline-dark" style={{ marginRight: '20px',height:'80px',width:'200px' ,marginTop:'20px'}} onClick={allStoryBooksClick}><i class="fa-solid fa-book-open"></i>Your StoryBooks</button>
    </div>
    <div className={styles.section}>
        <p className={styles.sectionText}>Top Picks For You</p>
        <Carousel
          image1="/img/images/Pulses/Rajma.jpg"
          image2="/img/images/DairyFarm/Milk.jpg"
          image3="/img/images/Oils/CocunutOil1.avif"
          image4="/img/images/Grains/Barley.webp"
          image5="/img/images/Fruits/JackFruit1.avif"
          image6="/img/images/Sweets/ParwalMithai.jpg"
          image7="/img/images/Mango/Mango2(1).jpeg"
          image8="/img/images/DryFruits/cashewnuts.jpg"
          image9="/img/images/Mango/Mango9.jpg"
          image10="/img/images/Mango/Mango10.jpg"
          image11="/img/images/Mango/Mango11.jpg"
          image12="/img/images/Mango/Mango12.jpg"
          image13="/img/images/DryFruits/Ugba.avif"
          image14="/img/images/Sweets/kozukattapidi.avif"
          image15="/img/images/Mango/Mango15.jpg"
          image16="/img/images/Mango/Mango16.jpg"
          image17="/img/images/DryFruits/dryfruitsmix.jpg"
          image18="/img/images/Vegetables/capcicorm.jpg"
          image19="/img/images/Mango/Mango19.jpg"
          image20="/img/images/Grains/oats.avif"
          image21="/img/images/Sweets/KarwaChautBreakfast.avif"
          image22="/img/images/DryFruits/wallnuts1.avif"
          image23="/img/images/Mango/Mango23.jpg"
          image24="/img/images/DryFruits/driedfruitsassortment.jpg"
          image25="/img/images/Mango/Mango25.jpg"
        />
      </div>
      <div className={styles.section}>
        <p className={styles.sectionText}>Summer Special</p>
        <Carousel
          image1="/img/images/Mango/Mango2(1).jpeg"
          image2="/img/images/Fruits/Muskmelon.jpg"
          image3="/img/images/Mango/Mango10.jpg"
          image4="/img/images/Fruits/watermelon.avif"
          image5="/img/images/Vegetables/cucumber.avif"
          image6="/img/images/Mango/Mango4.jpg"
          image7="/img/images/Fruits/oranges.jpg"
          image8="/img/images/Fruits/peaches.avif"
          image9="/img/images/Fruits/blueberries.png"
          // image9="/img/Mango9.jpg"
          image10="/img/images/Fruits/grapes.avif"
          image11="/img/images/Fruits/JackFruit.avif"
          image12="/img/images/Fruits/grape1.avif"
          image13="/img/images/Fruits/DragonFruit.avif"
          image14="/img/images/Fruits/Guava1.avif"
          image15="/img/images/Fruits/Papaya.avif"
          image16="/img/images/Mango/Mango2(16).jpeg"
          image17="/img/images/Fruits/kiwi.avif"
          image18="/img/images/Fruits/strawberries.avif"
          image19="/img/images/Fruits/Sapto.avif"
          image20="/img/images/Fruits/Pomogranate.avif"
          image21="/img/images/Fruits/rasberries.jpg"
          image22="/img/images/Fruits/pineapple1.jpg"
          image23="/img/images/Fruits/Banana1.avif"
          image24="/img/images/Mango/Mango2(14).jpeg"
          image25="/img/images/Fruits/GreenApple.avif"
        />
      </div>
      {/* <div className={styles.section}>
        <p className={styles.sectionText}>Today's Bumper Bounty</p>
        <IndexCarousal/>
      </div> */}
      <div className={styles.section}>
        <p className={styles.sectionText}>Today's Bumper Bounty</p>
        <IndexCarousal images={bumperBountyImages} />
      </div>
   </>
  );
}

export default Home;
