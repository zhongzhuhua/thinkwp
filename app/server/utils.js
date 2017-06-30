'use strict';

var fs = require('fs');
var path = require('path');

// 获取本机ip地址
function getIp() {
  var ip = '127.0.0.1';
  try {
    var network = require('os').networkInterfaces();
    var iplist = network.en0;

    if (iplist == null) {
      for (var key in network) {
        iplist = network[key];
        break;
      }

      if (iplist == null) {
        return ip;
      }
    }

    if (iplist.length == 1) {
      return iplist[0].address;
    } else {
      for (var key in iplist) {
        var ipModel = iplist[key];
        if (ipModel.family == 'IPv4') {
          return ipModel.address;
        }
      }
    }
  } catch (e) {
    console.log(e.message);
  }

  return ip;
};
exports.getIp = getIp;

/* 读取目录下所有文件
 * @param root 根目录
 * @param reg 文件正则匹配
 */
function getAllFiles(root, reg) {
  var res = [];

  var files = fs.readdirSync(root);
  files.forEach(function (file) {
    var pathname = root + '/' + file;
    var stat = fs.lstatSync(pathname);

    if (!stat.isDirectory()) {
      var fitlPath = path.resolve(root, file).replace(/\\/g, '/');
      if (reg == null || reg.test(fitlPath)) {
        res.push(fitlPath);
      }
    } else {
      res = res.concat(getAllFiles(pathname, reg));
    }
  });

  return res;
};
exports.getAllFiles = getAllFiles;
//# sourceMappingURL=utils.js.map