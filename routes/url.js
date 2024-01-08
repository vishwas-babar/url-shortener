const express = require('express');

const router = express.Router();

const handlePostUrl = require('../controllers/url.js');

router.post('/', handlePostUrl);

module.exports = router;