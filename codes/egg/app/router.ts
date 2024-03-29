/*
 * @Author: Lee
 * @Date: 2022-04-19 16:00:30
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 10:17:01
 */
import { Application } from 'egg';
import studentRouter from './router/student';
export default (app: Application) => {
  const { controller, router } = app;
  // -- jwt 中间件校验token
  const jwt = app.middleware.jwt(app.config.jwt);
  // -- 用户相关
  router.get('/user/info', jwt, controller.user.info);
  router.post('/user/login', controller.user.login);
  router.post('/user/login-wx', controller.user.loginForWx);
  // -- 学生相关
  studentRouter(app);
};
