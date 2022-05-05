/**
 * middleware
 *
 * @usage
 * const express = require('express');
 * const path = require('path);
 * const { isLogin } = require(path.resolve('middlewares/middlewareMiddleware'));
 * const router = express.Router();
 * router.get('/', isLogin, (req, res, next) => { ... });
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const { roles } = require(path.resolve('config/constants'));

// Lodash modular utilities.
const _find = require('lodash/find');

const middleware = {};

middleware.isLogin = function (req, res, next) {
  if (req.session.uid === undefined) {
    res.redirect('/signin');
  } else {
    next();
  }
};

middleware.isSubscriber = function (req, res, next) {
  const roleid = 'subscriber';
  try {
    if (req.session.roleid === _find(roles, { id: roleid }).id) {
      res.send(roleid);
    }
  } catch (err) {
    console.log(`Role ${roleid} is not defined.`);
  } finally {
    next();
  }
};

middleware.isAuthor = function (req, res, next) {
  const roleid = 'author';
  try {
    if (req.session.roleid === _find(roles, { id: roleid }).id) {
      res.send(roleid);
    }
  } catch (err) {
    console.log(`Role ${roleid} is not defined.`);
  } finally {
    next();
  }
};

middleware.isEditor = function (req, res, next) {
  const roleid = 'editor';
  try {
    if (req.session.roleid === _find(roles, { id: roleid }).id) {
      res.send(roleid);
    }
  } catch (err) {
    console.log(`Role ${roleid} is not defined.`);
  } finally {
    next();
  }
};

middleware.isAdmin = function (req, res, next) {
  const roleid = 'admin';
  try {
    if (req.session.roleid === _find(roles, { id: roleid }).id) {
      res.send(roleid);
    }
  } catch (err) {
    console.log(`Role ${roleid} is not defined.`);
  } finally {
    next();
  }
};

module.exports = middleware;
