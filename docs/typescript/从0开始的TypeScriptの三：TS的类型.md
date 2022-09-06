---
title: 从0开始的TypeScriptの三：TS的类型
date: 8/3/2021, 8:58:37 AM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


上文[《从0开始的TypeScriptの二：类型系统》](https://juejin.cn/post/6991792107304255495)中说过，JavaScript有的基础类型在`TypeScript`中都存在。

本次来介绍一些`TypeScript`中新的类型, 有**元组，枚举，任意值，Unknown，空值，Never**

在`TypeScript`对于类型系统的使用，还存在**类型别名和类型断言**等用法。


## 元组 Tuple

之前写数组的过程中，肯定会想，如果我不用后缀类型注释，是不是就可以写不同类型组成的数组了。

但这在TypeScript中如此定义，就是另一个数据类型了，叫做**元组Tuple**

<div color=#408EE7 size=2 >元组是JavaScript当中不存在的数据类型</div>

元组类型允许表示一个已知元素数量和类型的数组，**各元素的类型不必相同**

TS：
``` javascript
let tuple1 = ['10', 10];
let tuple2: [string, number] = ['10', 10];
let tuple3: [string, number, number] = ['10', 10, '5'];  //Type 'string' is not assignable to type 'number'
```

JS:
``` javascript
var tuple1 = ['10', 10];
var tuple2 = ['10', 10];
var tuple3 = ['10', 10, '5'];  
```

从上面的例子来看，元组就相当于**一个长度，每一项元素类型都确定的数组**。

使用后缀类型注释时确定好的格式如果在赋值时不符，编译时会出现报错


<br><br>


## 枚举 enum

> **枚举类型同样是JavaScript中没有的**

枚举类型用于取值被限定在一定范围内的场景。
比如设定日期为周一到周日

TS:
``` javascript
// 使用枚举限定日期
enum day { Mon, Tue, Wed, Thu, Fri, Sat, Sun}
```

JS：
``` javascript
// 使用枚举限定日期
var day;
(function (day) {
    day[day["Mon"] = 0] = "Mon";
    day[day["Tue"] = 1] = "Tue";
    day[day["Wed"] = 2] = "Wed";
    day[day["Thu"] = 3] = "Thu";
    day[day["Fri"] = 4] = "Fri";
    day[day["Sat"] = 5] = "Sat";
    day[day["Sun"] = 6] = "Sun";
})(day || (day = {}));
```

使用node运行js文件来打印 `day`。 


![枚举设定的day.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/742795b11805458e962c52b0b46081f0~tplv-k3u1fbpfcp-watermark.image)

### 自动赋值

枚举成员会被**自动赋值**为从0开始递增的数字，同时也会对枚举值到枚举名进行反向映射
``` javascript
console.log(day[0]);   // Mon
console.log(day['Fri']);   // 4  反向映射
```

### 手动赋值

枚举成员也可以进行**手动赋值**
``` javascript
enum day { Mon = 1, Tue = 7, Wed, Thu, Fri, Sat, Sun}
```
这样一来，编译后的结果(成员后面没有手动赋值的，会从当前成员的值开始递增)：
``` javascript
var day;
(function (day) {
    day[day["Mon"] = 1] = "Mon";
    day[day["Tue"] = 7] = "Tue";
    day[day["Wed"] = 8] = "Wed";
    day[day["Thu"] = 9] = "Thu";
    day[day["Fri"] = 10] = "Fri";
    day[day["Sat"] = 11] = "Sat";
    day[day["Sun"] = 12] = "Sun";
})(day || (day = {}));
```

> <div color=#f00 size=2 >注意： 在手动赋值时，有可能会造成重复的情况</div>
``` javascript
enum day { Mon = 3, Tue = 2, Wed, Thu, Fri = 3, Sat, Sun}
```

上面的例子中，Mon的值会与Wed和Fri值重复，都为3。 Thu和Sat的值都为4.

所以最好不要出现这种覆盖的情况。

<div color=#408EE7 >另外，手动赋值的枚举项可以不是数字，但是这需要使用**类型断言**让tsc无视类型检查</div> 

``` javascript
enum day { Mon = <any>'MonDay', Tue = 2, Wed, Thu, Fri = <any>'FriDay', Sat = 5, Sun = <any>'SunDay'}
```

### 常数项和计算所得项

枚举项有两种类型： 
* 常数项（constant member）
* 计算所得项（computed member）
  
之前定义的枚举值都是常数项，如果是计算所得项：
``` javascript
enum key { key1 = 1 + 1, key2 = 'hello'.length }
```

`'hello'.length` 属于计算所得项， `1 + 1`属于常数项。

但是这里有一个缺陷，如果在计算所得项之后是 `未手动赋值的项`, 那么就会因为无法活得初始值而报错

比如：`enum key { key1 = 1 + 1, key2 = 'hello'.length, key3 }`。
会报错：`error TS1061: Enum member must have initializer.`

枚举项被当作常数项的条件：
* 不具有初始化函数并且之前的枚举成员是**数字常数**。 在这种情况下，当前枚举成员的值为上一个枚举成员的值加1。 第一个枚举成员除外，如果没有初始化方法，那么初始值为0
* 枚举成员使用常数枚举表达式初始化。常数枚举表达式是TypeScript表达式的子集， 可以**在编译阶段求值**。 当表达式满足下面条件之一时，就是一个常数枚举表达式：
  - 数字字面量
  - 引用之前定义的常数枚举成员（可以是在不同枚举类型中定义的），如果这个成员是在同一个枚举类型定义的，可以使用非限定名来引用
  - 带括号的常数枚举表达式
  - +，-，~等一元运算符应用在常数枚举表达式
  - +，-，*，/，%，<<，>>，>>>，&，|，^二元运算符，常数枚举表达式若求值后为NaN或Infinity,则会在编译阶段报错，上面的 `1 + 1`就是在编译阶段求值


### 数字枚举

之前自动赋值形成的枚举就属于`数字枚举`

**数字枚举是枚举项都是数字常量的枚举**

<br>

### 字符串枚举

字符串枚举中，每一个枚举成员都必须使用字符串字面量或者另一个字符串枚举成员进行初始化

``` javascript
enum str { one = 'first', two = `second`, three = 'third' }
```
### 常数枚举

常数枚举和上面讲到的常数项不是同一种东西

常数枚举是使用 <div color=#E545E6 size=2 >**const enum**</div> 定义的枚举类型

**常数枚举会在编译阶段被删除，并且不能包含计算项**

例子：
TS:
``` javascript
// 常数枚举
const enum cenum { a, b, c }
```

在tsc编译出的js中**没有找到cenum的声明**，并且如果使用计算项，会出现报错
`error TS2474: const enum member initializers can only contain literal values and other computed enum values`


### 外部枚举 Ambient Enums

外部枚举是使用`declare enum`定义的枚举类型

与常数枚举相同，外部枚举也在编译阶段被删除

因为之前提到过，`declare`定义的类型只会用于编译时的检查，在编译结果中会被删除

例子：TS
``` javascript
// 外部枚举
declare enum enumFruit { apple = 'red', orange = 'yellow' }
let fruit = [ enumFruit.apple, enumFruit.orange ]
```

编译后：JS
``` javascript
var fruit = [enumFruit.apple, enumFruit.orange];
```

外部枚举经常出现在声明文件中，并且可以和常数枚举同时使用 `declare const enum`


<br><br>

## 任意值 any

任意值any也是JavaScript中不存在的类型

在编程阶段，可能会遇到变量不知道会是什么类型的情况， 比如这些变量的值可能来自动态内容

这种情况下，就需要我们关闭类型检查器，不然会出现一堆类型报错。

`any`在TypeScript类型系统中又特殊地位， 它与类型系统中的任何类型都兼容。意味着可以将任何内容赋值给它，也可以将它赋值给任何类型。它能让你避开类型检查。

TS例子：
``` javascript
// 任意值
let num: any

num = 10;
num = '111'
num = false
console.log(typeof num);

let k: number
k = num
```

运行tsc后，编译不会有报错。 使用`typeof`可以判断变量类型

当需要从JavaScript迁移代码到TypeScript时，会经常使用`any`。 但是**必须减少对它的依赖**，因为这是类型安全的要求。




## Unknown
TypeScript 3.0引入了一个顶级的`unknown类型`。 对照于`any`，`unknown`是类型安全的， 或者说`unknown`是`any`的安全版本，在使用`any`前，可以先尝试使用`unknown`。

> 在 `any` 允许我们做任何事的地方，`unknown` 的限制则大得多

> 当我们在写应用的时候可能会需要描述一个我们还不知道其类型的变量。这些值可以来自动态内容，例如从用户获得，或者我们想在我们的 API 中接收所有可能类型的值。在这些情况下，我们想要让编译器以及未来的用户知道这个变量可以是任意类型。这个时候我们会对它使用 unknown 类型。

`unknown`限制：当没有类型断言或基于控制流的类型细化时unknown不可以赋值给其它类型

例子：
``` javascript
let a: unknown = '123';
let b: any = '456';

let a1: string = a;  // Type 'unknown' is not assignable to type 'string'
let b1: string = b;
```

如果给a附加了类型断言，就不会出现报错问题
``` javascript
let a1: string = a as string;
let a2: boolean = <boolean>a;
```
或者使用`typeof`进行类型防护
``` javascript
if (typeof a === 'string') {
    let a3: string = a;
}
```


## 空值 void
 
`空值void`类型与`any`相反，表示没有任何类型。

通常会用`void`表示一个函数没有返回值；
``` javascript
function login(): void {
    console.log(123);
}
```

## Never

`never`类型表示的是那些永不存在的值的类型

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 

<div color=#f00  >即使any也不可以赋值给`never`</div>

例子：
``` javascript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
try {
    JSON.parse('');
} catch (err) {
    error("出错了");
}
```

**不能将除never以外的类型赋值给never**

``` javascript
var ok: never, aaa: any = 4;

ok = '111';  // Type '"111"' is not assignable to type 'never'.
ok = aaa;   // Type 'any' is not assignable to type 'never'.
ok = undefined;  // Type 'undefined' is not assignable to type 'never'.
ok = null;  // Type 'null' is not assignable to type 'never'.
aaa = ok;
```


![never错误.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3000e4b6e3f7433d9d8e9bc2bbe9ac03~tplv-k3u1fbpfcp-watermark.image)



## 类型别名 type

类型别名用来给一个类型起个新名字。

``` javascript
type Gender = "nan" | "nu"
type str_num = string|number;

var log1:str_num = '123';
var log2:str_num = 123;
var log3:str_num = false;  // Type 'false' is not assignable to type 'string | number'.

type user = {
	name: string,
	age: number,
	gender: Gender
}
let u: user;
```




## 类型断言 

类型断言（`Type Assertion`）可以用来手动指定一个值的类型。

使用语法有两种：
1. as 类型
2. <类型> 


可以给联合类型只访问其中一个类型
``` javascript
type animal = Cat|Dog;
interface Cat {
    name: string;
    run(): void;
}
interface Dog {
    name: string;
    swim(): void;
}

let an1: animal;
// 令an1 为 Cat
(an1 as Cat).name = 'Tom'
```

需要注意的是，类型断言只能够 <div color=#f00 size=2 >「欺骗」</div> TypeScript 编译器，无法避免运行时的错误，反而**滥用类型断言可能会导致运行时错误**
