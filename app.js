const express = require('express');
const authRoutes = require('./routes/auth-routes'); // bring the auth-routes for '/auth' path
const profileRoutes = require('./routes/profile-routes'); 
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// Set up view eninge
app.set('view engine', 'ejs');

// crate cookie keys
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //one day by milisecond
    keys: [keys.session.cookieKey] 
}));

// initalize passport 
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user });
});

app.listen(3000, () => {
    console.log('App now listening for requests on port 3000');
});



