// 基础配置
global.configs = {
  env: think.config('env'),
  static: think.config('static')
};

// 脚本样式 hash
global.GlobalStaticHash = null;

// 接口
global.maps = {
  login: 'login'
};

// 判断是否是 mobile
global.checkMobile = function(agent) {
  let flag = false;
  agent = agent.toLowerCase();
  let keywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'mqqbrowser'];

  //排除 Windows 桌面系统  
  if (!(agent.indexOf('windows nt') > -1) || agent.indexOf('windows nt') > -1 && agent.indexOf('compatible; msie 9.0;') > -1) {
    //排除苹果桌面系统  
    if (!(agent.indexOf('windows nt') > -1) && !agent.indexOf('macintosh') > -1 && !(agent.indexOf('ipad') > -1)) {
      for (let item of keywords) {
        if (agent.indexOf(item) > -1) {
          flag = true;
          break;
        }
      }
    }
  }
  return flag;
};

/**
 * 日期格式化
 * @param extra 格式化
 * @param date 日期，空的时候默认是 new Date()
 */
global.dateformat = function(extra, date) {
  let D = date || new Date();
  let time = {
    "y": D.getFullYear(),
    'm': D.getMonth() + 1,
    'd': D.getDate(),
    'H': D.getHours(),
    'i': D.getMinutes(),
    's': D.getSeconds()
  }
  let key = extra.split(/\W/);
  let _date;
  for (let k of key) {
    time[k] = time[k] < 10 ? "0" + time[k] : time[k]
    _date = extra.replace(k, time[k])
    extra = _date;
  }
  return _date;
};

/**
 * 日志记录功能
 */
let log4js = require('log4js');
log4js.configure('./log4js.json');
global.logger = log4js;

// global.logger.trace("==正常流程==");
// global.logger.debug("--调试流程--");
// global.logger.info("~~日志事务~~");
// global.logger.warn("**报警报错**");
// global.logger.error("##报错请查看##: \'./logs/log_test/\'");
