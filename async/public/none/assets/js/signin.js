import App from './app/App.js';
import f from './app/fn.js';

function onUsername() {
  const loginElement = document.getElementById('user_login');

  // create new element
  const newElement = document.createElement('span');
  newElement.setAttribute('id', 'user_login_error');
  loginElement.insertAfter(newElement);
  const errorElement = document.getElementById('user_login_error');

  // add event handler
  loginElement.addEventListener(
    'input',
    function (e) {
      e = e || window.Event;
      const id = this.value;
      if (id.length > 2) {
        isUsername(id);
      } else {
        errorElement.innerText = '';
      }
    },
    false,
  );
}

function isUsername(id) {
  const loginElement = document.getElementById('user_login');
  const errorElement = document.getElementById('user_login_error');
  const errorMessage = loginElement.getAttribute('data-error-message');
  f.post({
    url: `/signin/${id}`,
    data: { user_login: id },
    onreadystatechange: function (e, xhr, response) {
      const isUser = f.isBoolean(response);
      errorElement.innerText = isUser ? errorMessage : '';
    },
  });
}

function doSubmit() {
  const emailElement = document.getElementById('user_login');
}

// create a instance
new App({
  mounted() {
    onUsername();
    doSubmit();
  },
});
