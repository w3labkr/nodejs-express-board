import App from './app/App.js';
import f from './app/fn.js';

function onUsername() {
  const targetElement = document.getElementById('user_login');
  const buttonElement = document.getElementById('check_user_login');
  const minlength = parseInt(targetElement.getAttribute('minlength'));

  // create new element
  const newElement = document.createElement('div');
  newElement.setAttribute('id', 'user_login_message');
  buttonElement.insertAfter(newElement);
  const messageElement = document.getElementById('user_login_message');

  // get a message
  const message = {
    error: targetElement.getAttribute('data-error-message'),
    whitespace: targetElement.getAttribute('data-whitespace-message'),
    number: targetElement.getAttribute('data-number-message'),
    minlength: targetElement.getAttribute('data-minlength-message'),
    success: targetElement.getAttribute('data-success-message'),
  };

  // add event handler
  targetElement.oninput = function (e) {
    e = e || window.Event;
    const trimValue = this.value.trim();
    if (/\s+/.test(trimValue)) {
      targetElement.setAttribute('data-status', 'fail');
      messageElement.setAttribute('data-status', 'fail');
      messageElement.innerText = message.whitespace;
    } else if (/^[0-9]+/.test(trimValue)) {
      targetElement.setAttribute('data-status', 'fail');
      messageElement.setAttribute('data-status', 'fail');
      messageElement.innerText = message.number;
    } else if (trimValue.length < minlength) {
      targetElement.setAttribute('data-status', 'fail');
      messageElement.setAttribute('data-status', 'fail');
      messageElement.innerText = message.minlength;
    } else {
      targetElement.setAttribute('data-status', 'success');
      messageElement.setAttribute('data-status', 'success');
      messageElement.innerText = message.success;
    }
    buttonElement.setAttribute('data-status', 'fail');
  };

  targetElement.onchange = function (e) {
    e = e || window.Event;
    this.value = this.value.trim();
  };
}

function onCheckUsername() {
  const targetElement = document.getElementById('check_user_login');
  const inputElement = document.getElementById('user_login');
  const messageElement = document.getElementById('user_login_message');
  const minlength = parseInt(inputElement.getAttribute('minlength'));

  // get a message
  const message = {
    error: targetElement.getAttribute('data-error-message'),
    whitespace: targetElement.getAttribute('data-whitespace-message'),
    number: targetElement.getAttribute('data-number-message'),
    minlength: targetElement.getAttribute('data-minlength-message'),
    success: targetElement.getAttribute('data-success-message'),
  };

  // add event handler
  targetElement.onclick = function (e) {
    e = e || window.Event;
    const trimValue = inputElement.value.trim();
    if (/\s+/.test(trimValue)) {
      inputElement.setAttribute('data-status', 'fail');
      messageElement.setAttribute('data-status', 'fail');
      messageElement.innerText = message.whitespace;
    } else if (/^[0-9]+/.test(trimValue)) {
      inputElement.setAttribute('data-status', 'fail');
      messageElement.setAttribute('data-status', 'fail');
      messageElement.innerText = message.number;
    } else if (trimValue.length < minlength) {
      inputElement.setAttribute('data-status', 'fail');
      messageElement.setAttribute('data-status', 'fail');
      messageElement.innerText = message.minlength;
    } else {
      isUsername(trimValue, message);
    }
    return false;
  };
}

function isUsername(username, message) {
  const targetElement = document.getElementById('check_user_login');
  const messageElement = document.getElementById('user_login_message');

  f.post({
    url: `/signup/${username}`,
    data: { user_login: username },
    onreadystatechange: function (e, xhr, response) {
      const isUser = f.isBoolean(response);
      const status = isUser ? 'fail' : 'success';
      targetElement.setAttribute('data-status', status);
      messageElement.setAttribute('data-status', status);
      messageElement.innerText = isUser ? message.error : message.success;
    },
  });
}

function onEmail() {
  const targetElement = document.getElementById('user_email');

  // create new element
  const newElement = document.createElement('div');
  newElement.setAttribute('id', 'user_email_message');
  targetElement.insertAfter(newElement);
  const messageElement = document.getElementById('user_email_message');

  // get a message
  const message = {
    error: targetElement.getAttribute('data-error-message'),
  };

  // add event handler
  targetElement.oninput = function (e) {
    e = e || window.Event;
    const trimValue = this.value.trim();
    const isEmpty = trimValue.length === 0;
    const isEmail = f.isEmail(trimValue);
    const status = isEmpty ? 'fail' : isEmail ? 'success' : 'fail';
    targetElement.setAttribute('data-status', status);
    messageElement.setAttribute('data-status', status);
    messageElement.innerText = isEmpty ? '' : isEmail ? '' : message.error;
  };

  targetElement.onchange = function (e) {
    e = e || window.Event;
    this.value = this.value.trim();
  };
}

function onUserpass() {
  const targetElement = document.getElementById('user_pass');

  // add event handler
  targetElement.onchange = function (e) {
    e = e || window.Event;
    this.value = this.value.trim();
  };
}

function onCheckUserpass() {
  const targetElement = document.getElementById('check_user_pass');
  const inputElement = document.getElementById('user_pass');

  // create new element
  const newElement = document.createElement('div');
  newElement.setAttribute('id', 'check_user_pass_message');
  targetElement.insertAfter(newElement);
  const messageElement = document.getElementById('check_user_pass_message');

  // get a message
  const message = {
    error: targetElement.getAttribute('data-error-message'),
  };

  // add event handler
  targetElement.oninput = function (e) {
    e = e || window.Event;
    const trimValue = this.value.trim();
    const isEmpty = trimValue.length === 0;
    const isPass = inputElement.value === trimValue;
    const status = isEmpty ? 'fail' : isPass ? 'success' : 'fail';
    targetElement.setAttribute('data-status', status);
    messageElement.setAttribute('data-status', status);
    messageElement.innerText = isEmpty ? '' : isPass ? '' : message.error;
  };

  targetElement.onchange = function (e) {
    e = e || window.Event;
    this.value = this.value.trim();
  };
}

function onSubmit() {
  const formElement = document.form;
  const usernameElement = document.getElementById('user_login');
  const checkUsernameElement = document.getElementById('check_user_login');
  const emailElement = document.getElementById('user_email');
  const checkUserpassElement = document.getElementById('check_user_pass');

  formElement.onsubmit = function (e) {
    e = e || window.Event;
    if (usernameElement.getAttribute('data-status') !== 'success') {
      usernameElement.focus();
      return false;
    } else if (checkUsernameElement.getAttribute('data-status') !== 'success') {
      usernameElement.focus();
      return false;
    } else if (emailElement.getAttribute('data-status') !== 'success') {
      emailElement.focus();
      return false;
    } else if (checkUserpassElement.getAttribute('data-status') !== 'success') {
      checkUserpassElement.focus();
      return false;
    } else {
      formElement.submit();
    }
    return false;
  };
}

// create a instance
new App({
  mounted() {
    onUsername();
    onCheckUsername();
    onEmail();
    onUserpass();
    onCheckUserpass();
    onSubmit();
  },
});
