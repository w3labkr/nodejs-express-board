const express = require('express');
const path = require('path');

// Node.js CORS middleware
// const cors = require('cors');

// HTTP request logger middleware for node.js
// const morgan = require('morgan');

// A logger for just about everything.
// const logger = require(path.resolve('config/logger'));

// Node.js body parsing middleware.
const bodyParser = require('body-parser');

// Simple session middleware for Express
const session = require('express-session');
// const fileStore = require('session-file-store')(session);

const constants = require(path.resolve('config/constants'));
const fs = require(path.resolve('modules/fsModule'));

// Lodash modular utilities.
const _includes = require('lodash/includes');

// const db = require(path.resolve('models/initialize/initialize.js'));
// db.init();

const app = express();

// Enable All CORS Requests
// app.use(cors());

// Configuring CORS
// app.use(cors({
//   origin: constants.baseUrl,
//   credentials: true,
// }));

// logger
// app.use(
//   morgan('combined', {
//     skip: (req, res) => {
//       res.statusCode < 400;
//     },
//     stream: logger.stream,
//   }),
// );

// Template Engine
// app.set('trustproxy', true);
app.set('views', constants.ejsRoot);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // store: new fileStore({ logFn: function () {} }),
    // store: sessionStore,
  }),
);

// Routes

// Static Path
app.use(express.static(constants.staticRoot));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Routes
const route = {
  excludes: [
    // 'index',
    // 'signin',
    // 'signout',
    // 'signup',
    // 'privacy-policy',
    // 'welcome',
    // 'farewell',
    'unscribe',
    'users',
    'admin',
    'posts',
  ],
};

// Route Root
app.use('/', require(path.resolve('routes/indexRouteAsync.js')));

// Routes Autoload
fs.readdirFileSync(path.resolve('routes'), filename => {
  const URN = filename.replace('RouteAsync.js', '');
  const isAllow = _includes(route.excludes, URN) ? false : true;
  if (!/^\_/.test(URN) && isAllow) {
    app.use(`/${URN}`, require(path.resolve('routes', filename)));
  }
});

if (process.env.NODE_ENV !== 'production') {
  // ...
}

app.listen(constants.port, () => {
  console.log(`Example app listening at ${constants.baseUrl}`);
});
