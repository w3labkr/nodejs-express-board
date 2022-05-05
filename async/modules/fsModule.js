/**
 * fs Module
 *
 * @usage
 * const path = require('path);
 * const fs = require(path.resolve('modules/fsModule'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const fs = require('fs');
const o = {};

// Lodash modular utilities.
const _forEach = require('lodash/forEach');

o.readdirFileSync = function (path, callback = null) {
  _forEach(fs.readdirSync(path), filename => {
    callback && callback(filename);
  });
};

o.readFileSync = function (path, encoding = 'utf8') {
  return fs.readFileSync(path, encoding);
};

o.readFileSyncToJson = function (path, encoding = 'utf8') {
  return JSON.parse(fs.readFileSync(path, encoding));
};

module.exports = o;
