/**
 * Database Initialize
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const db = require(path.resolve('models/connections/promisePoolConnection'));

const query = {};

query.dropTable = function (prefix = '') {
  prefix = prefix && `${prefix}_`;
  db.transaction(async conn => {
    await conn.execute(`DROP TABLE IF EXISTS ${prefix}postmeta;`);
  });
};

query.createTable = function (prefix = '') {
  prefix = prefix && `${prefix}_`;
  const sql = `
CREATE TABLE IF NOT EXISTS ${prefix}postmeta (
  meta_id bigint(20) unsigned NOT NULL auto_increment,
  post_id bigint(20) unsigned NOT NULL default '0',
  meta_key varchar(255) default NULL,
  meta_value longtext,
  PRIMARY KEY (meta_id),
  KEY post_id (post_id),
  KEY meta_key (meta_key)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
`;
  db.transaction(async conn => {
    await conn.execute(sql);
  });
};

query.init = function (prefix = '') {
  db.connection(async conn => {
    await conn.query('SHOW TABLES;');
  })
    .then(() => query.dropTable(prefix))
    .then(() => query.createTable(prefix))
    .catch(err => console.log(err.message));
};

module.exports = query;
