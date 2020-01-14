const mongoose = require('mongoose');
const db = require("./db/connect");
db.start();
const Persons = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: "保密"
    }
}, {
    collection: "persons"
});

const Person = mongoose.model("Person", Persons);
// 存储数据
let per = new Person({
    name: "木子李",
    age: 27,
    tel: "17398888669"
});
per.save((err, res) => {
    if(err) {
        console.log(err);
    }else {
        console.log(res);
    }
})
Person.find(function(err, res){
    console.log(res)
})