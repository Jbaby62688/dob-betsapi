const moment = require('moment');
const {
  DobHttpApi
} = require('@dob/http');
const {
  DobBetsapiConstant,
  DobBetsapiConfig,
  DobBetsapiApi
} = require('../index');

//初始化HttpClient
DobHttpApi.createClient(
  {
    name: 'betsapi',
    config: {
      baseURL: 'https://api.b365api.com'
    }
  }
);

DobBetsapiConfig.token = '';

test(
  'DobBetsapiApi必须定义',
  () => {
    expect(DobBetsapiApi).toBeDefined();
  }
);

test(
  '获取upcomingMatch',
  async () => {
    let responseData = await DobBetsapiApi.getUpcomingMatch(
      {
        sportId: DobBetsapiConstant.PROP_SPORT_VALUE_SCORE,
      }
    );

    expect(responseData).not.toBeNull();
  }
);

test(
  '创建matchDataList',
  async () => {
    let matchDataIterator = DobBetsapiApi.upcomingMatchDataGenerator(
      {
        sportId: DobBetsapiConstant.PROP_SPORT_VALUE_SCORE,
      }
    );

    for await (let matchData of matchDataIterator) {
      
    }
  }
)