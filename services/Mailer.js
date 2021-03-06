const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Mailer = (email, subject, html) => {
  try {
    sgMail.sendMultiple({
      to: email, //Can be an array of emails... I am sure it is limited to 1000 emails
      from: 'wittywatz@gmail.com',
      subject,
      html,
    });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = Mailer;
