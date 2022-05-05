/**
 * Signs Router
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');

const appRoot = require('app-root-path');
const db = require(`${appRoot}/models/dbPoolConnection`);
const { ejsRoot, baseUrl } = require(`${appRoot}/config/constants`);
const { isLogin } = require(`${appRoot}/middlewares/authenticateMiddleware`);

const router = express.Router();

router.get('/', isLogin, function (req, res, next) {
  res.render('sign/unscribe', {
    ejsRoot,
    baseUrl,
    rows: {},
    session: {
      uid: req.session.uid,
    },
  });
});

router.post('/:uid', isLogin, function (req, res, next) {
  const isDeleted = req.body.isDeleted === '1' ? '1' : '0';
  if (isDeleted === '0') {
    res.redirect('/unscribe');
  } else {
    let sql = `UPDATE users SET isDeleted='${isDeleted}' WHERE uid='${req.params.uid}';`;
    let conn = db.connection();
    conn.query(sql, function (error, results) {
      if (error) console.log(error);
      req.session.destroy(() => {
        res.redirect('/farewell');
      });
    });
    conn.end();
  }
});

module.exports = router;
