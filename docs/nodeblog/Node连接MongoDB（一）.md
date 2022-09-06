---
title: Node连接MongoDB（一）
date: 6/5/2022, 8:58:21 PM
tags: 
    - Node.js 
    - 前端
    - MongoDB
    - 数据库
categories: 
    - node学习
---

<!--more-->

---

---
持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第7天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")


# MongoDB数据库

> 定义:MongoDB 是一个基于分布式文件存储的数据库。由 C++ 语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。
MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

安装地址：https://www.MongoDB.com/try/download/community


![mongodb下载.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9a9f23ef2294bec974fb34fe432f0cc~tplv-k3u1fbpfcp-watermark.image?)

## 关系型数据库和非关系型数据库

说到MongoDB肯定要介绍一下关系型数据库和非关系型数据库。

关系型数据库最典型的数据结构是表，由二维表格模型及其之间的联系所组成的一个数据组织。

非关系型数据库严格上不是一种数据库，应该是一种数据结构化存储方法的集合，可以是文档或者键值对等。比如像，map一样的键值对关系。

非关系型数据库优点：
1、格式灵活：存储数据的格式可以是key,value形式、文档形式、图片形式等等，文档形式、图片形式等等，使用灵活，应用场景广泛，而关系型数据库则只支持基础类型。
2、速度快：nosql可以使用硬盘或者随机存储器作为载体，而关系型数据库只能使用硬盘；
3、高扩展性；
4、成本低：nosql数据库部署简单，基本都是开源软件。

缺点：
1、不提供sql支持，学习和使用成本较高；
2、无事务处理；
3、数据结构相对复杂，复杂查询方面稍欠。

> PS:本次只是使用一下，前端人员对其的掌握要求没有后端高

## MongoDB安装

在之前已经在官网上讲数据库msi下载下来了，接下来开始安装

1. 根据提示安装，前两部选择next即可


![mongodb安装1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/793b2865a1fa4b0094c2fce22aadf24f~tplv-k3u1fbpfcp-watermark.image?)


![mongodb安装2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7344b72a0d2349bb9361cce92bcb90b8~tplv-k3u1fbpfcp-watermark.image?)

2. 然后可以使用`custom`来自定义安装目录


![mongodb安装3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddc41aaf198f4fd3bf77be47f180743b~tplv-k3u1fbpfcp-watermark.image?)


![mongodb安装4.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c2ff532ff8140f8aacc90ac13119fb4~tplv-k3u1fbpfcp-watermark.image?)

3. 接下来点击next安装即可


![mongodb安装4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bea341ccbcb4c928fb5ba85ab8c4ad6~tplv-k3u1fbpfcp-watermark.image?)


![mongodb安装5.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a73e5ce58cd2427baeb6ee92ed4dd1bc~tplv-k3u1fbpfcp-watermark.image?)


![mongodb安装7.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/107663928ae349c2a53e66ad054e4565~tplv-k3u1fbpfcp-watermark.image?)


![mongodb安装6.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36f53a01221845099e469787ec8b5ae9~tplv-k3u1fbpfcp-watermark.image?)

> PS：在安装时有一个坑，如果你勾选了`Install MongoDB Compass`，那么安装时会卡死，因为这是`MongoDB`提供的可视化界面，但是下载时会从国外下载。

## MongoDB启动

此时，MongoDB已经安装完毕了，现在启动测试一下是否成功

在之前自定义的安装目录下，有一个bin文件夹，里面有mongod.exe文件，这个程序就是用来启动mongodb服务器的。

在想要存放数据的地方，创建一个文件夹，比如`db`，这里我


![创建db.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cb4c999d590472899f372062f235139~tplv-k3u1fbpfcp-watermark.image?)

然后在之前的bin文件夹中，使用cmd打开面包，输入`mongod --dbpath=/mongodb/Server/data/db`


![db测试连接.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbf0f385b16f4330b40ad42e9f54ece3~tplv-k3u1fbpfcp-watermark.image?)

由于我们并没有指定mongodb服务的端口号，所以它启动在默认的27017窗口。

打开浏览器，范围地址http://127.0.0.1:27017/,可看到如下信息

```javascript
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```


![信息.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad5eccc8257945f3b333b649897a07d8~tplv-k3u1fbpfcp-watermark.image?)



***

## MongoDB可视化界面

对于MongoDB数据库，如果一直在命令控制符界面中使用有些不太方便，可以使用navicat，也可以直接使用MongoDB提供的图形化界面`Compass`。

下载地址：https://www.MongoDB.com/try/download/compass?jmp=docs


![mongodb图形化界面下载.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e6fd5e559f449d99313bc1f1cd75fd0~tplv-k3u1fbpfcp-watermark.image?)

`Compass`图形化界面基本下载后打开就能使用了


![compass图标.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c365686f6d0f44b6a79c7410de0fa307~tplv-k3u1fbpfcp-watermark.image?)


![compass界面.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1043ff724fa0408ca2776283b8d0baf6~tplv-k3u1fbpfcp-watermark.image?)

点击connect按钮，然后就会连接到本地27017数据库当中。

连接成功后，点击界面左下角的加号+， 可以创建数据库


![创建数据库1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1f3cd2bea694724b67a181d17d15fcf~tplv-k3u1fbpfcp-watermark.image?)


![创建数据库2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3032e15ee8b14a16835cf2066cb5e736~tplv-k3u1fbpfcp-watermark.image?)


![创建数据库3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a09c98be66c4b928484b463413ae1aa~tplv-k3u1fbpfcp-watermark.image?)


接下来就可以在图形化界面当中对数据库进行操作了
