const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const callbackURL = process.env.CALLBACK_URL || "http://localhost:3000/auth/github/callback";

if (!clientID || !clientSecret || !callbackURL) {
  console.error('Missing environment variables for GitHub OAuth');
  process.exit(1);
}

passport.use(new GitHubStrategy({
    clientID,
    clientSecret,
    callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
