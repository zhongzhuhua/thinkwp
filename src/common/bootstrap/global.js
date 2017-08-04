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
 * RSA 加密
 */
import NodeRSA from 'node-rsa';
global.RSAKeys = {
  // 登录
  login: {
    pub: '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIpF8w4cM9poAno5i514HG5ay/\nfeCGT0Z6NQAz6KBsN+Xyqg8aezcz8dQd9cMrLGrxB226dy3y746a1sRbMG7Auo15\niyWWaEsfHMZEYCZ7ElQ0lKEwsrn6ISRjaRYPZU5axOIN/LuTDccdp16ZCRdHQpyu\nV6V7BYl5HzNOOOHzdwIDAQAB\n-----END PUBLIC KEY-----\n',
    pri: '-----BEGIN PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMikXzDhwz2mgCej\nmLnXgcblrL994IZPRno1ADPooGw35fKqDxp7NzPx1B31wyssavEHbbp3LfLvjprW\nxFswbsC6jXmLJZZoSx8cxkRgJnsSVDSUoTCyufohJGNpFg9lTlrE4g38u5MNxx2n\nXpkJF0dCnK5XpXsFiXkfM0444fN3AgMBAAECgYEAiQuc6WqLTSTZDDo2K1oEDrL6\nF6IHJjYn0Xk6NjqCuOhFbEa0IkZfIl/fnscrE+Y29YM5c8/L1s/B/AkN/atLOatp\nPov0Z45ZNcfK348ivtjr3uDdeGG5SDYkiFPV76uG0lva1sb9cydkZxSwGX4rUDff\nLDUC2/aYhwBE0sJTpUECQQDqhOj6s0JuxdhcnK6paPmCgD/1n7Q+L4WUDRlVpDMr\nIL+HtkImRp6N6qTL5T/z17zHnlf8MvekJL1uNncLy0tfAkEA2wUZa/F5Ff8Kw+kI\npt/Ut107k6hVRimijp6Po2kOVtOx3tNYKynjYj1tY/Q+5oJHL3BqyLTHLNh5ZL6a\nDr3m6QJAFLj/2T9DzIQA9VYG/QNAoO5yOGMPSztpw0ZRCcdDmjj/k59gQv+UfRfR\nzg6I0yQqEz2Dqs5aIY/5iSaY6FrjYwJAQNY0nWDhsKJMxIxS9FuktBeUkHSvsdKX\nfdLwwLZT+V439LfqDPUcjDOVE5b1m/WLLz7/TaU+pUb8QNev8ZdEKQJAP4HVqVga\nyo2F0MeLhMloAU0BrgVQvr8bnCTRr9jiIhjTQJx2GSW6EHALzwOjT5sJBgv+OXxM\nbHvR4EMOCC9KIg==\n-----END PRIVATE KEY-----\n'
  }
};

global.encryptRSA = function(options) {
  if (typeof options == 'string') {
    options = {
      str: options
    };
  }
  let def = {
    str: '',
    scheme: 'pkcs1',
    // publicKeys 中的值
    key: RSAKeys.login.pub,
    code: 'base64'
  };

  options = Object.assign(def, options);

  let key = new NodeRSA(options.key);
  key.setOptions({
    encryptionScheme: options.scheme
  });

  let result = key.encrypt(options.str, options.code);
  return result;
};

global.decryptRSA = function(options) {
  if (typeof options == 'string') {
    options = {
      str: options
    };
  }
  let def = {
    str: '',
    scheme: 'pkcs1',
    key: RSAKeys.login.pri,
    code: 'utf8'
  };

  options = Object.assign(def, options);

  let key = new NodeRSA(options.key);
  key.setOptions({
    encryptionScheme: options.scheme
  });

  let result = key.decrypt(options.str, options.code);
  return result;
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
