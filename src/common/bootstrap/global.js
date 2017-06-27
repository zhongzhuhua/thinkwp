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
