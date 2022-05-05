class App {
  constructor(opt = {}) {
    this._opt = opt;
    this.options();
    this.init();
  }

  options() {
    const opt = this._opt;
    const obj = {
      created: null,
      mounted: null,
    };
    this._opt = _.extend({}, obj, opt);
  }

  init() {
    const opt = this._opt;
    opt.created && this.created(opt.created);
    opt.mounted && this.mounted(opt.mounted);
  }

  created(callback) {
    callback(this);
  }

  mounted(callback) {
    if (
      document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      callback(this);
    } else {
      document.addEventListener('DOMContentLoaded', callback(this), false);
    }
  }
} // end of class

export default App;
