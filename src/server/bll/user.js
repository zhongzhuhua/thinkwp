import base from './base';

export default class extends base {
  async add(model) {
    console.log('add user');
    console.log(model);
    this.db = think.model('users', this.dbconfig);
    let users = await this.db.select();
    console.log(users);
  };
};