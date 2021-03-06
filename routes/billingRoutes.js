const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');
router.post('/api/stripe', requireLogin, async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }

  // console.log(req.body);
  // console.log(charge);
});

module.exports = router;

//TOOO MANUAL
