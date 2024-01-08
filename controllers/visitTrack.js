const Url = require('../models/url.model.js');

async function keepTheTrack(shortId) {
    await Url.findOneAndUpdate( { shortId: shortId }, {
        $push: {
            visitTrack: new Date()
        }
    }).then((doc) => {
        console.log('visit track updated');
    })
    .catch((err) => {
        console.log('failed to update visit track with error: ', err);
    });
}

module.exports = keepTheTrack;