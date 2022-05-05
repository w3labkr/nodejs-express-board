/**
 * Signout Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');
const { isLogin } = require(path.resolve('middlewares/authenticateMiddleware'));

const router = express.Router();

router.get('/', isLogin, function (req, res, next) {
  req.session.destroy();
  res.redirect('/signin');
});

module.exports = router;
