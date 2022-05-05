/**
 * Signin Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const { ejsRoot, baseUrl } = require(path.resolve('config/constants'));
const query = require(path.resolve('models/signinModelAsync'));

const router = express.Router();
const data = {
  ejsRoot,
  baseUrl,
  isError: false,
};

router.get('/', function (req, res, next) {
  if (req.session.user_login) {
    res.redirect('/board/list/1');
  } else {
    res.render('signs/signin', data);
  }
});

router.post('/', function (req, res, next) {
  const { user_login, user_pass } = req.body;
  // Load hash from your password DB.
  Promise.resolve(query.selectUser({ user_login }))
    .then(row => {
      const hash = row.user_pass;
      bcrypt.compare(user_pass, hash, function (err, result) {
        if (result) {
          res.send('success');
        } else {
          data.isError = true;
          data.errmsg = 'User information and login information do not match.';
          res.render('signs/signin', data);
        }
      });
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
