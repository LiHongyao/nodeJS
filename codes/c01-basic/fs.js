const fs = require('fs');
const { promisify } = require('util')



// 1. 同步读取 - 阻塞线程
// const data = fs.readFileSync('./data/user.json');
// console.log(data.toString());

// 2. 异步读取
fs.readFile('./data/user.json', (error, data) => {
  if(error) throw error;
  console.log(data.toString());
});



  