/**
 * Authenticate
 *
 * @usage
 * const express = require('express');
 * const { isLogin } = require('../middlewares/authenticateMiddleware');
 * const router = express.Router();
 * router.get('/', isLogin, (req, res, next) => { ... });
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const appRoot = require('app-root-path');
const { administrators } = require(`${appRoot}/config/constants`);
const _ = require(`${appRoot}/modules/lodashModule`);

const authenticate = {};

authenticate.ex = function (req, res, next) {
  // ...
  next();
};

authenticate.isLogin = function (req, res, next) {
  if (req.session.uid === undefined) {
    res.redirect('/signin');
  } else {
    next();
  }
};

authenticate.isAdmin = function (req, res, next) {
  if (_.includes(administrators, req.session.uid)) {
    next();
  } else {
    res.send('접근 권한이 없습니다.');
  }
};

module.exports = authenticate;
