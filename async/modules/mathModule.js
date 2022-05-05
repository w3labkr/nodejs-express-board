/**
 * Math Module
 *
 * @usage
 * const path = require('path);
 * const math = require(path.resolve('modules/mathModule'));
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.0.0
 */
const path = require('path');
const fs = require(path.resolve('modules/fsModule'));

const o = {};

// random number
o.randomInt = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

// random string
o.randomStr = function (from, to, text = '') {
  text = text || fs.readFileSync(path.resolve('modules/txt/latin.txt'));

  const char = text.split('');
  const maximum = randomInt(from, to);

  let str = '';
  for (let i = 0; i < maximum; i++) {
    str += char[randomInt(0, char.length - 1)];
  }

  return str;
};

// random word
o.randomWord = function (from, to, lang = 'en') {
  let text = ' ';
  switch (lang) {
    case 'en':
      text += fs.readFileSync(path.resolve('modules/txt/latin.txt'));
      break;
    case 'ko':
      text += fs.readFileSync(path.resolve('modules/txt/KS-X-1001.txt'));
      break;
  }
  return o.randomStr(from, to, text);
};

// circle area
o.circleArea = function (radius) {
  return Math.PI * radius * radius;
};

// factorial
o.factorial = function (n) {
  return n === 0 ? 1 : n * o.factorial(n - 1);
};

// fibonacci
o.fibonacci = function (n) {
  return n === 0 || n === 1 ? 1 : o.fibonacci(n - 1) + o.fibonacci(n - 2);
};

// palindrome
// console.log(o.isPalindrome('level'))
o.isPalindrome = function (str) {
  const len = str.length;

  if (len < 2) {
    return true;
  }

  if (str.charAt(0) !== str.charAt(len - 1)) {
    return false;
  } else {
    const chars = str.split('');
    const char = chars.slice(1, len - 1).join('');
    o.isPalindrome(char);
  }

  return true;
};

module.exports = o;
