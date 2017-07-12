'use strict';

import Base from './base.js';

export default class extends Base {
  // 后管首页
  async indexAction() {
    return this.display();
  };
};
