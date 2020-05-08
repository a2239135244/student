// 启动入口文件
const express = require('express'),
      mongoose = require('mongoose'),
      cookieSession = require('cookie-session'),  
      router = require('./route')

// 连接数据库 端口号不需要写 sm为数据库名称 
mongoose.connect('mongodb://localhost/sm?authSource=admin',{useNewUrlParser:true,useUnifiedTopology:true});

let app = express();

app.set('view engine','ejs');

app.use(cookieSession({
    name:'sess_id',
    keys:['key1'],
    maxAge: 60 * 60 * 1000 // 30min  
}))

// 处理静态资源
app.use(express.static('public'));

//处理路由清单
app.use('/',router)


app.listen(3000);
console.log('OK')

