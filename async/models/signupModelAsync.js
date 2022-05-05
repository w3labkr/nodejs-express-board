/**
 * Signup Model Async
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const db = require(path.resolve('models/connections/promisePoolConnection'));
const model = require(path.resolve('modules/modelModule'));

/*!
signup_id bigint(20) NOT NULL auto_increment,
domain varchar(200) NOT NULL default '',
path varchar(100) NOT NULL default '',
title longtext NOT NULL,
user_login varchar(60) NOT NULL default '',
user_email varchar(100) NOT NULL default '',
registered datetime NOT NULL default '0000-00-00 00:00:00',
activated datetime NOT NULL default '0000-00-00 00:00:00',
active tinyint(1) NOT NULL default '0',
activation_key varchar(50) NOT NULL default '',
meta longtext,
PRIMARY KEY (signup_id),
KEY activation_key (activation_key),
KEY user_email (user_email),
KEY user_login_email (user_login,user_email),
KEY domain_path (domain,path)
*/

const query = {};

query.selectUser = async (opt = {}) => {
  const o = model.options(opt);
  return await db.getConnection(async conn => {
    const sql = `SELECT * FROM signups WHERE user_login IN (${o.tokens});`;
    const [rows] = await conn.query(sql, o.values);
    return rows[0];
  });
};

query.insertUser = async (opt = {}) => {
  const o = model.options(opt);
  await db.transaction(async conn => {
    const sql = `INSERT INTO signups(${o.fields}) VALUES (${o.tokens});`;
    await conn.query(sql, o.values);
  });
};

query.updateUser = async (opt = {}) => {
  const o = model.options(opt);
  await db.transaction(async conn => {
    // const sql = `UPDATE signups SET column='data2' WHERE column='data1'`;
    // await conn.query(sql, o.values);
  });
};

query.deleteUser = async (opt = {}) => {
  const o = model.options(opt);
  await db.transaction(async conn => {
    // const sql = `DELETE FROM signups WHERE ${o.fields} IN (${o.tokens})`;
    // await conn.query(sql, o.values);
  });
};

query.isUser = async (opt = {}) => {
  const o = model.options(opt);
  return await db.getConnection(async conn => {
    const sql = `SELECT * FROM signups WHERE user_login IN (${o.tokens});`;
    const [rows] = await conn.query(sql, o.values);
    return rows[0] === undefined ? false : true;
  });
};

module.exports = query;
