'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
  (0, _inherits3.default)(_class, _think$controller$bas);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    _think$controller$bas.prototype.init.call(this, http);
    var self = this;
    this.env = configs.env;
    this.static = configs.static;
    this.meta_title = '首页';
    // if (this.env == 'dev') {
    //   this.static = '/';
    //   this.env = 'prd';
    // }
    this.assign('StaticHash', function (src) {
      try {
        if (self.env != 'dev') {
          var hash = GlobalStaticHash;
          if (hash == null || hash == '') {
            hash = JSON.parse(_fs2.default.readFileSync('www/static/hash.' + self.env + '.json', 'utf8'));
          }
          GlobalStaticHash = hash;
          var result = null;
          var iscss = false;
          if (src.indexOf('.js') > -1) {
            result = hash[src.replace(/.js$/, '')];
          } else {
            iscss = true;
            result = hash[src.replace(/.css$/, '')];
          }
          result = result == null ? self.static + src : self.static + result;
          return result = iscss ? result.replace('.js', '.css') : result;
        }
        return self.static + src;
      } catch (e) {
        return self.static + src;
      }
    });
  };

  // 公用处理
  _class.prototype.__before = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.DeviceWidth = 640;

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __before() {
      return _ref.apply(this, arguments);
    }

    return __before;
  }();

  // 跳转路径
  _class.prototype.goto = function goto(type) {
    var myroute = type == null ? !checkMobile(this.userAgent()) ? '' : '.mm.html' : type == 'mm' ? '.mm.html' : '';
    return this.http.controller + '/' + this.http.action + myroute;
  };

  return _class;
}(think.controller.base);

exports.default = _class;
;
//# sourceMappingURL=base.js.map