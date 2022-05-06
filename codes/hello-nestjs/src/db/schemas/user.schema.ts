/*
 * @Author: Lee
 * @Date: 2022-05-04 00:26:36
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-06 23:19:07
 * @Description:
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// -- @Schema 装饰器标记一个类作为Schema 定义
// -- @Prop 装饰器在文档中定义了一个属性
@Schema({ versionKey: false })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ min: 18, max: 50 })
  age: number;

  @Prop({ enum: [0, 1, 2], default: 0 })
  sex: number;

  @Prop()
  job: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
