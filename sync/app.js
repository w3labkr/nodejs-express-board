const express = require('express');
const appRoot = require('app-root-path');
const path = require('path');

// Node.js body parsing middleware.
const bodyParser = require('body-parser');

// Simple session middleware for Express
const session = require('express-session');
const fileStore = require('session-file-store')(session);

// HTTP request logger middleware for node.js
// const morgan = require('morgan');

const constants = require(`${appRoot}/config/constants`);
const _fs = require(`${appRoot}/modules/fsModule`);
const _ = require(`${appRoot}/modules/lodashModule`);

// A logger for just about everything.
// const logger = require('./config/logger');

// Node.js CORS middleware
// const cors = require('cors');

// const { init: dbInit } = require('./models/db');
// dbInit();

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
    store: new fileStore({ logFn: function () {} }),
  })
);

// Static Path
app.use(express.static(constants.staticRoot));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Routes
const route = {
  path: `${appRoot}/routes/${constants.thread}`,
  thread: _.upperFirst(constants.thread),
  excludes: [
    'signup',
    'unscribe',
    'welcome',
    'farewell',
    'user',
    'admin',
    'board',
  ],
};

// Route Root
app.use('/', require(path.join(route.path, `indexRoute${route.thread}.js`)));

// Routes Autoload
_fs.readdirFileSync(route.path, (filename) => {
  const urn = filename.replace(`Route${route.thread}.js`, '');
  const isAllow = _.includes(route.excludes, urn) ? false : true;
  if (!/^\_/.test(urn) && isAllow) {
    app.use(`/${urn}`, require(path.join(route.path, filename)));
  }
});

if (process.env.NODE_ENV !== 'production') {
  // ...
}

app.listen(constants.port, () => {
  console.log(`Example app listening at ${constants.baseUrl}`);
});
