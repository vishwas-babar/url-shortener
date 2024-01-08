const Url = require('../models/url.model.js');
const keepTheTrack = require('./visitTrack.js');

async function handleGetUrlByShortId(req, res) {
    let shortId = req.params.shortId;

    const urlData = await Url.findOne({ shortId: shortId });
    if (!urlData) {
        res.status(404);
        res.json({
            message: 'url not found'
        });
        return;
    }
    else {
        console.log('user redirected to: ', urlData.originalUrl);
        keepTheTrack(shortId)
        res.redirect(urlData.originalUrl);
        // res.status(200);
        // res.json({
        //     message: 'url found',
        //     url: urlData
        // });
        // keepTheTrack();
        return;
    }
}

module.exports = handleGetUrlByShortId;