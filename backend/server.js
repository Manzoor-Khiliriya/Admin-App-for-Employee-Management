const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const loginRoutes = require('./routes/login');
const employeeRoutes = require('./routes/employees');


const app = express();
const PORT = process.env.PORT || 3000;
const DB_CONN_STRING = process.env.Database_URL;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect(DB_CONN_STRING);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log('error : ', error)
});
database.once('connected', () => {
    console.log('DB connected successfully')
});

app.use('/api/v1/authenticate', loginRoutes);
app.use('/api/v1/employees', employeeRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Server waiting for requests in Port : ', PORT)
})