/*
 * @Author: Lee
 * @Date: 2021-10-24 22:10:57
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 22:10:57
 */
module.exports = (app) => {
  const { router, controller } = app;
  const herosRouter = router.namespace('/heros');
  herosRouter.get('/list', controller.heros.list);
};
