---
title: 从0开始的TypeScriptの十三： infer、extends、keyof、typeof、in
date: 7/15/2022, 4:55:34 PM
tags: 
    - TypeScript 
categories: 
    - TypeScript学习
---

# 序

在B站看视频学习**vue3.0**时，有一节主要是使用typescript来配置一些vuex的内容

我看完一遍后，还是有挺多困难点的，首先要去了解一下`typescript`中的`infer`、`keyof`等这些高级用法， 所以本文主要是学习typescript的记录了。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce3b73aa946d402081e18bb81b003028~tplv-k3u1fbpfcp-watermark.image?)

## infer

`infer`是`typescript`中的关键字，可以在`extends`条件语句中推断待推断的类型，就是**从类型中获得类型**

（这里的extends不是类、接口的继承，而是对于类型的判断和约束，意思是判断T能否兼容）


#### extends的示例

```javascript
type ParamType<T, K> = T extends K ? T : never;

interface Animal {
    animal: string
}
interface Cat {
    cat: string
}
// ParamType的T需要兼容K，否则会出错
let c1: ParamType<Animal | Cat, Cat> = { cat: '猫' }
```

***

## infer使用

使用方式：
1. infer只能在extends关键字的右侧 
2. infer x可以理解成一个未知数x，表示待推断的函数参数


示例1： 获取传入的参数类型中的`action`，如果传入的T中没有action，则会返回never
```javascript
type ParamType<T> = T extends { action: infer X } ? X : never;

interface Animal {
    animal: string,
    action: void
}
interface Cat {
    cat: string,
    action: ()=>void
}
// c1的类型void | ()=>void
let c1: ParamType<Animal | Cat> = ()=>{
    console.log('打滚');
}
c1() // 打滚
```

***

示例2： 解包，获取在数组中的元素类型
```javascript
type ParamType<T> = T extends (infer X)[] ? X : never;
// c1类型为number | string
let c1: ParamType<number[] | string[]> = 10
```

***

示例3： 元组tuple转联合union

其实实现的方式和上面是一样的
```javascript
type ParamType<T> = T extends (infer X)[] ? X : never;
// c1类型为number | string
let c1: ParamType<[string, number]> = 10
```

***

示例4： **联合union转元组tuple**

这里将 `number | string` 转换成 `number & string`的过程就比较复杂了

在这里我也在网上参考了很多文章，才逐步理解的

参考文章：
* https://blog.csdn.net/qq_33221861/article/details/112369522
* https://juejin.cn/post/6844903796997357582
* https://blog.csdn.net/weixin_44051815/article/details/124708072
* https://blog.csdn.net/qq_39920234/article/details/121500009
* https://www.e-learn.cn/topic/3752913
* https://zhuanlan.zhihu.com/p/526988538
* https://www.bookstack.cn/read/TypeScriptDeepDiveZH/59.md

如果是想的没那么多，那么可能会像下面这样写：
```javascript
type Change<T> = T extends infer X | infer Y ? [ X, Y ] : never
type Res = Change<number | string>  // [string, string] | [number, number]
```

这是因为联合类型会分别进行比较。


首先对于`extends`左边如果是联合类型union, 那么转换的过程到底应该是怎么样的：

### typescript 协变和逆变

这里首先要了解一下`typescript`的协变和逆变这两个概念

协变（Covariance）： 子类型可以赋值给父类型
逆变（Contravariance）：父类型可以赋值给子类型

例子：
```javascript
interface parent {
    a: number,
}
interface child extends parent {
    b: number
}
let p1: parent = {
    a: 1,
}
let p2: child = {
    a: 32,
    b: 7,
}
// 协变，可以将子类型赋给父类型，但不能将父类型赋给子类型
p1 = p2;  
// p2 = p1; 报错
// 逆变，将这个特性放到函数类型当中
type fun1 = (a: parent)=> void
type fun2 = (a: child) => void
type test = fun2 extends fun1 ? true : false

let f1: fun1 = (a: parent)=> {}
let f2: fun2 = (a: child)=>{}

// f1 = f2 报错
f2 = f1
```

逆变是需要在函数中使用的，除了函数参数类型是逆变，其他都是协变。而在上面联合类型转元组类型中，有一点非常重要，那就是**在逆变位置的同一类型变量中的多个候选会被推断成交叉类型**。

```javascript
// UnionToTuple = (() => number) & (() => string)
type UnionToTuple = ((x: ()=>number) => any) | ((x: ()=>string) => any) extends (x: infer P)  => any ? P : never
// Res = [number, string]
type Res = UnionToTuple extends { (): infer X; (): infer Y } ? [X, Y] : never
```

通过逆变可以得到以上的方式，这样最后的`[number, string]`结果就已经得到了，那现在重要的就是得到`((x: ()=>number) => any) | ((x: ()=>string) => any)`

这一点就比较容易了，以下方式就可以将`number | string`变成 `((x: { a: string; }) => any) | ((x: { a: number; }) => any)`

```javascript
// number | string
// (x: ()=> number)=> any | (x: ()=> string)=> any
type Union<T> = T extends any  ? (x: ()=> T)=> any : never
```

那么最终的转换方式：
```javascript
type UnionToTuple<T> = ((T extends any  ? (x: ()=> T)=> any : never) extends (x: infer P)  => any ? P : never) extends { (): infer X; (): infer Y } ? [X, Y] : never
type Res = UnionToTuple<number | string>  // [string, number]
```

emmmm..... 这里的转换过程还是特别复杂的，理解起来也比较麻烦，这里最重要的还是**在逆变位置的同一类型变量中的多个候选会被推断成交叉类型**，这个概念如果不知道，真的很难推导出来

***

<br/>

## keyof索引类型查询操作符

在上面大致了解了**infer**后，继续了解泛型高级类型中的`keyof`，这个其实有点类似于`es6`中的`keys()`方法，用于获取键值的遍历器

`keyof`可以获取某种类型的所有键，返回联合类型union

基本使用：
```javascript
interface User {
    name: string
    age: number
    action: ()=> void
}

type usertype = keyof User;  // name | age | action
let t1: usertype = "action" 
```

并且，对于class类来说，keyof只能返回类型上已知的**公共属性名**，在下面的例子当中，`keyof`产生的也只是`name | age | action`的联合类型
```javascript
class User {
    name: string;
    age: number;
    action: ()=> void;
    private hobby: ()=> string;
    protected eye: string
}
type usertype = keyof User;  // name | age | action
// let t1: usertype = "hobby" // 出错
// let t1: usertype = "eye" // 出错
```

如果一个类型有一个`symbol`或者`number`类型的索引签名，`keyof`会直接返回这些类型。

这里的索引签名如果是`string`类型，那么将会返回`string | number`，这是在`Typescript 2.9`中新增的内容，可以参考：https://www.bookstack.cn/read/TypeScript-4.4-zh/zh-release-notes-typescript-2.9.md

```javascript
type K1 = keyof { [x: symbol]: User }; // symbol
type K2 = keyof { [x: number]: User }; // nuumber
type K3 = keyof { [x: string]: User }; // string | number
```

通常`keyof`在使用时往往会和`in`或者`typeof`搭配使用

***

<br/>

## typeof

**typeof**是用来判断数据类型,返回成员的类型 可以对`对象`、`类`、`枚举`、`函数`进行类型返回

* 示例: 对象
```javascript
// typeof 对象
let A = {
    a: 'aaa',
    b: 1111
}
/*
type _A = {
    a: string;
    b: number;
}
*/
type _A = typeof A
```

* 示例： 类
```javascript
// typeof 类
class C {
    a: number;
    b: string
}

type _C = typeof C 
let c: _C = C  // emmm.... 感觉好像没什么意义
```
然后我上网搜索了一下，发现如果是下面这种情况，是需要使用`typeof`重新获取类的
```javascript
class Ponit {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
};
// 工厂函数
function getInstance(PointClass: typeof Ponit, x: number, y: number) {
    return new PointClass(x, y);
}
// 下面写法将报错
function getInstance2(PointClass: Ponit, x: number, y: number) {
    return new PointClass(x, y);// 报错 此表达式不可构造。类型 "Ponit" 没有构造签名。
}
```

* 示例： 枚举
```javascript
// typeof 枚举
// 使用枚举限定日期
enum day { Mon, Tue, Wed, Thu, Fri, Sat, Sun}
type _day = typeof day;
let days: _day = {
    Mon: 4,
    Tue: 12,
    Wed: 1, 
    Thu: 1, 
    Fri: 1, 
    Sat: 1, 
    Sun: 1
}
console.log(days); // { Mon: 4, Tue: 12, Wed: 1, Thu: 1, Fri: 1, Sat: 1, Sun: 1 }
```

* 示例：函数
```javascript
function compare(x: number, y: number):boolean {
    return x > y;
}
type _compare = typeof compare;  // (x: number, y: number) => boolean
```


***

<br/>

## in类型映射

对于类型，同样也可以进行遍历枚举，使用的方式就是`in`关键字

使用方式： `[ K in Keys ]` ， 这里的Keys必须是`string`,`number`,`symbol`或者联合类型

示例：将`type A = { name: number; age: number; }` 内部类型全部从`number`转变为`string`

运营之前学到的`keyof`,将类型`A`转变为`name | age`， 然后再使用`in`遍历此联合类型，分别对属性名分配类型
```javascript
type A = {
    name: number;
    age: number;
}
// type User = { name: string; age: string; }
type User = {
    [K in keyof A]: string
}
```

## 内置工具类型

接下来为了使用更加方便，可以对`typescript`中内置的工具类型进行一些学习。



| 工具类型名称 |	描述 | 用法 |
|--|--|--|
| Readonly\<T>  |	将 T 中所有属性都变为只读  | `Readonly<{ a: number }>` <===> `{ readonly a: number }` |
| ReadonlyArray\<T> |	返回一个 T 类型的只读数组 | `ReadonlyArray<string>` <===> `readonly string[]` |
| Partial\<T> |	将 T 中所有的属性都变成可选类型 | `Partial<{ a: number }>` <===> `{ a?: number }` |
| Required\<T> |	将 T 中所有的属性都变成必选类型 | 和上面的`Partial`正好相反 |
| Pick<T, K extends keyof T> |	从 T 中摘取部分属性 | `Pick<{ a: number, b: string, c: boolean }, 'a' \| 'c'>` <===> `{ a: number, c: boolean }` |
| Omit<T, K extends keyof T> |	从 T 中排除部分属性 | `Omit<{ a: number, b: string, c: boolean }, 'a' \| 'c'>` <===> `{ b: string }` |
| Exclude<T, U> |	从 T 中剔除可以赋值给 U 的类型 | `Exclude<number \| string \| boolean, string>` <===> `number \| boolean` |
| Extract<T, U> |	提取 T 中可以赋值给 U 的类型 | `Exclude<number \| string \| boolean, string>` <===> `string` |
| Record<K, T> |	返回属性名为 K，属性值为 T 的类型 | `Record<'a' \| 'b', () => void>` <===> `{ a: ()=>void, b: ()=>void }` |
| NonNullable\<T> |	从 T 中剔除 null 和 undefined | `NonNullable<string \| null \| undefined>` <===> `string` |
| ConstructorParameters\<T> |	获取 T 的**构造函数**参数类型组成的元组 | Compare是类，构造函数`constructor(a: number, b:number){ ... }`。  `ConstructorParameters<typeof Compare>` <===> `[ a: number, b: number]`   |
| InstanceType\<T> |	由构造函数类型T的实例类型来构建一个新类型 | `InstanceType<typeof Compare>` <===> `Compare` |
| Parameters\<T> |	获取函数参数类型组成的元组 | `Parameters<(a: number, b: string) => number>` <===> `[ a: number, b: number]` |
| ReturnType\<T> |	获取函数返回值类型 | `ReturnType<(a: number, b: string) => number>` <===> `number` |

<br>

<br>

上面这些内置的工具类型能够很大程度上简化代码。

### 实例

1. 比如说给定一个`interface`接口，需要将内部所有属性都变成可选类型

虽然我们自己也可以写，但是如果直接使用现有的内置工具类型`Partial`不是更好么

```typescript
interface A {
    name: string,
    age: number,
    action: ()=>void
}
type PartialFun<T> = {
    [K in keyof T] ? : T[K]
}
type _A = PartialFun<A>
```

或者说我在网上看到的一道转换题目：

* 如何定义一个`SetOptional`工具类型，支持把给定的`keys`对应的属性变成可选的？

```typescript
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;
```

这样在修改时思考方式，需要对`Foo`与`a | b`匹配的属性拆除来变成可选，然后不匹配的属性维持不变，最后将可选和不可选通过`&` 进行联合

```typescript
// 对应的属性变成可选
type CommonFun<T, K> = {
    [ t in keyof T as t extends K ? t: never] ?: T[t]
}
// 不对应的属性
type Unequal<T, K> = {
    [ t in keyof T as t extends K ? never: t] : T[t]
}
type SetOptional<T, K> = CommonFun<T, K> & Unequal<T, K> 
```

不过这样虽然思路很清晰，但是看起来写了好多。事实上，可以使用`Partial`和`Pick`来代替`CommonFun`, 然后用`Omit`代替`Unequal`

只需要像下面的一句就可以解决，是不是缩减了很多代码

```typescript
type SetOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K> 
```

***

当然这些都是要基于对`typescript`内置类型比较熟悉的情况下，最好的方式就是多多去使用。就像当初最开始学习`javascript`时，对于`Math.floor`、`splice`这些方法也是多使用才能够熟悉起来。

当然上面的这些例子可能会觉得实用性不大，那么将数组类型扁平化总应该算有点实用性吧

2. 将`[ number, [string], [ boolean, [ void, string ] ] ]` 转换成 `number | string | boolean | void` 扁平化联合

这种例子很容易就会想到`递归函数`

解决方案：首先使用`infer X[]`将当前数组中的元素进行判断，如果不是数组则直接返回，否则元素重新进入`SetOptional`判断循环。

```typescript
type ArrType = [ number, [string], [ boolean, [ void, string ] ] ]

type SetOptional<T> = T extends (infer X)[] ? SetOptional<X> : T
// string | number | boolean | void
type Res = SetOptional<ArrType>
```

***







