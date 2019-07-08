# ImgViewerUseNodeJS
This is a image viewer and editor and tag setter.
## 代码说明
* 前端代码在public文件夹，js使用的是原生ES6，请务必用61版（本人测试的版本）或更新的Chrome浏览器打开
* 为username设置过期时间，到期无法自动登录
* 根据登录状态进行登录拦截，未登录访问任意页面将跳到登录页，登录后访问登录页将跳转到首页
* cookie设置了httponly, 用户端无法使用js代码读取
* cookie与登录相关的字段用jwt进行了加密，无法直接查看，不易进行会话劫持
* 后台数据库的用户信息也不使用明码储存，用户名和密码都进行了加密
## 运行说明
* 要运行项目，需要在homework_server>database>db_getter.js 更改配置项，文件中有注释，数据库中应当建立好user表
* idea/webstorm打开，请在preference->debugger中勾选allow unsigned requests
* cd至homework_server文件夹，使用node app.js运行项目
