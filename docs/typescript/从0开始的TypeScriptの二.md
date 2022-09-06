---
title: 从0开始的TypeScriptの二：类型系统
date: 8/2/2021, 7:31:04 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


# TypeScript类型系统

承接TS系列上一篇的类型系统介绍：[从0开始的TypeScript（一）](https://juejin.cn/post/6991372329414557733)

类型系统是`TypeScript`中一个重要的概念。

TypeScript里类型可以隐式编写也可以显式编写

<br>

## 类型的隐式和显式

**隐式**

在TypeScript中，回尝试推断出尽可能多的类型信息，以便在开发过程中以最小生产力成本提供类型安全。 

在下面的例子中TypeScript会知道变量类型，并且会给出错误提示。 如果是在JavaScript中，这样的编写方式是可以的，但是在TypeScript是会出现报错的，这是由于TypeScript存在类型系统

``` javascript
var foo = 123;
foo = '456';
```

效果：

![ts定义类型01.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17bd98ee2a4b4d349ffc2161d19ef39f~tplv-k3u1fbpfcp-watermark.image)


**显式**

在类型的赋值中，TypeScript可以使用注释来表明类型，好处：
* 帮助编译器，更重要的是未来下一个阅读代码的开发人员记录内容
* 强制编译器看到应该看到的内容，自己对代码的理解和代码的算法分析相匹配

在TypeScript中可以使用后缀类型注释，由开发者来告诉 TS 变量是什么类型 (如果赋值的类型与后缀类型不同，就会直接报错)：
``` javascript
var foo1: number = 123;
var foo2: number = '123';  // Type '"123"' is not assignable to type 'number' 
var foo3: string = '123';
var foo4: string = 123;  // Type '123' is not assignable to type 'string'.
```


![ts后缀类型报错.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47f8e9efc4f04a8882d231216f4824fc~tplv-k3u1fbpfcp-watermark.image)

<br>


## 类型错误不会阻止JavaScript生成

在使用tsc编译.ts文件时，即使存在编译错误，在**默认情况**，TypeScript也会尽可能发出有效的JavaScript文件
如上面的后缀类型注释，尽管出现报错，但是js文件依旧生成了


![tsc后缀出错js.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca80107ed6834ab3841d51766742c5d1~tplv-k3u1fbpfcp-watermark.image)

因此,您可以逐步将 JavaScript 代码升级到 TypeScript。这与许多其他语言编译器的工作方式截然不同，是迁移到TypeScript的另一个原因。



## 类型可以是环境

TypeScript的一个主要设计目标是可以安全、轻松的使用现有的JavaScript库。 

TypeScript通过声明来实现这一点。

比如`jQuery`简单示例：`declare var $: any`



## TypeScript基础类型

为了让程序有价值，TypeScript支持与JavaScript几乎相同的数据类型

在JavaScript中存在的数据类型，TypeScript也都存在

### 布尔值

在JavaScript和TypeScript中是`boolean`，数据类型就是`true/false`

> let flag: boolean = false;

### 数字
number类型，在JavaScript和TypeScript中，所有的数字都是浮点数。

此外： TypeScript还支持引入的二进制和八进制字面量。
在number类型中，还可以直接赋值为NaN和Infinity
> NaN: 大多数定长的整数格式无法显式表示无效数据
> Infinity: 无限大的数据

TS文件：
```javascript
let num1: number = 10;   // 十进制
let num2: number = 0xf00d;  // 十六进制
let num3: number = 0b1010101;  // 二进制
let num4: number = 0o744;  // 八进制
let num5: number = NaN;
let num6: number = Infinity;
```

编译后： 因为JavaScript支持十六进制，所以ts中赋值的num2没有被转换成十进制数据
```javascript
var num1 = 10; // 十进制
var num2 = 0xf00d; // 十六进制
var num3 = 85; // 二进制
var num4 = 484; // 八进制
var num5 = NaN;
var num6 = Infinity;
```

### 字符串
string类型，可以使用双引号或单引号表示字符串，或者使用\`\`模板字符串

TS文件：
```javascript
let str1: string = 'hello';
let str2: string = 'world';
let str3: string = `${num1} +

${num2}`;
```

编译后：
```javascript
var str1 = 'hello';
var str2 = 'world';
var str3 = num1 + " +\n\n" + num2;
```

### 数组

在TypeScript中，有两种类型注释方式可以定义数组
1. 在元素类型后加`[]` --- `数据类型[]`
2. 使用数组泛型 --- `Array<数据类型>`

TypeScript只允许数组中包括一种数据类型的值, 如果想要为数组添加不同类型的值，需要使用 <div color=#f00 size=2 >**联合类型**</div> 

创建**联合类型**的语法格式如下：

```javascript
Type1|Type2|Type3
```

TS联合类型可参考：https://www.runoob.com/typescript/ts-union.html

TS:
``` javascript
let arr1: string[] = ['1', '2', '3'];
let arr2: Array<number> = [1, 2, 3];
let arr3: number[] = [1, '2'];  // Type 'string' is not assignable to type 'number'
let arr4: (number|string)[] = [1, '2'];  //联合类型
```

JS:
```javascript
var arr1 = ['1', '2', '3'];
var arr2 = [1, 2, 3];
var arr3 = [1, '2']; // Type 'string' is not assignable to type 'number'
var arr4 = [1, '2']; //联合类型
```

***

这样来看，使用后缀类型注释好像写数组更加麻烦了。
但实际在大型项目中，会起到很棒的效果。

比如定义一个由个体数据组成的数组，个体具有name、age、score三种属性。 name是字符串，age是数值，score是是否通过的布尔值。

TS：
```javascript
// 定义person数组的组成形式
let person: { name: string, age: number, score: boolean }[];
// 按照定义的格式添加数组元素
person = [{name: 'kcj', age: 18, score: true}]
person.push({name: 'anxi', age: 19, score: false})
```
这样一来，如果有什么值不符合规范，能够在编译过程中很轻松的看出来。 是不是和class类有些相像


### Null和Undefined

Null和undefined可以直接赋值， 一般使用undefined，不要使用null

```javascript
let jk: string|undefined|null;
jk = null;
jk = undefined;
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f86b5f1b7ce408e90a89322ce8e2f42~tplv-k3u1fbpfcp-watermark.image)


