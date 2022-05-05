/**
 * Index Sync Router
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const appRoot = require('app-root-path');
const _ = require(`${appRoot}/modules/lodashModule`);
const { administrators } = require(`${appRoot}/config/constants`);

const router = express.Router();

// Router
router.get('/', function (req, res, next) {
  const { uid } = req.session;
  if (_.includes(administrators, uid)) {
    res.redirect('/admin/dashboard');
  } else if (uid) {
    res.redirect('/board/list/1');
  } else {
    res.redirect('/signin');
  }
});

module.exports = router;
