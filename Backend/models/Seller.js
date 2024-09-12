const mongoose = require('mongoose');
const {Schema}=mongoose;
const SellerSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:String,
        // default:"General",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobilenumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    farmname:{
        type:String
    },
    farmlocation:{
        type:String
    },
    typeoffarm:{
        type:String
    },
    farmingmethods:{
        type:String
    },
    socialmedialinks:{
        type:String
    },
    desc:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    filename: String,
    size: Number,
  });
const Seller=mongoose.model('seller',SellerSchema);
module.exports=Seller;