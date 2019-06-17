const http = require("http");
const querystring = require("querystring");
const fs = require("fs");

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.method == "POST") {
        // 定义了一个post变量，用于暂存请求体的信息
        let postData = "";
        // data事件监听函数，每当接受到请求体的数据，就累加到postData 变量中
        req.on("data", data => {
            postData += data;
        });
        // 在end事件触发后，开始处理请求
        req.on("end", () => {
            // 将key=value的形式字符串转换为对象{key:value}
            postData = querystring.parse(postData);
            console.log(postData);
        });
    }
}).listen(8081, "127.0.0.1");

// 提示用户服务器相关信息
console.log("server running at http://127.0.0.1:8081.");
