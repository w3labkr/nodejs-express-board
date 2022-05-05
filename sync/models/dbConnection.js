/**
 * Database Connection
 *
 * @usage
 * const getConnection = require('./models/dbConnection');
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

const db = {};

db.connection = function () {
  const conn = mysql.createConnection(dbConf['base']);
  conn.connect((error) => {
    if (error) {
      console.log('mysql connection error :' + error);
    }
  });
  return conn;
};

module.exports = db;
