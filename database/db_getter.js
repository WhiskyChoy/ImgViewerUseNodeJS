// 导入MySQL模块
let mysql = require('mysql');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cwl15914746024,.',
    database: 'homeworkweb'
});

// 连接数据库
db.connect();

// 将这个模块公有化
// 使得其他js文件可以通过require语句来引入。
module.exports = db;