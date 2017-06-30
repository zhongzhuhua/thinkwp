'use strict';

exports.__esModule = true;

var _utils = require('../../../server/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  env: 'dev',
  static: 'http://' + _utils2.default.getIp() + ':5500/static/'
};
//# sourceMappingURL=development.js.map