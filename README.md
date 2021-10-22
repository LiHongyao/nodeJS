# 一、是什么？

简单的说 Node.js 就是运行在服务端的 JavaScript。

- Node.js 是一个开源与跨平台的基于 Chrome V8 引擎的 JavaScript 运行时环境。

- Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 

- Node.js 的包管理器 npm，是全球最大的开源库生态系统。

- Node.js 主要用于编写服务器端应用。

- 操作对象不同

  | 前端 | DOM                   | -          |
  | ---- | --------------------- | ---------- |
  |      | BOM/DOM               | 浏览器对象 |
  |      | XHMLHttpRequest/fetch | 网络通讯   |
  | 后端 | os                    | 操作系统   |
  |      | process               | 进程       |
  |      | fs                    | 文件系统   |
  |      | net                   | 网络通讯   |

> 中文文档：http://nodejs.cn/api/
>
> 英文文档：https://nodejs.org/dist/latest/docs/api/
>
> 入门教程：http://nodejs.cn/learn
>
> 当前版本：https://github.com/nodejs/node/releases

# 二、有什么用？

Node能用来操作系统底层，能够用来 <b><ins>创建服务器，构建后端接口</ins></b>。

# 三、有何好处？

\1. 前后交流时更容易理解后端实现，降低交流成本

\2. 在后端还未实现时，可以使用node构建测试接口，与后端并行开发。

\3. 想写些自己感兴趣的项目时，可以自己独立完成，即使没有后端支持

\4. 找工作时，有优势

\5. 以后随时可以发展为全栈全端工程师

# 四、如何安装

下载地址：<https://nodejs.org/zh-cn/>

安装成功之后，打开终端，输入 `node -v` ，如果出现版本号表示安装成功。

如果提示 ”node 不是内部或外部命令“，你需将node的安装路径添加至环境变量中。

# 五、如何使用

\1. 创建文件，如：index.js

\2. 在终端输入指令：`$ node index.js`

\3. 程序退出：`$ process.exit()`

实时调试

```shell
$ npm install nodemon -g
```

```shell
$ nodemon xxx.ts
```

















