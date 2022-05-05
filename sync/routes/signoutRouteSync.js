/**
 * Signout Sync Router
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');

const appRoot = require('app-root-path');
const { isLogin } = require(`${appRoot}/middlewares/authenticateMiddleware`);

const router = express.Router();

router.get('/', isLogin, function (req, res, next) {
  req.session.destroy();
  res.redirect('/signin');
});

module.exports = router;
