'use strict';
import utils from '../../../server/utils.js';

export default {
  env: 'dev',
  // static: 'http://' + utils.getIp() + ':' + (think.config('port') + 1) + '/static/',
  static: '/static/',
  db: {
    type: 'mysql',
    host: '127.0.0.1',
    port: '',
    database: 'thinkwp',
    user: 'root',
    password: '',
    prefix: '',
    encoding: 'utf8'
  }
};
