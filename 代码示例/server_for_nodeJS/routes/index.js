function routes(method, pathname, params, res) {
  if (method === "GET") {
    handleGets(pathname, params, res);
  } else if (method === "POST") {
    handlePosts(pathname, params, res);
  }
}

function handleGets(pathname, params, res) {
  // 处理图片
  switch (pathname) {
    case "/heros":
      res.status = 200;
      res.end(
        JSON.stringify({
          code: 0,
          data: {
            name: params.name,
            address: "四川省成都市高新区雅和南四路",
          },
          msg: "成功",
        })
      );
      break;
    default: {
      res.end("失败");
    }
  }
}
function handlePosts(pathname, params, res) {
  switch (pathname) {
    case "/user/login":
      const { username, password } = params;
      if (username === "admin" && password === "123") {
        res.status = 200;
        res.end(
          JSON.stringify({
            code: 0,
            data: {
              suername: "admin",
              male: "男",
              jobs: "前端技术专家",
            },
            msg: "成功",
          })
        );
      }
      break;
  }
}

module.exports = routes;
