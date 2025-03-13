const express = require("express");
const multer = require("multer");
const { uploadStorybook, getAllStorybooks } = require("../controllers/storyBookController");
const router = express.Router();
const storage = multer.memoryStorage(); // Store files in memory buffer for Google Drive upload

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "authorPhoto", maxCount: 1 },
  { name: "storyFile", maxCount: 1 },
]);
router.post("/uploadStoryBook", upload, uploadStorybook);
router.get("/allStoryBooks", getAllStorybooks);
module.exports = router;
