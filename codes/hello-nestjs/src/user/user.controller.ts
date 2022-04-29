import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto';

@Controller('user')
export class UserController {
  @Post('/login')
  login(@Body() data: LoginDto) {
    return {
      code: 0,
      data: {
        token: data.code,
      },
    };
  }
}
