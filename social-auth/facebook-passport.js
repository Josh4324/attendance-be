require("dotenv").config();
const UserService = require("../services/user-service");
const userService = new UserService();
const passport = require('passport');
const strategy = require('passport-facebook');


const FacebookStrategy = strategy.Strategy;


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["emails", "name", "photos"]
    },
    async function (accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const user = await userService.findUserWithEmail(email);
      const userData = {
        firstName: first_name,
        lastName: last_name,
        email,
        verified: true
    }
      if (!user){
        await userService.createUser(userData)
      }
      
      done(null, profile);
    }
  )
);