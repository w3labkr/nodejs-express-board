/**
 * fs Module
 *
 * @usage
 * const _fs = require('../modules/fsModule');
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const fs = require('fs');
const _fs = {};

_fs.readdirFileSync = function (path, callback = null) {
  fs.readdirSync(path).forEach((filename) => {
    callback && callback(filename);
  });
};

_fs.readFileSync = function (path, encoding = 'utf8') {
  return fs.readFileSync(path, encoding);
};

module.exports = _fs;
