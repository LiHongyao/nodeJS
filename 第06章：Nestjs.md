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
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

要创建一个 Nest 应用实例，我们使用了 `NestFactory` 核心类。`NestFactory` 暴露了一些静态方法用于创建应用实例。 `create()` 方法返回一个实现 `INestApplication` 接口的对象。该对象提供了一组可用的方法，我们会在后面的章节中对这些方法进行详细描述。 在上面的 `main.ts` 示例中，我们只是启动 HTTP 服务，让应用程序等待 HTTP 请求。

目录结构：[最佳目录实践 >>](https://www.toimc.com/nestjs-example-project-4/#%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)

# 三、核心

## 控制器

控制器负责处理传入的**请求**和向客户端返回**响应**。

创建模块

```shell
$ nest g co modules/hello
$ nest g mo modules/hello
$ nest g s modules/hello
```

> **Tips：**这里我们在 *`modules`* 目录下新建了 *`hello`* 模块，包括 *`controller`*、*`module`* 和 *`service`*。

*`src/modules/hello/hello.controller.ts`*

```typescript
import { Controller } from '@nestjs/common';

@Controller('hello')
export class HelloController {}
```

*`src/modules/hello/hello.service.ts`*

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {}
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

## 中间件

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

## 执行顺序

`中间件` → `守卫` → `拦截器`

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

## Mongo

### 安装依赖

```shell
$ npm install --save @nestjs/mongoose mongoose
$ npm install --save-dev @types/mongoose
```

### 引入 mongoose 连接模块

*`app.module.ts`*

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// -- 引入 mongoose 
import { MongooseModule } from '@nestjs/mongoose';
// -- 引入 user 
import { UserModule } from './server/user/user.module';

@Module({
  // -- 链接数据库
  imports: [MongooseModule.forRoot('mongodb://root:123@127.0.0.1:27017'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Schema

在 Mongoose 中，一切都源于 [Scheme](https://mongoosejs.com/docs/guide.html)，每个 Schema 都会映射到 MongoDB 的一个集合，并定义集合内文档的结构。Schema 被用来定义模型，而模型负责从底层创建和读取 MongoDB 的文档。

Schema 可以用 NestJS 内置的装饰器来创建，或者也可以自己动手使用 Mongoose 的 [常规方式](https://mongoosejs.com/docs/guide.html)。使用装饰器来创建 Schema 会极大大减少引用并且提高代码的可读性。这里作者用的是官方推荐方式用装饰器来创建。

*`src/modules/user/schemas/user.schema.ts`*

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ min: 18, max: 50 })
  age: number;

  @Prop({ enum: [0, 1, 2], default: 0 })
  sex: number;

  @Prop({ unique: true })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Module

*`src/modules/user/user.module.ts`*

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

MongooseModule 提供了 `forFeature()` 方法来配置模块，包括定义哪些模型应该注册在当前范围中。

如果你还想在另外的模块中使用这个模型，将 MongooseModule 添加到 UserModule 的 exports 部分并在其他模块中导入UserModule。

这里的 `name:'User'` 为数据库表名称与 service 中注入的表名称对应两者不一样会报错。

### Service

*`src/modules/user/user.service.ts`*

注册`Schema`后，可以使用 `@InjectModel()` 装饰器将 `User` 模型注入到 `UserService` 中：

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  // -- 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中
  constructor(@InjectModel('User') private userTest: Model<UserDocument>) {}

  // -- 添加
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userTest(createUserDto);
    const results = await createUser.save();
    return results;
  }
}
```

### Controller

*`src/modules/user/user.controller.ts`*

```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

### 接口校验

处理这些配置我们还在 `main.ts` 文件中配置了全局路由 `app.setGlobalPrefix('api') `，意思就是所有请求前面会有一个 `/api/`。

这里我们用的 `PostMan` 和 `MongoDB Compass` 官方推荐的可视化工具查看效果。





