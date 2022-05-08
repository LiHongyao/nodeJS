/*
 * @Author: Lee
 * @Date: 2022-04-29 15:10:52
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-08 08:54:40
 */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { visitor } from './common/middleware/visitor.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  // -- 允许跨域
  app.enableCors();
  // -- 全局注册日志中间件
  app.use(visitor);
  // -- 全局注册权限验证守卫
  app.useGlobalGuards(new AuthGuard());
  // -- 全局注册通用异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());
  // -- 全局注册通用验证管道
  app.useGlobalPipes(new ValidationPipe());
  // -- 全局注册响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // -- 接口前缀
  app.setGlobalPrefix('/api');
  // -- swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Swagger 文档示例')
    .setDescription('耀哥Nest.js指南 Apis')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('doc', app, document);
  // -- 启动监听
  await app.listen(8888);
};
bootstrap().then(() => {
  new Logger('main.ts').log('Server running at http://localhost:8888');
});
