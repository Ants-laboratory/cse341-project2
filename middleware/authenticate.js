// middleware/authenticate.js

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Here, we are passing the entire profile to the done callback
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user); // Serializing the whole profile object
});

passport.deserializeUser((obj, done) => {
  done(null, obj); // Deserializing the whole profile object
});

module.exports = passport;
