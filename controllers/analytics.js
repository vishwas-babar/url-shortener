const Url = require('../models/url.model.js');

async function handleGetAnalyticsByShortId(req, res) {
    let shortId = req.params.shortId;

    let urlData = await Url.findOne({ shortId: shortId });
    const createdBy = urlData.createdBy;


    // check if the user is authorized to view this url
    if (createdBy.toString() != req.body._id.toString()) { // we need to convert the object id to string to compare them if we directoly compare them it will compare the object not the value
        return res.status(401).json({
            message: 'You are not authorized to view this url'
        });
    }

    // check if the url is exist in our database
    if (!urlData) {
        return res.status(404).json({
            message: 'Url not found!'
        });
    } else {
        return res.status(200).json({
            message: 'Url found',
            data: urlData.visitTrack,
            clicksCount: urlData.visitTrack.length,
        })
    }
}

module.exports = handleGetAnalyticsByShortId;