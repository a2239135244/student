const mongoose = require('mongoose'),
   fs = require('fs'),
   nodeXlsx = require('node-xlsx'),
   path = require('path')
mongoose.set('useFindAndModify', false);
// 1.声明schema
let StudentSchema = new mongoose.Schema({
   sid: Number, // 学生的学号
   name: String, // 名字
   sex: String, // 性别
   age: Number // 年龄
});

StudentSchema.statics = {
   findPageData: async function (page, cb) {
      let pageSize = 4;
      let start = (page - 1) * pageSize;
      let count = await this.find().countDocuments();
      this.find({}).skip(start).limit(pageSize).exec((err, res) => {
         if (err) {
            cb({ error: 0 });
            return;
         }
         cb({
            count,
            error: 1,
            data: res,
            length: Math.ceil(count / pageSize),
            now: page
         });
      })

   },
   changeStudent: function (sid, data, cb) {
      this.findOneAndUpdate({ sid }, { $set: data }, (err) => {
         if (err) {
            cb(-1);
            return;
         }
         cb(1)
      })
   },
   //通过正则做模糊搜索
   findStudentNames(reg, cb) {
      this.find(
         { name: { $regex: reg, $options: "$g" } },
         (err, results) => {
            if (err) {
               cb({ error: 0, data: null })
               return
            }
            cb({ error: 1, data: results })
         }
      )
   },
   //将学生数据导出成表格
   exportExcel(cb) {
      this.find({}, (err, results) => {
         if (err) {
            cb({ error: 0, msg: "数据查询失败" })
            return
         }
         let datas = [] //存储 excel 表的格式

         let col = ['_id', 'sid', 'name', 'sex', 'age'] // 列表中的 列

         datas.push(col)
         //内容
         results.forEach((item) => {
            let arrInner = []
            arrInner.push(item._id)
            arrInner.push(item.sid)
            arrInner.push(item.name)
            arrInner.push(item.sex)
            arrInner.push(item.age)
            datas.push(arrInner)
         })
         //将数据转换成底层 excel 的二进制数据
         let buffer = nodeXlsx.build([
            { name: '1902', data: datas }
            // { name: '1903', data: datas }    //可以导出多一个  sheet
         ])
         let urlLib = path.join(__dirname, '../')
         fs.writeFile(`${urlLib}public/excel/class.xlsx`, buffer, { 'flag': 'w' }, (err) => {
            if (err) {
               cb({ error: 0, msg: "excel导出失败" })
               return
            }
            cb({ error: 1, msg: `class.xlsx` })
         })
      })
   },
   //添加学生
   saveStudent(data, cb) {
      //查询表里所有的sid字段
      this.find({}, { sid: 1 }).sort({ sid: -1 }).limit(1).exec((err, results) => {
         // [{_id:12,sid:11}]  Number(results[0]['sid']) + 1

         let sid = results.length > 0 ? Number(results[0]['sid']) + 1 : 100001
         let student = new Student({
            sid,
            ...data
         })
         student.save(err => {
            if (err) {
               cb({ error: 0, msg: '保存失败' })
               return
            }
            cb({ error: 1, msg: '保存成功' })
         })
      })
   },
   //删除学生信息
   deleteStudent(sid, cb) {

   }
}
// 初始化Student类
var Student = mongoose.model('Student', StudentSchema);

// 导出
module.exports = Student;