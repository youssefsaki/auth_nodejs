require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const body_parser = require('body-parser');
const userRoutes = require('./routes/userRoutes')

//* MDS
app.use(body_parser.json());
app.use('/users', userRoutes);

//* Connection dial database
const MONGO_URL = process.env.MONGO_URL; 
mongoose.connect(MONGO_URL)
    .then(() => {
        //here we open the server 
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is Running on Port ${PORT}`);
        })
    })
    .catch(err => console.log(err));

