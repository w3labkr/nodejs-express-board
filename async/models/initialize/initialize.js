/**
 * Database Initialize
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const db = require(path.resolve('models/connections/promisePoolConnection'));

const comments = require(path.resolve('models/initialize/comments'));
const commentmeta = require(path.resolve('models/initialize/commentmeta'));
const links = require(path.resolve('models/initialize/links'));
const options = require(path.resolve('models/initialize/options'));
const postmeta = require(path.resolve('models/initialize/postmeta'));
const posts = require(path.resolve('models/initialize/posts'));
const usermeta = require(path.resolve('models/initialize/usermeta'));
const users = require(path.resolve('models/initialize/users'));
const terms = require(path.resolve('models/initialize/terms'));
const term_relationships = require(path.resolve(
  'models/initialize/term_relationships',
));
const term_taxonomy = require(path.resolve('models/initialize/term_taxonomy'));
const signups = require(path.resolve('models/initialize/signups'));

const query = {};

/*
Database and User

CREATE DATABASE IF NOT EXISTS DBNAME;
CREATE USER IF NOT EXISTS 'DBUSER'@'%' IDENTIFIED BY 'DBPASS';
GRANT ALL PRIVILEGES ON DBNAME.* TO 'DBUSER'@'%';
FLUSH PRIVILEGES;

SHOW DATABASES;
*/

// CREATE USER IF NOT EXISTS 'boarduser'@'%' IDENTIFIED BY 'boardpass';
// GRANT ALL PRIVILEGES ON board.* TO 'boarduser'@'%';
// FLUSH PRIVILEGES;

query.init = function (prefix = '') {
  db.connection(async conn => {
    await conn.query('SHOW TABLES;');
  })
    .then(() => signups.init(prefix))
    .then(() => users.init(prefix))
    .then(() => usermeta.init(prefix))
    .then(() => posts.init(prefix))
    .then(() => postmeta.init(prefix))
    .then(() => comments.init(prefix))
    .then(() => commentmeta.init(prefix))
    .then(() => terms.init(prefix))
    .then(() => term_relationships.init(prefix))
    .then(() => term_taxonomy.init(prefix))
    .then(() => links.init(prefix))
    .then(() => options.init(prefix))
    .catch(err => console.log(err.message));
};

module.exports = query;
