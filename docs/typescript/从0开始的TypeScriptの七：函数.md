---
title: 从0开始的TypeScriptの七：函数
date: 8/8/2021, 10:31:42 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


# 函数

## 介绍

函数是`JavaScript`应用程序的基础。 它帮助你实现抽象层，模拟类，信息隐藏和模块，同时也是`JavaScript`中的一等公民。

 在`TypeScript`里，虽然已经支持类，命名空间和模块，但函数仍然是主要的定义行为的地方。 
 
 `TypeScript`为`JavaScript`函数添加了 <div color=#2DE02D >额外的功能</div>，让我们可以更容易地使用。

在`TypeScript`里，函数也分为命名函数和匿名函数。

不过只要有一些`JavaScript`的基础的话,对于`TypeScript`中的函数知识应该都不会觉得难学

<br>

***





## 函数定义

### JavaScript函数定义

在`JavaScript`中，函数定义分为函数声明和函数表达式两种：

* 函数声明（Function Declaration）
* 函数表达式（Function Expression）

``` javascript
// 函数声明
function abc() {  }

// 函数表达式  将匿名函数赋值给变量
let def = function() {  }
```

### TypeScript函数定义

在 `typescript`中也可以使用这两种方式定义函数，不过需要进行约束，在之前的博客中曾经说过类型定义，使用**类型定义**是最简单的函数约束。

``` javascript
// 函数存在输入输出，在TS中要是约束，需要使用类型定义
// 让addNum的参数和返回值都必须是number类型
function addNum( a: number, b: number ): number {
    return a + b;
}
```

如果定义的函数无返回值，可以使用`void`空值。 这个在之前的函数类型https://juejin.cn/post/6992001689867780126中也有提到过。

下面的例子，如果现在写了返回值 return a;，就会发生报错 ` Type 'number' is not assignable to type 'void'.`

``` javascript
let say = function(a: number):void {
}
```

> **注意：** 与JavaScript不同，使用约束后，`addNum`不能输入多余的（或者少于要求的）参数。  如果使用`?`对参数进行可选声明，在调用传参时可不输入


#### TypeScript完整函数

函数类型包含两部分：参数类型和返回值类型。 当写出完整函数类型的时候，这两部分都是需要的。函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成API的一部分。

在`TypeScript`中，也是存在`=>`的。 不过这与es6中的箭头函数`=>`是两种不同的定义。

在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

例子：
``` javascript
let fun2:() => number = function():number {
    return 10;
}
```

当然，如果不给函数定义返回类型，其实也可以成功。这是因为ts中存在推断类型，按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型。



#### 可选参数

函数的可选参数就是在方法定义时，参数后添加`?`，可选参数要放在最后面，必选参数、默认参数放在其前面

例子：
``` javascript
function add( a?: number, b?: number ): void {  }
```


#### 默认参数

这里`JavaScript`与`TypeScript`的差别只是多了个类型约束

使用默认参数时，可选参数要放在最后面。

``` javascript
function sort( a: number, b: number = 30 ): boolean {
    return a > b;
}
sort(5);    // 默认参数如果不传参就会取默认的值， 也就是 5与30比较
sort(5, 3);   // 默认参数传参，会覆盖默认的值，也就是 5 与 3比较
```

#### 剩余参数

有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用arguments来访问所有传入的参数。

在`typescript`中，可以把所有参数收集到一个变量。  在es6中有一个名为`...`的扩展操作符，此运算符主要用于函数操作时调用

这里定义`...`扩展操作符时，类型可以设置成数组

下面是一个累加方法的例子：
``` javascript
let add = (...arr: number[]):number => {
    let all:number = 0;
    arr.map((item)=>{
        all += item as number;
    })
    return all;
}
console.log(add(1, 2, 3));  // 6
```


#### 函数重载

`typescript`中重载： 通过为同一个函数提供多个函数类型定义来实现多种功能的目的

例子：
```javascript
function css( config:string ):void{ }  // error: Duplicate function implementation.

function css( config:string, value:number ):void { } // error: Duplicate function implementation.
```

在`JavaScript`里， 如果遇到相同的方法名，会将以下面的方法来覆盖上面的方法，不会出错。 但是在`typescript`中，这种定义方式是会出错的。错误原因是**函数重复实现**

TS重载实现：
``` javascript
function css( config:string ):string;

function css( config:string, value:number ):string;
// 对上面两个css进行重载
function css( ...str:any[] ):any { 
    if (str.length == 1) {
        return `${str[0]}`
    } else {
        return `${str[0]} + ${str[1]}`
    }
}
console.log(css('4', 5));
```

其实我个人觉得，`typescript`的重载写起来不舒服，所以尽量减少重复命名的方法吧 



![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ec7a4726397478c91288b6b5fa9d428~tplv-k3u1fbpfcp-watermark.image)

