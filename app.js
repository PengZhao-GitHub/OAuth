const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

const authRoutes = require('./routes/auth-routes'); // bring the auth-routes for '/auth' path
const profileRoutes = require('./routes/profile-routes'); 
const localRoutes = require('./routes/local-auth-routes');

const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

const flash = require('connect-flash');


const app = express();


//  Bodyparser to handle form data
app.use(express.urlencoded( { extended: false}));

// Set up view eninge
app.use(expressLayouts);
app.set('view engine', 'ejs');

// crate cookie keys
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //one day by milisecond
    keys: [keys.session.cookieKey] 
}));

// initalize passport 
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
} )

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/local', localRoutes);
app.use('/profile', profileRoutes);

// Create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user });
});

app.listen(3000, () => {
    console.log('App now listening for requests on port 3000');
});



