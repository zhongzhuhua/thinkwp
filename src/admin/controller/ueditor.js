// +----------------------------------------------------------------------
// | FH5CMS [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2017 http://www.pinganh5.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: ghostrin <ghostrin@163.com>
// +----------------------------------------------------------------------
'use strict';

import path from 'path';
import fs from 'fs';
import Base from './base.js';
let utils = require('../../server/utils.js');
export default class extends Base {
  init(http) {
    super.init(http);
  };
  async indexAction() {
    //auto render template file index_index.html
    this.config = this.config('ueditor');
    let action = this.get('action');
    let result;
    switch (action) {
      case 'config':
        result = this.config;
        break;
        /* 上传图片 */
      case 'uploadimage':
        /* 上传涂鸦 */
      case 'uploadscrawl':
        /* 上传视频 */
      case 'uploadvideo':
        /* 上传文件 */
      case 'uploadfile':
        result = await this.uploads();
        break;
        /* 列出图片 */
      case 'listimage':
        // result = this.uploadlist();
        break;
        /* 列出文件 */
      case 'listfile':
        // result = this.uploadlist();
        break;
        /* 抓取远程文件 */
      case 'catchimage':
        // result = await this.crawler();
        break;
      default:
        result = {
          state: '请求地址出错'
        };
        break;
    }
    //返回结果
    this.jsonp(result);
  };

  async uploads() {
    let file = this.file();
    let upfile = file.upfile;
    let headers = upfile.headers;
    let size = upfile.size;
    let filename = '/' + dateformat('y-m-d') + upfile.path.substring(upfile.path.lastIndexOf('/'));
    let savePath = path.resolve(process.cwd(), 'www/upload/');
    utils.createFile(savePath + filename, fs.readFileSync(upfile.path));
 
    return {
      'url': '/upload' + filename,
      'title': '',
      'original': upfile.originalFilename,
      'state': 'SUCCESS'
    };
  };

};
