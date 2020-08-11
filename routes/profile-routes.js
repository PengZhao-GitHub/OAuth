const router = require('express').Router();

const User = require('../models/user-model');
const { ensureAuthenticated } = require('../config/auth');
const { json } = require('express');


// create a middleware
const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        // if user logged in
        next();
    }
};

// add the authCheck middleware to check if the customer is logged in
router.get('/', authCheck, (req, res) => {
    //res.send('you are logged in, this is your profile -' + req.user.username);
    res.render('profile', {user: req.user});
});


// Get customer profile by mongoDB ID , add authenticated check!!!
router.get('/:id', (req, res) => {

    User.findById(req.params.id).then((user) => {
        console.log('get user profile:', user);
        res.json(user);

    });
});


module.exports = router;