/**
 * Admin Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const fsDbConf = fs.readFileSync(path.resolve('configs/database.json'), 'utf8');
const mysqlConf = JSON.parse(fsDbConf)['mysql'][0];
const permission = require(path.resolve('middlewares/permission'));
const { isAdmin } = permission;

// Constants
const ejsRoot = path.resolve('views');
const baseUrl = 'http://localhost:3000';
const router = express.Router();

// Functions
function db() {
  const conn = mysql.createConnection(mysqlConf);
  conn.connect(function (error) {
    if (error) console.log('mysql connection error :' + err);
  });
  return conn;
}

// Router
router.get('/', isAdmin, function (req, res, next) {
  res.redirect('/admin/dashboard');
});

router.get('/dashboard', isAdmin, function (req, res, next) {
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.viewCount, b.replyCount
  FROM bbs AS b
  JOIN users AS u
  ON b.uid=u.uid
  WHERE b.isDeleted=0
  ORDER BY 
  field(u.uid, 'admin') DESC,
  b.bid DESC 
  LIMIT 10;`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/dashboard', {
      ejsRoot,
      baseUrl,
      rows: results,
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.get('/boardlist/:bid', isAdmin, function (req, res, next) {
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.viewCount, b.replyCount
  FROM bbs AS b
  JOIN users AS u
  ON b.uid=u.uid
  WHERE b.isDeleted=0
  ORDER BY 
  field(u.uid, 'admin') DESC,
  b.bid DESC 
  LIMIT 10 ;`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/boardlist', {
      ejsRoot,
      baseUrl,
      rows: results,
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.post('/boardsearch', isAdmin, function (req, res, next) {
  const { title } = req.body;
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.viewCount, b.replyCount
  FROM bbs AS b
  JOIN users AS u
  ON b.uid=u.uid
  WHERE b.isDeleted=0 AND b.title LIKE '%${title}%' 
  ORDER BY b.bid DESC 
  LIMIT 10`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/boardsearch', {
      ejsRoot,
      baseUrl,
      rows: results,
      session: {
        uid: req.session.uid,
      },
      search: title,
    });
  });
  conn.end();
});

router.get('/boardwrite', isAdmin, function (req, res, next) {
  res.render('admin/boardwrite', {
    ejsRoot,
    baseUrl,
    session: {
      uid: req.session.uid,
    },
  });
});

router.post('/boardwrite', isAdmin, function (req, res, next) {
  const uid = 'admin';
  const { title, content } = req.body;
  const sql = `insert into bbs(uid, title, content) values('${uid}','${title}','${content}')`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.redirect('/admin/boardlist/1');
  });
  conn.end();
});

router.get('/boarddetail/:bid', isAdmin, function (req, res, next) {
  const { bid } = req.params;
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content,
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime,
  b.viewCount, b.replyCount
  FROM bbs AS b
  JOIN users AS u
  ON b.uid=u.uid
  WHERE b.bid=${bid};`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/boarddetail', {
      ejsRoot,
      baseUrl,
      rows: results[0],
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.get('/boardupdate/:bid', isAdmin, function (req, res, next) {
  const { bid } = req.params;
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content,
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime,
  b.viewCount, b.replyCount
  FROM bbs AS b
  JOIN users AS u
  ON b.uid=u.uid
  WHERE b.bid=${bid};`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/boardupdate', {
      ejsRoot,
      baseUrl,
      rows: results[0],
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.post('/boardupdate/:bid', isAdmin, function (req, res, next) {
  const { bid } = req.params;
  const { title, content } = req.body;
  const sql = `update bbs set title='${title}', content='${content}', modTime=now() where bid=${bid};`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.redirect(`/admin/boarddetail/${bid}`);
  });
  conn.end();
});

router.get('/boarddelete/:bid', isAdmin, function (req, res, next) {
  const { bid } = req.params;
  const sql = `update bbs set isDeleted=1 where bid=${bid};`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.redirect(`/admin/boardlist/1`);
  });
  conn.end();
});

router.get('/userlist/:bid', isAdmin, function (req, res, next) {
  const sql = `SELECT uid, uname, photo, tel, email,
  DATE_FORMAT(regDate, '%Y-%m-%d') AS regDate
  FROM users
  WHERE isDeleted=0
  ORDER BY uname
  LIMIT 10;`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/userlist', {
      ejsRoot,
      baseUrl,
      rows: results,
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.post('/usersearch', isAdmin, function (req, res, next) {
  const { uname } = req.body;
  const sql = `SELECT uid, uname, photo, tel, email,
  DATE_FORMAT(regDate, '%Y-%m-%d') AS regDate FROM users WHERE isDeleted=0 AND uname LIKE '%${uname}%' LIMIT 10;`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/usersearch', {
      ejsRoot,
      baseUrl,
      rows: results,
      session: {
        uid: req.session.uid,
      },
      search: uname,
    });
  });
  conn.end();
});

router.get('/userdetail/:uid', isAdmin, function (req, res, next) {
  const { uid } = req.params;
  const sql = `select * from users where uid like '${uid}' and isDeleted=0;`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.render('admin/userdetail', {
      ejsRoot,
      baseUrl,
      rows: results[0],
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.post('/userupdate/:uid', isAdmin, function (req, res, next) {
  const { uid } = req.params;
  const { pwd, uname, tel, email, photo } = req.body;
  const sql = `update users set pwd='${pwd}', uname='${uname}', tel='${tel}', email='${email}', photo='${photo}' where uid='${uid}';`;
  const conn = db();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    res.redirect(`/admin/userdetail/${uid}`);
  });
  conn.end();
});

router.get('/userdelete/:uid', isAdmin, function (req, res, next) {
  const { uid } = req.params;

  const bbssql = `update bbs set isDeleted=1 where uid='${uid}';`;
  const bbsconn = db();
  bbsconn.query(bbssql, function (error, results) {
    if (error) console.log(error);
  });
  bbsconn.end();

  const usersql = `update users set isDeleted=1 where uid='${uid}';`;
  const userconn = db();
  userconn.query(usersql, function (error, results) {
    if (error) console.log(error);
    res.redirect(`/admin/userlist/1`);
  });
  userconn.end();
});

module.exports = router;
