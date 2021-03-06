const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/surveys');
  }
);

router.get('/api/current_user', (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});
router.get('/api/logout', (req, res) => {
  try {
    req.logout();
    res.redirect('/');
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
