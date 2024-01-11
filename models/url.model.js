const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
        },
        originalUrl: {
            type: String,
            required: true,
        },
        visitTrack: [{
                visitedAt: {
                    type: Date,
                    default: Date.now,
                }
            }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    { timestamps: true }
);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;