/**
 * Signs Router
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');

const appRoot = require('app-root-path');
const { ejsRoot, baseUrl } = require(`${appRoot}/config/constants`);
const { isLogin } = require(`${appRoot}/middlewares/authenticateMiddleware`);

const router = express.Router();

router.get('/', isLogin, function (req, res, next) {
  res.render('sign/welcome', {
    ejsRoot,
    baseUrl,
  });
});

module.exports = router;
