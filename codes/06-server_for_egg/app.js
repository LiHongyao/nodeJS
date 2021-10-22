/*
 * @Author: Lee
 * @Date: 2021-10-22 21:30:15
 * @LastEditors: Lee
 * @LastEditTime: 2021-10-22 22:47:19
 */

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
    app.username = "Li-HONGYAO";
  }
  configWillLoad() {
    const ctx = this.app.createAnonymousContext();
    console.log(ctx.helper.reverse("123"));
    console.log("__配置文件即将加载完成__");
  }
};
