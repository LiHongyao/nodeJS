/*
 * @Author: Lee
 * @Date: 2022-05-06 18:00:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 23:41:21
 * @Description: jwt 策略
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANT } from './jwt.constant';
import { LoginDto } from 'src/common/dto/req/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.secret,
    });
  }

  async validate(loginDto: LoginDto) {
    return { loginDto };
  }
}
