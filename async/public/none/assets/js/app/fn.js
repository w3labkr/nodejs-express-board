import './Object.js';
import Ajax from './Ajax.js';

const f = {};

f.isBoolean = function (str = '') {
  return !!JSON.parse(String(str).toLowerCase());
};

f.isEmail = function (str = '') {
  return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/.test(str);
};

f.insertAfter = function (referenceNode, newNode) {
  if (!!referenceNode.nextSibling) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  } else {
    referenceNode.parentNode.appendChild(newNode);
  }
};

f.ajax = function (opt = {}) {
  const obj = {
    method: 'post',
    url: '',
    async: true,
    contentType: 'application/json',
    data: {},
    onprogress: null,
    onreadystatechange: null,
    onload: null,
    onerror: null,
  };
  new Ajax(_.extend({}, obj, opt));
};

f.get = function (opt = {}) {
  const obj = {
    method: 'get',
    url: '',
    async: true,
  };
  new Ajax(_.extend({}, obj, opt));
};

f.post = function (opt = {}) {
  const obj = {
    method: 'post',
    url: '',
    async: true,
    contentType: 'application/json',
    data: {},
  };
  new Ajax(_.extend({}, obj, opt));
};

export default f;
