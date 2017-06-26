'use strict';
import fs from 'fs';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
    this.env = configs.env;
    this.static = configs.static;
    this.DeviceWidth = 640;
    this.meta_title = '首页';
    this.assign('StaticHash', function(src) {
      try {
        if (configs.env != 'dev') {
          let hash = GlobalStaticHash;
          if (hash == null || hash == '') {
            hash = JSON.parse(fs.readFileSync('www/static/hash.' + configs.env + '.json', 'utf8'));
          }
          GlobalStaticHash = hash;
          let result = hash[src.replace(/.js$/, '')];
          result = result == null ? configs.static + src : configs.static + result;
          return result;
        }
        return configs.static + src;
      } catch (e) {
        return configs.static + src;
      }
    });
  };

  // 公用处理
  async __before() {};

  // 跳转路径
  goto(type) {
    let myroute = type == null ? (!checkMobile(this.userAgent()) ? '' : '.mm.html') : type == 'mm' ? '.mm.html' : '';
    return `${this.http.controller}/${this.http.action}${myroute}`;
  };
};
