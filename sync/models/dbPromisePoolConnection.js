/**
 * Database Connection
 *
 * @usage
 * const getAsyncConnection = require(`${appRoot}/models/dbPoolConnection`);
 *
 * @see api MySQL Here is how to create a disposer for the MySQL driver:
 * @link http://bluebirdjs.com/docs/working-with-callbacks.html
 *
 * @see api Using Promise Wrapper
 * @link https://github.com/sidorares/node-mysql2#promise-wrappers
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const mysql = require('mysql2/promise');

const appRoot = require('app-root-path');
const _fs = require(`${appRoot}/modules/fsModule`);
const fsConf = _fs.readFileSync(`${appRoot}/config/db.json`);
const dbConf = JSON.parse(fsConf);

// create the connection, specify bluebird as Promise
const Promise = require('bluebird');
dbConf['promisePool'].Promise = Promise;

// create the pool
const pool = mysql.createPool(dbConf['promisePool']);

// TypeError: pool.promise is not a function
// const promisePool = pool.promise();

module.exports = pool;
