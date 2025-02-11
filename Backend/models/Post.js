const mongoose = require('mongoose');
const {Schema}=mongoose;
const PostSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:String,
        // default:"General",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    quantity:{
        type:Number,
        required:true
    },
    expectedprice:{
        type:Number,
        required:true
    },
    mobilenumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    subdistrict:{
        type:String,
        required:true,
    },
    village:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    filename: String,
    size: Number,
  },{
    timestamp: true,
  });
const Post=mongoose.model('post',PostSchema);
module.exports=Post;

