---
title: Node.js学习（一）——简介
date: 3/24/2021, 4:30:39 PM
tags: 
    - Node.js 
    - 前端
categories: 
    - node学习
---

<!--more-->

### Node.js是一个基于chrome V8引擎的JavaScript运行环境

node.js不是语言，不是服务器，不是数据库。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6327c1f5c72456584d8bbea98cd96c6~tplv-k3u1fbpfcp-zoom-1.image)

 

### 优点

1\)异步非阻塞的I/O (I/O线程池)：

        异步非阻塞是能不能在做一件是的时候不影响其他人，异步肯定非阻塞

        I:input        O：output         文件的读写，数据库的读写叫做I/O

2\)特别适用于 I/O密集型应用。

3\)事件循环机制。

4\)单线程。

5\)跨平台：一处编写，随处可用。  Windows上写的代码，放在Linux上也可用。

 

### 不足之处

* 1\) 问调函数嵌套太多、太深(俗称回调地狱)
* 2\) 单线程,处理不好CPU密集型任务。
* 3）不支持多核处理器

Java服务器对CPU密集型友好，对I/O密集型友好。

 

### Node.js的应用场景

* web服务API
* 服务器渲染页面，提升速度
* 后端的web服务，例如跨域，服务器端的请求

 

### Node中任意一个模块（js文件）都被一个外层文件函数所包裹

```javascript
console.log(arguments.callee.toString())
```

function (exports, require, module, \__filename, \__dirname) {<!-- -->

console.log(arguments.callee.toString())

exports：用于暴露模块

require：用于引入模块

module：用于暴露模块

\__filename：这个文件所在的绝对路径

\__dirname：当前文件所在的文件夹的绝对路径\
}

**为什么要有这个外层函数（这个外层函数有什么作用）**

1. 隐藏内部实现
2. 支持CommonJS的模块化

 

**对于浏览器端而言，js由哪几部分组?**

      1.BOM浏览器对象模型-------很多的API (location, history)

2.DOM文档对象模型........很多的API (对DOM的增删改查)

3.ES规范-------------- ES6. ES5.....

 

**Node端js由几部分组成?**

1.没有了BOM ----因为服务器不需要 (服务端没有海览器对象)

2.没有了DON ----因为没有浏览器窗口

3.几乎包含了所有ES规范，没有alert

4.没有了window，但是取而代之的是一个叫global的全局变量。\
 

```javascript
console.log(window)
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6d94f357f34443aa789465b278964f6~tplv-k3u1fbpfcp-zoom-1.image)

 

## 包和包管理器

 

### package包

Nodejs的包基本遵循CommonuS规范，包将一组 相关的模块组合在一起，形成一组完整的工具。\
包由包结构和包描述文件两个部分组成。

* 1\)包结构: 用于组织包中的各种文件。
* 2\)包描述文件: 描述包的相关信息，以供外部读取分析。

 

### 什么是包

我们电脑上的文件夹，包含了某些特定的文件，符合了某些特定的结构，就是一个包。

 

### 一个标准的包应该包含哪些内容

1. package.json——描述文件（包的说明书，必须要有！！！）
2. bin——可执行二进制文件
3. lib——经过编译后的js代码
4. doc——文档（说明文档、bug修复文档、版本变更记录文档）
5. test——一些测试报告

 

### 如何让一个普通文件变成包

让这个文件夹拥有一个：package.json文件即可，且package.json里面的内容要合法。

执行命令：npm init

包名的要求：不能有中文，不能有大写字母，不能与npm仓库上其他包同名

 

### npm与node的关系

**npm 是 JavaScript 世界的包管理工具,并且是 Node.js 平台的默认包管理工具，也是世界上最大的软件注册表**

**现在很多人是为了使用npm才去安装node**

pnm官网：www\.npmjs.com

在官网中搜索可以找到某个包

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/becec5e937db4a4b975c38e86e183451~tplv-k3u1fbpfcp-zoom-1.image)

 

安装了node自动就有了npm（npm是node官方出的包管理器）

回到文件夹里，package.json已经生成了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7032798c1ea24a37a65e9873361982a2~tplv-k3u1fbpfcp-zoom-1.image)

 

### 获取npm全局安装地址

npm root -g

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a889a136a12f4c838f707e5f57f9a958~tplv-k3u1fbpfcp-zoom-1.image)

 

 

### 开发依赖和生产依赖

1. 只有在开发时（写代码）需要依赖的库，就是开发依赖——例如：语法检查，压缩代码，扩展CSS前缀的包
2. 在生产环境中必不可少的包，就是生产依赖——例如：jQuery，axios等等。所谓的生产环境就是指：项目开发完毕，要部署到服务器上运行
3. 某些包即属于开发依赖，又属于生产依赖——例如：jQuery

这两个依赖是为了有时候区分包在什么时候才产生的

 

### 删除依赖包

npm remove 依赖包名

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7c7c010d06a4431ae51d44a0a1c1ae4~tplv-k3u1fbpfcp-zoom-1.image)

 

### npm一些其他命令

1. npm aduit fix：检测项目依赖中的一些问题，并且尝试修复
2. npm view xxxxx versions：查看npm仓库中xxxx包的所有版本信息
3. npm view xxxxx version：查看npm仓库中xxxx包的最新版本
4. npm ls xxxx：查看我们所安装的xxxx包的版本

 

例子：安装某一个jQuery版本号

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65787eadaf594ca7ac8abe80c33437f8~tplv-k3u1fbpfcp-zoom-1.image)

 

### 关于版本号的说明

"^3.x.x"：锁定最大版本，以后安装包的时候，保证包必须是3.x.x版本，x默认取最新的

"\~3.1.x" ：锁定最小版本，以后安装包的时候，保证包必须是3.1.x版本，x默认取最新的

"3.1.1" ：锁定完整版本，以后安装包的时候，保证包必须是3.1.1版本

 

### node.js创建一个js文件后导入包

使用import语句

```javascript
// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
```

 

## webpack

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65d4cbcf46324410a68b5ac41078d4a1~tplv-k3u1fbpfcp-zoom-1.image)

中文文档：<https://www.webpackjs.com/>

### 安装 Webpack

在安装 Webpack 前，你本地环境需要支持 [node.js](https://www.runoob.com/nodejs/nodejs-install-setup.html)。

```
npm install webpack -g
```

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

所以如果我们需要在应用中添加 css 文件，就需要使用到 css-loader 和 style-loader，他们做两件不同的事情，css-loader 会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。

```
//当在控制台直接输入webpack命令执行的时候，webpack做了以下几步：
//1.首先，webpack发现，并没有通过命令的形式，给其指定入口和出口
//2.webpack会去项目根目录中，查找一个叫做‘webpack.config.js’的配置文件
//3.当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完，就得到了配置文件导出的配置对象
//4.当webpack拿到配置对象后，就拿到了配置对象中指定的入口和出口，然后进行打包构建
```

 

 

一起学习，一起进步 -.- ，如有错误，可以发评论
