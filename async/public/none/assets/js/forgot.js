(function (window, document, undefined) {
  ns = window.ns || {};
  ns.forgot = window.ns.forgot || {};

  ns.forgot.init = function () {
    this.doSubmit();
    this.onEmail();
  };

  ns.forgot.isEmail = function (str = '') {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/.test(str);
  };

  ns.forgot.onEmail = function () {
    const o = ns.forgot;

    const emailElement = document.getElementById('user_email');
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

      // submit
      this.value.length == 0
        ? elSendEmail.setAttribute('disabled', 'disabled')
        : o.doSubmit(this.value);
    });
  };

  ns.forgot.doSubmit = function (email = '') {
    const o = ns.forgot;
    const element = document.getElementById('send_email');
    o.isEmail(email)
      ? element.removeAttribute('disabled')
      : element.setAttribute('disabled', 'disabled');
  };

  ns.forgot.init();
})(window, document);
