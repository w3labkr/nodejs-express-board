/**
 * Welcome Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');

const { ejsRoot, baseUrl } = require(path.resolve('config/constants'));
const { isLogin } = require(path.resolve('middlewares/authenticateMiddleware'));

const router = express.Router();
const data = {
  ejsRoot,
  baseUrl,
  isError: false,
};

router.get('/', isLogin, function (req, res, next) {
  res.render('signs/welcome', data);
});

module.exports = router;
