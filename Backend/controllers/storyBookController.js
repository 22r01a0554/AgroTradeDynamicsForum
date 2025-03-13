const { google } = require("googleapis");
const Storybook = require("../models/Storybook"); 
const stream = require("stream");
const path = require("path");
require("dotenv").config();
// Google Drive Setup
const auth = new google.auth.GoogleAuth({
  keyFile: "D:/AgroTradeDynamicsForumGit/Backend/google-drive-key.json",
  scopes: ["https://www.googleapis.com/auth/drive"]
});
const drive = google.drive({ version: "v3", auth });
// Upload file to Google Drive
const uploadFileToDrive = async (fileBuffer, fileName, mimeType) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileBuffer);
  const FOLDER_ID = "1SWtHQIRglT9jZu8WaDK0PhFAoPxrMgKg";  
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: mimeType,
      parents: [FOLDER_ID], 
    },
    media: {
      mimeType: mimeType,
      body: bufferStream,
    },
  });
  console.log("Drive API Response:", response.data);  
  return `https://drive.google.com/file/d/${response.data.id}/view`;
};
const uploadStorybook = async (req, res) => {
  try {
    const { title, author, authorEmail, description } = req.body;
    const coverImage = req.files?.["coverImage"]?.[0];
    const storyFile = req.files?.["storyFile"]?.[0];
    const authorPhoto = req.files?.["authorPhoto"]?.[0];

    if (!coverImage || !storyFile || !authorPhoto) {      
      return res.status(400).json({ message: "Cover image and story file are required." });
    }
    console.log("Uploading files to Google Drive...");
    // Upload files to Google Drive
    const coverImageUrl = await uploadFileToDrive(
            coverImage.buffer,
            coverImage.originalname,
            coverImage.mimetype,
            process.env.DRIVE_FOLDER_ID
          );
    const authorPhotoUrl = await uploadFileToDrive(
      authorPhoto.buffer,
      authorPhoto.originalname,
      authorPhoto.mimetype,
      process.env.DRIVE_FOLDER_ID
    );
    // Upload story file to Google Drive
    const storyFileUrl = await uploadFileToDrive(
      storyFile.buffer,
      storyFile.originalname,
      storyFile.mimetype,
      process.env.DRIVE_FOLDER_ID
    );

    if (!coverImageUrl || !storyFileUrl || !authorPhotoUrl) {
      return res.status(400).json({ error: "Cover image and story file  and authorphoto url are required" });
    }

    const newStorybook = new Storybook({
      title,
      author,
      authorEmail,
      description,
      coverImage: coverImageUrl,
      storyFile: storyFileUrl,
      authorPhoto: authorPhotoUrl,
    });

    await newStorybook.save();
    console.log("Storybook saved in database.");
    res.status(201).json({ message: "Storybook uploaded successfully!", storybook: newStorybook });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading storybook", error: error.message });
  }
};

const getAllStorybooks = async (req, res) => {
  try {
    const storybooks = await Storybook.find();
    if (!Array.isArray(storybooks)) {
      return res.status(500).json({ success: false, message: "Invalid data format" });
    }
    res.status(200).json({ success: true, data: storybooks });
  } catch (error) {
    console.error("Error fetching storybooks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { uploadStorybook, getAllStorybooks };


