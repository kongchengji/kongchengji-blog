---
title: 高性能JavaScriptの笔记（三）
date: 2021/05/22
tags:
 - 高性能JavaScript
 - 前端
 - 性能优化
categories:
 - 高性能JavaScript
---

# 算法和流程控制

* 代码的整体结构是影响运行速度的主要因素之一。
* 代码数量少并不意味着运行速度快，只是看起来更加简洁。
* 代码的组织结构和解决具体问题的思路是影响代码性能的主要因素


## <div color=#FFC640>循环</div>
循环处理是常见的编程模式，也是提升性能必须要关注的重点之一

### <div color=#FF7021>循环的类型</div>

四种循环类型

* for循环
* while循环
    while循环是最简单的前测循环
* do-while循环
    do-while循环是JavaScript唯一一种后测循环，由两部分组成，循环体和后测条件。至少会运行一次
    
```javascript
var i = 0;
do {
    // 循环主体
} while ( i++ < 10 )
```
* for-in循环
    可以枚举任何对象的属性名
 
```javascript
for (var prop in object) {
    // 循环主体
}
```

<br>

## <div color=#FFC640>循环性能</div>

在四种循环中，**for-in循环明显比其他几种循环要慢**
原因：for-in循环每次迭代操作都会同时搜索实例或原型属性，**对于相同迭代次数的循环，for-in循环最终只有其他类型速度的1/7**
<br>

### <div color=#FF7021>减少迭代工作量</div>
减少迭代的工作量，一个提升循环整体速度的好方法就是限制循环中的耗时操作数量

例子：

```javascript
for (var i = 0; i < items.length; i++) {
     process(items[i])
}
```

在上面的for循环中，每次运行循环体都会产生如下操作：
1. 在控制条件中查找一次属性 （ items.length )
2. 在控制条件中比较一次数值 （ i < items.length )
3. 一次比较操作，查看控制条件的计算结果是否为true ( i < items.length == true )
4. 一次自增操作 （ i++ )
5. 一次数组查找 ( items[i] )
6. 一次函数调用 （ process(items[i]) ）
<hr>

**优化方案①**：将查询items.length的次数减少

例子：
```javascript
for (var i = 0, len = items.length; i < len; i++) {
    process(items[i])
}
```


**优化方案②**：倒序查找。  一般来说，数组项的顺序与所要执行的任务无关，因此可以使用倒序循环提审性能
每个控制条件只是简单的与0进行比较
这下控制条件从两次比较（迭代数小于总数？ 是否为true？）--> 一次比较（是否为true吗？）

例子：
```javascript
for(var i = items.length; i--;) {
    process(items[i])
}
```

操作过程：
1. 一次控制条件中比较 （i == true）
2. 一次减法操作 （ i-- )
3. 一次数组查找 ( items[i] )
4. 一次函数调用 （ process(items[i]) ）
<hr>

### <div color=#FF7021>提示</div>
当循环复杂度为O(n)时，**减少每次迭代的工作量**是最有效的方法。当复杂度大于O(n)时，着重**减少迭代次数**

<br>

### <div color=#FF7021>减少迭代次数 -- 达夫设备</div>

达夫设备（Duff's Device）是一种限制循环迭代次数的模式
**是否应该使用达夫设备，很大程度上依赖于迭代次数**

模板代码：
```javascript
var i = items.length % n;           //先循环余数次数
while(i){
    process(items[i--]);
}
i = Math.floor(items.length / n);   //再循环8的整数倍次数  循环体是普通循环的8倍 可以写成函数传参调用
while(i){
    process(items[i--]);
    process(items[i--]);
    process(items[i--]);
    process(items[i--]);
    process(items[i--]);
    process(items[i--]);
    process(items[i--]);
    process(items[i--]);
}
```

效率测试代码：
```javascript
var arr = [], times = 10000000, times2 = 10000000;
for (var i = 1; i <= times; i++) {
   arr[i] = i ;
}
console.time('pre')
var sum = 0;
for (var i = 1; i <= times; i++) {
   sum += (1 / arr[i]);
}
console.log(sum)
console.timeEnd('pre')
console.log('************************')
// 达夫设备
console.time('last')
var all = 0;
var len = times / 8, startAt = times % 8;
do {
    switch(startAt) {
        case 0: all += (1 / arr[times--]);
        case 1: all += (1 / arr[times--]);
        case 2: all += (1 / arr[times--]);
        case 3: all += (1 / arr[times--]);
        case 4: all += (1 / arr[times--]);
        case 5: all += (1 / arr[times--]);
        case 6: all += (1 / arr[times--]);
        case 7: all += (1 / arr[times--]);
    }
} while (--len)
console.log(all)
console.timeEnd('last')
// 普通while循环
console.time('last2')
var sumall = 0;
while(times2) {
    sumall += (1 / arr[times2--]);
} 
console.log(sumall)
console.timeEnd('last2')
```
<br>

### <div color=#FF7021>提示</div>
现代浏览器引擎其实已经经过几次优化了，在上面的效率测试代码运行时，如果times的次数在1000次左右的话，for循环和while循环还有达夫设备运行速度相差不大
<hr>

#### 下面是执行次数多的情况：

##### chrome
如果在chrome浏览器中，while循环和达夫设备明显速度快于for循环，但是while循环和达夫设备时间相差不大，甚至达夫设备可能会小于while循环

<div color=#9254DE>**while > 达夫设备 > for循环**</div>

测试1：
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-qiqeHalc-1621406484048)(en-resource://database/586:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1af44100dc94b1eb5c63db15367179e~tplv-k3u1fbpfcp-zoom-1.image)

测试2：
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-LTdqdXTE-1621406484061)(en-resource://database/584:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9df9ae788cfb4f719687630d11926fbf~tplv-k3u1fbpfcp-zoom-1.image)

测试3：
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-uIyqFA7q-1621406484064)(en-resource://database/585:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9306d5c66e744b429ff61a3209e7c495~tplv-k3u1fbpfcp-zoom-1.image)


##### IE
在IE浏览器中，达夫设备的效率会更高一些，for循环效率低于while循环

<div color=#9254DE> **达夫设备 > while > for循环**</div>

测试1：
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-xetQ6Shl-1621406484068)(en-resource://database/572:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d422f75643e4ee783bf53b278f80f45~tplv-k3u1fbpfcp-zoom-1.image)

测试2：
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-hBIyDsdV-1621406484071)(en-resource://database/574:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9b794ea762b4505a15be3ac839a3b28~tplv-k3u1fbpfcp-zoom-1.image)

测试3：
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-UmWCF1pz-1621406484072)(en-resource://database/576:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6b270b72a8e4f2a93680f4580389f0a~tplv-k3u1fbpfcp-zoom-1.image)


##### FireFox
在火狐浏览器中也和IE类似

<div color=#9254DE>**达夫设备 > while > for循环**</div>

测试1：

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-uTUUajNe-1621406484073)(en-resource://database/578:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfe65bfeef73458a969a1faf8fdf6839~tplv-k3u1fbpfcp-zoom-1.image)

测试2：

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-YWTt5fjc-1621406484074)(en-resource://database/580:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59a488b8255a4b7bbe425d5a492fa038~tplv-k3u1fbpfcp-zoom-1.image)

测试3

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-qyimI3f1-1621406484076)(en-resource://database/582:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5ff3a6d3466497f89807b0458a975c8~tplv-k3u1fbpfcp-zoom-1.image)



### <div color=#FF7021>基于函数的迭代</div>

基于函数的迭代：forEach()

forEach遍历一个数组的所有成员，并执行一个函数

但是**所有情况下，<div color=#9254DE>基于循环的迭代比基于函数的迭代快8倍</div>，在运行速度要求严格时，基于循环的迭代优先于基于函数的迭代**
在严格要求性能时，基于函数的迭代不是合适的选择


## <div color=#FFC640>条件语句</div>

在JavaScript中，条件语句主要是if-else 和 switch两种

当条件判断的数量越大时，越倾向于使用switch语句， 这主要是为了代码的易读性

**在大多数情况下，switch比if-else更快。但是只有条件数量很大时才很明显**

**if-else语句可以考虑拆分成嵌套的if-else语句，最小化条件判断的次数，比如二分法**


## <div color=#FFC640>递归</div>

递归是可以将复杂的算法变得更加简单，比如阶乘函数：
```javascript
function factorial(n) {
    if (n == 0) {
        return 1
    } else {
        return n * factorial(n - 1)
    }
}
```

### <div color=#FF7021>递归的缺点</div>
<div color=#f00>①：递归函数潜在问题是终止条件不明确或缺少终止条件会导致函数长时间运行，也就是可能产生无限递归调用，使用户界面假死。</div>

<div color=#f00>②： 递归函数还可能遇到浏览器的“调用栈大小限制”</div>

#### 调用栈限制
JavaScript引擎支持的递归数量与JavaScript调用栈大小直接相关。

IE浏览器的调用栈和系统内存有关，其他所有浏览器都有固定数量的调用栈大小

如果遇到调用栈限制，第一步应该先检查代码中的递归实例

#### 递归模式

有两种递归模式值得注意，一种是“直接递归模式”，就是上面写的阶乘调用，出错时容易检查出来。
另一种是“隐伏模式”,两个函数互相调用，形成一个无限循环，这种模式出错很难被定位
例子：
```javascript
function first() { second() }
function second() { first() }

first();
```

### <div color=#FF7021>迭代</div>
任何递归能实现的算法同样可以用迭代来实现。

迭代算法通常包含几个不同的循环，优化后的循环替代长时间运行的函数可以提升性能。

**运行一个循环比反复调用一个函数的开销要少的多**

把递归算法改用迭代实现是避免栈溢出错误的方法之一


### <div color=#FF7021>Memoization</div>

**减少工作量就是最好的性能优化技术**

多次执行相同的任务纯粹是浪费时间，Memoization正是一种避免重复工作的方法。

比如之前的普通阶乘递归，用Memoization完善后效率大大提升了
修改后：
```javascript
function memfactorial(n) {
    // 设置最初的memfactorial.cache
    if (!memfactorial.cache) {
        memfactorial.cache = {
            "0": 1,
            "1": 1
        }
    }
    // 判断memfactorial.cache[n]是否存在  也可以直接!memfactorial.cache[n]
    if (!memfactorial.cache.hasOwnProperty(n)) {
        memfactorial.cache[n] = n * memfactorial(n - 1);
    }
    return memfactorial.cache[n];
}
```
测试效率：
```javascript
console.time('普通递归')
var six = factorial(16)
console.timeEnd('普通递归')
console.time('Memoization')
var one = factorial(16)
console.timeEnd('Memoization')
```
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-mlgwqpNS-1621406484077)(en-resource://database/588:0)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fa99a7e7a2c4e558e1f9c6adf62f0d9~tplv-k3u1fbpfcp-zoom-1.image)



也可以将Memoization封装成一个基础函数memoize()
**注意：这种通用Memoization方法比手工更新的算法相比效果要差，最好手工实现**
```javascript
function memoize(fundamental, cache) {
    cache = cache || {};
    var shell = function(arg) {
        if(!cache.hasOwnProperty(arg)) {
            cache[arg] = fundamental(arg);
        }
        return cache[arg]
    }
    return shell;
}
```
调用通用函数：
```javascript
var memfactorial = memoize(factorial)
memfactorial(16)
```

## <div color=#FFC640>小节</div>

**平时写代码时可以优化的点①：**
避免使用for-in循环

**平时写代码时可以优化的点②：**
将查询items.length的次数减少，并且没有严格顺序时，可以使用倒序查找，减少操作次数

**平时写代码时可以优化的点③：**
在遇到栈溢出时，可以考虑使用Memoization来避免重复计算