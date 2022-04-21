/*
 * @Author: Lee
 * @Date: 2022-04-21 16:03:38
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-21 18:20:02
 */
import { Service } from 'egg';

export default class StudentService extends Service {
  public async push() {
    const { ctx } = this;
    console.log(ctx.request.body);
    try {
      const r = await ctx.model.Students.bulkWrite([
        { insertOne: { ...ctx.request.body } },
      ]);
      return r;
    } catch ({ message }) {
      console.log('错误', message);
      return message;
    }
  }
}
