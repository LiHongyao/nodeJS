// 导入express
const express = require("express");
// 创建express实例
const app = express();
// 监听http://127.0.0.1:8081"
app.listen(8081, "127.0.0.1");
// 打印输出提示信息
console.log("running at http://127.0.0.1:8081");

// 设置跨域请求
app.all("*", (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});



// GET 请求，请求路径为：/
app.get("/", (req, res) => {
    console.log("有人访问[/]接口")
    res.send("You are using a GET request!");
});

// POST 请求，请求路径为：/login
// app.post("/login", (req, res) => {
//     console.log("有人访问[/login]接口")
//     res.send("You are using a POST request!");
// });


app.get("/infos", (req, res) => {
    console.log(req.query);
    res.send();
});




// 导入中间件 body-parser
const bodyParser = require("body-parser");
// application/json 解析
app.use(bodyParser.json());
// 监听post请求
app.post("/login", (req, res) => {
    // 打印参数
    console.log(req.body);
    // 响应数据
    res.send({
        nikename: "木子李",
        tel: "152-2888-5771",
        address: "成都市高新区雅和南四路216号"
    });
});
