/**
 * Signin Model Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const db = require(path.resolve('models/connections/promisePoolConnection'));
const model = require(path.resolve('modules/modelModule'));

// Lodash modular utilities.
const _includes = require('lodash/includes');

/*!
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

const query = {};

query.selectUser = async (obj = {}) => {
  const o = model.options(obj);
  return await db.getConnection(async conn => {
    const condition = _includes(o.values[0], '@') ? 'user_email' : 'user_login';
    const sql = `SELECT * FROM users WHERE deleted=0 AND ${condition} IN (${o.tokens});`;
    const [rows] = await conn.query(sql, o.values);
    return rows[0];
  });
};

query.isUser = async (opt = {}) => {
  const o = model.options(opt);
  return await db.getConnection(async conn => {
    const sql = `SELECT * FROM users WHERE user_login IN (${o.tokens});`;
    const [rows] = await conn.query(sql, o.values);
    return rows[0] === undefined ? false : true;
  });
};

module.exports = query;
