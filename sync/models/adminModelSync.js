/**
 * Database Users
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const appRoot = require('app-root-path');
const constants = require(`${appRoot}/config/constants`);
const db = require(`${appRoot}/models/dbConnection`);

const users = {};

users.ex = function () {
  // ...
};

module.exports = users;
