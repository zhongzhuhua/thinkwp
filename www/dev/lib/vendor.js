import $ from 'jquery';
import 'css/vendor.scss';
global.$ = $;
global.Promise = require('es6-promise').Promise;
import Toast from '../component/Toast';
console.log(new Toast());
