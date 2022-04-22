/*
 * @Author: Lee
 * @Date: 2022-04-22 10:14:43
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 11:48:34
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.post('/student/push', controller.student.push);
};
