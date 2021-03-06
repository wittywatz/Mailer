const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    res.status(500).send();
  }
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    res.status(500).send();
  }
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          cb(null, existingUser);
        } else {
          const user = new User({ googleId: profile.id });
          await user.save();
          cb(null, user);
        }
      } catch (error) {
        res.status(500).send();
      }
    }
  )
);
