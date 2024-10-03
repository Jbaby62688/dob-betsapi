class DobBetsapiConfig {
  static _token = '';

  static get token() {
    return this._token;
  }

  static set token(value) {
    this._token = value;
  }
}

module.exports = DobBetsapiConfig;