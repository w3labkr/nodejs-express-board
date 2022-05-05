/**
 * Users Model Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const db = require(path.resolve('models/connections/promisePoolConnection'));

const query = {};

/*
ID bigint(20) unsigned NOT NULL auto_increment,
user_login varchar(60) NOT NULL default '',
user_pass varchar(64) NOT NULL default '',
user_nicename varchar(50) NOT NULL default '',
user_email varchar(100) NOT NULL default '',
user_url varchar(100) NOT NULL default '',
user_registered datetime NOT NULL default '0000-00-00 00:00:00',
user_activation_key varchar(60) NOT NULL default '',
user_status int(11) NOT NULL default '0',
display_name varchar(250) NOT NULL default '',
spam tinyint(2) NOT NULL default '0',
deleted tinyint(2) NOT NULL default '0',
PRIMARY KEY (ID),
KEY user_login_key (user_login),
KEY user_nicename (user_nicename)
*/

query.opt = obj => {
  const o = {};
  o.keys = Object.keys(obj);
  o.values = Object.values(obj);
  o.fields = o.keys.join(',');
  o.tokens = Array(o.keys.length + 1).join('?');
  o.tokens = o.tokens.split('').join(',');
  return o;
};

query.selectUser = async obj => {
  const o = query.opt(obj);
  await db.getConnection(async conn => {
    const sql = `SELECT * FROM users WHERE deleted=0 AND user_login IN (${o.tokens}) OR user_email IN (${o.tokens});`;
    await conn.query(sql, o.values);
  });
};

query.insertUser = async obj => {
  const o = query.opt(obj);
  await db.transaction(async conn => {
    const sql = `INSERT INTO users(${o.fields}) VALUES(${o.tokens});`;
    await conn.query(sql, o.values);
  });
};

query.updateUser = async obj => {
  const o = query.opt(obj);
  // ...
};

query.deleteUser = async obj => {
  const o = query.opt(obj);
  // ...
};

module.exports = query;
