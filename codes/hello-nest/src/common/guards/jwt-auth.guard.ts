/*
 * @Author: Lee
 * @Date: 2022-05-02 22:42:42
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-10 15:53:16
 * @Description: 全局权限认证守卫，用于验证用户登录
 */

// -- src/common/guards/jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
