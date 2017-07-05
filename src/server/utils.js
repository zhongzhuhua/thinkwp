/*
 * 公用工具类
 * getAllFiles 读取目录下所有文件
 * createFile 创建文件
 * getIp 获取 ip 地址
 */

// 定义可用变量
var path = require('path');
var fs = require('fs');
var os = require('os');
var stat = fs.stat;
var query = require('querystring');

/* 读取目录下所有文件
 * @param root 根目录
 * @param reg 文件正则匹配
 */
function getAllFiles(root, reg) {
  var res = [];

  var files = fs.readdirSync(root);
  files.forEach(function(file) {
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

  // console.log(res);
  return res;
};

exports.getAllFiles = getAllFiles;

/**
 * 读取目录下所有文件，包括文件夹
 * @param root 根目录
 * @param 保留 index = len 后面的字符串
 */
function getAllFilesDir(root, len = 0) {
  var res = [];

  var files = fs.readdirSync(root);
  files.forEach(function(file) {
    var pathname = root + '/' + file;
    var stat = fs.lstatSync(pathname);

    if (pathname != '.DS_Store') {
      res.push(pathname.substr(len));
      if (!stat.isDirectory()) {
        var fitlPath = path.resolve(root, file).replace(/\\/g, '/');
      } else {
        res = res.concat(getAllFilesDir(pathname, len));
      }
    }
  });

  // console.log(res);
  return res;
};
exports.getAllFilesDir = getAllFilesDir;

/**
 * 获取 root 下所有目录
 * @param root 目录
 */
function getDirs(root) {
  var result = [];

  if (root) {
    var files = fs.readdirSync(root);
    files.forEach(function(file) {
      var pathname = root + '/' + file;
      var stat = fs.lstatSync(pathname);

      if (stat.isDirectory()) {
        result.push(pathname);
      }
    });
  }

  return result;
};

exports.getDirs = function(root) {
  return getDirs(root);
};


/* 创建文件
 * @param root 保存的路径
 * @param content 文件内容
 */
function createFile(root, content) {
  var pathArr = root.split('/');
  var dirPath = pathArr.slice(0, pathArr.length);
  var fileName = pathArr.slice(pathArr.length);
  for (var i = 0; i < dirPath.length; i++) {
    var p = path.resolve(dirPath.slice(0, i).join('/'));
    if (dirPath[i] && !fs.existsSync(p)) {
      fs.mkdirSync(p, '0777');
    }
  }
  fs.writeFileSync(path.resolve(root), content, {});
};

exports.createFile = createFile;

exports.writeFileSync = fs.writeFileSync;

// 删除单个文件
exports.rmFile = function(root) {
  return fs.unlinkSync(root);
};

// 删除文件夹
function rmFolder(url) {
  var files = [];
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url);
    files.forEach(function(file, index) {
      var curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    //清除文件夹
    return fs.rmdirSync(url);
  } else {
    return true;
  }
};

exports.rmFolder = rmFolder;

// 获取 ip 地址
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


/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
function copy(src, dst) {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function(err, paths) {
    if (err) {
      throw err;
    }

    paths.forEach(function(path) {
      var _src = src + '/' + path,
        _dst = dst + '/' + path,
        readable, writable;

      stat(_src, function(err, st) {
        if (err) {
          throw err;
        }

        // 判断是否为文件
        if (st.isFile()) {
          // 创建读取流
          readable = fs.createReadStream(_src);
          // 创建写入流
          writable = fs.createWriteStream(_dst);
          // 通过管道来传输流
          readable.pipe(writable);
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          exists(_src, _dst, copy);
        }
      });
    });
  });
};

exports.copy = function(src, dst) {
  copy(src, dst);
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
function exists(src, dst, callback) {
  fs.exists(dst, function(exists) {
    if (exists) {
      callback(src, dst);
    } else {
      fs.mkdir(dst, function() {
        callback(src, dst);
      });
    }
  });
};

exports.exists = function(src, dst, callback) {
  exists(src, dst, callback);
};

// 文件或者目录是否存在
function isExists(src, callback) {
  return fs.exists(src, function(exists) {
    if (callback) {
      callback(exists);
    }
  });
};

exports.isExists = function(src, callback) {
  return isExists(src, callback);
};

exports.isExistsSync = function(src) {
  return fs.existsSync(src);
};

// 拷贝多个文件
exports.copyFile = function(src, dst) {;
  createFile(dst, fs.readFileSync(src), {});
};

// 创建目录
function createExists(src) {
  fs.mkdir(src);
};

exports.createExists = function(src) {
  createExists(src);
};

// 创建文件夹
function createExistsSync(src) {
  fs.mkdirSync(src);
};

exports.createExistsSync = function(src) {
  return createExistsSync(src);
};

// 读取文件内容
exports.readFileSync = function(src) {
  return fs.readFileSync(src, 'utf-8');
};

// 重命名文件
exports.rename = function(oldPath, newPath) {
  return fs.renameSync(oldPath, newPath);
};

/**
 * 获取 ajax 的 post data
 * @param req 请求 request
 * @param callback 回调函数
 */
exports.getPostData = function(req, callback) {
  var result = '';
  req.on('data', function(data) {
    result += data;
  });
  req.on('end', function() {
    result = result == null || result == '' ? null : query.parse(result);

    if (callback) {
      callback(result);
    }
  });
};
