require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connection');

const analyticsRouter = require('./routes/analytics.js');
const homeRouter = require('./routes/home.router.js');
const urlRouter = require('./routes/url.js');
const staticRouter = require('./routes/static.router.js');
const userRouter = require('./routes/user.js');

// middleware functions 
const isUrlValid = require('./middlewares/validurl.js');
const restrictLoggedInUser = require('./middlewares/auth.js');

const Url = require('./models/url.model.js');

// conect to database
connectDB();

const app = express();

// set the view engine to ejs
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views'));


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));


app.use('/', staticRouter);
app.use('/', homeRouter);
app.use('/api/user/', userRouter);
app.use('/api/url', isUrlValid);

// using inlined middleware function
// this middleware is only being used for this route
app.use('/api/analytics', restrictLoggedInUser, analyticsRouter);
app.use('/api/url', restrictLoggedInUser, urlRouter);

app.listen(process.env.PORT || 9000, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});