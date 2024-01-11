const express = require('express');

const router = express.Router();

const { handleCreateNewUser, handleLoginUser } = require('../controllers/user.js');

router.post(`/signup`, handleCreateNewUser);
router.post(`/login`, handleLoginUser);

module.exports = router;