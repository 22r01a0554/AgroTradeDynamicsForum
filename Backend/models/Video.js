const mongoose = require('mongoose');
const { Schema } = mongoose;
const videoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    socialmedialinks: {
        type: String
    },
    address: {
        type: String
    },
    videoFilename: {
        type: String,
        required: true
    },
    videoSize: {
        type: Number,
        required: true
    },
    imageFilename: {
        type: String
    },
    imageSize: {
        type: Number
    },
    dateUploaded: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    experience: {
        type: String
    },
    affiliation: {
        type: String
    }
},{
    timestamp: true,
  });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
