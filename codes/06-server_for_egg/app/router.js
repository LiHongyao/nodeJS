/*
 * @Author: Lee
 * @Date: 2021-10-22 21:28:37
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-22 21:50:10
 */

module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
};
