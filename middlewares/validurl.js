const validator = require('validator');

function isUrlValid(req, res, next) {

    if(!(req.method === 'POST')){
        next();
    }

    if (!req.body.url) {
        res.status(400);
        res.json({
            message: 'url is required'
        });
        return;
    }

    if (validator.isURL(req.body.url)) {
        next();
    } else {
        res.status(400);
        res.json({
            message: 'invalid url'
        });
        return;
    }
}

module.exports = isUrlValid;