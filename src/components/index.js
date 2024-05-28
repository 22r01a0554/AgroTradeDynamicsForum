import React, { useState, useEffect } from 'react';
import {  Link } from "react-router-dom";
export default function Index() {
    const [currentImage, setCurrentImage] = useState(0);
    const imageWrappers = [
        '/img/CF1.jpeg',
        '/img/home3.jpeg',
        '/img/r(3).jpg',
        '/img/a5.png',
        '/img/r(1).jpg',
        '/img/r(2).jpg'
    ];
    useEffect(() => {
        const carouselInterval = setInterval(() => {
            setCurrentImage(current => (current === imageWrappers.length - 1 ? 0 : current + 1));
        }, 3000); // Adjust the interval time in milliseconds
        
        return () => clearInterval(carouselInterval);
    }, [imageWrappers.length]);

    return (
        <div className="bg" style={{ backgroundImage: `url('/img/bgimage1.jpg')` }}>
            <header>
                <div className="signup-container">
                    <Link to="/signup"><img src="/img/sign-up.png" alt="signup"/></Link>
                    <Link to="/login"><img src="/img/login.svg" alt="login"></img></Link>
                </div>
            </header>
            <div className="text-container">
                <h1 id="animated-text">AGRO TRADE DYNAMICS FORUM</h1>
            </div>
            <div className="content-container carousel">
                {imageWrappers.map((image, index) => (
                    <Link to="/" className={`image-wrapper ${index === currentImage ? 'active' : ''}`} key={index}>
                        <img src={image} alt={`I ${index + 1}`} />
                    </Link>
                ))}
            </div>
            <div className="carousel-nav">
                <i className="prev fas fa-chevron-left" onClick={() => setCurrentImage(current => (current === 0 ? imageWrappers.length - 1 : current - 1))}></i>
                <i className="next fas fa-chevron-right" onClick={() => setCurrentImage(current => (current === imageWrappers.length - 1 ? 0 : current + 1))}></i>
            </div>
        </div>
    );
}
