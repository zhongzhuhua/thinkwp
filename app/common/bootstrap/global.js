'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
global.checkMobile = function (agent) {
  var flag = false;
  agent = agent.toLowerCase();
  var keywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'mqqbrowser'];

  //排除 Windows 桌面系统  
  if (!(agent.indexOf('windows nt') > -1) || agent.indexOf('windows nt') > -1 && agent.indexOf('compatible; msie 9.0;') > -1) {
    //排除苹果桌面系统  
    if (!(agent.indexOf('windows nt') > -1) && !agent.indexOf('macintosh') > -1 && !(agent.indexOf('ipad') > -1)) {
      for (var _iterator = keywords, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var item = _ref;

        if (agent.indexOf(item) > -1) {
          flag = true;
          break;
        }
      }
    }
  }
  return flag;
};
//# sourceMappingURL=global.js.map