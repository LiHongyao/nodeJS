function get() {
    fetch("http://127.0.0.1:8686/heros?name=吕布", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }, err => {
        console.log(err);
    });
}

function post() {
    // 1. 创建请求对象
    let xhr = new XMLHttpRequest();
    // 2. 配置请求
    xhr.open("POST", "http://127.0.0.1:8686/user/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = "json";
    // 3. 发送请求
    xhr.send(JSON.stringify({
        username: "admin",
        password: "123"
    }));
    // 4. 监听请求
    xhr.onload = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.response);
        }else {
            console.log("err");
        }
    }
}

// 客户端 -> 服务器 -> 数据库
function sql_insert() {
    fetch("http://127.0.0.1:8081/heros/insert?name=耀哥&skill=开车", {
        method: "GET",
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(data){
        console.log(data);
    });
}
function sql_delete() {
    fetch("http://127.0.0.1:8081/heros/delete?id=1", {
        method: "GET",
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(data){
        console.log(data);
    });
}
function sql_update() {
    fetch("http://127.0.0.1:8081/heros/update?name=周瑜&location=野区", {
        method: "GET",
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(data){
        console.log(data);
    });
}
function sql_select() {
    fetch("http://127.0.0.1:8081/heros?name=张良", {
        method: "GET",
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(data){
        console.log(data);
    });
}