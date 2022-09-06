---
title: 从0开始的TypeScriptの五：webpack打包typescript
date: 8/5/2021, 10:44:35 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


# webpack打包TS

相信很多前端的朋友都知道webpack是什么，*webpack* 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用。

## webpack概念

本质上，**webpack** 是一个用于现代 JavaScript 应用程序的 *静态模块打包工具*。当 webpack 处理应用程序时，它会在内部构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 *bundle*


## 打包起因

在编写ts文件的过程当中，可能会使用到export来避免命名冲突。

在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中，使用全局变量空间是危险的，因为它会与文件内的代码命名冲突

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa8b54c9359f4deb9532e432dbb7a98b~tplv-k3u1fbpfcp-watermark.image)

所以可以使用`import`或者`export`，在当前文件中创建一个本地作用域

``` js
// 使用export 在当前文件中创建一个本地作用域, 防止变量冲突
export {  } 
```

但是当我使用命令`tsc tsc05.ts -w`运行生成一个js文件时，使用`<script>`标签导入进html中时，就会出现报错。

我之前运行生成js时使用的都是`tsc命令`直接生成的，但是在有些情况下，生成的js文件直接引入浏览器中是不支持的，所以平时的练习可以使用，如果到正式项目中最好还是使用webpack等打包工具进行打包生成



生成的tsc05.js文件
```js
"use strict";
exports.__esModule = true;
exports.addNum = void 0;
// 函数声明
function abc() { }
// 函数表达式
var def = function () { };
// 函数存在输入输出，在TS中要是约束，需要使用类型定义
function addNum(a, b) {
    if (b)
        return a + b;
    else
        return a;
}
exports.addNum = addNum;
console.log(addNum(1));
```

在html中报错：`Uncaught SyntaxError: Unexpected token 'export'`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6cc9067ccc946c68e3f32a241856197~tplv-k3u1fbpfcp-watermark.image)

因为浏览器不支持`exports`，所以在这里我使用`webpack`去对ts文件进行打包

<br>

***

<br>

## 安装webpack

为了ts编译运行安装webpack，webpack也有很多版本，如果是默认安装的话，一般是取最新的版本来的

我使用的安装方式是yarn安装，当然大家也可以直接用npm或者cnpm进行安装，都是较为简单

> 命令： yarn add webpack webpack-cli

在基础的配置中，webpack只对js有效，因此我们需要把ts转化为js，需要用到`ts-loader`包

> 命令：yarn add ts-loader

安装`typescript`，这是肯定需要的

> 命令： yarn add typescript

> **注意**： 这里的`typescript`可以全局安装，也可以局部安装。 使用全局安装的`typescript`时可以会出现错误 
> <div color=##DA0825 >“ Could not load TypeScript. Try installing with 'yarn add typescript' or 'npm install typescript'. If TypeScript is installed globally, try using 'yarn link typescript' or 'npm link typescript'. ”</div> 。 此错误翻译为：无法加载类型脚本。尝试使用“添加类型脚本”或“npm安装类型脚本”安装。如果TypeScript是全局安装的，请尝试使用“link链接TypeScript”或“npm链接TypeScript”



当前的package.json中的配置：
``` javascript
{
  "devDependencies": {
    "babel-preset-es2015": "^6.24.1",
    "babel-register": "^6.26.0"
  },
  "dependencies": {
    "@types/node": "^16.4.12",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "inquirer": "^8.1.2",
    "ts-loader": "^9.2.5",
    "typescript": "^4.3.5",
    "webpack": "^5.48.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  }
}
```
<br>

***

<br>

## 编写webpack配置

### webpack.config.js

安装好这些包之后，就需要配置webpack.config.js文件了

在与`package.json`同级目录下创建`webpack.config.js`文件，这是webpack的配置文件，非常重要

``` javascript
const path = require('path');   
const webpack = require('webpack');
module.exports = {
  entry:'./TypeScript/tsc05.ts',   // 打包对入口文件，期望打包对文件入口。 这里配置tsc05.ts的位置
  output:{
    filename:'tsc05.js',   // 输出文件名称
    path:path.resolve(__dirname,'./TypeScript/')  //获取输出路径
  },
  mode: 'development',   // 整个mode 可以不要，模式是生产坏境就是压缩好对，这里配置开发坏境方便看生成对代码
  module:{
  rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts']      // 解析对文件格式
  },
}
```

### script脚本

在`package.json`中配置`script脚本`去运行webpack

``` javascript
"scripts": {
    "dev": "webpack --mode development",  // npm run dev 打包一次
}
```

使用`npm run dev`打包一次，成功。

这里的需要在对应的`webpack.config.js`文件中配置的entry入库文件 `tsc05.ts` 已存在


![webpack打包ts.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1901dd687b57414a9368881b31e590af~tplv-k3u1fbpfcp-watermark.image)

将`tsc05.ts`文件打包后生成的出口文件`tsc05.js`


![打包出的js.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c542f99c2ec4a8a9745a81af62c95ee~tplv-k3u1fbpfcp-watermark.image)


<br>

***

<br>

## 最后结果

将`webpack`打包出的`tsc05.js`文件导入`html`中

发现已经可以成功运行了


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a741068d99a4786807046015947f553~tplv-k3u1fbpfcp-watermark.image)

这里的配置过程其实较为简单，但是如果将webpack打包的热更新添加上去就可能会配置出错
