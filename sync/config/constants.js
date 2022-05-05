/**
 * Constants
 *
 * @usage
 * const constants = require('../config/constants');
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.1.0
 */
const appRoot = require('app-root-path');
const port = 3000;
const framework = 'bootstrap4'; // none, bootstrap4

const constants = {
  port,
  framework,
  ejsRoot: `${appRoot}/views/${framework}`,
  staticRoot: `${appRoot}/public/${framework}`,
  baseUrl: `http://localhost:${port}`,
  thread: 'async', // sync, async,
  administrators: ['administrator', 'admin'],
  language: 'korean', // TODO: korean, english
};

module.exports = constants;
