/*
 * @Author: Lee
 * @Date: 2021-10-24 13:00:38
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 13:09:14
 */

module.exports = (app) => {
  const { router, controller } = app;
  const homeRouter = router.namespace('/home');
  homeRouter.get('/', controller.home.index);
};
