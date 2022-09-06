---
title: 从0开始的TypeScriptの一：启航
date: 8/1/2021, 4:16:46 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


总所周知，每个新的系列文章第一篇都是比较简单的介绍，本次TypeScript也不例外，第一篇先水一下了

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/661bf86e3a1941a399a81a94fcb5f711~tplv-k3u1fbpfcp-watermark.image)

# TypeScript

在现在学习typescript的过程中，下面这些网站链接帮助还是挺大的，特别是书栈里面的[《深入理解 TypeScript》](https://www.bookstack.cn/read/TypeScriptDeepDiveZH/0.md)，书栈真的可以对**白嫖党**安利一下

TypeScript学习参考链接：
* https://www.tslang.cn/index.html
* https://chinese.freecodecamp.org/forum/t/topic/506
* https://www.bookstack.cn/explore?cid=81&tab=popular
* https://basarat.gitbook.io/typescript/getting-started/why-typescript


## TypeScript 介绍

TypeScript是JavaScript的超集，具有静态类型特性， 也被称为`JavaScript that scales`（可扩展的JavaScript）

## TypeScript使用原因

JavaScript不适用于大型应用开发，JavaScript是一种没有`类型系统`的动态语言，变量可以是任何类型

而`类型系统`能够提高代码质量和可读性，使代码库更易于维护或重构。 最重要的是可以在编译时捕获错误，而不是在运行时捕获。

`TypeScript`能在编译时检查不同部分代码的正确性。 在编译时检查出错误，便于开发者发现错误的位置和具体问题，如果运行时才检查出错误，则需要跟踪复杂的堆栈，来进行调试。

## TypeScript优缺点

优点：
* 在开发周期中能够更早捕获潜在的错误
* 管理大型代码库
* 更易于重构
* 更易于团队合作： 代码的耦合性越强，不同开发人员访问代码库时越不容易造成无意破坏
* 文档特性： 类型本身是一种文档信息，方便以后开发者本人查询
* TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范

缺点：
* 需要额外的学习： 短期放缓进度与长期提高效率之间权衡
* 类型错误可能多种多样
* 配置极大地影响运行
* 可能和一些库结合的不是很完美


## TypeScript安装

TypeScript的安装非常方便，可以使用npm进行下载 (ps:一般而言都是全局安装的)

npm:
> npm install -g typescript

cnpm:
> cnpm install -g typescript

yarn: 
> yarn global add typescript

查看是否安装完成，在终端中输入命令查看版本号： `tsc -v`


![ts版本号.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79a13e8d515b41d99ff97463a2226f3d~tplv-k3u1fbpfcp-watermark.image)

TypeScript文件的后缀是 `.ts`, 在cmd中运行命令是：`tsc 文件名.ts`。  
此命令并不会直接运行起ts文件，而是会在当前文件夹下生成一个同样文件名的js文件。


![tsc命令.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a69dfea477f94471b49b1cb26242f8f4~tplv-k3u1fbpfcp-watermark.image)

## TypeScript类型系统

TypeScript有两个主要目标：
* 为JavaScript提供可选的类型系统
* 提供从未来JavaScript版本到当前JavaScript引擎的功能

类型已被证明能够提高代码质量和可理解性。（大型团队如谷歌、微软、Facebook不断得出这个结论）

在C语言、Java语言等强类型语言当中，对于数值字符串等变量的定义都是严格的，使用int，string定义。 但是在JavaScript中，使用var、let等进行定义。

> 强类型定义语言：强制数据类型定义的语言。也就是说，一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了。举个例子：如果你定义了一个整型变量 a，那么程序根本不可能将 a 当作字符串类型处理。强类型定义语言是类型安全的语言。

> 弱类型定义语言：数据类型可以被忽略的语言。它与强类型定义语言相反, 一个变量可以赋不同数据类型的值。强类型定义语言在速度上可能略逊色于弱类型定义语言，但是强类型定义语言带来的严谨性能够有效的避免许多错误。另外，“这门语言是不是动态语言”与“这门语言是否类型安全”之间是完全没有联系的！



1. 在进行重构时，类型回提高敏捷性。 编译器捕获错误比在运行时好
2. 类型是可以拥有最佳文档的形式之一。 函数签名是定理，函数体是证明

**<div color=#f00  > 一些关键点：</div>**
* TypeScript类型系统设计是可选的，JavaScript即是TypeScript；
* TypeScript不会阻止JavaScript的运行，**即使存在类型错误也不例外**，这可以让JavaScript逐步迁移到TypeScript；
