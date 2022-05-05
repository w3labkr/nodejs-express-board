/**
 * Database Users
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const Promise = require('bluebird');
const using = Promise.using;

const appRoot = require('app-root-path');
const constants = require(`${appRoot}/config/constants`);
const db = require(`${appRoot}/models/dbPoolConnection`);

const users = {};

users.ex = function () {
  // ...
};

module.exports = users;
