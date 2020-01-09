/**
 * 
 * @param {Object} httpObj  含有请求对象与响应对象
 * @param {Object} urlObj   方法类型、路径、参数
 */
const router = (httpObj, urlObj)  => {
    // 解构属性
    let {res, req} = httpObj;
    let {method, pathname, query} = urlObj;
    console.info(urlObj);
    // 路由处理
    // - 当用户是POST请求，且路径为 /login 时，返回字符串：您想要登陆
    if(method === "POST" && pathname == "/login") {
        let obj = {
            nikename: "木子李",
            gender: "男",
            address: "四川省成都市高新区雅和南四路216号"
        }
        res.end(JSON.stringify(obj));
    }
    // - 当用户是GET请求，路径为 / ，参数为status=completed时，返回字符串：您想要获取已完成订单信息
    else if(method == "GET" && query.status === "completed") {
        res.end("您想要获取已完成订单信息");
    }
}

module.exports = router;


