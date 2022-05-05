/**
 * Users Router
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const { send } = require('process');
const fsDbConf = fs.readFileSync(
  path.join(__dirname, '../configs/database.json'),
  'utf8'
);
const mysqlConf = JSON.parse(fsDbConf)['mysql'][0];
const permission = require('../middlewares/permission');
const { isLogin } = permission;

// Constants
const ejsRoot = path.join(__dirname, '../views');
const baseUrl = 'http://localhost:3000';
const router = express.Router();

function db() {
  let conn = mysql.createConnection(mysqlConf);
  conn.connect(function (error) {
    if (error) console.log('mysql connection error :' + err);
  });
  return conn;
}

router.get('/', isLogin, function (req, res, next) {
  res.redirect(`/user/account/${req.session.uid}`);
});

router.get('/account/:uid', isLogin, function (req, res, next) {
  let sql = `SELECT uid, uname, photo, tel, email,
  DATE_FORMAT(regDate, '%Y-%m-%d') AS regDate
  FROM users
  WHERE isDeleted=0 AND uid='${req.params.uid}'`;
  let conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    let row = results[0];
    res.render('user/account', {
      ejsRoot,
      baseUrl,
      rows: row,
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.post('/account/update/:uid', isLogin, function (req, res, next) {
  let sql = `UPDATE users 
SET
  pwd='${req.body.pwd}',
  uname='${req.body.uname}',
  tel='${req.body.tel}', 
  email='${req.body.email}', 
  photo='${req.body.photo}'
WHERE
  uid='${req.body.uid}';`;

  let conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.redirect(`/user/account/${req.body.uid}`);
  });
  conn.end();
});

module.exports = router;
