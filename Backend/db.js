require('dotenv').config();
console.log("Loaded MONGO_URI from .env:", process.env.MONGO_URI);
const mongoose = require('mongoose');
const connectToMongo = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        process.exit(1);
    }
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Successfully");
    } catch (err) {
        console.error("Error connecting to Mongo:", err.message);
        process.exit(1);
    }
};
module.exports = connectToMongo;
