/**
 * Database Board
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const appRoot = require('app-root-path');
const constants = require(`${appRoot}/config/constants`);
const db = require(`${appRoot}/models/dbConnection`);

const board = {};

board.getTotalList = function (req, res, cb = null) {
  const sql = `SELECT * FROM bbs AS b JOIN users AS u ON b.uid=u.uid WHERE b.isDeleted=0;`;
  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(error, results);
  });
  conn.end();
};

board.getTotalCount = function (req, res, cb = null) {
  const sql = `SELECT count(*) AS count FROM bbs AS b JOIN users AS u ON b.uid=u.uid WHERE b.isDeleted=0;`;
  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(error, results);
  });
  conn.end();
};

board.getList = function (req, res, params = [], cb = null) {
  const [begin, size] = params;
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content,
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.viewCount, b.replyCount
  FROM bbs AS b JOIN users AS u ON b.uid=u.uid
  WHERE b.isDeleted=0
  ORDER BY field(u.uid, 'admin') DESC, b.bid DESC
  LIMIT ?,?`;
  const conn = db.connection();
  conn.query(sql, [begin, size], function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(error, results);
  });
  conn.end();
};

board.getPost = function (req, res, cb = null) {
  const { bid } = req.params;
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content,
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime,
  b.viewCount, b.replyCount
  FROM bbs AS b
  JOIN users AS u
  ON b.uid=u.uid
  WHERE b.bid=${bid};`;
  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) console.log(error);
    cb && cb(error, results);
  });
  conn.end();
};

board.addPost = function (req, res, cb = null) {
  const { uid } = req.params;
  const { title, content } = req.body;
  const sql = `insert into bbs(uid, title, content) values('${uid}','${title}','${content}')`;
  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(error, results);
  });
  conn.end();
};

board.editPost = function (req, res, cb = null) {
  const { bid } = req.params;
  const sql = `update bbs set title='${req.body.title}', content='${req.body.content}', modTime=now() where bid=${bid};`;
  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(error, results);
  });
  conn.end();
};

board.deletePost = function (req, res, cb = null) {
  const { bid } = req.params;
  const sql = `update bbs set isDeleted=1 where bid=${bid};`;
  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(error, results);
  });
  conn.end();
};

board.searchPost = function (req, res, cb = null) {
  const { title } = req.body;
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
  DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.viewCount, b.replyCount
  FROM bbs AS b
  JOIN users AS u
  ON b.uid=u.uid
  WHERE b.isDeleted=0 AND b.title LIKE '%${title}%' 
  ORDER BY b.bid DESC 
  LIMIT 10`;
  const conn = db.connection();
  conn.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(error, results);
  });
  conn.end();
};

module.exports = board;
