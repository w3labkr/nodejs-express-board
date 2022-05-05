class Ajax {
  constructor(opt = {}) {
    this._opt = opt;
    this.options();
    this.init();
  }

  options() {
    const opt = this._opt;
    const obj = {
      method: 'post', // get, post
      url: '',
      async: true,
      contentType: 'application/json',
      data: {},
      onprogress: null,
      onreadystatechange: null,
      onload: null,
      onerror: null,
    };
    this._opt = _.extend({}, obj, opt);
  }

  init() {
    const opt = this._opt;
    const xhr = new XMLHttpRequest();

    this.open(xhr, opt);

    if (opt.method.toLowerCase() === 'post') {
      this.setRequestHeader(xhr, opt);
      this.send(xhr, opt);
    }

    opt.onprogress && this.onprogress(xhr, opt);
    opt.onreadystatechange && this.onreadystatechange(xhr, opt);
    opt.onload && this.onload(xhr, opt);
    opt.onerror && this.onerror(xhr, opt);
  }

  open(xhr, opt) {
    xhr.open(opt.method, opt.url, opt.async);
  }

  setRequestHeader(xhr, opt) {
    opt.contentType && xhr.setRequestHeader('Content-Type', opt.contentType);
  }

  send(xhr, opt) {
    const data = opt.data ? JSON.stringify(opt.data) : null;
    xhr.send(data);
  }

  onprogress(xhr, opt) {
    xhr.onprogress = function (e) {
      if (xhr.readyState === 3 && xhr.status === 200) {
        opt.onprogress(e, xhr, xhr.response);
      }
    };
  }

  onreadystatechange(xhr, opt) {
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        opt.onreadystatechange(e, xhr, xhr.response);
      }
    };
  }

  onload(xhr, opt) {
    xhr.onload = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        opt.onload(e, xhr, xhr.response);
      }
    };
  }

  onerror(xhr, opt) {
    xhr.onerror = function (e) {
      opt.onerror(e, xhr, xhr.response);
    };
  }
} // end of class

export default Ajax;
