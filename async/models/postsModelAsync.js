/**
 * Posts Model Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const db = require(path.resolve('models/connections/promisePoolConnection'));

const query = {};

query.getBoardTotalList = async () => {
  const conn = await pool.getConnection(async conn => conn);
  try {
    const sql =
      'SELECT * FROM bbs AS b JOIN users AS u ON b.uid=u.uid WHERE b.isDeleted=0;';
    const [results] = await conn.query(sql);
    return results[0];
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    conn.release();
  }
};

query.getBoardTotalList = () => {
  const sql = ``;
  // The connection is always closed, no matter what fails at what point
  return using(pool.getConnectionAsync(), function (connection) {
    return connection.queryAsync(sql);
  })
    .then(rows => rows)
    .catch(e => false);
};

query.getBoardTotalCount = () => {
  const sql = `SELECT count(*) AS count FROM bbs AS b JOIN users AS u ON b.uid=u.uid WHERE b.isDeleted=0;`;
  // The connection is always closed, no matter what fails at what point
  return using(pool.getConnectionAsync(), function (connection) {
    return connection.queryAsync(sql);
  })
    .then(rows => rows[0].count)
    .catch(e => false);
};

query.getBoardList = (offset, pageSize) => {
  const administrator = 'admin';
  const sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.viewCount, b.replyCount
  FROM bbs AS b JOIN users AS u ON b.uid=u.uid
  WHERE b.isDeleted=0
  ORDER BY field(u.uid, '${administrator}') DESC, b.bid DESC
  LIMIT ?,?`;
  const values = [offset, pageSize];
  // The connection is always closed, no matter what fails at what point
  return using(pool.getConnectionAsync(), function (connection) {
    return connection.queryAsync({ sql, values });
  })
    .then(rows => rows)
    .catch(e => false);
};

module.exports = query;
