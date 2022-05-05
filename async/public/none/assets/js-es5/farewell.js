(function (window, document, undefined) {
  ns = window.ns || {};
  ns.farewell = window.ns.farewell || {};

  ns.farewell.init = function () {
    this.doCountdown();
  };

  ns.farewell.doCountdown = function () {
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

  ns.farewell.init();
})(window, document);
