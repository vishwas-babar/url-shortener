const { getUserBySessionId } = require("../utils/auth");


async function restrictLoggedInUser(req, res, next) {

    const sessionId = req.cookies?.sessionId;  // ? is optional chaining operator that means if cookie is not present then it will not throw error
    if(!sessionId){
        return res.redirect('/login');
    }

    const user_id = await getUserBySessionId(sessionId);

    if(!user_id){
        return res.redirect('/login');
    }

    req.body._id = user_id;
    next();
}


module.exports = restrictLoggedInUser;