'use strict';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
  };

  async asession() {
    if (arguments.length == 1) {
      let result = await this.session('Admin_' + arguments[0]);
      return result;
    } else if (arguments.length == 2) {
      await this.session('Admin_' + arguments[0], arguments[1]);
    }
  };

  async islogin() {
    return this.user && this.user.id;
  };

  async __before() {
    await this.asession('LoginUser', {
      id: 0
    });
    let user = await this.asession('LoginUser');
    this.user = user;
    if (user == null || !user.id) {
      if(this.isAjax()) {
        return this.fail('login');
      } else {
        return this.display('login/index.html');
      }
    }
  };
};
