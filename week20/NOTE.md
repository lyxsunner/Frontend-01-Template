# 每周总结可以写在这里
##  本周作业
- [x] 跟上课程进度，完成课上代码
- [x] 用 promise 管理代码

## 参考链接
- PhantomJS 下载地址： https://phantomjs.org/download
（也可在课程 PC 端页面底下下载附件压缩包)
- jslint 地址:http://www.jslint.com/
- https://www.npmjs.com/package/eslint-plugin-react
- https://developer.github.com/v3/
- OAuth： https://justauth.wiki/#/quickstart/oauth
- https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
## 课堂笔记
### 发布系统 | lint与PhantomJS
#### PhantomJS
PhantomJS是一个基于webkit的JavaScript API。它使用QtWebKit作为它核心浏览器的功能，使用webkit来编译解释执行JavaScript代码。任何你可以在基于webkit浏览器做的事情，它都能做到。它不仅是个隐形的浏览器，提供了诸如CSS选择器、支持Web标准、DOM操作、JSON、HTML5、Canvas、SVG等，同时也提供了处理文件I/O的操作，从而使你可以向操作系统读写文件等。PhantomJS的用处可谓非常广泛，诸如网络监测、网页截屏、无需浏览器的 Web 测试、页面访问自动化等。

> PhantomJS主要用于持续集成的检测,因为需要测试，在没有浏览器的情况下进行测试 。PhantomJS不适合做线上服务的。
1. 下载与安装（Mac系统）
解压`phantomjs`可以把里面的`phantomjs`放到以下文件
```bash
/usr/local/bin
```
在命令行工具中输入`phantomjs --version`，如果出现版本号，表示安装成功

2. 使用
到相应的路径下，在命令行工具中输入`phantomjs 需要执行的文件名`,如 `phantomjs helloword.js`
#### jslint
```
npm i eslint --save -dev
npm i eslint-plugin-react --save -dev
npx eslint --init
npx eslint ./main.js
```

###  发布系统 | OAuth
登录GitHub => settings => Developer settings => Register new GitHub App =>

GitHub App name:toy-publish
Homepage URL: http://localhost:8000
Webhook-Active 取消☑️
Where can this GitHub App be installed? 选择 Any account
点击 Create GitHub App
#### 小技巧
- `open ./` 打开文件
