/*
 * @Author: Lee
 * @Date: 2021-08-16 09:38:48
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 15:19:11
 */

module.exports = (app) => {
  // 解构app
  const { router, controller } = app;
  // 在路由里面设置获取
  app.username += '!!!'; 
  // 定义路由
  router.get("/", controller.home.index);
  router.post("/user/login", controller.home.login);
  router.get("/news", controller.news.list);

};
