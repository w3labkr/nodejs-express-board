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
    await conn.execute(`DROP TABLE IF EXISTS ${prefix}options;`);
  });
};

query.createTable = function (prefix = '') {
  prefix = prefix && `${prefix}_`;
  const sql = `
CREATE TABLE IF NOT EXISTS ${prefix}options (
  option_id bigint(20) unsigned NOT NULL auto_increment,
  option_name varchar(64) NOT NULL default '',
  option_value longtext NOT NULL,
  autoload varchar(20) NOT NULL default 'yes',
  PRIMARY KEY (option_id),
  UNIQUE KEY option_name (option_name)
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
