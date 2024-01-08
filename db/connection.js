require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    console.log('connecting to database...');

    mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log('error connecting to database');
        console.log(err);
    });
}

module.exports = connectDB;