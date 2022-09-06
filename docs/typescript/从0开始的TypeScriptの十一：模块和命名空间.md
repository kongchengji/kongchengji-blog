---
title: 从0开始的TypeScriptの十一：模块和命名空间
date: 8/16/2021, 8:48:14 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


# 模块

JavaScript先天缺少一项功能：模块。 所以在`es6`提出的`Module`模块的概念，当然在`nodeJs`中也存在`CommonJS`规范。

**在`typescript`中的主要模块概念还是`Module`模块**

模块在其自身的作用域里执行，而不是在全局作用域里；这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用`export`形式之一导出它们。 

相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用`import`形式之一。

模块是自声明的；两个模块之间的关系是通过在文件级别上使用`imports`和`exports`建立的。

模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。

任何包含顶级`import`或者`export`的文件都被当成一个模块。 
相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为**全局可见**的（因此对模块也是可见的）。 

> 在大型项目中，肯定需要模块化，不然仅仅是`typescript`的命名冲突就够报一堆错误了

> 当然，这里如果在文件中使用`import`或者`export`会产生一个问题。 使用 `tsc`转换后的js并不能在浏览器中直接使用，因为不支持。 所以这里可以采用 `webpack`打包转换
> 1. [《webpack打包typescript》  ](https://juejin.cn/post/6992956547252879374)
> 2. [《webpack5热更新打包TS》  ](https://juejin.cn/post/6993284345649872909)

***
<br>

## 导出 exports

任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加`export`关键字来导出。

方式：
* export var a:number = 10;
* export { a };
* export default a;

**注意：** export default在一个模块中只能使用一次，并且导入不能使用 {}，可以直接在import后写名称


## 例子

a.ts：
``` javascript
function add(a:number, b:number) {
    console.log( a + b );    
}
export { add }
```

b.ts: 使用import进行引入时，可以省略引入文件的后缀
``` javascript
import { add } from "./a";
add(4, 5)  // 9
```

此时运行 `tsc b.ts`命令，会同时生成`a.js`和`b.js`两个JavaScript文件。 可以使用`node b.js`来运行，打印9;


## 可选的模块加载

编译器会检测是否每个模块都会在生成的JavaScript中用到。 如果一个模块标识符只在类型注解部分使用，并且完全没有在表达式中使用时，就不会生成require这个模块的代码。 省略掉没有用到的引用对性能提升是很有益的，并同时提供了选择性加载模块的能力。

这种模式的核心是`import id = require("...")`语句可以让我们访问模块导出的类型。 模块加载器会被动态调用（通过require）。 它利用了省略引用的优化，所以模块只在被需要时加载。 

***
<br>

***

# 命名空间

在代码量较大的情况下，为了避免各种变量命名相冲突，可将相似功能的函数、接口、类等放置到命名空间内

`TypeScript`的命名空间可以将代码包裹起来，只对外暴露需要在外部访问的对象，空间中的对象通过`export`进行抛出 （这和上面的模块就很相像了，所以TypeScript 1.5之前属于名称是“内部模块”）

`TypeScript`中命名空间使用 `namespace` 来定义

命名空间和模块的区别：
* 命名空间主要防止命名冲突
* 模块是ts外部模块的简称，侧重于代码的复用
* 一个模块里可能会有多个命名空间

## 命名空间

下面编写一个例子：
``` javascript
namespace First {
    export class Animal {
        name: string = '张三'
    }
}
```
这就是一个简单是命名空间，在空间外部对于空间内Animal类的使用方法
``` javascript
let firstname = new First.Animal();
console.log(firstname);
```

其实命名空间`namespace`在经过tsc编译后，会变成像下面一样的匿名函数
``` javascript
var First;
(function (First) {
    var Animal = /** @class */ (function () {
        function Animal() {
            this.name = '张三';
        }
        return Animal;
    }());
    First.Animal = Animal;
})(First || (First = {}));
```


## 命名空间别名

在使用命名空间时，可能会需要简化空间名称，这是可以使用`import 别名 = 命名空间`的方式来取一个别名

> **注意：** 这里给命名空间取别名的`import`和导入模块的`import`是不一样的

给上面的例子中`First`命名空间取别名：
``` javascript
import f = First;

let firstname = new f.Animal();
```
