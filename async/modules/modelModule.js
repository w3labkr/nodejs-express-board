/**
 * Model Module
 *
 * @usage
 * const path = require('path);
 * const model = require(path.resolve('modules/modelModule'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const o = {};

o.options = obj => {
  const o = {};
  o.keys = Object.keys(obj);
  o.values = Object.values(obj);
  o.fields = o.keys.join(',');
  o.tokens = Array(o.keys.length + 1).join('?');
  o.tokens = o.tokens.split('').join(',');
  return o;
};

module.exports = o;
