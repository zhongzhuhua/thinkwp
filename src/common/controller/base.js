'use strict';
import fs from 'fs';

export default class extends think.controller.base {
  async init(http) {
    super.init(http);
    this.env = configs.env;
    this.DeviceWidth = 640;
    this.meta_title = '首页';
  };

  // 公用处理
  async __before() {
  };

  // 跳转路径
  goto(type) {
    let myroute = type == null ? (!checkMobile(this.userAgent()) ? '' : '.mm.html') : type == 'mm' ? '.mm.html' : '';
    return `${this.http.controller}/${this.http.action}${myroute}`;
  };
};
