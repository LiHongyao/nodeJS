/*
 * @Author: Lee
 * @Date: 2022-05-06 18:00:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-07 17:27:20
 * @Description: jwt 策略
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANT } from './jwt.constant';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.secret,
    });
  }

  async validate(payload: CreateUserDto) {
    return { phone: payload.phone };
  }
}
