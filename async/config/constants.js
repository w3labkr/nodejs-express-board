/**
 * Constants
 *
 * @usage
 * const path = require('path')
 * const constants = require(path.resolve('config/constants'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.1.0
 */
const path = require('path');
const port = 3000;
const theme = 'none';

const constants = {
  port,
  theme,
  ejsRoot: path.resolve('views', theme),
  staticRoot: path.resolve('public', theme),
  baseUrl: `http://localhost:${port}`,
  roles: [
    { id: 'administrator', name: '관리자' },
    { id: 'editor', name: '편집자' },
    { id: 'author', name: '작성자' },
    { id: 'subscriber', name: '구독자' },
  ],
  language: 'korean', // TODO: korean, english
};

module.exports = constants;
