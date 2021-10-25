/*
 * @Author: Lee
 * @Date: 2021-10-24 11:45:56
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-25 14:05:07
 */

module.exports = (app) => {
  // # 【系统配置】
  const config = (exports = {});
  // - 配置cookie安全字符串
  config.keys = app.name + '_1634953317990_7396';
  // - 静态资源前缀
  config.static = { prefix: '/' };
  // - csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [],
  };
  // - 配置跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // - 中间件配置
  config.middleware = ['logmid'];
  config.logmid = {
    desc: '日志信息',
  };
  // -- mongodb
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017',
    options: {
      user: 'root',
      pass: '123',
      dbName: '',
    },
  };
  // -- swaggerdoc
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径
    apiInfo: {
      title: '接口文档',
      description: 'Swagger UI 测试接口文档',
      version: '1.0.0', //
      termsOfService: 'http://swagger.io/terms/',
      contact: {
        email: 'lihy_online@163.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    basePath: '/', // 配置基础路径
    schemes: ['http', 'https'], // 配置支持的协议
    consumes: ['application/json'], // 指定处理请求的提交内容类型 (Content-Type)，如 application/json、text/html
    produces: ['application/json'], // 指定返回的内容类型，仅当 request 请求头中的(Accept)类型中包含该指定类型才返回
    securityDefinitions: {}, // 配置接口安全授权方式
    enableSecurity: false, // 是否启用授权，默认 false
    // enableValidate: true, // 是否启用参数校验，默认 true
    routerMap: false, // 是否启用自动生成路由(实验功能)，默认 true
    enable: true, // 默认 true
  };
  // # 【用户配置】
  const userConfig = {};
  return {
    ...config,
    ...userConfig,
  };
};
