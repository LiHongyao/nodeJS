function get() {
    console.log("GET");
    fetch("http://127.0.0.1:8081/", {
        method: "GET"
    }).then(function (res) {
        // promise
        return res.text();
    }).then(function (data) {
        console.log(data);
    });
}

function post() {
    fetch("http://127.0.0.1:8081/user/login", {
        method: "POST",
        body: JSON.stringify({
            username: "admin",
            password: "123"
        }),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (res) {
        // promise
        return res.json();
    }).then(function (data) {
        console.log(data);
    });
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
