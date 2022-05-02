[中文文档 >>](https://docs.nestjs.cn/)

[工程目录与代码规范 >>](https://www.toimc.com/nestjs-example-project-4/)

# 一、安装

```shell
$ npm i -g @nestjs/cli
$ nest new project-names
```

> **Tips：**使用 nvm 管理 node

# 二、核心

## 1. 控制器

创建控制器

```shell
$ nest g co modules/hello
$ nest g mo modules/hello
$ nest g s modules/hello
```

> **Tips：**这里我们在 *`modules`* 目录下新建了 *`hello`* 模块，包括 *`controller`*、*`module`* 和 *`service`*。

*`src/modules/hello/hello.controller.ts`*

```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(
    /** 注入HelloService服务 */
    private readonly helloService: HelloService,
  ) {}
  // 查询
  @Get()
  fetch(@Query() { id }, @Headers('token') token) {
    console.log(token);
    return this.helloService.fetch(id);
  }

  // 创建
  @Post()
  save(@Body() { message }) {
    return this.helloService.save(message);
  }

  // 更新
  @Patch(':id')
  update(@Param() { id }, @Body() { message }) {
    return this.helloService.update(id, message);
  }

  // 删除
  @Delete()
  remove(@Query() { id }) {
    return this.helloService.remove(id);
  }
}
```

*`src/modules/hello/hello.service.ts`*

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  fetch(id: string) {
    return `fetch with ID：${id}`;
  }

  save(message: string) {
    return `save message：${message}`;
  }
  update(id: string, message: string) {
    return `update message of id ${id}：${message}`;
  }
  remove(id: string) {
    return `remove message of id ${id}`;
  }
}
```

*`src/modules/hello/hello.module.ts`*

```typescript
import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
```

最后，修改 *`app.module.ts`* 代码，引入 `HelloModule` 模块：

```typescript
import { Module } from '@nestjs/common';
import { HelloModule } from './modules/hello/hello.module';

@Module({
  imports: [HelloModule],
})
export class AppModule {}
```

## 2. 中间件

中间件是请求的第一道关卡，其作用是：

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求-响应周期。
- 调用堆栈中的下一个中间件函数。
- 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 `next()` 将控制传递给下一个中间件函数。否则, 请求将被挂起。

本示例主要讲解 `logger` 中间件的使用：

1）定义中间件：*`src/common/middleware/logger.middleware.ts`*

```typescript
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, path } = req;
  console.log(`${method} ${path}`);
  next();
}
```

2）全局使用

```typescript
app.use(logger);
```

> **Tips：**
>
> - 只有函数组件支持全局使用。
> - 同一路由注册多个中间件的执行顺序为，先是全局中间件执行，然后是模块中间件执行，模块中的中间件顺序按照 `.apply` 中注册的顺序执行

## 3. 守卫

守卫是第二道关卡

守卫控制一些权限内容，如：一些接口需要带上 `token` 标记，才能够调用，守卫则是对这个标记进行验证操作的。
本例中代码如下：*`src/common/guards/auth.guard.ts`*

```typescript
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly whiteList = ['/user/login'];
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('进入全局权限守卫 >>>');
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    // 获取请求头中的token字段
    const token = context.switchToRpc().getData().headers.token;
    // 如果是白名单内的路由就不拦截，直接通过
    if (this.whiteList.includes(request.url)) {
      return true;
    }
    // 验证token的合理性以及根据token作出相应的操作
    if (token) {
      try {
        // -- 验证逻辑
        return true;
      } catch (error) {
        throw new HttpException(
          '没有授权访问，请先登录',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        '没有授权访问，请先登录',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
```

## 4. 拦截器

[参考官方文档 >>](https://docs.nestjs.cn/8/interceptors)

拦截器是第三道关卡，比如我想自定义返回内容如：

```typescript
interface BaseResponse<T> {
  status: number /** 状态码 */;
  data: T /** 相应数据 */;
  message: string /** 数据 */;
}
```

这个时候就可以使用拦截器来做一下处理了，拦截器的作用是：

1. 在函数执行之前/之后绑定额外的逻辑
2. 转换从函数返回的结果
3. 转换从函数抛出的异常
4. 扩展基本函数行为
5. 根据所选条件完全重写函数 (例如, 缓存目的)

拦截器的执行顺序分为两个部分：
第一个部分在管道和自定义逻辑（`next.handle()`方法）之前。
第二个部分在管道和自定义逻辑（`(next.handle()`方法）之后。

## 5. 管道

[参考官方文档 >>](https://docs.nestjs.cn/8/pipes)

管道是第一个关卡，管道有两个类型:

- **转换**：管道将输入数据转换为所需的数据输出
- **验证**：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

通俗来讲就是对请求接口的入参进行验证和转换的前置操作，验证好了才会将内容给到路由对应的方法中去。

### 转换

有时，可能会要求前端传递过来的参数是数值类型的，比如 *`/:id`*，但我们知道，通过url传递的参数一般为 `string` 类型，此时我们可以通过官方内置的 `ParseIntPipe` 管道进行转换，如下所示：

```typescript
@Patch(':id')
update(@Param('id', new ParseIntPipe()) id, @Body() { message }) {
  return this.helloService.update(id, message);
}
```

### 验证

1）安装依赖

```shell
$ npm i --save class-validator class-transformer
```

2）在dto文件中校验，如：*`src/modules/user/dto/user-login.dto.ts`*

```typescript
import { MinLength, IsNotEmpty } from 'class-validator';
export class UserLoginDto {
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @MinLength(4, { message: '密码长度不能小于4位数' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
```

3）引用

- 单个请求参数绑定：

  ```typescript
  @Post('/login')
  login(@Body(new ValidationPipe()) userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
  ```

- 单个路由绑定：

  ```typescript
  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
  ```

- 全局绑定：*`main.ts`*

  ```typescript
  app.useGlobalPipes(new ValidationPipe());
  ```

### 自定义管道

1）编写自定义管道文件：*`src/common/pipes/validation.pipe.ts`*

```typescript
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  // -- value：当前处理参数
  // -- metatype：属性的元类型
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('进入全局管道 >>>');
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // -- plainToClass将普通的JavaScript对象转换为特定类的实例
    const object = plainToClass(metatype, value);
    // -- 验证该对象返回出错的数组
    const errors = await validate(object);
    if (errors.length > 0) {
      // -- 将错误信息数组中的第一个内容返回给异常过滤器
      const constraints = errors.shift().constraints;
      const k = Object.keys(constraints)[0];
      const errorMsg = constraints[k];
      throw new BadRequestException(errorMsg);
    }
    return value;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

2）全局注册

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // -- 全局注册通用验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8888);
}
bootstrap();
```

### 总结

通常情况下是可以使用 `useGlobalPipes` 来注册的，但是对应**混合应用**则应该在 *`app.module.ts`* 中进行注册。

管道的使用实际上就是对前端调用的入参进行验证，转换，一般情况下使用官方提供的几个内置验证管道就能满足大部分需求，但需要清楚，`class-validator` 和 `class-transformer` 这两个npm包的使用规则，如果需要自定义管道，则需要根据自己的实际情况做调整，了解管道的内在原理。



## 6. 异常过滤器

1）定义过滤器：*`src/common/filters/http-exception.filter.ts`*

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionRes: any = exception.getResponse();
    const { error, message } = exceptionRes;
    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
```

2）全局使用

```typescript
app.useGlobalFilters(new HttpExceptionFilter());
```





## 7. 执行顺序

`中间件` → `守卫` → `拦截器`

# 三、扩展

## 帮助文档

```shell
$ nest -h
┌───────────────┬─────────────┬──────────────────────────────────────────────┐
│ name          │ alias       │ description                                  │
│ application   │ application │ Generate a new application workspace         │
│ class         │ cl          │ Generate a new class                         │
│ configuration │ config      │ Generate a CLI configuration file            │
│ controller    │ co          │ Generate a controller declaration            │
│ decorator     │ d           │ Generate a custom decorator                  │
│ filter        │ f           │ Generate a filter declaration                │
│ gateway       │ ga          │ Generate a gateway declaration               │
│ guard         │ gu          │ Generate a guard declaration                 │
│ interceptor   │ in          │ Generate an interceptor declaration          │
│ interface     │ interface   │ Generate an interface                        │
│ middleware    │ mi          │ Generate a middleware declaration            │
│ module        │ mo          │ Generate a module declaration                │
│ pipe          │ pi          │ Generate a pipe declaration                  │
│ provider      │ pr          │ Generate a provider declaration              │
│ resolver      │ r           │ Generate a GraphQL resolver declaration      │
│ service       │ s           │ Generate a service declaration               │
│ library       │ lib         │ Generate a new library within a monorepo     │
│ sub-app       │ app         │ Generate a new application within a monorepo │
│ resource      │ res         │ Generate a new CRUD resource                 │
└───────────────┴─────────────┴──────────────────────────────────────────────┘
```

> **Tips：** windows 切换至 cmd

示例/生成控制器，依此类推

```shell
$ nest g co controller-names
```

## 允许跨域

*`src/main.ts`*

```typescript
app.enableCors();
```

## Http

1）安装依赖：

```shell
$ npm i --save @nestjs/axios axios
```

2）目录结构：

```shell
$ nest g co auth
$ nest g s auth
$ nest g mo auth
```

> **Tips：**这里以 auth 控制器为例。

3）导入 HttpModule：*`auth/auth.module.ts`*

```typescript
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  providers: [AuthService],
})
export class AuthModule {}
```

4）注入 HttpService：*`auth/auth.service.ts`*

```typescript
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
  queryData(): Observable<AxiosResponse<any>> {
    // -- 请求
    return this.httpService.get('http://localhost/users');
  }
}
```

## 执行顺序

`中间件` → `守卫` →  `过滤器` → `管道` 

## 身份验证

1）安装依赖

```shell
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```

## Swagger

[参考指南 >>](https://docs.nestjs.cn/8/openapi)

### 安装依赖

```shell
$ npm install --save @nestjs/swagger swagger-ui-express
```

[包地址 >>](https://www.npmjs.com/package/@nestjs/swagger)

### 配置

*`src/main.ts`*

```typescript
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // -- 允许跨域
  app.enableCors();
  // -- 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Swagger 文档示例')
    .setDescription('耀哥Nest.js指南 Apis')
    .setVersion('1.0')
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .setContact('Li-HONGYAO', 'https://github.com/lihongyao', 'lihy_online@163.com')
    .addTag('APIs')
    .addServer('http://localhost:8888', '开发环境服务')
    .addServer('http://localhost:3000', '测试环境服务')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // -- 访问链接
  SwaggerModule.setup('doc', app, document);
  await app.listen(8888);
}
bootstrap();
```

### 示例

- `ApiTags('控制器分组名')`:
- `@ApiOperation({ summary: '接口名' })`
- `@ApiQuery({ name: 'id', description: '查询索引', type: Number, example: 1, required: false })`

- *`@ApiParam({ name: 'id', description: '更新索引', type: Number, example: 1 })`*
- `@ApiProperty({ name: 'age', description: 'age', type: Number })`

# 四、参考

- <https://blog.csdn.net/lxy869718069/article/details/114028195>
