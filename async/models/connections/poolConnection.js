/**
 * Database Pool Connection
 *
 * @usage
 * const path = require('path);
 * const db = require(path.resolve('models/connections/poolConnection'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const mysql = require('mysql2');
const path = require('path');

const { readFileSyncToJson } = require(path.resolve('modules/fsModule'));
const config = readFileSyncToJson(path.resolve('config/db.json'));

// create the pool
const pool = mysql.createPool(config['pool']);
const db = {};

db.connection = callback => {
  pool.getConnection((err, conn) => {
    try {
      callback(conn);
    } catch (err) {
      console.log(err.message);
    } finally {
      pool.releaseConnection(conn);
    }
  });
};

db.getConnection = callback => {
  pool.getConnection((err, conn) => {
    try {
      return callback(conn);
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      pool.releaseConnection(conn);
    }
  });
};

db.transaction = callback => {
  pool.getConnection((err, conn) => {
    conn.beginTransaction();
    try {
      callback(conn);
      conn.commit();
    } catch (err) {
      console.log(err.message);
      conn.rollback();
      // Throw the error again so others can catch it.
      // throw err;
    } finally {
      pool.releaseConnection(conn);
    }
  });
};

module.exports = db;
