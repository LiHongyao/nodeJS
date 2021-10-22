/*
 * @Author: Lee
 * @Date: 2021-08-16 10:34:08
 * @LastEditors: Lee
 * @LastEditTime: 2021-08-16 10:42:54
 */
const Controller = require("egg").Controller;

class NewsController extends Controller {
  async list() {
    // 调用serview获取数据
    const dataList = await this.ctx.service.news.list();
    await this.ctx.render("news/list.tpl", dataList);
  }
}

module.exports = NewsController;
