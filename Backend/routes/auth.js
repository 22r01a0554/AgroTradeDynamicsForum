const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const JWT_SECRET="Thinkaboutweb";
//ROUTE 1:Create a User using: POST "/api/auth/createuser".No login required
router.post('/createuser',[ 
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],
    async (req,res)=>{
      let success=false;
    //If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    try{
      //Check whether the user with email exists already
    let user = await User.findOne({success,email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    //Create a new user
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        mobilenumber:req.body.mobilenumber,
        profession:req.body.profession,
        address:req.body.address,
      });
      const data={
        user:{
            id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);  
      success=true;
      res.json({success,authtoken})
    }
    catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
});
//ROUTE 2:Authenticate a user using: POST "/api/auth/login".No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false
  //If there are errors return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try {
    let user=await User.findOne({email});
    if(!user){
      success=false
      return res.status(400).json({error:"Please try to login with correct creadentials"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false
      return res.status(400).json({success,error:"Please try to login with correct creadentials"})
    }
    const data={
      user:{
          id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true
    res.json({success,authtoken})
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
  })
//ROUTE 3:Get logged in User Details using: POST "/api/auth/getuser".login required
router.post("/getuser",fetchuser,async (req,res)=>{
  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    console.log(user)
    res.send(user)
    
  } catch (error) {
    console.log(error.message);
        res.status(500).send("Internal Server Error");
  }
  })

module.exports = router;
