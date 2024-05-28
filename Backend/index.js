const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = 5000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));

// Start server
app.listen(port, () => {
  console.log(`Agro Trade Dynamics Forum backend listening on port ${port}`);
});
