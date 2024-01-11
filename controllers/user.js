const User = require('../models/user.model.js');
const { v4: uuidv4 } = require('uuid');
const { addSessionIdtoUser, getUserBySessionId, removeSessionId } = require('../utils/auth.js');

async function handleCreateNewUser(req, res) {
    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
        res.status(400).json({
            message: 'missing required fields',
        });
        return;
    }

    
    try {
        await User.create({
            name: name,
            userName: userName,
            email: email,
            password: password,
        });

        res.status(200).json({
            message: 'user created',
        });
        
        console.log('user created');
    } catch (error) {
        res.status(500).json({
            message: 'failed to create user',
            error: error,
        });
    }

}

async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: 'missing required fields',
        });
        return;
    }

    // lets check if the user is already exist in our database
    try {
        const user = await User.findOne({ email: email, password: password });

        const sessionId = uuidv4();
        addSessionIdtoUser(sessionId, user._id);

        res.cookie('sessionId', sessionId);
        res.status(200).json({
            message: 'user logged in',
        });
    } catch (error) {   
            res.status(404).json({
                message: 'user not found',
            });
            return;
    }

}

module.exports = {
    handleCreateNewUser,
    handleLoginUser,
};