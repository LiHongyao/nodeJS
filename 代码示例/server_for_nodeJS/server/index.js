const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const routes = require("../routes");

/**
 * 初始化服务器
 * @param hostname 域名
 * @param port 端口号
 */
const initServer = (hostname, port) => {
  // 创建服务
  const server = http.createServer((req, res) => {
    // 处理跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET");
    // 获取pathname
    const pathname = url.parse(req.url, true).pathname;
    // 处理静态资源
    if (/\.(jpe?g|png|html|css|js|gif)$/.test(pathname) || pathname === "/") {
      const p = pathname === "/" ? "/index.html" : pathname;
      const file = process.cwd() + "/www" + p;
      hanldeStaticAssets(file, res);
    } else {
      // 响应header
      res.writeHead(200, { "Content-Type": "application/json" });
      // 过滤空请求
      if (req.url === "/favicon.ico") return;
      // 请求方法
      const method = req.method;
      // 处理GET&POST参数
      if (method === "GET") {
        const params = url.parse(req.url, true).query;
        routes(method, pathname, params, res);
      } else if (method === "POST") {
        let dataStr = "";
        req.on("data", (data) => {
          dataStr += data;
        });
        req.on("end", () => {
          const params = JSON.parse(dataStr);
          routes(method, pathname, params, res);
        });
      } else {
        res.statusCode = 500;
        res.end("只支持GET/POST方法");
      }
    }
  });
  // 监听服务
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });
};

async function hanldeStaticAssets(file, res) {
  const exists = await fs.existsSync(file);
  if (exists) {
    switch (path.extname(file)) {
      case ".html":
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        break;
      case ".js":
        res.writeHead(200, { "Content-Type": "text/javascript;charset=utf-8" });
        break;
      case ".css":
        res.writeHead(200, { "Content-Type": "text/css;charset=utf-8" });
        break;
      case ".gif":
        res.writeHead(200, { "Content-Type": "image/gif;charset=utf-8" });
        break;
      case ".jpg":
        res.writeHead(200, { "Content-Type": "image/jpg;charset=utf-8" });
        break;
      case ".png":
        res.writeHead(200, { "Content-Type": "image/png;charset=utf-8" });
        break;
      case ".jpeg":
        res.writeHead(200, { "Content-Type": "image/jpeg;charset=utf-8" });
        break;
      default:
        res.writeHead(200, {
          "Content-Type": "application/octet-stream;charset=utf-8",
        });
    }
    // 读取文件并返回至前端
    fs.readFile(file, (__, data) => {
      res.end(data);
    });
  } else {
    res.end('文件不存在');
  }
}

module.exports = initServer;
