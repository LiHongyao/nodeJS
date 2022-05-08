- [ 中文文档 >>](https://docs.nestjs.cn/)

- [工程目录与代码规范 >>](https://www.toimc.com/nestjs-example-project-4/)
- [Postman Tools >>](https://www.postman.com/downloads/)
- [参考 >>](https://blog.csdn.net/lxy869718069/article/details/114028195)

# 一、概述

Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

据 [Node-framework-stars  >>](https://github.com/VanoDevium/node-framework-stars) 统计，Nest 的 stars 仅次于 express。所以，非常值得学习！	

# 二、安装

使用 [Nest CLI](https://docs.nestjs.cn/8/cli?id=overview) 建立新项目非常简单。 在安装好 npm 后，您可以使用下面命令在您的 OS 终端中创建 Nest 项目：

```shell
$ npm i -g @nestjs/cli
$ nest new project-name
```

将会创建 `project-name` 目录， 安装 node_modules 和一些其他样板文件，并将创建一个 `src` 目录，目录中包含几个核心文件。

```
src
 ├── app.controller.spec.ts
 ├── app.controller.ts
 ├── app.module.ts
 ├── app.service.ts
 └── main.ts
```

以下是这些核心文件的简要概述：

| #                      | 描述                                                         |
| :--------------------- | ------------------------------------------------------------ |
| app.controller.ts      | 带有单个路由的基本控制器示例                                 |
| app.controller.spec.ts | 对于基本控制器的单元测试样例（可删除）                       |
| app.module.ts          | 应用程序的根模块                                             |
| app.service.ts         | 带有单个方法的基本服务                                       |
| main.ts                | 应用程序入口文件。它使用 `NestFactory` 用来创建 Nest 应用实例。 |

`main.ts` 包含一个异步函数，它负责**引导**我们的应用程序：

```typescript
/* main.ts */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const logger = new Logger('main.ts');
const bootstrap = async () =>  {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap().then(() => {
  logger.log('Server running at http://localhost:8888');
});
```

要创建一个 Nest 应用实例，我们使用了 `NestFactory` 核心类。`NestFactory` 暴露了一些静态方法用于创建应用实例。 `create()` 方法返回一个实现 `INestApplication` 接口的对象。该对象提供了一组可用的方法，我们会在后面的章节中对这些方法进行详细描述。 在上面的 `main.ts` 示例中，我们只是启动 HTTP 服务，让应用程序等待 HTTP 请求。

目录结构：[最佳目录实践 >>](https://www.toimc.com/nestjs-example-project-4/#%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)

```ini
nest-proj
.
├── node_moddules
├── src
│   ├─ common               # 全局公共模块
│   │   ├── db              # 数据库
│   │   ├── decorators      # 装饰器
│   │   ├── dto             # 验证
│   │   ├── filters         # 过滤器
│   │   ├── guards          # 守卫
│   │   ├── interceptors    # 拦截器
│   │   ├── interfaces      # 类型定义
│   │   ├── middleware      # 中间件
│   │   └── pipes           # 管道
│   ├─ modules              # 业务模块
│   ├─ utils                # 工具函数
│   ├─ app.module.ts    
│   └── main.ts   
└── package.json
```

# 三、概述

开始之前，我们先来了解一下 nestjs 的执行流程：

`客户端发起请求` → `中间件` → `守卫` → `拦截器`

## 模块

[模块](https://docs.nestjs.cn/8/modules) 是具有 `@Module()` 装饰器的类。 `@Module()` 装饰器提供了元数据，Nest 用它来组织应用程序结构。

`@module()` 装饰器接受一个描述模块属性的对象：

| Tags        | DESC                                 |
| ----------- | ------------------------------------ |
| providers   | 提供者，并且可以至少在整个模块中共享 |
| controllers | 控制器                               |
| imports     | 导入模块                             |
| exports     | 导出模块                             |

通常，一个模块包含 `service`、`module`、`controller`，其中：

- `module`：负责封装模块，包括导入、导出、控制器以及注入提供者。
- `service`：负责具体的业务逻辑实现。
- `controller`：负责路由/参数

全局模块通过 `@Global` 装饰器定义。

## 控制器

[控制器](https://docs.nestjs.cn/8/controllers) 使用 `@Controller()` 装饰器来定义，负责处理传入的**请求**和向客户端返回**响应**，简单理解就是负责路由处理。这里主要介绍控制器的基础使用，更多细节参照官网。

创建模块

```shell
$ nest g co modules/hello  # 生成控制器
$ nest g mo modules/hello  # 生成模块
$ nest g s modules/hello   # 生成服务（提供者）
```

> **Tips：**这里我们在 *`modules`* 目录下新建了 *`hello`* 模块，包括 *`controller`*、*`module`* 和 *`service`*。

定义响应数据的格式，这里我们统一定义：

*`src/common/interfaces/response.interface.ts`*

```typescript
export interface IResponse<T = any> {
  code: number /** 状态码 */;
  data?: T /** 响应数据 */;
  msg?: string /** 提示信息 */;
  page?: {
    pageNo: number;
    pages: number;
    total: number;
  };
}
```

*`src/common/dto/req/create-user.dto.ts`*

```typescript
export class CreateUserDto {
  name: string;
  age: number;
  sex: string;
  job: string;
}
```

> **Tips：**这个文件的作用主要用于后期的管道验证，这里你可以理解为类型声明。

*`src/modules/hello/hello.service.ts`*

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { IResponse } from 'src/common/interfaces/response.interface';

const logger = new Logger('hello.service');

@Injectable()
export class HelloService {
  private response: IResponse;

  async fetch(id: string) {
    this.response = {
      code: 0,
      data: `查询ID：${id}`,
    };
    return this.response;
  }

  async save(data: CreateUserDto) {
    this.response = {
      code: 0,
      data,
    };
    return this.response;
  }

  async update(id: string, data: CreateUserDto) {
    logger.log('更新数据：', id, data);
    this.response = {
      code: 0,
    };
    return this.response;
  }

  async remove(id: number) {
    logger.log(`删除数据：${id}`);
    this.response = {
      code: 0,
    };
    return this.response;
  }
}
```

*`src/modules/hello/hello.controller.ts`*

```typescript
import { Body, Controller, Delete, Get, Headers, Logger, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { HelloService } from './hello.service';

const logger = new Logger('hello.controller');

@ApiTags('基础示例')
@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}
  // -- 查询
  @ApiOperation({ summary: '查询数据' })
  @ApiQuery({ name: 'id', description: '数据ID', type: Number, example: 1, required: false })
  @Get('info')
  fetch(@Query() { id }, @Headers('token') token) {
    logger.log(`头部参数 token：${token}`);
    return this.helloService.fetch(id);
  }

  // -- 新建
  @ApiOperation({ summary: '新增数据' })
  @Post('create')
  save(@Body() data: CreateUserDto) {
    return this.helloService.save(data);
  }

  // -- 更新
  @ApiOperation({ summary: '更新数据' })
  @ApiQuery({ name: 'id', description: '数据ID', type: Number, example: 1, required: false })
  @Patch('update/:id')
  update(@Param('id', new ParseIntPipe()) id, @Body() data: CreateUserDto) {
    return this.helloService.update(id, data);
  }

  // -- 删除
  @ApiOperation({ summary: '删除数据' })
  @ApiQuery({ name: 'id', description: '数据ID', type: Number, example: 1, required: false })
  @Delete('remove')
  remove(@Query('id', new ParseIntPipe()) id) {
    return this.helloService.remove(id);
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

> **Tips：** `controller` 代码基本上是固定模板，你的业务逻辑应该放置在 `service` 中处理。

## 中间件

[中间件](https://docs.nestjs.cn/8/middlewares) 是在路由处理程序 **之前** 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 `next()` 中间件函数。 `next()` 中间件函数通常由名为 `next` 的变量表示。

中间件是请求的第一道关卡，其作用是：

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求-响应周期。
- 调用堆栈中的下一个中间件函数。
- 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 `next()` 将控制传递给下一个中间件函数。否则, 请求将被挂起。

### 示例1：加密中间件

首先我们定义一个工具函数，用于加密前端传递过来的密码：

*`src/utils/encription.ts`*

```typescript
import * as crypto from 'crypto';

// -- 获取盐
export function getSalt() {
  return crypto.randomBytes(16).toString('base64');
}

// -- 加密
export function encript(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 10000, 16, 'sha256').toString('base64');
}
```

然后我们定义中间件文件：

*`src/common/middleware/hash-password.middleware.ts`*

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { encript, getSalt } from 'src/utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // -- 获取请求体中的密码
    const userPassword = req.body['password'];
    if (userPassword) {
      const salt = getSalt();
      // -- 将加密后的密码替换
      req.body['password'] = encript(userPassword, salt);
      // -- 存储盐值，验证登录时我们将客户端传递过来的密码用这个盐值加密并比对存储的加密密码用于判断是否登录成功
      req.body['salt'] = salt;
    }
    next();
  }
}
```

接下来我们在 *`src/modules/auth/auth.module.ts`* 文件中引入中间件，并让其只在 *`auth/regist`* 路由中生效：

```typescript
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.servce';
import { HashPasswordMiddleware } from 'src/common/middleware/hash-password.middleware';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('auth/regist');
  }
}
```

当你在 *`auth/regist`* 路由中获取请求体的参数时，将会取到在中间件 `HashPasswordMiddleware` 加密后的密码和盐，通常你应该将其存入数据库中，当用户执行登录时，首先从数据库读取用户数据，然后将客户端传递过来的密码通过注册时存储的盐值进行加密然后和注册时存储在数据库中的加密后的密码进行比较来验证是否登录成功，后续的代码这里不会贴出示例，只是提供一个思路，你可以在 **jwt验证** 章节查看具体代码。

### 示例2：全局 visitor 中间件

本示例主要讲解 `visitor` 中间件的使用，该中间件主要用于打印访问者信息：

1）定义中间件：*`src/common/middleware/visitor.middleware.ts`*

```typescript
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const logger = new Logger('logger.middleware');
export function visitor(req: Request, res: Response, next: NextFunction) {
  const { method, path, ip } = req;
  logger.log(`访问者信息：${ip} ${method} ${path}`);
  next();
}
```

2）全局使用

```typescript
app.use(visitor);
```

> **Tips：**
>
> - 只有函数组件支持全局使用。
> - 同一路由注册多个中间件的执行顺序为，先是全局中间件执行，然后是模块中间件执行，模块中的中间件顺序按照 `.apply` 中注册的顺序执行
> - 模块中使用可参照 [官方示例 >>](https://docs.nestjs.cn/8/middlewares?id=%e5%ba%94%e7%94%a8%e4%b8%ad%e9%97%b4%e4%bb%b6)

## 守卫

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

## 拦截器

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

## 管道

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

2）在dto文件中校验，如：*`src/common/dto/req/login.dto.ts`*

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '手机号', example: '17398888669' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
```

3）引用

- 单个请求参数绑定：

  ```typescript
  @Post('/login')
  login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.userService.login(LoginDto);
  }
  ```

- 单个路由绑定：

  ```typescript
  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
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

const bootstrap = async () => () {
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



## 异常过滤器

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

# 四、扩展

## 帮助文档

```shell
$ nest -h
```

示例/生成控制器，依此类推

```shell
$ nest g co controller-names
```

## 允许跨域

*`src/main.ts`*

```typescript
app.enableCors();
```

## 日志打印



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

## jwt验证

1）安装依赖

```shell
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```

2）构建 `auth` 模块

```shell
$ nest g mo modules/auth
$ nest g co modules/auth
$ nest g s  modules/auth
```

3）jwt 常量：*`src/moudles/auth/jwt.constant.ts`*

```typescript
export const JWT_CONSTANT = {
  // -- 自定义秘钥
  secret: 'jwt_secret',
};
```

4）jwt 策略：*`src/modules/auth/jwt.strategy.ts`*

```typescript
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
```

5）完善 `auth` 模块

*`src/modules/user/user.service.ts`*

```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/db/schemas/user.schema';
import { LoginDto } from 'src/common/dto/req/login.dto';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'src/utils/encription';
import { CreateUserDto } from '../../common/dto/req/create-user.dto';
import { IResponse } from '../../common/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
  	@InjectModel('USER_MODEL') private readonly userModel: Model<User>, 
    private readonly userService: UserService, private readonly jwtService: JwtService
  ) {}
  // -- 验证
  async validateUser(user: LoginDto): Promise<IResponse> {
    // -- 获取手机号/登录密码
    const { phone, password } = user;
    // -- 查询用户
    return await this.userService.findOneByPhone(phone).then((res) => {
      // -- 用户不存在
      if (res.length === 0) {
        return { code: 3, msg: '用户尚未注册' };
      }
      // -- 用户存在
      const dbUser: CreateUserDto = res[0] as CreateUserDto;
      const pass = encript(password, dbUser.salt);
      if (pass === dbUser.password) {
        return { code: 0, msg: '用户登录成功' };
      } else {
        return { code: 4, msg: '账号或密码错误' };
      }
    });
  }

  // -- 登录
  async login(loginDto: LoginDto): Promise<IResponse> {
    return await this.validateUser(loginDto).then(async (res) => {
      if (res.code === 0) {
        return {
          ...res,
          data: { token: await this.createToken(loginDto) },
        };
      }
      return res;
    });
  }

  // -- 注册
  async regist(user: CreateUserDto): Promise<IResponse> {
    return await this.userService.findOneByPhone(user.phone).then(async (res) => {
      // -- 如果查到了用户，则表示用户已注册
      if (res.length !== 0) {
        return { code: 1, msg: '当前手机号已注册' };
      }
      // -- 如果没有查到用户，则表示用户未注册
      try {
        const createUser = new this.userModel(user);
        await createUser.save();
        return { code: 0, msg: '注册成功' };
      } catch (error) {
        return { code: 2, msg: '注册失败，失败原因：' + error };
      }
    });
  }

  // -- 生成token
  async createToken(loginDto: LoginDto) {
    return await this.jwtService.sign(loginDto);
  }
}
```

*`src/modules/auth/auth.controller.ts`*

```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { LoginDto } from 'src/common/dto/req/login.dto';
import { AuthService } from './auth.servce';

@ApiTags('用户验证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @ApiOperation({ summary: '用户注册' })
  @Post('regist')
  async registUser(@Body() userDto: CreateUserDto) {
    return await this.authService.regist(userDto);
  }
}
```

> **Tips：** `LoginDto` 请参照 [管道 - 验证 >>](#验证) 章节。

*`src/modules/auth/auth.module.ts`*

```typescript
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.servce';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/modules/user/user.service';
import { HashPasswordMiddleware } from 'src/common/middleware/hash-password.middleware';

@Module({
  imports: [
    // -- 引入jwt模块
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy /** 引入jwt策略 */],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('auth/regist');
  }
}
```

6）测试，我们在 *`user.controller.ts`* 文件中，新建 `hello` 路由并注入 jwt验证，如下所示：

```typescript
@UseGuards(AuthGuard('jwt'))
hello() {
  return this.userServier.hello();
}
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

const bootstrap = async () =>  {
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
  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
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

## Mongo

[mongo 官方文档 >>](https://docs.nestjs.cn/8/techniques?id=mongo)

### 安装依赖

```shell
$ npm install --save @nestjs/mongoose mongoose
$ npm install --save-dev @types/mongoose
```

### 配置

输入指令，生成db模块：

```shell
$ nest g mo common/db
```

#### Schema

在 Mongoose 中，一切都源于 [Scheme](https://mongoosejs.com/docs/guide.html)，每个 Schema 都会映射到 MongoDB 的一个集合，并定义集合内文档的结构。Schema 被用来定义模型，而模型负责从底层创建和读取 MongoDB 的文档。

Schema 可以用 NestJS 内置的装饰器来创建，或者也可以自己动手使用 Mongoose 的 [常规方式](https://mongoosejs.com/docs/guide.html)。使用装饰器来创建 Schema 会极大大减少引用并且提高代码的可读性。这里作者用的是官方推荐方式用装饰器来创建。

*`src/common/db/schemas/user.schema.ts`*

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// -- @Schema 装饰器标记一个类作为Schema 定义
// -- @Prop 装饰器在文档中定义了一个属性
@Schema({ versionKey: false, collection: 'users' })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ min: 18, max: 50 })
  age: number;

  @Prop({ enum: [0, 1, 2], default: 0 })
  sex: number;

  @Prop()
  job: string;

  @Prop()
  salt?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

更多 Scheme 选项，[参照这里 >>](https://mongoosejs.com/docs/guide.html#options)

#### Module

*`src/common/db/db.module.ts`*

```typescript
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

// -- 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库。
// -- 如果有多张表，直接在数组中加配置就可以了
const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
  },
]);

@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://lee:123@127.0.0.1:27017/DB-TEST'), MONGO_MODELS],
  exports: [MONGO_MODELS],
})
export class DbModule {}
```

MongooseModule 提供了 `forFeature()` 方法来配置模块，包括定义哪些模型应该注册在当前范围中。

配置完之后，我们还需要在 *`app.module.ts`* 导入 `DbModule`：

```typescript
import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    DbModule
  ],
  controllers: [],
})
export class AppModule {}
```

### 应用

为了更好的演示示例，我们构建一个 `user` 模块，并实现注册功能：

```shell
$ nest g mo modules/user
$ nest g co modules/user
$ nest g s modules/user
```

用户注册需用对密码进行加密，加密手段可参照 [中间件 示例1：加密中间件 >>](#示例1：加密中间件) 章节。

继续后续操作...

*`src/common/dto/req/create-user.dto.ts`*

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '姓名' })
  name: string;
  @ApiProperty({ description: '手机号' })
  phone: string;
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '年龄' })
  age: number;
  @ApiProperty({ description: '性别' })
  sex: number;
  @ApiProperty({ description: '工作' })
  job: string;
}
```

*`src/modules/user/user.service.ts`*

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/db/schemas/user.schema';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { IResponse } from 'src/common/interfaces/response.interface';

const logger = new Logger('user.service');

@Injectable()
export class UserService {
  private response: IResponse;
  constructor(@InjectModel('USER_MODEL') private readonly userModel: Model<User>) {}

  // -- 注册
  async regist(user: CreateUserDto): Promise<IResponse> {
    return await this.userService.findOneByPhone(user.phone).then(async (res) => {
      // -- 如果查到了用户，则表示用户已注册
      if (res.length !== 0) {
        return { code: 1, msg: '当前手机号已注册' };
      }
      // -- 如果没有查到用户，则表示用户未注册
      try {
        const createUser = new this.userModel(user);
        await createUser.save();
        return { code: 0, msg: '注册成功' };
      } catch (error) {
        return { code: 2, msg: '注册失败，失败原因：' + error };
      }
    });
  }

  // -- 通过手机号查找用户
  async findOneByPhone(phone: string) {
    return await this.userModel.find({ phone });
  }
}
```

> **Tips：** `IResponse` 类型定义请参照 [控制器 >>](#控制器) 章节。

*`src/modules/user/user.controller.ts`*

```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/req/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServier: UserService) {}

  @Post('regist')
  async registUser(@Body() userDto: CreateUserDto) {
    return await this.userServier.regist(userDto);
  }
}
```

*`src/modules/user/user.module.ts`*

```typescript
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { HashPasswordMiddleware } from 'src/common/middleware/hash-password.middleware';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPasswordMiddleware).forRoutes('user/regist');
  }
}
```



