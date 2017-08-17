'use strict';

export default {
  resource_on: false,
  cluster_on: true,
  env: 'prd',
  static: '/',
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