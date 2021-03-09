const express = require('express');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/surveyTemplate');

const router = express.Router();
router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  try {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user._id,
    });

    //Place to send mail of surveys
    await Mailer(survey.recipients, survey.subject, surveyTemplate(survey));
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(422).send(error);
  }
});

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thanks for the feedback'); //HTML TO BE SENT
});

router.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user._id }).select({
    recipients: false,
  });
  // console.log(surveys);
  res.send(surveys);
});

router.post('/api/surveys/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');
  const events = _.map(req.body, ({ email, url }) => {
    const match = p.test(new URL(url).pathname);
    if (match) {
      const { surveyId, choice } = match;
      return { email, surveyId, choice };
    }
  });
  const compactEvents = _.compact(events); //Removes all falsey values
  const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); //Get unique events
  _.each(uniqueEvents, async ({ surveyId, email, choice }) => {
    Survey.updateOne(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
      }
    ).exec();
  });

  res.send({});
});
module.exports = router;
