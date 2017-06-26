'use strict';

import Base from '../../common/controller/base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    return this.display(this.goto());
  };
};