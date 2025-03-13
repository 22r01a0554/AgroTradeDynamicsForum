import React from 'react';
import IndexCarousal from './IndexCarousal';
import { Link } from "react-router-dom";
import styles from './index.module.css';
export default function Index() {
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
    return (
        <div className={styles.bg} style={{ backgroundImage: `url('/img/bgimage1.jpg')` }}>
            <header className={styles.headerContainer}>
                <div className={styles.signupContainer}>
                    <Link to="/signup">
                    {/* <img src="/img/sign-up.png" alt="signup"/></Link> */}
                    <img src="/img/enroll.png" alt="signup"/></Link>
                    <Link to="/login"><img src="/img/login1.png" alt="login"/></Link>
                </div>
            </header>
            <div className={styles.textContainer}>
                <h1 id={styles.animatedText}>AGRO TRADE DYNAMICS FORUM</h1>
            </div>
            <div className={styles.carouselContainer}>
                <IndexCarousal images={Images} />
            </div>
        </div>
    );
}
