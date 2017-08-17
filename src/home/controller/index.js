'use strict';

import Base from '../../common/controller/base.js';
import User from '../../server/bll/user.js';

export default class extends Base {
  async indexAction() {
    let log = logger.getLogger('home');
    log.info('测试一下');

    let user = new User();
    await user.add({
      name: 'zhong'
    });
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
