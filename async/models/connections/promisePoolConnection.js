/**
 * Database Promise Pool Connection
 *
 * @usage
 * const path = require('path);
 * const db = require(path.resolve('models/connections/promisePoolConnection'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const mysql = require('mysql2/promise');
const path = require('path');

const { readFileSyncToJson } = require(path.resolve('modules/fsModule'));
const config = readFileSyncToJson(path.resolve('config/db.json'));

// create the connection, specify bluebird as Promise
const Promise = require('bluebird');
config['promisePool'].Promise = Promise;

// create the pool
const pool = mysql.createPool(config['promisePool']);
const db = {};

/* Connection Usage
db.connection(async conn => {
  const sql = 'SELECT uid, pwd FROM users WHERE isDeleted=0 AND uid=?;';
  // Unhandled rejection TypeError: Bind parameters must be array if namedPlaceholders parameter is not enabled
  await conn.query(sql, ['admin1']);
  await conn.query(sql, ['admin2']);
});
*/

db.connection = async callback => {
  const conn = await pool.getConnection();
  try {
    await callback(conn);
  } catch (err) {
    console.log(err.message);
  } finally {
    conn.release();
  }
};

db.getConnection = async callback => {
  const conn = await pool.getConnection();
  try {
    return await callback(conn);
  } catch (err) {
    console.log(err.message);
    return false;
  } finally {
    conn.release();
  }
};

/* Transaction Usage
db.transaction(async conn => {
  const sql = 'SELECT uid, pwd FROM users WHERE isDeleted=0 AND uid=?;';
  // Unhandled rejection TypeError: Bind parameters must be array if namedPlaceholders parameter is not enabled
  await conn.execute(sql, ['admin1']);
  await conn.execute(sql, ['admin2']);
});
*/

db.transaction = async callback => {
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await callback(conn);
    await conn.commit();
  } catch (err) {
    console.log(err.message);
    await conn.rollback();
  } finally {
    conn.release();
  }
};

module.exports = db;
