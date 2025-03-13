import React, { useEffect, useState } from "react";
import styles from "./AllStorybooks.module.css"; 
const AllStorybooks = () => {
  const [storybooks, setStorybooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/storybooks/allStoryBooks")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging
        if (data.success && Array.isArray(data.data)) {
          setStorybooks(data.data);
        } else {
          console.error("Failed to fetch storybooks");
        }
      })
      .catch((error) => console.error("Error fetching storybooks:", error));
  }, []);

  function getDriveImageUrl(driveLink) {
    if (!driveLink) return "";
    const match = driveLink.match(/\/d\/([^/]+)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : driveLink;
  }

  return (
    <div className={styles.container}>
      <h2>📚 All Storybooks</h2>
      <div className={styles.storybookGrid}>
        {storybooks.length > 0 ? (
          storybooks.map((story) =>
            story ? (
              <div key={story._id} className={styles.storybookCard}>
                {/* Story Title & Description */}
                <div className={styles.storyDetails}>
                  <h3>📖 Title: {story.title || "No Title"}</h3>
                  <p>📝 Description: {story.description || "No description available"}</p>
                </div>

                {/* Author Details */}
                <div className={styles.authorContainer}>
                  {/* <img
                    src={getDriveImageUrl(story.authorPhoto)}
                    alt={story.author || "Unknown Author"}
                    className={styles.authorPhoto}
                  /> */}
                  <div>
                    <strong>👤 Author: {story.author || "Unknown Author"}</strong>
                    <p>📧 Email: {story.authorEmail || "No email available"}</p>
                  </div>
                </div>

                {/* Cover Image */}
                {/* <div className={styles.coverImageContainer}>
                  <img
                    src={getDriveImageUrl(story.coverImage)}
                    alt="Cover Page"
                    className={styles.coverImage}
                  />
                </div> */}

                {/* Buttons */}
                <div className={styles.buttonContainer}>
                  <a
                    href={getDriveImageUrl(story.authorPhoto)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.storybookButton}
                  >
                    🖼️ Author Pic
                  </a>
                  <a
                    href={getDriveImageUrl(story.coverImage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.storybookButton}
                  >
                    📖 Cover Page
                  </a>
                  <a
                    href={story.storyFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.storybookButton}
                  >
                    📚 Read Story
                  </a>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p className={styles.loadingText}>Loading storybooks...</p>
        )}
      </div>
    </div>
  );
};

export default AllStorybooks;
