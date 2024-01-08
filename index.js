require('dotenv').config();

const express = require('express');
const connectDB = require('./db/connection');

const analyticsRouter = require('./routes/analytics.js');
const hoemRouter = require('./routes/home.router.js');
const urlRouter = require('./routes/url.js');

// middleware functions 
const isUrlValid = require('./middlewares/validurl.js');

// conect to database
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/url',isUrlValid);
app.use('/analytics', analyticsRouter);
app.use('/', hoemRouter);
app.use('/url', urlRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});