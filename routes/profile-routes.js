const router = require('express').Router();

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

module.exports = router;