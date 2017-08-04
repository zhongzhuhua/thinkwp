'use strict';
import fs from 'fs';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
    let self = this;
    this.env = configs.env;
    this.static = configs.static;
    this.meta_title = '首页';
    // if (this.env == 'dev') {
    //   this.static = '/';
    //   this.env = 'prd';
    // }
    this.assign('StaticHash', function(src) {
      try {
        if (self.env != 'dev') {
          let hash = GlobalStaticHash;
          if (hash == null || hash == '') {
            hash = JSON.parse(fs.readFileSync('www/static/hash.' + self.env + '.json', 'utf8'));
          }
          GlobalStaticHash = hash;
          let result = null;
          let iscss = false;
          if (src.indexOf('.js') > -1) {
            result = hash[src.replace(/.js$/, '')];
          } else {
            iscss = true;
            result = hash[src.replace(/.css$/, '')];
          } 
          result = result == null ? self.static + src : self.static + result;
          return result = iscss ? result.replace('.js', '.css') : result;
        }
        return self.static + src;
      } catch (e) {
        return self.static + src;
      }
    });
  };

  // 公用处理
  async __before() {
    this.DeviceWidth = 640;
    this.user = await this.session('LoginUser');
  };

  // 判断用户是否登录
  islogin() {
    let user = this.session('LoginUser');
    return user != null && user.id > 0;
  };

  // 跳转路径
  goto(type) {
    let myroute = type == null ? (!checkMobile(this.userAgent()) ? '' : '.mm.html') : type == 'mm' ? '.mm.html' : '';
    return `${this.http.controller}/${this.http.action}${myroute}`;
  };
};
