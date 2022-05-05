/**
 * Privacy Policy Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');

const router = express.Router();

// Router
router.get('/', function (req, res, next) {
  res.sendFile(path.resolve('views/txt/privacy-policy-en.txt'));
});

module.exports = router;
