(function (window, document, undefined) {
  ns = window.ns || {};
  ns.signup = window.ns.signup || {};

  ns.signup.init = function () {
    this.doSubmit();
    this.onUsername();
    this.onEmail();
    this.onUserpass();
  };

  ns.signup.onUsername = function () {
    const o = ns.signup;

    // elements
    const loginElement = document.getElementById('user_login');

    // create element
    const newElement = document.createElement('span');
    newElement.setAttribute('id', 'user_login_error');
    loginElement.parentNode.insertBefore(newElement, loginElement.nextSibling);
    const errorElement = document.getElementById('user_login_error');

    // event handler
    loginElement.addEventListener(
      'input',
      function (e) {
        e = e || window.Event;
        const id = this.value;
        if (id.length > 2) {
          ns.signup.isUsername(id);
        } else {
          errorElement.innerText = '';
        }
      },
      false,
    );
  };

  ns.signup.isUsername = function (id) {
    const loginElement = document.getElementById('user_login');
    const errorElement = document.getElementById('user_login_error');
    const errorMessage = loginElement.getAttribute('data-error-message');
    ns.ajax(
      {
        method: 'POST',
        url: `/signup/${id}`,
        data: { user_login: id },
      },
      function (xhr) {
        errorElement.innerText = ns.stringToBoolean(xhr) ? '' : errorMessage;
      },
    );
  };

  ns.signup.onEmail = function () {
    const o = ns.signup;

    // elements
    const emailElement = document.getElementById('user_email');

    // attribute
    const errorMessage = emailElement.getAttribute('data-error-message');

    // create element
    const newElement = document.createElement('span');
    newElement.setAttribute('id', 'user_email_error');
    emailElement.parentNode.insertBefore(newElement, emailElement.nextSibling);
    const errorElement = document.getElementById('user_email_error');

    // event handler
    emailElement.addEventListener('input', function (e) {
      e = e || window.Event;
      errorElement.innerText =
        this.value.length == 0 ? '' : o.isEmail(this.value) ? '' : errorMessage;
    });
  };

  ns.signup.isEmail = function (str = '') {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/.test(str);
  };

  ns.signup.onUserpass = function () {
    const o = ns.signup;

    // elements
    const confirmElement = document.getElementById('confirm_user_pass');

    // create element
    const newElement = document.createElement('span');
    newElement.setAttribute('id', 'confirm_user_pass_error');
    confirmElement.parentNode.insertBefore(
      newElement,
      confirmElement.nextSibling,
    );
    const errorElement = document.getElementById('confirm_user_pass_error');

    // event handler
    confirmElement.addEventListener('input', function (e) {
      e = e || window.Event;
      errorElement.innerText =
        this.value.length == 0 ? '' : o.isUserpass(this.value) ? '' : ' fail';
    });
  };

  ns.signup.isUserpass = function (str = '') {
    return document.getElementById('user_pass').value == str;
  };

  ns.signup.doSubmit = function () {
    // elements
    const emailElement = document.getElementById('user_login');
  };

  ns.signup.init();
})(window, document);
