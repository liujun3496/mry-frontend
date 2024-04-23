## 项目信息
- **国脉资产云**是一个基于二维码的一物一码管理平台，可以为每一件“物品”生成一个二维码，手机扫码即可查看物品信息并发起相关业务操作，操作内容可由你自己定义，典型的应用场景包括固定资产管理、设备巡检以及物品标签等；
- 在技术上，国脉资产云是一个无代码平台，全程采用DDD、整洁架构和事件驱动架构思想完成开发，更多详情可参考笔者的[DDD落地文章系列](https://docs.mryqr.com/ddd-introduction/)；
- 技术栈：Vue 2, Webpack 4, Axios 0.24, Element UI 2等；
- 本代码库为国脉资产云前端代码，与之匹配的后端代码可访问[国脉资产云后端代码库](https://github.com/mryqr-com/mry-backend)。


## 如何访问
- 访问地址：[https://www.mryqr.com](https://www.mryqr.com)。


## 为什么开发国脉资产云
- 为了开发出一款能让自己满意的软件；
- 为了证明DDD能够真实落地；
- 为了实践[整洁架构](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)；
- 为了学习Web前端开发技术；
- 更多信息请参考笔者的文章[构建自己的软件大厦](https://docs.mryqr.com/build-your-own-software-skyscraper/)。


## 本地环境搭建
- 本地安装：Node.js v14.18.1及以上版本，Java 17及以上版本，Docker；
- 将以下内容加入 `/etc/hosts` 文件，本地访问时需要使用域名访问：
  ```
  127.0.0.1       console.local.mryqr.com
  127.0.0.1       m.local.mryqr.com
  127.0.0.1       api.local.mryqr.com
  0.0.0.0         console.local.mryqr.com
  0.0.0.0         m.local.mryqr.com
  0.0.0.0         api.local.mryqr.com
  ```
- 命令行切换到代码跟目录；
- 运行 `npm install` 安装依赖；
- 运行`./local-run.sh`，此命令用于启动前端；
- 下载[国脉资产云后端代码](https://github.com/mryqr-com/mry-backend)到本地，命令行切换到后端代码根目录，执行`./local-run.sh`，此命令用于启动后端；
- 访问电脑端：[http://console.local.mryqr.com](http://console.local.mryqr.com)，默认用户名`15111111111`，密码`11111111`；
- 访问手机端：[http://m.local.mryqr.com](http://m.local.mryqr.com)，默认用户名`15111111111`，密码`11111111`；
- 请不要在同一个浏览器中同时访问本地环境（`http://console.local.mryqr.com`）和国脉资产云在线环境（`https://www.mryqr.com`），因为有可能导致本地环境无法访问；

## 关于软件协议
本代码库在遵循GPL-3.0协议的基础上，增加了以下协议条款：
- 各企事业单位可免费地将本源代码进行私有化部署以服务于自身业务，但是禁止将所部署的软件（包括直接使用本源代码部署的软件，以及在本源代码基础上修改之后所部署的软件）用于直接商业盈利（包括但不限于将其以付费的方式提供给第三方）。
