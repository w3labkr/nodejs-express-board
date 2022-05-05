(function (window, document, undefined) {
  ns = window.ns || {};
  ns.welcome = window.ns.welcome || {};

  ns.welcome.init = function () {
    this.doCountdown();
  };

  ns.welcome.doCountdown = function () {
    const countdownElement = document.getElementById('countdown');

    let startSecond = parseInt(
      countdownElement.getAttribute('data-start-second'),
    );

    countdownElement.innerText = startSecond;

    let endSecond = setInterval(() => {
      if (startSecond < 1) {
        clearInterval(endSecond);
      }
      if (startSecond > 0) {
        countdownElement.innerText = startSecond - 1;
        startSecond -= 1;
      }
    }, 1000);

    // Redirect
    setTimeout(() => {
      window.location.href = countdownElement.getAttribute('data-href');
    }, startSecond * 1000);
  };

  ns.welcome.init();
})(window, document);
