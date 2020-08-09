const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    //mongodb id: _id, but you can use it just as id
    console.log('serialize:', user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        console.log('diserializeUser:', user);
        done(null, user); //add user to req ???
    });   
});


passport.use(
    new GoogleStrategy(
        // param #1: Options for the google stategy
        {
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        // param #2: callback function fired by passport 
        (accessToken, refreshToken, profile, done) => {
            // passport callback funciton 

            console.log(profile);

            // Check if user already exists
            User.findOne({ googleid: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // already have the user
                    console.log('user is realdy in DB', currentUser);
                    done(null, currentUser); // trigger the serializeUser call to create cookie
                } else {
                    // if not, create user in DB            
                    user = new User({
                        username: profile.displayName,
                        googleid: profile.id,
                        thumbnail: profile._json.picture
                    });
                    user.save()
                        .then((newUser) => {
                            console.log('new user created:' + newUser);
                            done(null, newUser); // trigger the serializeUser call to create cookie
                        });
                };
            })
        }
    )
);

