'use strict';

import Base from '../../common/controller/base.js';

export default class extends Base {
  indexAction() {
    let log = logger.getLogger('home');
    log.info('测试一下');
    return this.display(this.goto());
  };
};
