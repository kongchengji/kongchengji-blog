---
title: 高性能JavaScriptの笔记（一）
date: 2021/05/19
tags:
 - 高性能JavaScript
 - 前端
 - 性能优化
categories:
 - 高性能JavaScript
---

### 学习来源
[《高性能JavaScript-中文版》（仅供学习使用）](https://gitee.com/wzckongchengji/high_performance_javascript)

# 数据存取

## 数据位置
计算机科学中有一个经典问题是通过**改变数据的存储位置来获得最佳的读写性能**，数据存储的位置关系到代码执行过程中数据的检索速度。在JavaScript 中，这个问题相对简单，因为只有几种存储方案可供选择。不过，和其他编程语言一样，*数据的存储位置会很大程度上影响其读取速度*。JavaScript中有下面四种基本的数据存取位置。

1. 字面量
	字面量只代表自身，不存储在特定位置。JavaScript中的字面量有:字符串、数字、布尔值、对象、数组、函数、正则表达式，以及特殊的null和undefined值。
2. 本地变量
	开发人员使用关键字var定义的数据存储单元。
3. 数组元素
	存储在JavaScript数组对象内部,以数字作为索引。
4. 对象成员
	存储在JavaScript对象内部，以字符串作为索引。
	
在不同浏览器中，访问不同存储位置的数据需要消耗的时间也是不同的。由下图```每200000次读取变量存储位置所消耗的时间```可以知道，**读取字面量和本地变量消耗的时间最少，性能最高**。

![每200000次读取变量存储位置所消耗的时间](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8a774378364406aa1a4f817e90892ad~tplv-k3u1fbpfcp-zoom-1.image)

## 标识符解析
标识符解析是有代价的，事实上没有哪种计算机操作可以不产生性能开销。在执行环境的作用域链中，一个标识符所在的位置越深，它的读写速度也就越慢。因此，函数中**读写局部变量总是最快的，而读写全局变量通常是最慢的**（优化JavaScript 引擎在某些情况下能有所改善)。

全局变量总是存在于执行环境作用域链的最末端，因此它也是最远的。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4740261c5ad645e18550b463f2150540~tplv-k3u1fbpfcp-watermark.image)

<br>

JavaScript 中对象是基于原型的，原型是其他对象的基础

* 访问字面量和局部变量的速度最快,相反,访问数组元素和对象成员相对较慢。由于局部变量存在于作用域链的起始位置,因此访问局部变量比访问跨作用域变量更快。变量在作用域链中的位置越深，访问所需时间就越长。由于全局变量总处在作用域链的最末端，因此访问速度也是最慢的。
 * 避免使用with语句,因为它会改变执行环境作用域链。同样，try-catch语句中的catch子句也有同样的影响,因此也要小心使用。
* 嵌套的对象成员会明显影响性能，尽量少用。
* 属性或方法在原型链中的位置越深,访问它的速度也越慢。
* 通常来说，你可以通过把常用的对象成员、数组元素、跨域变量保存在局部变量中来改善JavaScript性能,因为局部变量访问速度更快。

## 集合对象
访问集合的效率比访问数组更低
可以考虑将集合变为数组

```javascript
function toArray() {
	var len = coll.length, a = [];
	for (var i = 0; i < len; i++) {
		a[i] = coll[i]
	}
}
```

# 原型

* JavaScript对象是基于原型的

* 原型是其他对象的基础

**对象可以有两种成员类型：**
    
    1. 实例成员（也称为own成员） 
    2.原型成员
    
 例子：
 ```
 var book = {
    title: 'hello',
    na: 'world'
 }
 ```
 
 

 book 是一个对象，在book当中存在**book.title**和**book.toString()**
 
* book.title属于实例对象
* book.toString() 属于继承的原型对象

对象成员解析时会先从实例对象中找，如果没有找到会从继承的原型对象寻找

hasOwnProperty()方法可以判断对象是否包含特定的实例对象
```
book.hasOwnProperty('title')   // true
book.hasOwnProperty('toString')   //false
```

如果要确定对象是否包含特定的属性，可以使用in操作符，in操作符既可以搜索实例也可以搜索原型：
```
console.log('title' in book)  // true
console.log('toString' in book)  // true
```

* * *


## 原型链

默认情况下，所有的对象都是Object的实例

`instanceof`: instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

例子：
```
function books(title, na){
    this.title = title;
    this.na = na;
}
books.prototype.say = function() {
    console.info(this.title, this.na)
}
var b1 = new books('111111', '22');
console.log(b1 instanceof books)  // true
console.log(b1.__proto__)
console.log(books.prototype)
```
**b1的__proto__与books的prototype是相同的**

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d96bbc3f46d842d6a6bbf6a574253f08~tplv-k3u1fbpfcp-zoom-1.image)



## 嵌套成员

由于对象成员可能包含其他成员，每次遇到点操作符，也就是book.title这类，嵌套成员会导致JavaScript引擎搜索所有对象成员


**对象成员嵌套得越深，读取速度就越慢**

执行`location.href `总比 `window.location.href`要快
`window.location.href`也比`window.location.href.toString()`要快


## 缓存对象成员值

由于所有类似的性能问题都与对象成员有关，因此应该尽可能避免使用它们。

<u>**在同一个函数中没有必要多此读取同一个对象成员**</u>

**可以将值保存在局部变量当中减少查找次数**

例子：
```
function hasEitherClass(element, className1, className2) {
      for(var i = 0; i < 1000; i++) {
           var k = element.className;
      }
      return element.className == className1 || element.className == className2;
} 
```
```
function hasEitherClass2(element, className1, className2) {
        var currentClassName = element.className;
        for(var i = 0; i < 1000; i++) {
            var k = currentClassName;
        }                                
        return currentClassName == className1 || currentClassName == className2;
}
```
使用console.time测试后，hasEitherClass2的运行速度比hasEitherClass更快

<br>

# 小节

***平时写代码时可以优化的点①：***

document是个全局对象。搜索该变量的过程必须遍历整个作用域链，直到最后在全局变量对象中找到。

可以通过以下方法减少对性能的影响：
* 先将全局变量的引用存储在一个局部变量中
* 然后使用这个局部变量代替全局变量。这样访问全局变量的次数就减少了，因为局部变量访问更快。
* 例子：`var doc = document;  var bd = doc.body;  var a = doc.getElementById("a");`

***平时写代码时可以优化的点②：***

可以使用`location.href`来代替`window.location.href`