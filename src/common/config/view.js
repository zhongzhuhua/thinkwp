'use strict';
/**
 * template config
 */
export default {
  type: 'nunjucks',
  content_type: 'text/html',
  file_ext: '.html',
  // 文件命名规范
  file_depr: '/',
  root_path: think.ROOT_PATH + '/view',
  adapter: {
    nunjucks: {}
  }
};
