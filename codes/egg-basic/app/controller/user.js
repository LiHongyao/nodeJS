/*
 * @Author: Lee
 * @Date: 2021-08-16 15:52:47
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 15:54:29
 */
// app/controller/user.js
const Controller = require("egg").Controller;
class UserController extends Controller {
  async fetch() {
    const { app, ctx } = this;
    const id = ctx.query.id;
    const user = app.cache.get(id);
    ctx.body = ctx.helper.formatUser(user);
  }
}
module.exports = UserController;
