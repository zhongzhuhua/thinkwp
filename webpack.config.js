let webpack = require('webpack');
let path = require('path');
let env = 'dev';
let configs = {
  theme: null,
  minJs: true,
  drop_console: env == 'prd'
};

let entryMap = {
  'lib/vendor': ['jquery'],
  'lib/vendor.mm': ['zepto'],
  'js/home/index/index': ['./www/dev/js/home/index/index.js']
};

// 插件
let plugins = [];

// 环境变量
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    env: JSON.stringify(env)
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
    filename: env == 'dev' ? 'static/[name].js' : 'static/[name].[chunkhash:6].js',
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
      loader: 'url-loader?limit=8192&name=img/[name].[hash:4].[ext]'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader?minimize!sass-loader!postcss-loader'
    }]
  },

  // 调试 map ，方便 es6 调试
  devtool: 'source-map',
  // require 引用入口配置
  resolve: {
    alias: {
      scss: './www/scss',
      theme: './www/scss/' + (configs.theme != null ? 'theme/' + configs.theme : ''),
    }
  }
};

// var configs = JSON.parse(process.env.configs);
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ZipPlugin = require('zip-webpack-plugin');
// var path = require('path');
// var root = path.resolve(process.cwd()).replace(/\\/g, '/');
// var pathApp = root + '/app';

// // 配置入口文件
// var plugins = [];

// var entryMap = {
//   'vendor': ['react', 'react-dom', 'react-router-dom', 'reqwest'],
//   'index': ['./index']
// };

// // autoprefixer
// plugins.push(new webpack.LoaderOptionsPlugin({
//   options: {
//     postcss: function() {
//       return [require('autoprefixer')];
//     }
//   }
// }));

// // 配置是否热更新，是否需要 demo
// if (configs.nodeEnv == 'dev') {
//   plugins.push(new webpack.HotModuleReplacementPlugin());
//   for (var key in entryMap) {
//     entryMap[key].unshift('webpack-hot-middleware/client?reload=true');
//   }
// }

// // 配置出口文件
// var pluginsHtml = new HtmlWebpackPlugin({
//   filename: 'index.html',
//   template: pathApp + '/index.html',
//   inject: 'body',
//   chunks: ['vendor', 'index']
// });
// plugins.push(pluginsHtml);

// // 压缩脚本
// if (configs.minJs) {
//   var uglifyPlug = new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       warnings: false,
//       drop_console: configs.nodeEnv == 'prd'
//     },
//     output: {
//       comments: false,
//     }
//   });
//   plugins.push(uglifyPlug);
// }

// // 提取公用脚本
// if (configs.nodeEnv != 'dev') {
//   plugins.push(new webpack.optimize.CommonsChunkPlugin(['vendor']));
// }

// // 样式
// var cssLoader = 'style-loader!css-loader!sass-loader!postcss-loader';
// if (configs.minCss) {
//   cssLoader = 'style-loader!css-loader?minimize!sass-loader!postcss-loader';
// }

// // 环境变量
// plugins.push(new webpack.DefinePlugin({
//   'process.env': {
//     NODE_ENV: JSON.stringify('production'),
//     nodeEnv: JSON.stringify(configs.nodeEnv),
//     api: JSON.stringify(configs.api),
//     entry: JSON.stringify(configs.entry)
//   }
// }));

// if (configs.nodeEnv != 'dev' && configs.zip) {
//   plugins.push(new ZipPlugin({
//     path: root + '/dist',
//     filename: './dist.zip'
//   }));
// }

// module.exports = {
//   // 跟目录
//   context: pathApp,

//   // 插件
//   plugins: plugins,

//   // 脚本入口文件配置
//   entry: entryMap,

//   // 脚本文件输出配置
//   output: {
//     filename: configs.nodeEnv == 'dev' ? 'js/[name].js' : 'js/[name].[chunkhash:6].js',
//     path: configs.nodeEnv == 'dev' ? '/dist/' : __dirname + '/dist/'
//   },
//   module: {
//     loaders: [{
//       test: /\.(js)?$/,
//       exclude: /node_modules/,
//       loader: 'babel-loader?compact=false&plugins[]=transform-runtime&presets[]=es2015&presets[]=stage-2'
//     }, {
//       test: /\.(jpe?g|gif|png|ico|svg)$/,
//       exclude: /node_modules/,
//       loader: 'url-loader?limit=8192&name=img/[name].[hash:4].[ext]'
//     }, {
//       test: /\.scss$/,
//       exclude: /node_modules/,
//       loader: cssLoader
//     }]
//   },
//   // 调试 map ，方便 es6 调试
//   devtool: 'source-map',
//   // require 引用入口配置
//   resolve: {
//     alias: {
//       api: pathApp + '/api',
//       component: pathApp + '/component',
//       utils: pathApp + '/component/utils',
//       views: pathApp + '/views',
//       scss: pathApp + '/styles',
//       theme: pathApp + '/styles/' + (configs.theme != null ? 'theme/' + configs.theme : ''),
//     }
//   }
// };
