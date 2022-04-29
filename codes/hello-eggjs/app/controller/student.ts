/*
 * @Author: Lee
 * @Date: 2022-04-21 16:01:40
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 10:50:35
 */
import { Controller } from 'egg';

export default class StudentController extends Controller {
  /**
   * 添加学生
   */
  public async push() {
    const { ctx } = this;
    console.log(ctx.request.body);
    const r = await ctx.service.student.push();
    console.log(r);
    ctx.body = r;
  }
}
