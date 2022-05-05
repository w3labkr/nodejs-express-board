/**
 * Database Connection
 *
 * @usage
 * const path = require('path);
 * const db = require(path.resolve('models/connections/connection'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const mysql = require('mysql');
const path = require('path');

const { readFileSyncToJson } = require(path.resolve('modules/fsModule'));
const config = readFileSyncToJson(path.resolve('config/db.json'));

const db = {};

db.connection = function () {
  const conn = mysql.createConnection(config['base']);
  conn.connect(err => {
    if (err) {
      console.log(err.message);
    }
  });
  return conn;
};

module.exports = db;
