require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserService = require("../services/user-service");
const userService = new UserService();

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, cb) {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;

      const user = await userService.findUserWithEmail(email);
      const userData = {
        firstName,
        lastName,
        email,
        verified: true,
        onboardingStep: 1,
    }
      if (!user){
        await userService.createUser(userData)
      }
    return cb(null, profile);
  }
));