/*
 * @Author: Lee
 * @Date: 2022-04-21 15:07:51
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 12:08:19
 */
import { Application } from 'egg';

module.exports = (app: Application) => {
  // -- 引入建立连接的mongoose
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // -- 数据库表的映射
  const StudentSchema = new Schema(
    {
      // -- 这里主要用于关联某一张表
      // -- ref 为关联表名字
      // xx_id: {
      //   type: Schema.Types.ObjectId,
      //   required: true,
      //   ref: 'xx',
      // },
      name: String,
      age: {
        type: Number,
        min: 18,
        max: 60,
      },
      sex: {
        type: Number,
        enum: [-1, 0, 1], // [未知, 女, 男]
        default: -1,
      },
      phone: {
        type: String,
        unique: true,
        match: [/^1[3-9][0-9]{9}$/, '手机号格式错误'],
        required: [true, '手机号必填'],
      },
      address: String,
    },
    {
      timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // 生成时间
    }
  );
  // -- mongoose.model(Model, StudentSchema, 'students')
  return mongoose.model('Student', StudentSchema, 'students');
};
