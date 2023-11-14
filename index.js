const express = require('express');
const app = express();
const DbConnection = require('./Database');
const corsOptions = require("./config/corsOption");
const path = require("path");
const cors = require('cors');
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const UserController = require("./Controllers/UserController");
app.use('/', SignUpController);

require('dotenv').config();

// Database connection
DbConnection();

// Controller
app.use('api/v1', UserController);


app.get('/*', (req,res)=>{
    res.status(404).send(`<h1>404 Error<h1>`);
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
