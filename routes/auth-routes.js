const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    //res.send('logging out');
    req.logout();
    res.redirect('/');
});


//************************************** */
// Step #3 use passport in routes
//************************************** */


// Google 
//--------------------------------------------------

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to 
// passport.authenticate('google') to use the code returned from google to fire the callback funciton
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user);
    console.log('req:', req.user);
    res.redirect('/profile');
});


// Facebook 
//--------------------------------------------------
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    //res.send(req.user);
    console.log('req:', req.user);
    res.redirect('/profile');
});

// Twitter 
//--------------------------------------------------
router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => {
    //res.send(req.user);
    console.log('req:', req.user);
    res.redirect('/profile');
});

module.exports = router;

