---
title: 从0开始的TypeScriptの八：类
date: 8/10/2021, 10:06:59 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


# 类

## 介绍 

传统的`JavaScript`程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从`ECMAScript 2015`，也就是`ECMAScript 6`开始，`JavaScript`程序员将能够使用基于类的面向对象的方式。 

使用`TypeScript`，允许开发者现在就使用这些特性，并且编译后的`JavaScript`可以在所有主流浏览器和平台上运行，而不需要等到下个`JavaScript`版本。

> `class`类是因为`es6`而产生的，在`TypeScript`里能够使用`es6`的特性，`TypeScript` 除了实现了所有 `es6` 中的类的功能以外，还添加了一些新的用法

关于class的教程可以参考阮一峰老师的：[《Class 的基本语法》 ](https://www.bookstack.cn/read/es6/docs-class.md)


**一张简单的思维导图来看看类与对象的关系吧**：
> 在下图中，父类`Animal`可以通过继承的方式形成三个子类`cat`,`dog`,`brid`。 而秋田犬也是继承自`dog`的子类。
> 通过new的方式，可以产生类的实例，也就是对象。 比如辛巴就是由`animal`动物类产生的实例，而子类也可以产生更加精确的实例对象， `cat`猫这一类可以产生`Tom`、`黑猫`、`白猫`三种对象

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdd31001cc634b71ab1674472fc666ef~tplv-k3u1fbpfcp-watermark.image)




如果曾经学习过Java等面向对象语言，可能会对class类的概念比较熟悉了（下面这些也是比较经典的论述了）：

* 类（`Class`）：定义了一件事物的抽象特点，包含它的属性和方法
* 对象（`Object`）：类的实例，通过 new 生成
* 面向对象（`OOP`）的三大特性：封装、继承、多态
* 封装（`Encapsulation`）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
* 继承（`Inheritance`）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
* 多态（`Polymorphism`）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。
* 存取器（`getter & setter`）：用以改变属性的读取和赋值行为
* 修饰符（`Modifiers`）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
* 抽象类（`Abstract Class`）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
* 接口（`Interfaces`）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

<br>

***

<br>


### ES5 function生成实例对象

JavaScript 语言中，生成实例对象的传统方法是通过构造函数

下面的例子中，使用了原型链来定义方法，通过new生成实例对象 
``` javascript
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);  // p就是Point的实例对象
```


***


### ES6 class生成实例对象

在es6的class类，其中具有一个名为`constructor`的构造方法，此方法对应上面的es5中的`Point(x, y)`函数方法。 

如果没有主动编写`constructor`构造方法，默认会添加一个空的`constructor`构造方法

在通过`new`生成新实例时，会自动调用类中的构造函数

``` javascript
class Point {
    x: number;  // 属性   前面默认省略了public关键词
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    toString(): string {
      return '(' + this.x + ', ' + this.y + ')';
    }
}
var p = new Point(3, 4);
```

<br>

***

<br>

## 类的继承 extend

在class的中，可以通过`extends`进行继承操作，在子类当中使用`super`来调用父类的构造函数和方法。 相当于初始化父类的构造函数

例子： 子类中可以单独定义方法，子类生成的实例不仅可以调用子类中的方法，也可以调用父类的方法
``` javascript
class childPoint extends Point {
    toNumber(): number {
        return this.x - this.y;
    }
}
let cp = new childPoint(7, 3);
console.log(cp.toString());  // (7, 3)   调用父类的方法
console.log(cp.toNumber());  // 4    调用子类自身的方法
```

在子类中，可以使用 `super` 关键字来调用父类的构造函数和方法
``` javascript
constructor(x: number, y: number, age: string) {
    super(x, y);  // 调用父类Point的x和y  初始化父类的构造函数
}
```

> 子类也可以被称为派生类，父类也可以被称为基类或超类

<br>

***

<br>

## public private protected

在`typescript`中存在公共`public`，私有`private`与受保护`protected`修饰符

TypeScript 可以使用三种访问修饰符（`Access Modifiers`）

* public: 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
* private: 修饰的属性或方法是私有的，不能在声明它的类的外部访问
* protected: 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

图示：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c7bdca78ee84b95aa486ed02244d337~tplv-k3u1fbpfcp-watermark.image" width="600" >

### public

在编写TS类中的代码时，成员默认都是`public`公共的成员。 

下面的a与b是一个级别的：
``` javascript
class A {
    public a: number;  // public
    b : number;   // public
    private c: number;  // private
    protected d: number;  // protected
    constructor(a: number, b: number, c:number, d:number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
}
```

当实例的属性是`public`时，可以被直接访问。
```js
let a_one = new A(7, 8, 9, 10);
console.log(a_one.a);
```

### private

当成员被标记成`private`时，它就不能在声明它的类的外部访问

对于上面的例子，如果在对象中访问`private`修饰的属性c就会出现报错。  `属性“c”为私有属性，只能在类“A”中访问。`

``` javascript
console.log(a_one.c);  // error: Property 'c' is private and only accessible within class 'A'.
```

不过当在类的内部定义一个sayC方法去访问属性c时，就可以成功的看到属性C的值了
``` javascript
sayC() {
    console.log(this.c);
}
```
使用对象a_one调用 `a_one.sayC()`。  这一步操作令我想起来**闭包**，是不是非常相像



### protected

当成员被`protected`保护标记时，也不能在外部类中访问。  对象中访问会出现报错：`属性“d”受保护，只能在类“A”及其子类中访问。`

与`private`不同的是，当使用子类继承该类时，在子类中可以使用`protected`属性。 而`private`修饰的属性c会报错
``` javascript
class B extends A {
    constructor (a:number, b:number, c:number, d:number) {
        super(a, b, c, d)
    }
    print () {
        console.log(this.d);
        console.log(this.c);  // Property 'c' is private and only accessible within class 'A'.
    }
}
```


<br>

***

<br>

## 只读修饰符 readonly

除了上面的`public private protected`这三种 **御三家** 修饰符之外，在`typescript`的类中，我们还可以使用`readonly`只读修饰符


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75050ba501954439bae2c07c1a61cc8d~tplv-k3u1fbpfcp-watermark.image)

在之前的[《从0开始的TypeScriptの四：接口Interfaces · 上》](https://juejin.cn/post/6992560274435751966)  中也对`只读属性`有过介绍

可以使用`readonly关键字`将属性设置为只读的。 

**只读属性必须在声明时或构造函数里被初始化，只允许出现在属性声明或索引签名或构造函数中**。

下面的例子，在类中声明了只读属性e，对象中可以直接打印属性e，但是不能通过对象对只读属性进行修改
``` javascript
class C {
    readonly e:number = 10;
    constructor () {
    }
}
let cc = new C();
console.log(cc.e);  
cc.e = 4;  // Cannot assign to 'e' because it is a read-only property.
```

<br>

***

<br>

## 静态属性

可以通过 `static`关键字来创建静态属性。

每个实例想要访问这个属性的时候，都要在origin前面加上类名， 如同在实例属性上使用this.前缀来访问属性一样

下面的例子： 
``` javascript
class D {
    static f:number = 15;
    constructor () {
    }
    say() {
        // console.log(this.f);  // this. 是找不到静态属性的
        console.log(D.f);
    }
}
console.log(D.f);  // 静态属性或方法不需要进行实例化即可调用
```

**注意：**
1. 静态属性或方法不需要进行实例化即可调用
2. 静态方法不能直接调用this的属性


<br>

***

<br>

## 多态

多态其实是属于继承中的内容

父类定义了一种方法，子类中各自对这个方法进行了实现。 每个子类有不同实现


<br>
***
<br>

## 抽象类和抽象方法

`abstract` 用于定义抽象类和其中的抽象方法。

抽象类和抽象方法是用来定义标准的。抽象类中的抽象方法不包含具体实现并且必须在派生类中实现， 这句话的意思是抽象类中的抽象方法在子类中必须实现

如下例子： Say类继承自抽象类OK，如果在Say类中不实现抽象方法input就会报错: `非抽象类“Say”不会实现继承自“OK”类的抽象成员“input”`
``` javascript
abstract class OK {
    abstract input():void;
}
class Say extends OK{
}
```

所以需要在子类中实现抽象方法：
``` javascript
class Say extends OK{
    input () { }  // 即使方法没有内容也可以
}
```

**注意：抽象类是不允许被实例化的，抽象方法只能放在抽象类中**

抽象类的子类是可以实例化的

``` javascript
let ok = new OK();  // Cannot create an instance of an abstract class.
let say = new Say();
```



<br>

***

<br>

## 存取器 get和set

使用 `getter` 和 `setter` 可以改变属性的赋值和读取行为

`TypeScript`支持通过`getters/setters`来截取对对象成员的访问。 这能帮助你有效的控制对对象成员的访问。

例子：  定义一个类，在类中使用`private`定义属性_name，这样_name就不能直接被外部访问了，但是想要修改和读取_name的值。 这时就可以使用存取器来设置相应的方法
``` javascript
class Getset {
    private _name: string;
    constructor(name:string) {
        this._name = name;
    }
    get name(): string {
        return '上将：' + this._name;
    }
    // "set" 访问器不能具有返回类型批注
    set name(name: string) {
        this._name = name;
    }
}
let getset = new Getset("潘凤");
console.log(getset.name);  // getter
getset.name = "华雄";   // setter
```

现在就可以和`public`一样去操作`_name`属性了

> 注意："set" 访问器不能具有返回类型批注

<br><br><br>

## 结束了

终于把`Typescript`类的这一节学完了，累人 （当然之后类与接口结合还有东西呢）


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff6fd12b92c742b08c1dd4b578b6af2f~tplv-k3u1fbpfcp-watermark.image)
