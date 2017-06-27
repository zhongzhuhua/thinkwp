let webpack = require('webpack');
let utils = require('./src/server/utils');
let path = require('path');
let GenerateAssetPlugin = require('generate-asset-webpack-plugin');
let argv = process.argv;
argv = argv == null ? [] : argv;

let env = 'prd';
let type = null;
for (let key in argv) {
  if (type != null) {
    if (type == 'env') {
      env = argv[key];
    }
  }
  type = null;
  if (argv[key].indexOf('--') > -1) {
    type = argv[key].replace('--', '');
  }
}

let configs = {
  theme: null,
  minJs: true,
  drop_console: env == 'prd'
};

let entryMap = {
  'lib/vendor': ['./www/dev/lib/vendor'],
  'lib/vendor.mm': ['./www/dev/lib/vendor.mm'],
  'js/home/index/index': ['./www/dev/js/home/index/index.js'],
  'js/home/index/index.mm': ['./www/dev/js/home/index/index.mm.js']
};

// 插件
let plugins = [];
let createJson = function(compilation) {
  let result = {};
  for (let key in compilation.chunks) {
    let model = compilation.chunks[key];
    result[model.name] = model.files[0];
  }
  return JSON.stringify(result);
};

plugins.push(new GenerateAssetPlugin({
  filename: 'static/hash.' + env + '.json',
  fn: (compilation, cb) => {
    cb(null, createJson(compilation));
  }
}));

// 环境变量
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    env: JSON.stringify(env)
  }
}));

// autoprefixer
plugins.push(new webpack.LoaderOptionsPlugin({
  options: {
    postcss: function(a) {
      // console.log(a.resourcePath);
      if (a.resourcePath.indexOf('.mm.') > -1) {
        return [
          require('autoprefixer')({
            browsers: ['Android>=2.2', 'ios>=5']
          })
        ];
      } else {
        return [
          require('autoprefixer')({
            browsers: ['ie>=8', 'chrome>=4', 'safari>=4', 'firefox>=8']
          })
        ];
      }
    }
  }
}));

// 配置是否热更新，是否需要 demo
if (env == 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

// 压缩脚本
if (configs.minJs) {
  var uglifyPlug = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: configs.drop_console
    },
    output: {
      comments: false,
    }
  });
  plugins.push(uglifyPlug);
}

module.exports = {
  // 脚本入口文件配置
  entry: entryMap,

  // 插件
  plugins: plugins,

  // 脚本文件输出配置
  output: {
    filename: env == 'dev' ? 'static/[name].js?[hash:8]' : 'static/[name].js?[chunkhash:8]',
    path: env == 'dev' ? __dirname + '/www/' : __dirname + '/www/'
  },

  module: {
    loaders: [{
      test: /\.(js)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader?compact=false&plugins[]=transform-runtime&presets[]=es2015&presets[]=stage-2'
    }, {
      test: /\.(jpe?g|gif|png|ico|svg)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash:4]'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader?minimize!sass-loader!postcss-loader'
    }]
  },

  devServer: {
    host: utils.getIp(),
    disableHostCheck: true
  },

  // 调试 map ，方便 es6 调试
  devtool: 'source-map',
  // require 引用入口配置
  resolve: {
    alias: {
      css: __dirname + '/www/dev/css',
      scss: __dirname + '/www/dev/scss',
      theme: __dirname + '/www/dev/scss/' + (configs.theme != null ? 'theme/' + configs.theme : '')
    }
  }
};
