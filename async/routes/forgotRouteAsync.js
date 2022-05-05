/**
 * Index Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');
const constants = require(path.resolve('config/constants'));

const router = express.Router();
const data = {
  ejsRoot: constants.ejsRoot,
  baseUrl: constants.baseUrl,
  isError: false,
};

// Router
router.get('/', function (req, res, next) {
  res.render('signs/forgot', data);
});

module.exports = router;
