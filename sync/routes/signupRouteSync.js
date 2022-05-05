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
const { generateHash } = require(`${appRoot}/modules/utilityModule`);

const router = express.Router();

// Router
router.get('/', function (req, res, next) {
  res.render('sign/signup', {
    ejsRoot,
    baseUrl,
    rows: {
      isErr: false,
    },
  });
});

router.post('/', function (req, res, next) {
  const { uid, pwd, uname, tel, email, photo } = req.body;
  const pwdHash = generateHash(pwd);

  const sql = `insert into users(uid, pwd, uname, tel, email, photo) 
  values('${uid}', '${pwdHash}', '${uname}', '${tel}', '${email}', '${photo}');`;

  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    if (!!error) {
      let rows = results;
      rows = !rows && {};
      rows.err = '';
      rows.isErr = true;
      switch (error.code) {
        case 'ER_DUP_ENTRY':
          rows.err = 'uid';
          break;
        default:
          break;
      }
      res.render('sign/signup', {
        ejsRoot,
        baseUrl,
        rows,
      });
    } else {
      res.redirect('/welcome/');
    }
  });
  conn.end();
});

module.exports = router;
