import React, { useState } from "react";
import "./AddStorybook.css"; // Import the CSS file

const AddStorybook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorEmail: "",
    description: "",
    coverImage: null,
    authorPhoto: null,
    storyFile: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coverImage || !formData.storyFile) {
      alert("Please upload a cover image and a story file.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("author", formData.author);
    uploadData.append("authorEmail", formData.authorEmail);
    uploadData.append("description", formData.description);
    uploadData.append("coverImage", formData.coverImage);
    uploadData.append("authorPhoto", formData.authorPhoto);
    uploadData.append("storyFile", formData.storyFile);

    try {
      const response = await fetch("http://localhost:5000/api/storybooks/uploadStoryBook", {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
      }

      alert("Storybook uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed! Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Storybook</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
        <input type="email" name="authorEmail" placeholder="Author Email" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <label>Cover Image:</label>
        <input type="file" name="coverImage" accept="image/*" onChange={handleFileChange} required />
        <label>Author Photo:</label>
        <input type="file" name="authorPhoto" accept="image/*" onChange={handleFileChange} required />
        <label>Story File (PDF/DOCX/DOC):</label>
        <input type="file" name="storyFile" accept=".pdf,.docx,.doc" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AddStorybook;
