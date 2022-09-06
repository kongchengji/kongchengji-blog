---
title: 从0开始的TypeScriptの十：泛型
date: 8/14/2021, 9:47:22 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---

# 泛型 Generics

泛型（`Generics`）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。**泛型可以创建可重用的组件，一个组件可以支持多种类型的数据**，用户可以以自己的数据类型来使用组件。

`TypeScript`中对泛型的说明：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能



泛型可以使用尖括号`<>`来进行定义，在下面的例子当中，`<T>`可以帮助捕获用户传入的类型，T可以赋值给之后传入参数value和返回值，来作为它们的类型。

<br>

***
<br>

## 泛型方法
例子： 在例子中，调用getdata方法时使用泛型`<T>`，如果指定泛型的类型是`number`，那么传入字符串就会出错，如果想要传入字符串，那么久指定泛型T为`string`类型即可
``` javascript
function getdata<T>(value:T):T {
    return value;
}
getdata<number>('1'); // 类型“string”的参数不能赋给类型“number”的参数
getdata<number>(1);
getdata<string>('1');
```

## 泛型类

泛型也可以用于类的定义中，泛型类使用（`<>`）括起泛型类型，跟在类名后面。

定义一个泛型类：
```javascript
class MyClass<T> {
    list:T[] = [];
    add(value:T):T{
        this.list.push(value);
        let max:T = this.list[0];
        this.list.map((item)=> {
            if (max <= item) {
                max = item;
            }
        })
        return max;
    }
}
```
对类进行实例化，并且通过泛型来指定类T代表的类型是number。 每次add()方法添加数据后，返回当前的最大值。并且添加的数据类型只能是number数值
```javascript
let myc1 = new MyClass<number>();
myc1.add(10);
myc1.add(7);
myc1.add(18);
console.log(myc1.add(9)); // 18
```

可以把类作为参数类型的泛型类，定义一个App类作为传入的参数类型，定义一个`Test`并且使用泛型进行约束。
```javascript
class App {
    name: string | undefined;
}

class Test<T> {
    say(value: T):void {
        console.log(value);
    }
}
```
定义`Test`类的实例时，将`App`类作为泛型约束传入。这样一来，如果方法传参的类型不是`App`类的规范就会出错。
```javascript
let app = new App();
app.name = '123';

let test = new Test<App>();
test.say(app);
```

<br>

***
<br>

## 泛型接口

定义一个接口，使用`<T>`规定其中name的类型属性
```javascript
interface Inter<T> {
    index:number;
    name:T;
}

let newinter: Inter<string> = { index: 7, name: '张三' } 
```

当然如果泛型接口是给函数用的，可以在内部定义定义：
```javascript
interface Inter<T, K> {
    (index:T, name:K):void;
}

let newinter = function<T, K>(index:T, name:K):void {
    console.log(name);
}
let myinter:Inter<number, string> = newinter;
myinter(10, '李四')
```

或者可以直接在接口内部定义：
```javascript
interface Inter {
    <T, K>(index:T, name:K):void;
}
let myinter:Inter = newinter;
myinter(10, '李四')
```
 

## 泛型约束

在泛型的使用过程中，由于使用泛型变量时事先不知道是那种类型的，所以不能随意操作其属性和方法。

比如上面的`Test`泛型类，在`say`方法中打印传入参数`value`就不能使用`.length`属性，否则会出现报错： `类型“T”上不存在属性“length”`

这样是因为如果传入的值是number或者Boolean类型的，是没有`length`属性的
```javascript
say(value: T):void {
    console.log(value.length);
}
```

此时，我们可以使用泛型约束（对T列出约束要求）。

泛型约束使用的关键字`extends`，和类与接口中的继承相似

编写一个接口 `GenericsRules`，在内部设置`length`属性，类型为`number`。

现在`Test`的泛型T中就要求必须有`length`属性的变量，否则将会出现报错。定义`Test`的实例时就不能使用`new Test<number>()`这样的方式了。
```javascript
interface GenericsRules {
    length: number;
}
class Test<T extends GenericsRules> {
    say(value: T):void {
        console.log(value.length);
    }
}
```

***
<br>

写在最后，其实不论是之前`TypeScript`的接口类知识，还是现在的泛型知识。这些都是我刚刚学到的，如果要想精通掌握，肯定需要自己不断的去实践使用，而不是这样学习就好，我自己写的博客翻阅最多的也只是我自己。