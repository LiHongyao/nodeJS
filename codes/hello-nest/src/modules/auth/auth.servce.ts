/*
 * @Author: Lee
 * @Date: 2022-05-03 11:02:13
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 23:41:56
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/db/schemas/user.schema';
import { LoginDto } from 'src/common/dto/req/login.dto';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'src/utils/encription';
import { CreateUserDto } from '../../common/dto/req/create-user.dto';
import { IResponse } from '../../common/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel('USER_MODEL') private readonly userModel: Model<User>, private readonly userService: UserService, private readonly jwtService: JwtService) {}
  // -- 验证
  async validateUser(user: LoginDto): Promise<IResponse> {
    // -- 获取手机号/登录密码
    const { phone, password } = user;
    // -- 查询用户
    return await this.userService.findOneByPhone(phone).then((res) => {
      // -- 用户不存在
      if (res.length === 0) {
        return { code: 3, msg: '用户尚未注册' };
      }
      // -- 用户存在
      const dbUser: CreateUserDto = res[0] as CreateUserDto;
      const pass = encript(password, dbUser.salt);
      if (pass === dbUser.password) {
        return { code: 0, msg: '用户登录成功' };
      } else {
        return { code: 4, msg: '账号或密码错误' };
      }
    });
  }

  // -- 登录
  async login(loginDto: LoginDto): Promise<IResponse> {
    return await this.validateUser(loginDto).then(async (res) => {
      if (res.code === 0) {
        return {
          ...res,
          data: { token: await this.createToken(loginDto) },
        };
      }
      return res;
    });
  }

  // -- 注册
  async regist(user: CreateUserDto): Promise<IResponse> {
    return await this.userService.findOneByPhone(user.phone).then(async (res) => {
      // -- 如果查到了用户，则表示用户已注册
      if (res.length !== 0) {
        return { code: 1, msg: '当前手机号已注册' };
      }
      // -- 如果没有查到用户，则表示用户未注册
      try {
        const createUser = new this.userModel(user);
        await createUser.save();
        return { code: 0, msg: '注册成功' };
      } catch (error) {
        return { code: 2, msg: '注册失败，失败原因：' + error };
      }
    });
  }

  // -- 生成token
  async createToken(loginDto: LoginDto) {
    return await this.jwtService.sign(loginDto);
  }
}
