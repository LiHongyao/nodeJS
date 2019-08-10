// 1.导入express
const express = require("express");
// 2.创建express实例
const app = express();
// 3.配置
app.all("*", (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
});
// 3. 中间件
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// 4. 路由
// 4.1. 导入路由
const userRouter  = require("./routes/user");
const loginRouter = require("./routes/login");
const goodsRouter = require("./routes/goods");
// 4.2. 应用路由
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/goods", goodsRouter);

// 5. 监听：http://127.0.0.1:8081"
app.listen(8081, "127.0.0.1");

// 6. 打印输出提示信息
console.log("server running at http://127.0.0.1:8081");
