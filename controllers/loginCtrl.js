const Admin = require('../models/admin'),
      formidable = require('formidable');
      

module.exports = {
    // 登录块
    // 渲染登录页
    showLogin(req,res){
        if(req.session['s_id']){
            res.redirect('/');
            return;
        }
        res.render('login');
    },
    // 处理登录
    doLogin(req,res){
        let form = formidable();
        form.parse(req,(err,fields)=>{
            // console.log(fields);
            Admin.checkLogin(fields,(data)=>{
                if(data.error){
                    req.session['s_id'] = fields.username;
                }
                res.send(data);
            })
        })
    },
    // 验证用户是否存在
    checkUser(req,res){
        let form = formidable();
        form.parse(req,(err,fields)=>{
            if(err){
                res.json({error:0});
            }
            Admin.checkUser(fields,(val)=>{
                // console.log(val);
                res.json(val);
            })
        })
    }
    // 登录块 end
    
}