'use strict';

import Base from '../../common/controller/base.js';
let utils = require('../../server/utils.js');
let exec = require('child_process').exec;
let rootPath = process.cwd() + '/';
let buildRoot = (process.cwd() + '/').replace('offical', 'cml');
let buildPath = (process.cwd() + '/').replace('offical', 'cml/src/module');

export default class extends Base {
  async __before() {
    console.log(this.islogin());
    let identify = this.user && this.user.identify;
    this.identify = identify || 'nologin';
    this.project = await this.get('project') || 'default';
  };
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    return this.display();
  };

  // 添加配置文件
  async addconfigAction() {
    try {
      let component = await this.get('component');
      let components = null;
      if (component != null) {
        components = component.split(',');
      }
      let modules = '';
      let routes = '';
      let temp = utils.readFileSync('src/builds/controller/temp.txt', 'utf8');
      if (components && components.length > 0) {
        for (let key in components) {
          let config = JSON.parse(utils.readFileSync(buildPath + '/' + components[key] + '/routes.js'));
          let router = config.router;
          if (router) {
            for (let key2 in router) {
              let model = router[key2];
              let rkey = Object.keys(model)[0];
              let rval = model[rkey];
              modules += "import " + rkey.replace(/^\//, '') + " from '" + rval + "';\n";
              routes += '\n      <Route path="' + rkey + '" component={' + rkey.replace(/^\//, '') + '} />';
            }
          }
        }
      }
      temp = temp.replace('{Modules}', modules).replace('{Routes}', routes);
      let filePath = buildRoot + 'openConfig/' + this.identify + '/' + this.project + '.js';
      if (!utils.isExistsSync(filePath)) {
        utils.createFile(filePath, temp);
      } else {
        utils.writeFileSync(filePath, temp);
      }

      this.success();
    } catch (e) {
      this.fail(e.message);
    }
  };

  // 构建项目
  async buildAction() {
    let openBuild = '../openConfig/' + this.identify + '/' + this.project + '.js';
    let openDist = rootPath + 'www/static/projects/' + this.identify + '/' + this.project;
    let site = await this.get('site');
    site = site || 'mintai';

    let runStr = "cross-env openBuild='" + openBuild + "' openDist='" + openDist + "' NODE_ENV=production webpack  --progress --profile -p --env.api prd --env.site " + site;
    console.log(runStr);
    return new Promise((resolve) => {
      exec('rm -r -f ' + openDist, null, function(err) {
        exec(runStr, {
          cwd: buildRoot,
          timeout: 0,
          maxBuffer: 2000 * 1024
        }, function(err) {
          resolve(err == null ? null : {
            code: '100000',
            msg: '打包异常'
          });
        });
      });
    }).then((result) => {
      if (result == null) {
        this.success();
      } else {
        this.fail(err);
      }
    });
  };

};
