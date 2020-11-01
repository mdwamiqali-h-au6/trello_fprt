const express = require('express');
const router = express.Router();

const {homepage, profile} = require('../controllers/user')
const {isAuthenticated} = require('../controllers/auth')

router.get('/', isAuthenticated, homepage);
router.post('/profile', isAuthenticated, profile);

module.exports = router;