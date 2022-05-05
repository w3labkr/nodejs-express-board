/**
 * Crypto Module
 *
 * @usage
 * const path = require('path);
 * const crypto = require(path.resolve('modules/cryptoModule'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const crypto = require('crypto');
const o = {};

o.generateHash = function (string = '') {
  return crypto.createHash('sha256').update(string).digest('base64');
};

module.exports = o;
