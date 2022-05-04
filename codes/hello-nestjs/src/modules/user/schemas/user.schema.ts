/*
 * @Author: Lee
 * @Date: 2022-05-04 00:26:36
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-04 10:20:19
 * @Description:
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ min: 18, max: 50 })
  age: number;

  @Prop({ enum: [0, 1, 2], default: 0 })
  sex: number;

  @Prop({ unique: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
