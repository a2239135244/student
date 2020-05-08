const mongoose = require('mongoose'),
    md5 = require('md5-node');

// 1.声明schema
let adminSchema = new mongoose.Schema({
    username: String, // 用户名
    password: String, // 密码
    posttime: Number, // 注册时间
    lastLoginTime: Number // 最后一次登录时间
});

adminSchema.statics = {
    checkUser(user, cb) {
        this.find(user, (err, res) => {
            if (err) {
                cb({ error: 0 });
                return;
            }
            if (res.length != 0) {
                cb({ error: 1, data: res[0] });
                return;
            }
            cb({ error: 0 });
        })
    },
    checkLogin(data, cb) {
        data.password = md5(data.password);
        this.find(data, (err, res) => {
            if (err) {
                cb({ error: 0, msg: '服务器出错,请稍后重试' });
                return;
            }
            if (res.length > 0) {
                cb({ error: 1, msg: '登录成功' });
                res[0].changelastLoginTime();
            } else {
                cb({ error: 0, msg: '用户名或密码不对' });
            }

        })
    }
}
// 修改用户登录成功以后的登录时间
adminSchema.methods = {
    changelastLoginTime() {
        var time = new Date().getTime();
        this.lastLoginTime = time;
        this.save();
    }
}
// 初始化admin类
var Admin = mongoose.model('Admin', adminSchema);

// 导出
module.exports = Admin;