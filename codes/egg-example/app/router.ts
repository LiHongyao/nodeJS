/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-20 14:48:27
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // -- jwt 中间件校验token
  const jwt = app.middleware.jwt(app.config.jwt);

  // -- 路由
  router.get('/', controller.home.index);

  // -- 用户相关
  router.get('/user/info', jwt, controller.user.info);
  router.post('/user/login', controller.user.login);
  router.post('/user/login-wx', controller.user.loginForWx);
};
