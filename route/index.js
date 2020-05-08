// 处理路由访问   //这里可以使用解构 简化名称 
const express = require('express'),
    loginCtrl = require('../controllers/loginCtrl'),
    studentCtrl = require('../controllers/studentCtrl'),
    { logout } = require('../controllers/Logout')

//生成路由
let router = express.Router()

// 登录验证：
router.use((req, res, next) => {
    if (!req.session['s_id'] && req.url != '/login') {
        // 没有登录过
        res.redirect('/login');
        return;
    }
    next();
})

// 路有清单
router.get('/login', loginCtrl.showLogin); // 访问登录页面
router.post('/login', loginCtrl.doLogin); // 访问登录接口，处理登录操作
router.propfind('/login', loginCtrl.checkUser); // 访问接口 验证用户名是否存在

router.get('/', studentCtrl.shwoIndex); // 访问首页
router.get('/student/msg', studentCtrl.showList); //访问接口，渲染数据
router.get('/student/search', studentCtrl.searchStudent); //模糊搜索
router.get('/student/addStudent', studentCtrl.showAddStudent) //访问增加学生页面
router.put('/student/addStudent', studentCtrl.addStudent) //访问接口 处理增加学生
router.post('/student/:sid', studentCtrl.updateStudent); //访问接口 处理修改学生数据
router.delete('/student/:sid', studentCtrl.deleteStudent) //访问接口 处理删除学生信息
router.get('/student/exportExcel', studentCtrl.exportStudentToExcel)  //导出 excel 表格
router.get("/Logout",logout)  //访问接口，处理退出登录

//导出
module.exports = router