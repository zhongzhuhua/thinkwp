'use strict';

import Base from '../../common/controller/base.js';

export default class extends Base {
  indexAction() {
    let log = logger.getLogger('home');
    log.info('测试一下');
    return this.display(this.goto());
  };

  rsatestAction() {
    return this.json({
      str: 'zhong123',
      encrypt: encryptRSA('zhong123'),
      decrypt: decryptRSA(encryptRSA('zhong123'))
    });
  };
};
