const express = require('express');
const mongoose = require('mongoose');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./utils/db');
const cors = require('cors')
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

connectDB();





app.use('/lists', listRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
