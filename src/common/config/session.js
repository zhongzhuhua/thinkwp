'use strict';

/**
 * session configs
 */
export default {
  name: 'thinkjs',
  type: 'file',
  secret: '(#M8PD*%',
  // 设置 session 有效期是半个钟
  timeout: 0.5 * 3600,
  cookie: {
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};