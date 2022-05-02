/*
 * @Author: Lee
 * @Date: 2022-04-29 15:10:52
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-02 23:42:07
 */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { logger } from './common/middleware/logger.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // -- 允许跨域
  app.enableCors();
  // -- swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Swagger 文档示例')
    .setDescription('耀哥Nest.js指南 Apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  // -- 全局注册日志中间件
  app.use(logger);
  // -- 全局注册权限验证守卫
  app.useGlobalGuards(new AuthGuard());
  // -- 全局注册通用异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // -- 全局注册通用验证管道
  app.useGlobalPipes(new ValidationPipe());
  // -- 全局注册响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(8888);
}
bootstrap();
