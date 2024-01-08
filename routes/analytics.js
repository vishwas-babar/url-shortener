const express = require('express');
const router = express.Router();
const handleGetAnalyticsByShortId = require('../controllers/analytics.js');

router.get('/:shortId', handleGetAnalyticsByShortId); // 


module.exports = router;