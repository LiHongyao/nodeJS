/*
 * @Author: Lee
 * @Date: 2022-04-21 15:38:20
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 15:38:20
 */
import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'Hello';
  }
}
