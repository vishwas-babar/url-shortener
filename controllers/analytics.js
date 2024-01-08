const Url = require('../models/url.model.js');

async function handleGetAnalyticsByShortId(req, res) {
    let shortId = req.params.shortId;

    let urlData = await Url.findOne({ shortId: shortId });

    if (!urlData) {
        return res.status(404).json({
            message: 'Url not found'
        });
    }else{
        return res.status(200).json({
            message: 'Url found',
            data: urlData.visitTrack,
            clicksCount: urlData.visitTrack.length,
        })
    }
}

module.exports = handleGetAnalyticsByShortId;