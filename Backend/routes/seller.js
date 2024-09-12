const express = require("express");
const router = express.Router();
const fetchuser=require("../middleware/fetchuser");
const Seller=require("../models/Seller")
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require("express-validator");
//Route 1:Add a new Agri Product Seller using:POST "/api/seller/addAgriProductSeller" Login required
router.get('/sellerscategories', (req, res) => {
    const categories = [
        'vegetables', 'fruits', 'crops', 'pulses', 'grains', 'oils',
        'dairyfarm', 'dryfruits', 'masalas', 'villagestaples',
        'villagespecials', 'sweets', 'airentals', 'villagegoods', 'agriculturetools'
    ];
    res.json(categories);
});
// Ensure the uploads directory exists
const sellerImageUploadDir = path.join(__dirname,'..', 'sellerImageUploads');
if (!fs.existsSync(sellerImageUploadDir)) {
    fs.mkdirSync(sellerImageUploadDir);
    console.log(`Created directory: ${sellerImageUploadDir}`);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, sellerImageUploadDir);
  },
  filename: (req, file, cb) => {
      // const filename = Date.now() + path.extname(file.originalname);
      const fileExtension = '.' + file.mimetype.split('/')[1];
      const filename = `${Date.now()}${fileExtension}`;
      cb(null, filename);
      console.log(`Saving file as: ${filename}`);
  }
});
const sellerImageUpload = multer({ storage });
router.post('/addAgriProductSeller',fetchuser, sellerImageUpload.single('file'),[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
  ],async(req,res)=>{
    try {
        const {category,name,email,mobilenumber,address,farmname,farmlocation,typeoffarm,farmingmethods,socialmedialinks,desc} = req.body;
        //If there are errors return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
        const seller = new Seller({
          category,
          name,
          email,
          mobilenumber,
          address,
          farmname,
          farmlocation,
          farmingmethods,
          typeoffarm,
          socialmedialinks,
          desc,
          filename: req.file.filename,
          size: req.file.size,
          user: req.user.id
        });
        const savedSeller = await seller.save();
        console.log("File Uploaded")
        res.json(savedSeller);
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
      } 
  })
  //Route 2:Get all the AgriProductSelllers using:POST "/api/seller/fetchallagriproductsellers" Login required
  router.get('/fetchallagriproductsellers', async (req, res) => {
    try {
        const sellers = await Seller.find(); 
        res.json(sellers); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  });
//ROUTE 3:get all the posts of specific user using:GET "api/seller/fetchagriproductseller.Login required"
  router.get('/fetchagriproductseller',fetchuser,async(req,res)=>{
    try {
        const seller=await Seller.find({user:req.user.id})
        res.json(seller)
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
  })
  router.get('/fetchagriproductseller/:id',fetchuser,async(req,res)=>{
    try {
        const seller=await Seller.findById(req.params.id)
        if (!seller) {
          return res.status(404).json({ error: "Seller not found" });
        }
        res.json(seller)
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
  })
//Route 4:Update an existing AgriProductSelller using:PUT "/api/seller/updateagriproductseller" Login required
  const deleteFile = (filepath) => {
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted:', filepath);
      }
    });
  };
  router.put("/updateagriproductseller/:id", fetchuser, sellerImageUpload.single('file'), async (req, res) => {
    const { category,name,email,mobilenumber,address,farmname,farmlocation,farmingmethods,typeoffarm,socialmedialinks,desc} = req.body;
    try {
      //find the seller details to be updated and update it
      let seller = await Seller.findById(req.params.id);
      if (!seller) {
        return res.status(404).send("Not Found");
      }
      if (seller.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      // Store the old filename for deletion later
    const oldFilename = seller.filename;
      //Create a new newPost object
      const newSeller = {};
      if (category) {
        newSeller.category=category;
      }
      if (name) {
        newSeller.name=name;
      }
      if(email){
        newSeller.email=email;
      }
      if (mobilenumber) {
        newSeller.mobilenumber = mobilenumber;
      }
      if (address) {
        newSeller.address=address;
      }
      if (farmname) {
        newSeller.farmname=farmname;
      }
      if (farmlocation) {
        newSeller.farmlocation=farmlocation;
      }
      if (typeoffarm) {
        newSeller.typeoffarm=typeoffarm;
      }
      if (farmingmethods) {
        newSeller.farmingmethods=farmingmethods;
      }
      if (socialmedialinks) {
        newSeller.socialmedialinks=socialmedialinks;
      }
      if (desc) {
        newSeller.desc=desc;
      }
      if (req.file) {
        newSeller.filename = req.file.filename;
        newSeller.size = req.file.size;
      }
      seller = await Seller.findByIdAndUpdate(
        req.params.id,
        { $set: newSeller },
        { new: true }
      );
      if (req.file && oldFilename) {
        deleteFile(path.join(sellerImageUploadDir, oldFilename));
      }
      res.json({ seller });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  //Route 5:Delete an existing AgriProductSeller using:DELETE "/api/seller/deleteagriproductseller" Login required
  router.delete("/deleteagriproductseller/:id", fetchuser, async (req, res) => {
    try {
      //find the seller to be deleted and delete it
      let seller= await Seller.findById(req.params.id);
      if (!seller) {
        return res.status(404).send("Not Found");
      }
      //Allow deletion only if user owns this Note
      if (seller.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      const filename = seller.filename;
      console.log("Filename to be deleted:", filename);
      //Delete the seller
      seller = await Seller.findByIdAndDelete(req.params.id);
      // Delete the associated image file if it exists
      if (filename) {
        const filepath = path.join(__dirname, '..', 'sellerImageUploads', filename);
        deleteFile(filepath);
      }
      res.json({ Success: "Seller has been deleted", seller: seller });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  module.exports=router