var thinkjs = require('thinkjs');
var path = require('path');
var exec = require('child_process').exec;

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  env: 'development'
});

instance.compile({
  log: true,
  presets: [],
  plugins: []
});

exec('webpack-dev-server --env dev --inline --hot --port ' + (think.config('port') + 1));

instance.run();
