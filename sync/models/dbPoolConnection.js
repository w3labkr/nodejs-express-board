/**
 * Database Connection
 *
 * @usage
 * const getAsyncConnection = require(`${appRoot}/models/dbPoolConnection`);
 *
 * @see api MySQL Here is how to create a disposer for the MySQL driver:
 * @link http://bluebirdjs.com/docs/working-with-callbacks.html
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const fs = require('fs');
const mysql = require('mysql');

const appRoot = require('app-root-path');
const fsConf = fs.readFileSync(`${appRoot}/config/db.json`, 'utf8');
const dbConf = JSON.parse(fsConf);

const Promise = require('bluebird');
const using = Promise.using;

// Uncomment if mysql has not been properly promisified yet
// Promise.promisifyAll(mysql);
// Note that the library's classes are not properties of the main export
// so we require and promisifyAll them manually
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool(dbConf['pool']);
const db = {};

db.getConnectionAsync = function () {
  return pool.getConnectionAsync().disposer(function (connection) {
    connection.release();
  });
};

db.beginTransactionAsync = function () {
  return pool
    .getConnectionAsync()
    .then(function (connection) {
      return connection.beginTransactionAsync().then(function () {
        return connection;
      });
    })
    .disposer(function (connection, promise) {
      const result = promise.isFulfilled()
        ? connection.commitAsync()
        : connection.rollbackAsync();
      return result.finally(function () {
        connection.release();
      });
    });
};

module.exports = db;
