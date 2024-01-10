const express = require('express');
const Url = require('../models/url.model');
const path = require('path');
const router = express.Router();

router.route('/').get(async (req, res) => {
        res.sendFile(path.join(__dirname, '..', '/views/index.html'));
    })

router.get('/analytics/', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/analytics.html'));
})

router.get('/profile/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/views/profile.html'));
})

module.exports = router;