const express = require('express');
const Url = require('../models/url.model');
const path = require('path');
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        res.sendFile(path.join(__dirname, '../public/home/home.html'));
    })

router.get('/analytics', async (req, res) => {
        console.log(path.join(__dirname, '../'));
        res.sendFile(path.join(__dirname, '../public/analytics/analytics.html'))
    })

router.get('/profile', (req, res) => {
    res.render('profile.ejs/');
})

module.exports = router;