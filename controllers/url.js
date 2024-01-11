require('dotenv').config();

const { default: ShortUniqueId } = require('short-unique-id');
const Url = require('../models/url.model.js');
const uid = new ShortUniqueId({ length: 10});

async function handlePostUrl(req, res) {
    let originalUrl = req.body.url;
    let shortId = uid.rnd();

    if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
        originalUrl = 'http://' + originalUrl;
    }

    // // lets check if the url is already has a shorturl in our database
    // const isUrlExist = await Url.findOne({ originalUrl: originalUrl });
    // if (isUrlExist) {
    //     res.status(201).json({
    //         message: "shortUrl for this url already exist",
    //         shortUrl: 'localhost:9000/' + isUrlExist.shortId,
    //     });
    //     return;
    // }


    await Url.create({
        shortId: shortId,
        originalUrl: originalUrl,
        visitTrack: [],
        createdBy: req.body._id
    }).then((doc) => {
        res.status(201).json({
            message: "url created",
            shortUrl: 'localhost:9000/' + shortId,
        });
    })
    .catch((err) => {
        console.log("failed to store data in database with error: ", err);
        res.status(500).json({
            message: "failed to create url",
            error: err,
        });
        return;
    });
}


module.exports = handlePostUrl;