/**
 * Crypto Module
 *
 * @usage
 * const _crypto = require('../modules/cryptoModule');
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const crypto = require('crypto');

const _crypto = {};

_crypto.generateHash = function (string = '') {
  return crypto.createHash('sha256').update(string).digest('base64');
};

module.exports = _crypto;
