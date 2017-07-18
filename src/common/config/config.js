'use strict';
/**
 * config
 */
export default {
  // 启动端口号
  port: 8360,
  encoding: 'utf-8',
  resource_on: true,
  resource_reg: /^(upload\/|static\/|[^\/]+\.(?!js|html|xml)\w+$)/,    
};
 