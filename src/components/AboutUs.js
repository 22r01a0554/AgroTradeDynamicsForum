import React, { useState, useEffect } from 'react';
import './AboutUs.css';

const achievements = [
  {
    text: 'Lavanya has over 20 years of experience in the agricultural industry.',
    image: '/img/Team/la.jpg',
  },
  {
    text: 'She is dedicated to promoting sustainable farming practices.',
    image: '/img/Team/la.jpg',
  },
  {
    text: 'Founder of AgroTradeDynamicsForum, a platform for agricultural innovation.',
    image: '/img/Team/la.jpg',
  },
  {
    text: 'Passionate about empowering farmers with AI-driven tools and technologies.',
    image: '/img/Team/la.jpg',
  },
  {
    text: 'Lavanya believes in the power of community collaboration for agricultural growth.',
    image: '/img/Team/la.jpg',
  },
  {
    text: 'Advocating for government policies that support sustainable farming practices.',
    image: '/img/Team/la.jpg',
  },
  {
    text: 'Regularly involved in farm-to-table initiatives, promoting organic farming.',
    image: '/img/Team/la.jpg',
  },
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move to the next profile every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? achievements.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="about-us">
      <section className="intro">
        <h1>About AgroTradeDynamicsForum</h1>
        <p>
          AgroTradeDynamicsForum is a platform designed to advance the agricultural industry through collaboration, innovation, and sustainable practices. Our mission is to connect farmers, agronomists, researchers, and industry professionals to share knowledge and drive the future of agriculture.
        </p>
      </section>

      <section className="achievements">
        <h2>Achievements & Interests of Lavanya</h2>

        <div className="achievement">
          <div className="achievement-image">
            <img
              src={achievements[currentIndex].image}
              alt={`Lavanya - ${currentIndex + 1}`}
            />
          </div>
          <div className="achievement-content">
            {achievements[currentIndex].text}
          </div>
        </div>

        <div className="slider-controls">
          <button className="prev" onClick={prevSlide}>
            Prev
          </button>
          <button className="next" onClick={nextSlide}>
            Next
          </button>
        </div>

        {/* Slide indicator */}
        <div className="slide-indicator">
          {achievements.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;



