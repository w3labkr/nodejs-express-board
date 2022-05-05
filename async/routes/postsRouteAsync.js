/**
 * Posts Router Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const express = require('express');
const Promise = require('bluebird');
const path = require('path');

const query = require(path.resolve('models/postsModelAsync'));
const { ejsRoot, baseUrl } = require(path.resolve('config/constants'));
const { isLogin } = require(path.resolve('middlewares/authenticate'));
const _ = require(path.resolve('modules/lodashModule'));

const router = express.Router();

router.get('/', function (req, res, next) {
  res.redirect('/board/list/1');
});

router.get('/list/:page', isLogin, function (req, res, next) {
  res.send('asd');
  // const { getPageCount, getBoardList } = query;
  // const pageNum = req.params.page;
  // const pageSize = 10;
  // const offset = (pageNum - 1) * 10;
  // req.session.currentPage = pageNum;
  // Promise.all([getPageCount(), getBoardList(offset, pageSize)])
  //   .then(([pageCount, rows]) => {
  //     let totalPage = Math.ceil(pageCount / pageSize);
  //     let startPage = Math.floor((pageNum - 1) / pageSize) * pageSize + 1;
  //     let endPage = startPage + (pageSize - 1);
  //     endPage = endPage > totalPage ? totalPage : endPage;
  //     // let maxPage = pageCount - (page - 1) * size;
  //     res.render('board/list', {
  //       ejsRoot,
  //       baseUrl,
  //       session: {
  //         uid: req.session.uid,
  //       },
  //       rows,
  //       pageCount,
  //       pageNum,
  //       pageSize,
  //       totalPage,
  //       startPage,
  //       endPage,
  //     });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
});

router.get('/write', isLogin, function (req, res, next) {
  res.render('board/write', {
    ejsRoot,
    baseUrl,
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

module.exports = router;
