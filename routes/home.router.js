const express = require('express');
const router = express.Router();
const handleGetUrlByShortId = require('../controllers/home.js');

router.get('/:shortId', handleGetUrlByShortId); // this function redirect user to the original url

module.exports = router;