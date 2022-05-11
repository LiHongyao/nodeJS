/*
 * @Author: Lee
 * @Date: 2022-05-11 11:13:33
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-11 17:34:42
 * @Description:
 */

import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UploadDto } from 'src/common/dto/req/upload.dto';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '获取又拍云签名' })
  @Public()
  @Post('getUploadSign')
  async getUploadSign(@Body() data: UploadDto) {
    return await this.uploadService.getUploadSign(data.key);
  }
}
