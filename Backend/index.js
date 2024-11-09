const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');

// Connect to MongoDB
connectToMongo();
const app = express();
const port = 5000;

// Middleware setup
app.use(express.json({ limit: '50mb' })); // Increase the limit to 50MB or any other limit as needed
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true  // Allow credentials such as cookies, authorization headers, or TLS client certificates
}));

// Enable preflight requests for all routes
app.options('*', cors());

// Serve static files from the "imageUploads" directory
app.use('/images', express.static(path.join(__dirname, 'imageUploads'), {
  // setHeaders: (res, path, stat) => {
  //     res.set('Content-Type', 'image/jpg'); // Adjust the content type as needed
  // }
}));
// Serve static files from the "sellerImageUploads" directory
app.use('/sellerimages', express.static(path.join(__dirname, 'sellerImageUploads'),));
// Serve static files from the "videoUploads" directory
app.use('/videos', express.static(path.join(__dirname, 'videoUploads')));

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));
app.use('/api/seller', require('./routes/seller'));
app.use('/api/upload', require('./routes/video'));

// Start server
app.listen(port, () => {
  console.log(`Agro Trade Dynamics Forum backend listening on port ${port}`);
});
module.exports = app;
