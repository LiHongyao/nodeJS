/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 16:03:18
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // -- jwt 中间件校验token
  const jwt = app.middleware.jwt(app.config.jwt);
  // -- 用户相关
  router.get('/user/info', jwt, controller.user.info);
  router.post('/user/login', controller.user.login);
  router.post('/user/login-wx', controller.user.loginForWx);
  // -- 学生相关
  router.post('/student/push', controller.student.push);
};
