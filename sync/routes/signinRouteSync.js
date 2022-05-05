/**
 * Signin Sync Router
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');

const appRoot = require('app-root-path');
const {
  ejsRoot,
  baseUrl,
  administrators,
} = require(`${appRoot}/config/constants`);
const query = require(`${appRoot}/models/sync/signinSyncModel`);
const _crypto = require(`${appRoot}/modules/cryptoModule`);
const _ = require(`${appRoot}/modules/lodashModule`);

const router = express.Router();
const data = {
  ejsRoot,
  baseUrl,
  isError: false,
};

router.get('/', function (req, res, next) {
  if (req.session.uid) {
    res.redirect('/board/list/1');
  } else {
    res.render('sign/signin', data);
  }
});

router.post('/', function (req, res, next) {
  const { uid, pwd } = req.body;
  const hashPwd = _crypto.generateHash(pwd);

  data.isError = true;
  data.errmsg = '아이디 또는 비밀번호가 일치하지 않습니다.';

  query.getUserInfo(uid, (result) => {
    if (result === undefined || result.pwd !== hashPwd) {
      res.render('sign/signin', data);
    } else {
      req.session.uid = uid;
      req.session.uname = result.uname;
      req.session.save(() => {
        if (_.includes(administrators, uid)) {
          res.redirect('/admin');
        } else {
          res.redirect('/board');
        }
      });
    }
  });
});

module.exports = router;
