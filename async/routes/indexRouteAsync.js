/**
 * Index Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');
const { isLogin } = require(path.resolve('middlewares/authenticateMiddleware'));
// const { roles } = require(path.resolve('config/constants'));
// const _ = require('lodash');

const router = express.Router();

// Router
router.get('/', isLogin, function (req, res, next) {
  res.send('index router');
});

module.exports = router;
