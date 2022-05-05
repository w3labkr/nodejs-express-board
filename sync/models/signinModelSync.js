/**
 * Signin Sync Model
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const appRoot = require('app-root-path');
const db = require(`${appRoot}/models/dbConnection`);
const query = {};

query.getUserInfo = function (uid, cb) {
  const sql = 'SELECT uid, pwd FROM users WHERE isDeleted=0 AND uid=?';
  const conn = db.connection();
  conn.query(sql, uid, function (error, results) {
    if (error) {
      console.log(error);
    }
    cb && cb(results[0]);
  });
  conn.end();
};

module.exports = query;
