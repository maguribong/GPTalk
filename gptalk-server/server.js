require('dotenv').config();
import dotenv from 'dotenv';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

// configuration
dotenv.config();

// middleware
app.use(bodyParser.json());

// api routes
const apiRoutes = require('./routes/api_routes'); // Import the API routes
app.use(apiRoutes); // Use the API routes with your Express app

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// db (in separate files)
import connectDB from './db/connectDB';
import User from './db/models/User';

app.get('/', (req, res) => {
    res.send('Welcome to the GPTalk server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
