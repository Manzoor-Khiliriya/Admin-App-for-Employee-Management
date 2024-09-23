const express = require('express');
const router = express.Router();
const {  createUser, loginUser } = require('../controllers/login');


router.post('/signup', createUser);
router.post('/', loginUser);


module.exports = router;