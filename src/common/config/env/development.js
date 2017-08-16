'use strict';
import utils from '../../../server/utils.js';

export default {
  env: 'dev',
  static: 'http://' + utils.getIp() + ':' + (think.config('port') + 1) + '/static/'
};
