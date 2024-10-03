const DobBetsapiConstant = require('./lib/constant/betsapiConstant');
const DobBetsapiConfig = require('./lib/config/betsapiConfig');
const DobBetsapiApi = require('./lib/api/betsapiApi');

function config(options) {
  DobBetsapiConfig.token = options.token;
}

module.exports = {
  config,
  DobBetsapiConstant,
  DobBetsapiConfig,
  DobBetsapiApi
};