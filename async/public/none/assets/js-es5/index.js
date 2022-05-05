(function (window, document, undefined) {
  ns = window.ns || {};

  ns.init = function () {
    // this.ex();
  };

  ns.stringToBoolean = function (str = '') {
    return !!JSON.parse(String(str).toLowerCase());
  };

  /**
   * Ajax
   *
   * @param object obj
   * @param function callback
   *
   * @Usage states
   * UNSENT = 0; // initial state
   * OPENED = 1; // open called
   * HEADERS_RECEIVED = 2; // response headers received
   * LOADING = 3; // response is loading (a data packed is received)
   * DONE = 4; // request complete
   *
   * @link https://javascript.info/xmlhttprequest
   */
  ns.ajax = function (obj = {}, callback = null) {
    // options
    obj.method = obj.method || 'GET';
    obj.sync = obj.sync || false;
    obj.data = obj.data || {};
    obj.contentType = obj.contentType || 'application/json';
    obj.withCredentials = obj.withCredentials || true;

    const xhr = new XMLHttpRequest();

    // Cross-origin requests
    xhr.withCredentials = obj.withCredentials;

    switch (obj.method) {
      case 'GET':
        if (obj.sync) {
          xhr.open(obj.method, obj.url, false);
          xhr.send();
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              callback && callback(xhr.responseText);
            }
          };
          xhr.onprogress = function (e) {};
          xhr.onerror = function (e) {
            console.log(e);
          };
        } else {
          xhr.open(obj.method, obj.url, true);
          xhr.send();
          xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              callback && callback(xhr.responseText);
            }
          };
          xhr.onprogress = function (e) {};
          xhr.onerror = function (e) {
            console.log(e);
          };
        }
        break;
      case 'POST':
        if (obj.sync) {
          xhr.open(obj.method, obj.url, false);
          xhr.setRequestHeader('Content-Type', obj.contentType);
          xhr.send(JSON.stringify(obj.data));
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              callback && callback(xhr.responseText);
            }
          };
          xhr.onprogress = function (e) {};
          xhr.onerror = function (e) {
            console.log(e);
          };
        } else {
          xhr.open(obj.method, obj.url, true);
          xhr.setRequestHeader('Content-Type', obj.contentType);
          xhr.send(JSON.stringify(obj.data));
          xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              callback && callback(xhr.responseText);
            }
          };
          xhr.onprogress = function (e) {};
          xhr.onerror = function (e) {
            console.log(e);
          };
        }
        break;
    }
  };

  ns.init();
})(window, document);
