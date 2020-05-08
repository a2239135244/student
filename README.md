# NOde开发的学生管理系统
`技术栈: Node+express+MongoDB+mongoose+bootstrap+JQuery`

### 项目启动
`cnpm install / npm install`
`node app.js`

#### 项目结构说明：

* models M: 模型,处理数据
* controllers C: 控制器,命令模型 操作数据并呈递视图
* views V: 视图,通过ejs模板引擎渲染的页面
* public : 存放一些资源(image,css,icon,js)
* data : 模拟的数据(需要导入到MongoDB内 ) => 比如 mongoimport -d sm(库的名称) -c students(集合的名称) data/student.txt

<!-- <% for(item of data){ %>
              <tr>
                <td><%= item.sid %></td>
                <td><%= item.name %></td>
                <td><%= item.sex %></td>
                <td><%= item.age %></td>
                <td>
                  <input type="button" value='删除' class="btn btn-warning del" data-id="<%= item.sid%>">
                  <input type="button" value='修改' class="btn btn-info change" data-id="<%= item.sid%>">
                </td>
              </tr>
              <% } %> -->