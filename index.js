const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
// const enforce = require('express-sslify');
const path = require('path');
require('dotenv').config();
require('./db/mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');
const authRouter = require('./routes/authRoutes');
const billingRouter = require('./routes/billingRoutes');
const surveyRouter = require('./routes/surveyRoutes');

const app = express();

// app.use(cors());
// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(bodyParser.json());
// ({ extended: false });
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(billingRouter);
app.use(surveyRouter);

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'service-worker.js'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  // app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Up and running on port 4000');
});
