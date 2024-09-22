const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
const DB_CONN_STRING = process.env.Database_URL;

app.use(express.json());
app.use(cors());

mongoose.connect(DB_CONN_STRING);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log('error : ', error)
});
database.once('connected', () => {
    console.log('DB connected successfully')
});


app.listen(PORT, () => {
    console.log('Server waiting for requests in Port : ', PORT)
})