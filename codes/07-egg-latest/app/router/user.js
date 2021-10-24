/*
 * @Author: Lee
 * @Date: 2021-10-24 13:16:46
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-24 13:28:09
 */
module.exports = (app) => {
  const { router, controller } = app;
  const userRouter = router.namespace('/user');
  userRouter.get('/info/:id', controller.user.info);
  userRouter.post('/login', controller.user.login);
};
