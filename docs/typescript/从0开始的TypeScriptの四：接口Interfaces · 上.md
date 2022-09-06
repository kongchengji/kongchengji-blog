---
title: 从0开始的TypeScriptの四：接口Interfaces · 上
date: 8/4/2021, 9:06:05 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---


# 接口 Interfaces

在 `typescript`中，有一项比较重要的核心知识，那就是`接口Interfaces`

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约

## 接口是什么

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对对象的形状（Shape）进行描述。在TS中，接口的作用是为这些类型命名和为你的代码或第三方代码定义契约。

并且接口只对`typescript`编译时有影响，对运行时影响为0

<br><br>

### 简单的接口

下面的例子中，定义了一个名为`Cat`的接口，定义了两个个变量 `tom` 和 `jerry`， 类型是`Cat`。

这样给`tom和Jerry`赋值时就约束了`tom` 和 `jerry`的形状必须和接口`Cat`一致，也就是定义的变量不能比接口多出属性或者少出属性。 

但是**可以运行改变赋值时属性的顺序**，因为类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以

> 接口一般首字母大写

``` javascript
interface Cat {
    name: string;
    age: number;
}
let tom: Cat = {
    name: 'Tom',
    age: 10,
}
let jerry: Cat = {
    age: 10,
    name: 'jerry',
}
```

在给一个方法的参数定义接口时，方法调用时有个地方需要注意：
``` javascript
interface Pear { 
    name: string; 
    size: number
};
function fun2( arg1: Pear ): void {
    console.log(arg1);
}
```

此方法调用传参时，如果直接传入对象，对象需要和接口一一对应，如果有多余属性会出现报错，当然有两种方法可以避免：

* 一种就是使用`类型断言`将传入对象断言为所需要的类型。  
* 一种是先把传参的对象赋值给一个变量再传入方法内，只要需要的属性存在，其他多余的属性也不会受影响而报错。

> PS:这个把传入对象赋值给变量后多余属性传入没有报错我也很奇怪，没找到原因，如果有好心人可以在评论区讲解一下，多谢多谢


``` javascript
fun2({ name: 'Pear', size: 10})
fun2({ name: 'Pear', size: 10, age: 5})  // error: Object literal may only specify known properties, and 'age' does not exist in type 'Pear'.
fun2({ name: 'Pear', size: 10, age: 5} as Pear)   // 使用类型断言
var argobj = { name: 'Pear', size: 10, age: 5};
fun2(argobj)
```

<br><br>
***

## 接口的属性

在接口中，也有许多可以调控的属性


### 可选属性 ?

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 
可选属性在应用`option bags选择包模式`时很常用，即**给函数传入的参数对象中只有部分属性赋值了**。

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号。

可选属性的好处
* 可以对可能存在的属性进行预定义
* 可以捕获引用了不存在的属性时的错误

例子：
``` javascript
interface Options {
    check1: boolean,
    check2?: boolean,  // check2和check3都是可选属性
    check3?: boolean
}
// 定义赋值时可不附值可选属性
let c1: Options = {
    check1: false
}
let c2: Options = {
    check1: true,
    check3: false  
}
```
***

可以通过只读属性配置一个ajax参数接口，这样options和dataType就是可传可不传：
``` javascript
interface Configajax {
    url: string,
    options?: (string|number|null|undefined|object)[],
    method: string,
    dataType?: any
}
```

ajax的方法：

> 下面的ajax方法是我使用es6和XMLHttpRequest自己封装的，可能会有一些地方不够到位。 在方法传参是，只需要传入一个和接口配置符合的参数对象即可。 关于下面的Ajax方法的编写，其实我觉得也可以水一篇文章。 获取数据到数据后，使用then方法来接收回调函数的值

``` javascript
// 利用promise封装一个ajax，可以使用then返回数据
// 如果使用promise等es6，在编译时可以指定运行环境 tsc --target es6 tsc03.ts
function getAjaxNew(config:  Configajax) {
    let promise = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        let readystatechange = ()=>{
            if(req.readyState === 4) {  //判断响应状态是否成功
                let responseHeaders = req.getAllResponseHeaders(); //获取响应头信息
                let data = req.responseText; //获取响应数据
                // 数据处理
                resolve(req.response);
            }
        }
        req.onreadystatechange = readystatechange;
        if (config.dataType)
            req.responseType = config.dataType;
        
        if (config.method == 'GET') {
            if (config.options)
                req.open(config.method, config.url + '?' + config.options.join('&'), true); // true代表异步
            else 
                req.open(config.method, config.url , true); // true代表异步
            req.setRequestHeader('X-Requested-with','XMLHttpRequest');//设置请求头信息
            req.send();//发送请求
        } else {
            req.open(config.method, config.url, true); // true代表异步
            req.setRequestHeader('Content-Type','application/json;charset=UTF-8');//设置请求头信息,请求头需要在open之后
            if (config.options) {
                let data = JSON.stringify(config.options);
                req.send(data);//发送请求
            } else{
                req.send();//发送请求
            }
        }
    })
    return promise;
}
```

传参调用方法：
``` javascript
let doptions = [{ user:'kong', newUrl:'www.baidu.com' },{ user:'z', newUrl:'www.zhihu.com' },{ user:'k', newUrl:'www.kantu.com' }];
ajax({
    url:"http://localhost:3001/typescript", 
    method:'GET', 
    options: doptions
}).then((response)=>{
    console.log(response)
});
```

<br>

***



### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值, 可以在属性名前用readonly来指定只读属性。 

**此属性与es6中的const常量块级作用域有些类似，不允许后续继续改变**

``` javascript
interface Changes {
    readonly id: number,
    type: number|string
}

let changenum: Changes = {
    id: 10,
    type: 765
}
changenum.id = 5;  // error: Cannot assign to 'id' because it is a read-only property.
changenum.type = '好'
```

> <div color=#f00 size=2 >注意：只读的约束存在于第一次给`对象`赋值的时候，而不是第一次给`只读属性`赋值</div> 
> 最简单判断该用`readonly`还是`const`的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用`const`，若做为属性则使用`readonly`


在下面的例子当中，此时`changenum.id = 5；`虽然是对id属性第一次赋值，但是changenum对象已经赋值过了，所以还是会报错
``` javascript
interface Changes {
    readonly id?: number,
    type: number|string
}
let changenum: Changes = {
    type: 765
}
changenum.id = 5; 
```

在`TypeScript`中有只读数组`readonlyArray`的定义，`readonlyArray`的用法与`Array`类似，但是赋值后是不可变的

``` javascript
let changearr: ReadonlyArray< number > = [1, 2, 3, 4, 5]
changearr[4] = 0;  // error: Index signature in type 'readonly number[]' only permits reading.
let arr5:number[] = []
arr5.push(changearr)  // error: Argument of type 'readonly number[]' is not assignable to parameter of type 'number'.
```

除了`readonlyArray`外，在`TypeScript`中还有只读Map相应的`ReadonlyMap`的存在

``` javascript
let oldMap = new Map();
oldMap.set("1", { name: '123' })
let changeMap: ReadonlyMap<string, object> = new Map(oldMap);  // 深拷贝
changeMap.set("2", { name: '2222' })  // error: Property 'set' does not exist on type 'ReadonlyMap<string, object>'.
```


<br>

***


### 任意属性

有时候我们希望一个接口允许有任意的属性

任意属性有两种定义方式：
* 属性签名是string字符串的， `[propName: string]: any;`
* 属性签名是number数值类型的， `[propIndex: number]: any;`

> 注意：在赋值时，这两种方式还是略有不同的


这里的属性名使用了number类型，但是也没有出错,这是因为数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。  相当于moreinter[0] 等价于 moreinter['0']
``` javascript
interface anyinter {
    [propName: string]: any;
}
let moreinter: anyinter = {
    1: false,
    "two": 123,
    "three": '888',
    0: 1
}
```

``` javascript
interface anyinter2 {
    [propIndex: number]: any;
}
let moreinter2: anyinter = [
     false,
     123,
    '888',
]
```

一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

如果同时使用两种定义方式：
``` javascript
interface anyinter3 {
    [propName: string]: boolean;
    [propIndex: number]: false;  // 必须是boolean的子集
    // [propIndex: number]: number;  // error: Numeric index type 'number' is not assignable to string index type 'boolean'
}

let moreinter3: anyinter3 = {
    '1': false,
    '2': true  //  error: Type 'true' is not assignable to type 'false' 不能将类型“true”分配给类型“false”
}
```

<br>

***

关于TS中接口的知识其实还不止这些，不过因为内容比较多，所以准备分开来写 （实际上就是自己学习进度还没到那里...）

终于又学完一些东西啦！！！


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dc012a7fb48473fb548ba15b60dc250~tplv-k3u1fbpfcp-watermark.image)

