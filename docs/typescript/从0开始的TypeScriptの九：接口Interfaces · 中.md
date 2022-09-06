---
title: 从0开始的TypeScriptの九：接口Interfaces · 中
date: 8/11/2021, 9:36:00 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


# 接口 Interfaces  （中篇）

在上一次的[《从0开始的TypeScriptの四：接口Interfaces · 上》](https://juejin.cn/post/6992560274435751966)文章中，已经把`typescript`的接口基本使用说完了（我自己如果有遗忘也会重新去看看，毕竟温故而知新）  


***


## 函数与接口

接口能够描述 `JavaScript` 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述`函数类型`。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

下面的例子： 把接口定义给函数md0，这样函数md0的参数和返回值就需要和接口定义的类型相同了
``` javascript
interface encrypt {
    (key: string, value: string): string;
}
let md0:encrypt = function(key: string, value: string):string {
    return key + value;
}
```

<br> 

***
<br>

## 类继承接口
 
`TypeScript` 也能够用接口来明确的强制一个类去符合某种契约，与上一篇文章[《从0开始的TypeScriptの八：类》]( https://juejin.cn/post/6994802331011252237)中的抽象类概念有些相似，都是对类进行约束 

类如果是继承父类，使用`extends`。 但是如果是接受接口的约束，就使用`implements`关键字 （让我想起了学Java的时候）

下面是一个简单的类继承接口的例子：
``` javascript
interface TennisRules {
    server: string;
    catchball(score: number): void;
}
class Tennis implements TennisRules {
    server: string;
    constructor(server: string) {
        this.server = server;
    }
    catchball(score: number) {
        console.log(`由发球者${this.server}发出的球，获得的接球分数为：${score}分`);
    }
}
let ten1 = new Tennis('张三');

ten1.catchball(9); // 由发球者张三发出的球，获得的接球分数为：9分
```

这样一看好像声明一个像下面的一样的类，然后继承也同样可以实现：
``` javascript
class TennisRules2 {
    server: string;
    constructor(server: string) {
        this.server = server;
    }
    catchball(score: number) {}
}
```

实际上这两者虽然相似，但是还是有区别的。

**类与接口区别：**
|接口|类|
|--|--|
|接口中只声明成员方法，不做实现|类声明并实现方法（抽象方法可不实现）|
| 可以继承多个接口，用逗号分隔 | 只能继承一个类，另外`implements`也可以继承类 |
| 接口不能实例  | 类可以实例化 |


<br> 

***
<br>


## 接口继承类

当然不仅类可以继承接口，反过来，接口也可以继承类

当接口继承了一个类类型时，**它会继承类的成员但不包括其实现**。

定义一个Money类：
``` javascript
class Money {
    facevalue: number;
    constructor(facevalue: number) {
        this.facevalue = facevalue;
    }
    buy():void {
        console.log('买东西');
    }
}
```
接口继承类，并使用。 其中的属性可以使用，但是buy方法不行
``` javascript
// 接口继承类
interface dollar extends Money {
    size: number
}

let dollar_one = {size: 10, facevalue: 100} as dollar;
console.log(dollar_one.facevalue);  // 100
console.log(dollar_one.size);   // 10

dollar_one.buy();  // 虽然编译无报错，但是无法使用 dollar_one.buy is not a function
```


![接口继承类.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b35ace5e88bc476ea02eb4e1ac487985~tplv-k3u1fbpfcp-watermark.image)


<br> 

***
<br>

## 接口继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

一个接口可以继承多个接口，创建出多个接口的合成接口。可以使用`extends`去完成接口继承接口的操作

例子：
``` javascript
interface ShapeColor {
    color: string;
}

interface ShapeHeight {
    height: number
}

// 一个接口可以继承多个接口，创建出多个接口的合成接口
interface Square extends ShapeColor, ShapeHeight {
    width: number;
}
let square = {} as Square;
square.color = '#f00';
square.width = 30;
square.height = 50;
console.log(square);
```


![接口继承接口.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9e2db46ce6e475fa5a76d68b9fde4d9~tplv-k3u1fbpfcp-watermark.image)


<br> 

***
<br>

每天学习一点内容，虽然从成长的角度来说有点慢，但是总比不学习不成长要好， 冲冲冲 ！

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e80ea085d9d0486a9addd1ef8e1bbf46~tplv-k3u1fbpfcp-watermark.image)


