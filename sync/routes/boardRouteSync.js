/**
 * Board Router
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');

const appRoot = require('app-root-path');
const constants = require(`${appRoot}/config/constants`);
const db = require(`${appRoot}/models/dbConnection`);
const board = require(`${appRoot}/models/db.board`);
const authenticate = require(`${appRoot}/middlewares/authenticate`);
const { isLogin } = authenticate;

const router = express.Router();

// Router
router.get('/', function (req, res, next) {
  res.redirect('/board/list/1');
});

router.get('/list/:bid', isLogin, function (req, res, next) {
  const currentPost = Number(req.params.bid);
  board.getTotalList(req, res, (err, results) => {
    board.getTotalCount(req, res, (err, results) => {
      let postCount = results[0].count;
      let size = 10; // 보여줄 글의 수
      let begin = (currentPost - 1) * size; // 시작 글
      let totalPost = Math.ceil(postCount / size);
      let postSize = 10; // 링크 갯수
      let startPost = Math.floor((currentPost - 1) / postSize) * postSize + 1;
      let endPost = startPost + (postSize - 1);
      if (endPost > totalPost) {
        endPost = totalPost;
      }
      let maxPost = postCount - (currentPost - 1) * size;
      board.getList(req, res, [begin, size], (err, results) => {
        res.render('board/list', {
          ejsRoot: constants.ejsRoot,
          baseUrl: constants.baseUrl,
          rows: results,
          session: {
            uid: req.session.uid,
          },
          currentPost,
          postCount,
          postSize,
          startPost,
          endPost,
          totalPost,
          maxPost,
        });
      }); // getList
    }); // getTotalCount
  }); // getTotalList
});

router.get('/write', isLogin, function (req, res, next) {
  res.render('board/write', {
    ejsRoot: constants.ejsRoot,
    baseUrl: constants.baseUrl,
    session: {
      uid: req.session.uid,
    },
  });
});

router.post('/write/:uid', isLogin, function (req, res, next) {
  board.addPost(req, res, (err, results) => {
    res.redirect(`/board/list/1`);
  });
});

router.get('/detail/:bid', isLogin, function (req, res, next) {
  board.getPost(req, res, (err, results) => {
    res.render('board/detail', {
      ejsRoot: constants.ejsRoot,
      baseUrl: constants.baseUrl,
      rows: results[0],
      session: {
        uid: req.session.uid,
      },
    });
  });
});

router.get('/update/:bid', isLogin, function (req, res, next) {
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
    res.render('board/update', {
      ejsRoot: constants.ejsRoot,
      baseUrl: constants.baseUrl,
      rows: results[0],
      session: {
        uid: req.session.uid,
      },
    });
  });
  conn.end();
});

router.post('/update/:bid', isLogin, function (req, res, next) {
  const { bid } = req.params;
  board.editPost(req, res, (err, results) => {
    res.redirect(`/board/detail/${bid}`);
  });
});

router.get('/delete/:bid', isLogin, function (req, res, next) {
  board.deletePost(req, res, (err, results) => {
    res.redirect(`/board/list/1`);
  });
});

router.post('/search', isLogin, function (req, res, next) {
  board.searchPost(req, res, (err, results) => {
    res.render('board/search', {
      ejsRoot: constants.ejsRoot,
      baseUrl: constants.baseUrl,
      rows: results,
      session: {
        uid: req.session.uid,
      },
      search: req.body.title,
    });
  });
});

module.exports = router;
