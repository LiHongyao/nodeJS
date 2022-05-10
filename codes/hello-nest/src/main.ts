/*
 * @Author: Lee
 * @Date: 2022-04-29 15:10:52
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-10 15:54:57
 */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { visitor } from './common/middleware/visitor.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
const logger = new Logger('main.ts');

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  // -- 允许跨域
  app.enableCors();
  // -- web 安全，防常见漏洞
  app.use(helmet());
  // -- 设置访问频率
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 1000, // 限制15分钟内最多只能访问1000次
    }),
  );

  const config = app.get(ConfigService);
  // -- 接口前缀
  const prefix = config.get<string>('app.prefix');
  app.setGlobalPrefix(prefix);

  // -- 全局注册日志中间件
  app.use(visitor);
  // -- 全局注册通用异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // -- 全局注册通用验证管道
  app.useGlobalPipes(new ValidationPipe());
  // -- 全局注册响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
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
  const port = config.get<string>('app.port');
  await app.listen(port);
  logger.log(`Server running at http://localhost:${port}`);
  logger.log(`Swagger running at http://localhost:${port}/doc`);
};
bootstrap();
