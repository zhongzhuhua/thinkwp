# thinkwp
thinks and webpack

## 注意
    
    * 项目需要 node 6.2.* 以上的版本支持
    * 需要安装 thinkjs
    * 需要全局安装 webpack2.* 版本


## 安装所需包

```
npm install
```


## 启动服务

    * [启动开发环境] npm start
    * [启动测试环境] npm run stg
    * [启动生产环境] npm run prd
    * [打包脚本样式] webpack

## 目录结构

```
|app                        -- 构建目录
|node_modules               -- 所需开发包
|runtime                    -- 缓存目录 session 之类的
|src                        -- 控制器，路由器，后端代码
├── common                  -- 公用文件
    └── config              -- 公用配置文件
        └── env             -- 开发、测试、生产 三个配置文件
        └── config.js       -- 端口号、字符集编码等其他配置
        └── db.js           -- 数据库配置
        └── error.js        -- action 方法 ajax 请求后返回的 code key 和 msg key
        └── session.js      -- session 超时配置
        └── view.js         -- 视图配置，配置 view 的文件命名规范等    
    └── bootstrap           -- 公用文件
        └── global.js       -- src 下公用配置文件和方法等         
|view                       -- 视图文件，默认 nunjuck 模板引擎
|www                        -- 网站文件
├── static                  -- 网站静态文件
├── dev                     -- 开发目录
├── *.js                    -- 三个启动文件
.gitignore                  -- git 配置
build-config.js             -- 独立项目配置文件，单个项目的配置在这里修改
configs.js                  -- 项目配置文件，是否压缩图片，配置 hyper.js 使用等
README.md                   -- 项目使用基础文档
package.json                -- 项目配置和依赖
server.js                   -- 项目启动文件

```