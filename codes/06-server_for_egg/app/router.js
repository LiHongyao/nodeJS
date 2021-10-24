/*
 * @Author: Lee
 * @Date: 2021-08-16 09:38:48
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-15 16:55:22
 */

module.exports = (app) => {
  // 解构app
  const { router, controller } = app;

  // 定义路由
  router.get("/", controller.home.index);

  router.get("/stus/list", controller.stus.list);
  router.post("/user/login", controller.user.login);
  
  router.get("/news", controller.news.list);
};


