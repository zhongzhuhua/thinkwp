'use strict';

import Base from './base.js';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
  };
  
  // 后管登录页面
  async indexAction() {
    return this.display();
  };
};
