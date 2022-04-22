/*
 * @Author: Lee
 * @Date: 2022-04-21 16:03:38
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 12:36:15
 */
import { Service } from 'egg';

export default class StudentService extends Service {
  public async push() {
    const { ctx } = this;
    try {
      const r = await ctx.model.Student.create({
        ...ctx.request.body,
      });
      return r;
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    }
  }
}
