const User = require('../models/user.model.js');

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