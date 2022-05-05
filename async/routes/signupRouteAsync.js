/**
 * Signup Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');
const Promise = require('bluebird');
const moment = require('moment');
const bcrypt = require('bcrypt');

const { ejsRoot, baseUrl } = require(path.resolve('config/constants'));
const signupsQuery = require(path.resolve('models/signupModelAsync'));
const usersQuery = require(path.resolve('models/usersModelAsync'));

const router = express.Router();
const data = {
  ejsRoot,
  baseUrl,
  isError: false,
};

router.get('/', function (req, res, next) {
  res.render('signs/signup', data);
});

router.post('/', function (req, res, next) {
  const { user_login, user_email, user_pass } = req.body;
  const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
  const saltRounds = 10;

  // auto-gen a salt and hash
  bcrypt.hash(user_pass, saltRounds, function (error, hash) {
    const signupsOpt = {
      title: user_login,
      user_login,
      user_email,
      registered: datetime,
    };
    const usersOpt = {
      user_login,
      user_email,
      user_pass: hash,
      user_registered: datetime,
    };
    // Store hash in your password DB.
    Promise.all([
      signupsQuery.insertUser(signupsOpt),
      usersQuery.insertUser(usersOpt),
    ])
      .then(row => {
        res.redirect('/welcome');
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});

router.post('/:username', function (req, res, next) {
  Promise.resolve(signupsQuery.isUser({ user_login: req.params.username }))
    .then(row => {
      res.send(row);
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;
