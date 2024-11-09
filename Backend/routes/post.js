const express = require("express");
const router = express.Router();
const fetchuser=require("../middleware/fetchuser");
const Post=require("../models/Post")
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require("express-validator");
//ROUTE 1:get all the posts of specific user using:GET "api/post/fetchposts.Login required"
router.get('/fetchposts',fetchuser,async(req,res)=>{
    try {
        const post=await Post.find({user:req.user.id})
        res.json(post)
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
})
//Route 2:Add a new Post using:POST "/api/post/addpost" Login required
// Inside the routes file
router.get('/categories', (req, res) => {
  const categories = [
      'vegetables', 'fruits', 'crops', 'pulses', 'grains', 'oils',
      'dairyfarm', 'dryfruits', 'masalas', 'villagestaples',
      'villagespecials', 'sweets', 'airentals', 'villagegoods', 'agriculturetools'
  ];
  res.json(categories);
});
// Ensure the uploads directory exists
const imageUploadDir = path.join(__dirname,'..', 'imageUploads');
if (!fs.existsSync(imageUploadDir)) {
    fs.mkdirSync(imageUploadDir);
    console.log(`Created directory: ${imageUploadDir}`);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, imageUploadDir);
  },
  filename: (req, file, cb) => {
      // const filename = Date.now() + path.extname(file.originalname);
      const fileExtension = '.' + file.mimetype.split('/')[1];
      const filename = `${Date.now()}${fileExtension}`;
      cb(null, filename);
      console.log(`Saving file as: ${filename}`);
  }
});
const imageUpload = multer({ storage });
router.post('/addpost',fetchuser, imageUpload.single('file'),[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),

],async(req,res)=>{
    console.log(req.file); // Log file info
    console.log(req.body); // Log body info
    try {
        const { category,title, description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village } = req.body;
        //If there are errors return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
        // const imagePath = req.file ?`/uploads/${req.file.filename}`: null;
        const post = new Post({
          category,
          title,
          description,
          quantity,
          expectedprice,
          mobilenumber,
          address,
          state,
          district,
          subdistrict,
          village,
          filename: req.file.filename,
          size: req.file.size,
          user: req.user.id,
        });
        const savedPost = await post.save();
        console.log("File Uploaded")
        res.json(savedPost);

      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
})

//Route 3:Get all the post of every user using:POST "/api/post/fetchallposts" Login required
router.get('/fetchallposts', async (req, res) => {
  try {
      const posts = await Post.find(); 
      res.json(posts); 
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});
//Route 4:Update an existing Post using:PUT "/api/post/updatepost" Login required
const deleteFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted:', filepath);
    }
  });
};
router.put("/updatepost/:id", fetchuser, imageUpload.single('file'),async (req, res) => {
  const { category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village } = req.body;
  try {
    // Find the video to be updated
    let post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).send("Not Found");
    }

    if (post.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    // Store the old filename for deletion later
    const oldFilename = post.filename;
    //Create a new newPost object
    const newPost = {};
    if (category) {
      newPost.category = category;
    }
    if (title) {
      newPost.title = title;
    }
    if (description) {
      newPost.description = description;
    }
    if (quantity) {
      newPost.quantity=quantity;
    }
    if (expectedprice) {
      newPost.expectedprice=expectedprice;
    }
    if (mobilenumber) {
      newPost.mobilenumber = mobilenumber;
    }
    if (address) {
      newPost.address=address;
    }
    if (state) {
      newPost.state=state;
    }
    if (district) {
      newPost.district=district;
    }
    if (subdistrict) {
      newPost.subdistrict=subdistrict;
    }
    if (village) {
      newPost.village = village;
    }
    
    if (title) {
      newPost.title = title;
    }
    if (req.file) {
      newPost.filename = req.file.filename;
      newPost.size = req.file.size;
    }
    //find the post to be updated and update it
    // if (!post) {
    //   return res.status(404).send("Not Found");
    // }
    // if (post.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not Allowed");
    // }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: newPost },
      { new: true }
    );
    if (req.file && oldFilename) {
      deleteFile(path.join(imageUploadDir, oldFilename));
  }
    res.json({ post });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 5:Delete an existing Post using:DELETE "/api/post/deletepost" Login required
router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    //find the post to be deleted and delete it
    let post= await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this Note
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    const filename = post.filename;
    console.log("Filename to be deleted:", filename);

    // Delete the post
    post = await Post.findByIdAndDelete(req.params.id);
     // Delete the associated image file if it exists
     if (filename) {
       const filepath = path.join(__dirname, '..', 'imageUploads', filename);
       deleteFile(filepath);
     }
    res.json({ Success: "Post has been deleted", post: post });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//ROUTE 6:get all the posts of category vegetables:GET "api/post/vegetableposts.Login required"
router.get('/vegetableposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'vegetables'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  
})
//ROUTE 7:get all the posts of category fruits:GET "api/post/fruitposts.Login required"
router.get('/fruitsposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'fruits'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  
})
//ROUTE 8:get all the posts of category crops:GET "api/post/cropposts.Login required"
router.get('/cropposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'crops'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  
})
//ROUTE 9:get all the posts of category pulses:GET "api/post/pulsesposts.Login required"
router.get('/pulsesposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'pulses'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 10:get all the posts of category grains:GET "api/post/grainsposts.Login required"
router.get('/grainsposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'grains'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 11:get all the posts of category oils:GET "api/post/oilsposts.Login required"
router.get('/oilsposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'oils'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 12:get all the posts of category dairy farm:GET "api/post/dairyfarmposts.Login required"
router.get('/dairyfarmposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'dairyfarm'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 13:get all the posts of category dry fruits:GET "api/post/dryfruitsposts.Login required"
router.get('/dryfruitposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'dryfruits'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 14:get all the posts of category masalas:GET "api/post/masalaposts.Login required"
router.get('/masalaposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'masalas'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 15:get all the posts of category village staples:GET "api/post/villagestapleposts.Login required"
router.get('/villagestapleposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'villagestaples'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 16:get all the posts of category village specials:GET "api/post/villagespecialposts.Login required"
router.get('/villagespecialposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'villagespecials'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 17:get all the posts of category sweets:GET "api/post/sweetposts.Login required"
router.get('/sweetsposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'sweets'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 18:get all the posts of category AI rentals:GET "api/post/airentals.Login required"
router.get('/airentalsposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'airentals'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 19:get all the posts of category villagegoods:GET "api/post/villagegoods.Login required"
router.get('/villagegoodsposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'villagegoods'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
//ROUTE 20:get all the posts of category agriculturetools:GET "api/post/agriculturetools.Login required"
router.get('/agriculturetoolsposts',async(req,res)=>{
  try {
      const post=await Post.find({category:'agriculturetools'})
      res.json(post)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})

module.exports=router

// const express = require("express");
// const multer = require('multer');
// const router = express.Router();
// const fetchuser=require("../middleware/fetchuser");
// const Post=require("../models/Post")
// const { body, validationResult } = require("express-validator");
// //ROUTE 1:get all the posts of specific user using:GET "api/post/fetchposts.Login required"
// router.get('/fetchposts',fetchuser,async(req,res)=>{
//     try {
//         const post=await Post.find({user:req.user.id})
//         res.json(post)
//       } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");
//       }
// })

// //Route 2:Add a new Post using:POST "/api/post/addpost" Login required
// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });
// router.post('/addpost',upload.single('image'),fetchuser,[
//     body("title", "Enter a valid title").isLength({ min: 3 }),
//     body("description", "Description must be atleast 5 characters").isLength({
//       min: 5,
//     }),
// ],async(req,res)=>{
//     try {
//         const { category,title, description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village } = req.body;
//         const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
//         //If there are errors return Bad request and the errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }
//         const post = new Post({
//           category,
//           title,
//           description,
//           quantity,
//           expectedprice,
//           mobilenumber,
//           address,
//           state,
//           district,
//           subdistrict,
//           village,
//           imageUrl,
//           user: req.user.id,
//         });
//         const savedPost = await post.save();
//         res.json(savedPost);
//       } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");
//       } 
// })
// //Route 3:Get all the post of every user using:POST "/api/post/fetchallposts" Login required
// router.get('/fetchallposts', async (req, res) => {
//   try {
//       const posts = await Post.find(); 
//       res.json(posts); 
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// });
// //Route 4:Update an existing Post using:PUT "/api/post/updatepost" Login required
// router.put("/updatepost/:id", fetchuser, async (req, res) => {
//   const { category,title,description,quantity,expectedprice,mobilenumber,address,state,district,subdistrict,village } = req.body;
//   try {
//     //Create a new newPost object
//     const newPost = {};
//     if (category) {
//       newPost.category = category;
//     }
//     if (title) {
//       newPost.title = title;
//     }
//     if (description) {
//       newPost.description = description;
//     }
//     if (quantity) {
//       newPost.quantity=quantity;
//     }
//     if (expectedprice) {
//       newPost.expectedprice=expectedprice;
//     }
//     if (mobilenumber) {
//       newPost.mobilenumber = mobilenumber;
//     }
//     if (address) {
//       newPost.address=address;
//     }
//     if (state) {
//       newPost.state=state;
//     }
//     if (district) {
//       newPost.district=district;
//     }
//     if (subdistrict) {
//       newPost.subdistrict=subdistrict;
//     }
//     if (village) {
//       newPost.village = village;
//     }
    
//     if (title) {
//       newPost.title = title;
//     }

//     //find the post to be updated and update it
//     let post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).send("Not Found");
//     }
//     if (post.user.toString() !== req.user.id) {
//       return res.status(401).send("Not Allowed");
//     }
//     post = await Post.findByIdAndUpdate(
//       req.params.id,
//       { $set: newPost },
//       { new: true }
//     );
//     res.json({ post });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //Route 5:Delete an existing Post using:DELETE "/api/post/deletepost" Login required
// router.delete("/deletepost/:id", fetchuser, async (req, res) => {
//   try {
//     //find the post to be deleted and delete it
//     let post= await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).send("Not Found");
//     }
//     //Allow deletion only if user owns this Note
//     if (post.user.toString() !== req.user.id) {
//       return res.status(401).send("Not Allowed");
//     }
//     post = await Post.findByIdAndDelete(req.params.id);
//     res.json({ Success: "Post has been deleted", post: post });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //ROUTE 6:get all the posts of category vegetables:GET "api/post/vegetableposts.Login required"
// router.get('/vegetableposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'vegetables'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
  
// })
// //ROUTE 7:get all the posts of category fruits:GET "api/post/fruitposts.Login required"
// router.get('/fruitsposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'fruits'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
  
// })
// //ROUTE 8:get all the posts of category crops:GET "api/post/cropposts.Login required"
// router.get('/cropposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'crops'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
  
// })
// //ROUTE 9:get all the posts of category pulses:GET "api/post/pulsesposts.Login required"
// router.get('/pulsesposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'pulses'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 10:get all the posts of category grains:GET "api/post/grainsposts.Login required"
// router.get('/grainsposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'grains'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 11:get all the posts of category oils:GET "api/post/oilsposts.Login required"
// router.get('/oilsposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'oils'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 12:get all the posts of category dairy farm:GET "api/post/dairyfarmposts.Login required"
// router.get('/dairyfarmposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'dairyfarm'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 13:get all the posts of category dry fruits:GET "api/post/dryfruitsposts.Login required"
// router.get('/dryfruitposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'dryfruits'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 14:get all the posts of category masalas:GET "api/post/masalaposts.Login required"
// router.get('/masalaposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'masalas'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 15:get all the posts of category village staples:GET "api/post/villagestapleposts.Login required"
// router.get('/villagestapleposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'villagestaples'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 16:get all the posts of category village specials:GET "api/post/villagespecialposts.Login required"
// router.get('/villagespecialposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'villagespecials'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// //ROUTE 17:get all the posts of category sweets:GET "api/post/sweetposts.Login required"
// router.get('/sweetsposts',async(req,res)=>{
//   try {
//       const post=await Post.find({category:'sweets'})
//       res.json(post)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
// module.exports=router