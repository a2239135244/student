module.exports = {
    logout(req, res) {
        //删除 session  req.session {s_id:"猪娃"}
        delete req.session['s_id']
        //将路由切换到 login 
        res.redirect('/login')
    }
}

