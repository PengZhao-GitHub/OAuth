module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'pelase log in to view this resource');
        //res.redirect('/auth/login-index'); //Go to the built in log-in option page
    }

}