'use strict';
import utils from '../../../server/utils.js';

export default {
  env: 'dev',
  static: 'http://' + utils.getIp() + ':5500/static/'
};
