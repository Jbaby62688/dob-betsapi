const moment = require('moment');
const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DobHttpApi
} = require('@dob/http');
const BetsapiConstant = require('../constant/betsapiConstant');
const BetsapiConfig = require('../config/betsapiConfig');

class BetsapiApi {
  static async getUpcomingMatch(
    {
      sportId,
      leagueId,
      teamId,
      skipEsports = 1,
      page = 1
    },
    {
      throwErrorFlag = true
    } = {}
  ) {
    const identifier = 'DobBetsapiApi::getUpcomingMatch';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      //获取HttpClient
      let httpClient = DobHttpApi.getClient(
        {
          name: 'betsapi'
        }
      );

      let params = {
        sport_id: sportId,
        league_id: leagueId,
        team_id: teamId,
        skip_esports: skipEsports,
        page: page,
        token: BetsapiConfig.token
      };

      let response = await httpClient.request(
        {
          method: 'GET',
          url: '/v3/events/upcoming',
          params: params
        }
      );

      //返回
      return response.data;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }

  static upcomingMatchDataGenerator = async function* (
    {
      sportId,
      leagueId,
      teamId,
      days = 3
    },
    {
      throwErrorFlag = true
    } = {}
  ) {
    const identifier = 'DobBetsapiApi::createMatchDataList';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      let page = 1;
      let lastTimestamp = moment().add(days, 'days').unix();

      while(true) {
        let responseData = await this.getUpcomingMatch(
          {
            sportId,
            leagueId,
            teamId,
            page
          }
        );

        let matchDataList = responseData.results;

        if(matchDataList.length === 0) {
          return;
        }

        for(let matchData of matchDataList) {
          if(Number(matchData.time) > lastTimestamp) {
            return;
          }

          yield matchData;
        }

        page++;
      }
      
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 计算总页数
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {Object} param1.pager 分页数据
   * @param {Object} param2
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Number} 总页数
   */
  static calcTotalPage(
    {
      pager
    },
    {
      throwErrorFlag = true
    } = {}
  ) {
    const identifier = 'DobBetsapiApi::calcTotalPage';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      let totalRows = pager.total;
      let rowsPerPage = pager.per_page;
      let totalPage = Math.ceil(totalRows / rowsPerPage);

      return totalPage;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return 0;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
    
  }
}

module.exports = BetsapiApi;