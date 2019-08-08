const http = require("http");
const querystring = require("querystring");
const url = require("url");
const router = require("./router.js");

var mysql = require('mysql');
var connection = mysql.createConnection({
    // 主机名
    host: '127.0.0.1',
    // 端口
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'lihy_930716',
    // 数据库名
    database: 'db_test'
});

// 链接数据库
connection.connect();

// 添加数据
let sqlParams = ["小明", "20"]
let sql = "INSERT INTO stus (name, age, origin, major) VALUES(?, ?, '四川省成都市', '软件技术')";
connection.query(sql, sqlParams, (err, result) => {
    if(err) {
        console.log(err.message);
        return;
    }
    console.log("insert", result);
    console.log("insert", result.affectedRows)
})

// 断开链接
connection.end();



http.createServer((req, res) => {
    // 处理跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 响应header
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    // 过滤空请求
    if (req.url === "/favicon.ico") return;
    // 定义三个变量记录方法类型、路径名、参数
    let method = req.method, // 类型
        pathname = url.parse(req.url).pathname, // 路径名
        query = ""; // 参数
    if (method === "GET") {
        // 解析参数
        query = url.parse(req.url, true).query;
        // 传入路由模块
        router({ req, res }, { method, pathname, query });
    } else if (method == "POST") {
        req.on("data", (data) => {
            query += data;
        });
        req.on("end", () => {
            // 将key=value的形式字符串转换为对象字符串{key:value}形式
            query = querystring.parse(query);
            router({ req, res }, { method, pathname, query });
        });
    } else {
        res.end("ERROR: Can't identify your request type.");
    }
}).listen(8081, "127.0.0.1");

// 提示用户服务器相关信息
console.log("server running at http://127.0.0.1:8081.");
