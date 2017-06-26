'use strict';

export default class extends think.controller.base {
  // 清除 hash 缓存
  async clearAction() {
    GlobalStaticHash = null;
    return this.success();
  };
};