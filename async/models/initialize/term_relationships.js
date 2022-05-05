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
    await conn.execute(`DROP TABLE IF EXISTS ${prefix}term_relationships;`);
  });
};

query.createTable = function (prefix = '') {
  prefix = prefix && `${prefix}_`;
  const sql = `
CREATE TABLE IF NOT EXISTS ${prefix}term_relationships (
  object_id bigint(20) unsigned NOT NULL default 0,
  term_taxonomy_id bigint(20) unsigned NOT NULL default 0,
  term_order int(11) NOT NULL default 0,
  PRIMARY KEY (object_id, term_taxonomy_id),
  KEY term_taxonomy_id (term_taxonomy_id)
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
