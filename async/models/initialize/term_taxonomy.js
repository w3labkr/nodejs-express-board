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
    await conn.execute(`DROP TABLE IF EXISTS ${prefix}term_taxonomy;`);
  });
};

query.createTable = function (prefix = '') {
  prefix = prefix && `${prefix}_`;
  const sql = `
CREATE TABLE IF NOT EXISTS ${prefix}term_taxonomy (
  term_taxonomy_id bigint(20) unsigned NOT NULL auto_increment,
  term_id bigint(20) unsigned NOT NULL default 0,
  taxonomy varchar(32) NOT NULL default '',
  description longtext NOT NULL,
  parent bigint(20) unsigned NOT NULL default 0,
  count bigint(20) NOT NULL default 0,
  PRIMARY KEY (term_taxonomy_id),
  UNIQUE KEY term_id_taxonomy (term_id, taxonomy),
  KEY taxonomy (taxonomy)
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
