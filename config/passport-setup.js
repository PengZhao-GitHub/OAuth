const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
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

//************************************** */
// Step #2 configure third party authentication strategy
//************************************** */

// Google strategy
//------------------
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
            User.findOne({ thirdpartyid: 'google-' + profile.id }).then((currentUser) => {
                if (currentUser) {
                    // already have the user
                    console.log('user is realdy in DB', currentUser);
                    done(null, currentUser); // trigger the serializeUser call to create cookie
                } else {
                    // if not, create user in DB            
                    user = new User({
                        username: profile.displayName,
                        thirdpartyid: 'google-' + profile.id,
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

// Facebook Strategy
//------------------
passport.use(
    new FacebookStrategy(
    {
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect'
    },
    function(accessToken, refreshToken, profile, done) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        console.log("facebook strategy:", profile);

        User.findOne({ thirdpartyid: 'facebook-' + profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have the user
                console.log('user is realdy in DB', currentUser);
                done(null, currentUser); // trigger the serializeUser call to create cookie
            } else {
                user = new User({
                    username: profile.displayName,
                    thirdpartyid: 'facebook-'+ profile.id,
                    thumbnail: null
                }).save()
                .then((newUser) => {
                    console.log('new user created:' + newUser);
                    done(null, newUser)
                });
            }
        });
  }));




