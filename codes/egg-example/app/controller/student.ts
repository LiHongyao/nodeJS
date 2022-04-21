/*
 * @Author: Lee
 * @Date: 2022-04-21 16:01:40
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 17:49:01
 */
import { Controller } from 'egg';

export default class StudentController extends Controller {
  /**
   * 添加学生
   */
  public async push() {
    const { ctx } = this;
    ctx.body = await ctx.service.student.push();
  }
}
