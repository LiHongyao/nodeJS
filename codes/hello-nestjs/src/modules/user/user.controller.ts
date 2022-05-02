import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户登录' })
  @Post('/login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
}
