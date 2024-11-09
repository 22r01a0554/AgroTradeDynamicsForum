const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const Video = require("../models/Video");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directories for uploads
const videoUploadDir = path.join(__dirname, '..', 'videoUploads');
const imageUploadDir = path.join(__dirname, '..', 'imageUploads');

// Create directories if they don't exist
if (!fs.existsSync(videoUploadDir)) fs.mkdirSync(videoUploadDir);
if (!fs.existsSync(imageUploadDir)) fs.mkdirSync(imageUploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, videoUploadDir);
        } else if (file.mimetype.startsWith('image/')) {
            cb(null, imageUploadDir);
        } else {
            cb({ message: 'This file type is not supported' }, false);
        }
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});

const upload = multer({ storage });

// ROUTE 1: Get all the video posts of specific user using: GET "api/post/fetchposts". Login required
router.get('/fetchvideos', fetchuser, async (req, res) => {
    try {
        const video = await Video.find({ user: req.user.id });
        res.json(video);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Inside the routes file
router.get('/categories', (req, res) => {
    const categories = [
        'Types of Crops', 'Raising Animals', 'Special Plants and Products', 'Growing Techniques', 'Tools and Resources', 'Selling and Marketing',
        'New Ideas and Innovations', 'Government and Policies', 'Learning and Education'
    ];
    res.json(categories);
});

// ROUTE 2: Add a new Video using: POST "/api/upload/addvideo". Login required
router.post('/addvideo', fetchuser, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, author, dateUploaded, email, mobilenumber, socialmedialinks, address, bio, website, experience, affiliation } = req.body;
        
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const videoFile = req.files['video'] ? req.files['video'][0] : null;
        const imageFile = req.files['image'] ? req.files['image'][0] : null;

        if (!videoFile) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        // Save video metadata to MongoDB
        const video = new Video({
            title,
            description,
            author,
            email,
            mobilenumber,
            socialmedialinks,
            address,
            bio,
            website,
            experience,
            affiliation,
            videoFilename: videoFile.filename,
            videoSize: videoFile.size,
            imageFilename: imageFile ? imageFile.filename : null,
            imageSize: imageFile ? imageFile.size : null,
            dateUploaded,
            user: req.user.id,
        });

        const savedVideo = await video.save();
        res.json(savedVideo);
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Error uploading files', error: error.message });
    }
});

// Route to fetch list of uploaded videos
router.get('/fetchallvideos', async (req, res) => {
    try {
        const videos = await Video.find().sort({ dateUploaded: -1 });
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ message: 'Error fetching videos', error: error.message });
    }
});

// Route 4: Update an existing Video using: PUT "/api/upload/updatevideo". Login required
const deleteFile = (filepath) => {
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted:', filepath);
        }
    });
};

router.put("/updatevideo/:id", fetchuser, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    const { title, description, author, dateUploaded } = req.body;
    try {
        // Find the video to be updated
        let video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).send("Not Found");
        }

        if (video.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // Store the old filenames for deletion later
        const oldVideoFilename = video.videoFilename;
        const oldImageFilename = video.imageFilename;

        // Create a newVideo object
        const newVideo = {};
        if (title) newVideo.title = title;
        if (description) newVideo.description = description;
        if (dateUploaded) newVideo.dateUploaded = dateUploaded;
        if (author) newVideo.author = author;

        const videoFile = req.files['video'] ? req.files['video'][0] : null;
        const imageFile = req.files['image'] ? req.files['image'][0] : null;

        if (videoFile) {
            newVideo.videoFilename = videoFile.filename;
            newVideo.videoSize = videoFile.size;
        }
        if (imageFile) {
            newVideo.imageFilename = imageFile.filename;
            newVideo.imageSize = imageFile.size;
        }

        video = await Video.findByIdAndUpdate(req.params.id, { $set: newVideo }, { new: true });

        // If a new video file was uploaded, delete the old video file
        if (videoFile && oldVideoFilename) {
            const oldVideoFilePath = path.join(videoUploadDir, oldVideoFilename);
            deleteFile(oldVideoFilePath);
        }
        // If a new image file was uploaded, delete the old image file
        if (imageFile && oldImageFilename) {
            const oldImageFilePath = path.join(imageUploadDir, oldImageFilename);
            deleteFile(oldImageFilePath);
        }

        res.json(video);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 5: Delete an existing video using: DELETE "/api/post/deletevideo". Login required
router.delete("/deletevideo/:id", fetchuser, async (req, res) => {
    try {
        // Find the post to be deleted and delete it
        let video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).send("Not Found");
        }
        // Allow deletion only if user owns this Video
        if (video.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        video = await Video.findByIdAndDelete(req.params.id);
        res.json({ Success: "Video has been deleted", video: video });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 6: Getting details of authors who has posted videos
router.get('/author/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Debug log
        console.log('Video details:', video);

        const authorDetails = {
            author: video.author,
            email: video.email,
            mobilenumber: video.mobilenumber,
            address: video.address,
            bio: video.bio,
            website: video.website,
            experience: video.experience,
            affiliation: video.affiliation,
            imageFilename: video.imageFilename  // Make sure this is included
        };

        res.json(authorDetails);
    } catch (error) {
        console.error('Error fetching author details:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = router;



// const express = require("express");
// const router = express.Router();
// const fetchuser=require("../middleware/fetchuser");
// const { body, validationResult } = require('express-validator');
// const Video = require("../models/Video");
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { exec } = require("child_process");
// //ROUTE 1:get all the video posts of specific user using:GET "api/post/fetchposts.Login required"
// router.get('/fetchvideos',fetchuser,async(req,res)=>{
//     try {
//         const video=await Video.find({user:req.user.id})
//         res.json(video)
//       } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");
//       }
// })
// // Inside the routes file
// router.get('/categories', (req, res) => {
//   const categories = [
//       'Types of Crops','Raising Animals', 'Special Plants and Products', 'Growing Techniques', 'Tools and Resources', 'Selling and Marketing',
//       'New Ideas and Innovations', 'Government and Policies', 'Learning and Education'
//   ];
//   res.json(categories);
// });
// //Route 2:Add a new Video using:POST "/api/upload/addvideo" Login required
// // Video Uploads
// const videoUploadDir = path.join(__dirname, '..', 'videoUploads');
// if (!fs.existsSync(videoUploadDir)) {
//     fs.mkdirSync(videoUploadDir);
//     console.log(`Created directory: ${videoUploadDir}`);
// }
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, videoUploadDir);
//     },
//     filename: (req, file, cb) => {
//         const filename = Date.now() + path.extname(file.originalname);
//         cb(null, filename);
//         console.log(`Saving file as: ${filename}`);
//     }
// });
// const videoUpload = multer({ storage });
// // Route to handle video uploads
// router.post('/addvideo',fetchuser,videoUpload.single('file'),[
//     body("title", "Enter a valid title").isLength({ min: 3 }),
//     body("description", "Description must be atleast 5 characters").isLength({
//       min: 5,
//     }),

// ], async (req, res) => {
//     try {
//         const { title, description,author,dateUploaded } = req.body;
//         //If there are errors return Bad request and the errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         // Save video metadata to MongoDB
//         const video = new Video({
//             title,
//             description,
//             author,
//             filename: req.file.filename,
//             size: req.file.size,
//             // dateUploaded: new Date(),
//             dateUploaded,
//             user: req.user.id,
//         });
//         const savedVideo = await video.save();
//         console.log("File Uploaded");
//         res.json(savedVideo);
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).json({ message: 'Error uploading file', error: error.message });
//     }
// });

// // Route to fetch list of uploaded videos
// router.get('/fetchallvideos', async (req, res) => {
//     try {
//         const videos = await Video.find().sort({ dateUploaded: -1 });
//         res.status(200).json(videos);
//     } catch (error) {
//         console.error('Error fetching videos:', error);
//         res.status(500).json({ message: 'Error fetching videos', error: error.message });
//     }
// });
// router.use(express.json());
// //Route 4:Update an existing Video using:PUT "/api/upload/updatevideo" Login required
// const deleteFile = (filepath) => {
//   fs.unlink(filepath, (err) => {
//     if (err) {
//       console.error('Error deleting file:', err);
//     } else {
//       console.log('File deleted:', filepath);
//     }
//   });
// };
// router.put("/updatevideo/:id", fetchuser, videoUpload.single('file'), async (req, res) => {
//   const { title, description, author, dateUploaded } = req.body;
//   try {
//       // Find the video to be updated
//       let video = await Video.findById(req.params.id);
//       if (!video) {
//           return res.status(404).send("Not Found");
//       }

//       if (video.user.toString() !== req.user.id) {
//           return res.status(401).send("Not Allowed");
//       }

//       // Store the old filename for deletion later
//       const oldFilename = video.filename;

//       // Create a newVideo object
//       const newVideo = {};
//       if (title) newVideo.title = title;
//       if (description) newVideo.description = description;
//       if (dateUploaded) newVideo.dateUploaded = dateUploaded;
//       if (author) newVideo.author = author;
//       if (req.file) {
//           newVideo.filename = req.file.filename;
//           newVideo.size = req.file.size;
//       }

//       video = await Video.findByIdAndUpdate(req.params.id, { $set: newVideo }, { new: true });

//       // If a new file was uploaded, delete the old file
//       if (req.file && oldFilename) {
//           const oldFilePath = path.join(videoUploadDir, oldFilename);
//           deleteFile(oldFilePath);
//       }

//       res.json(video);
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// });

//   //Route 5:Delete an existing Post using:DELETE "/api/post/deletepost" Login required
//   router.delete("/deletevideo/:id", fetchuser, async (req, res) => {
//     try {
//       //find the post to be deleted and delete it
//       let video= await Video.findById(req.params.id);
//       if (!video) {
//         return res.status(404).send("Not Found");
//       }
//       //Allow deletion only if user owns this Video
//       if (video.user.toString() !== req.user.id) {
//         return res.status(401).send("Not Allowed");
//       }
//       video= await Video.findByIdAndDelete(req.params.id);
//       res.json({ Success: "Video has been deleted", video: video });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   });
// module.exports = router;
