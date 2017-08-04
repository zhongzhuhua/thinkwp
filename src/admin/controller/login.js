'use strict';

import Base from './base.js';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
  };
  
  // 后管登录页面
  async indexAction() {
    await this.session('Admin_LoginUser', {
      id: 1
    });
    return this.display('index/index.html');
  };
};
