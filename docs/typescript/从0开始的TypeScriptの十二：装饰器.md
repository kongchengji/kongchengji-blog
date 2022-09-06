---
title: 从0开始的TypeScriptの十二：装饰器
date: 8/19/2021, 10:26:59 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---



# 装饰器/修饰器 Decorator

定义：装饰器是一种特殊类型的声明，能够被附加到类的声明、方法、属性或参数上，可以修改类的属性

通俗的讲装饰器就是一个方法：可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。装饰器是实现 `AOP`（面向切面）编程的一种重要方式。

通过注入的对象不同，可以将装饰器分为：
* 类装饰器
* 类属性装饰器
* 类方法装饰器
* 类方法参数装饰器


装饰器的写法：
* 普通装饰器（无法传参）
* 装饰器工厂（可传参）

装饰器目前已经是`ES7`的标准特性之一了，但是在使用时需要用`Babel`进行转换，或者在`tsconfig.json`编译选项中打开`experimentalDecorators`,然后使用`tsc`进行编译

> "experimentalDecorators": true // 启用对ES7装饰器的实验性支持

参考：[《阮一峰ECMAScript6入门教程 -- 修饰器》 ](https://www.bookstack.cn/read/es6/docs-decorator.md)

<br>

***
<br>

## 类装饰器

类装饰器：类装饰器在类声明前被声明（紧靠着类声明），是一个对类进行处理的函数

类装饰器应用于类构造函数，可以用了见识，修改或替换类定义。类装饰器表达式会在运行时被当作函数调用，**类的构造函数是其唯一的参数（对于装饰器）**


### 普通装饰器

定义一个普通装饰器`Decorator`，**普通装饰器不能传参**

虽然在`Decorator`方法定义时有参数，但是在调用装饰器时不需要传参，因为参数`params`其实是之后要修饰的类`class`
``` javascript
function Decorator(params: any) {
    console.log(params);
    // 给类添加原型链属性
    params.prototype.color = '#f00'
}
```
使用修饰方法是在类上一行添加`@装饰器名`
``` javascript
@Decorator
class Animal {
    constructor() {
    }
}
```

如果想传参就会有错误提示：
![节点](./../noteMd/img/普通装饰器传参.png]

现在把使用了装饰器的类进行实例生成：
``` javascript
let animal:any = new Animal();
console.log(animal);
```
生成的`animal`中`__proto__`就存在装饰器赋予的color属性了


![装饰器原型链.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fda2d7fc7db4707a1a9ae8ee04e564e~tplv-k3u1fbpfcp-watermark.image)


### 装饰器工厂

上面的普通装饰器使用时不能传参，但是可以使用`装饰器工厂`定义来进行传参。

装饰器工厂其实可以理解为：在装饰器外部再封装一个函数，外部函数可以传入参数，内部才是真正的装饰器

装饰器工厂：使用时可传入参数，下面把参数赋给`params`，把类赋给`target`。并且在使用时也可以只用`()`，内部不传参数

像下面的例子中，其实就是对两个装饰器进行判断，外部其实是一个传入参数的函数
``` javascript
function Decorator2(...params: string[]) {
    if (params.length > 2) {
        return (target:any):void=>{
            target.prototype.color = params;
        }
    } else {
        return (target:any):void=>{
            target.prototype.color = params[0];
        }
    }
}
```

类：
``` javascript
@Decorator2('#f00', '#0f0', '#00f')
class Time {
    constructor() {
    }
}
let time0 = new Time();
console.log(time0);
```


![装饰器工厂.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58d7d1b19975481c9a079364ebbd516c~tplv-k3u1fbpfcp-watermark.image)

### 装饰器重构构造函数

如果类装饰器返回一个值，会使用提供的构造函数来替换类的声明

下面构造器中，返回的是`class extends target`。 这样`look`属性和`Look()`方法都被重新修改了，实例也是使用的重构后的方法和属性
``` javascript
function Decorator3(target: any) {
    return class extends target{
        look = '修改数据';
        Look() {
            console.log('123');
        }
    }
}
@Decorator3
class Doing {
    look: string;
    constructor(look:string) {
        this.look = look;
    }
    Look() {
        console.log(this.look);
    }
}

let done = new Doing('正在看什么');
console.log(done.look);   // 修改数据
done.Look();  // 123
```
***
<br>

## 类属性装饰器

属性装饰器表达式徽章运行时当函数被调用，传入两个参数：
* 对静态成员是类的构造函数，对实例成员是类的原型对象
* 成员的名字


下面例子中，第一个`target`会打印`constructor`构造函数，第二个`attr`会打印`bed`。
然后将`bed`修改为草席，这样实例中的bed就会统一变成草席
``` javascript
function Decorator4(target:any, attr:any) {
    console.log(target);
    console.log(attr);
    target[attr] = '草席'
}
class Sleep {
    @Decorator4
    bed: string|undefined;
}
let sleep = new Sleep();
console.log(sleep.bed);
```


![草席.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2e3dbb2147e41949facff4622ed5f3d~tplv-k3u1fbpfcp-watermark.image)


***
<br>

## 类方法装饰器

被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义

方法装饰器在运行是时传入三种参数：
* 对静态成员是类的构造函数，对实例成员是类的原型对象
* 成员的名字
* 成员的属性描述符

方法装饰器：
```javascript
function Decorator5(target:any, attr:any, desc:any) {
    console.log(target);
    console.log(attr);
    console.log(desc);
}
```

在类的方法上进行使用：
```javascript
class Doing {
    constructor() {
    }
    @Decorator5
    Look():void {
        console.log(123);
    }
}
```

打印的结果（这里在使用时，我使用了`webpack`打包后的js）：


![方法装饰器.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e369b0065c584f12bb0f4a6a03b817b4~tplv-k3u1fbpfcp-watermark.image)

在属性描述符中有下面的内容：
* **`configurable`**:
    当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
    默认为 false。
* **`enumerable`**:
    当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
    默认为 false。
* **`value`**:
    该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
    默认为 undefined。
* **`writable`**:
    当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符 (en-US)改变。
    默认为 false。

如果要使用方法装饰器修改当前方法，主要就是使用`desc`的内容。当前方法其实是`desc`的`value`。

例子：方法装饰器修改当前方法，并且原方法继续执行
```javascript
function Decorator5(target:any, attr:any, desc:any) {
    let oldmethod = desc.value;
    desc.value = function(...args:string[]){
        console.log(args);
        oldmethod.apply(this, args)
    }
}
```

***
<br>

## 类方法参数装饰器

参数装饰器汇总运行时当作函数调用，传入三个参数：
* 对静态成员是类的构造函数，对实例成员是类的原型对象
* 方法的名字
* 参数在函数参数列表中的索引

例子：
```javascript
function Decorator6(target:any, attr:any, index:any) {
    console.log(target);
    console.log(attr);
    console.log(index);
}
```

在调用时写入方法的`()`中
```javascript
Look(@Decorator6 ...args:string[]):void {
    console.log(123);
}
```
输出：


![参数装饰器.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99715130b0284ae3a0bbcd5394db3b6a~tplv-k3u1fbpfcp-watermark.image)