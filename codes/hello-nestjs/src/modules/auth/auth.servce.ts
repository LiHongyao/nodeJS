/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 18:17:17
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/db/schemas/user.schema';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'src/utils/encription';
import { CreateUserDto } from '../../common/dto/req/create-user.dto';
import { IResponse } from '../../common/interfaces/response.interface';

@Injectable()
export class AuthService {
  private response: IResponse;
  constructor(@InjectModel('USER_MODEL') private readonly userModel: Model<User>, private readonly userService: UserService, private readonly jwtService: JwtService) {}

  // -- 验证
  async validateUser(user: CreateUserDto) {
    // -- 获取手机号/登录密码
    const { phone, password } = user;
    return await this.userService
      .findOne(phone)
      .then((res) => {
        // 用户不存在
        if (res.length === 0) {
          this.response = { code: 3, data: null, msg: '用户尚未注册' };
          return this.response;
        }
        return res[0] as CreateUserDto;
      })
      .then((dbUser: CreateUserDto) => {
        const pass = encript(password, dbUser.salt);
        if (pass === dbUser.password) {
          this.response = { code: 0, data: dbUser, msg: '用户登录成功' };
        } else {
          this.response = { code: 4, data: null, msg: '账号或密码错误' };
        }
        console.log(this.response);
        return this.response;
      })
      .catch(() => {
        return this.response;
      });
  }

  // -- 登录
  async login(user: CreateUserDto) {
    return await this.validateUser(user).then(async (res: IResponse) => {
      if (res.code !== 0) {
        this.response = res;
        throw this.response;
      }
      const userId = res.data.phone;
      this.response = {
        code: 0,
        data: {
          token: await this.createToken(user),
          userId,
        },
        msg: 'success',
      };
      return this.response;
    });
  }

  // -- 注册
  async regist(user: CreateUserDto) {
    return await this.userService
      .findOne(user.phone)
      .then((res) => {
        console.log(res, '查询用户');
        // -- 如果查到了用户，则表示用户已注册
        if (res.length !== 0) {
          this.response = { code: 1, data: null, msg: '当前手机号已注册' };
          throw this.response;
        }
      })
      .then(async () => {
        // -- 如果没有查到用户，则表示用户未注册
        try {
          const createUser = new this.userModel(user);
          await createUser.save();
          this.response = { code: 0, msg: '注册成功', data: null };
          return this.response;
        } catch (error) {
          this.response = { code: 2, data: null, msg: '注册失败，失败原因：' + error };
          return this.response;
        }
      })
      .catch(() => {
        return this.response;
      });
  }

  async createToken(user: CreateUserDto) {
    return await this.jwtService.sign(user);
  }
}
