---
title: 高性能JavaScriptの笔记（七）
date: 2021/06/15
tags:
 - 高性能JavaScript
 - 前端
 - 性能优化
categories:
 - 高性能JavaScript
---

随着web开发者对JavaScript和浏览器的推动，**在JavaScript中出现了一些十分特别的模式，有精华也有糟粕**（对javascript性能上来说的），毕竟JavaScript可以是前端最重要的组成之一，“人红是非多”。

这些模式的出现是由于Web中JavaScript的特性决定的，**前端你没得选，后端还可以换语言**。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b56c0a99fa0b4cec96874659b076bc85~tplv-k3u1fbpfcp-watermark.image)

<hr>
<br>

# <div color=#FFC640>避免双重求值（Double Evaluation）</div>

JavaScript 与很多其他语言一样，**允许你在程序中提取一个包含代码的字符串，然后动态执行**

四种实现的标准方法：

> * Function() 构造函数
> * eval()
> * setTimeout()
> * setInterval()


例子：
```javascript
var num1 = 1,num2 = 6;
//eval()执行代码字符串
sum = eval("num1 + num2");
//Function()构造函数执行代码字符串
sum = new Function("num1", "num2", "return num1 +num2");
//setTimeout()执行代码字符串
setTimeout("sum = num1 +num2", 100);
//setInterval()执行代码字符串
setInterval("sum = num1 +num2", 100)
```

当在JavaScript代码中执行另一段JavaScript代码时，都会导致双重求值的性能消耗

<div color=#73D13D> 上面这些代码首先会以正常方式求值，然后在执行过程中对包**含于字符串中的代码**发起另一个求值运算</div>
<br>

双重求值和直接求值性能对比：
<div color=#F00> （**如果觉得测试代码不对的朋友，可以在评论区留言告诉我，不断修正**）</div>

```javascript
var num1 = 1,num2 = 6;
console.time('双重求值')
for (var i = 0; i < 10000; i++) {
   //eval()执行代码字符串
    sum = eval("num1 + num2");
}
console.log(sum)
console.timeEnd('双重求值')
console.time('直接求值')
for (var i = 0; i < 10000; i++) {
   sum = num1 + num2;
}
console.log(sum)
console.timeEnd('直接求值')
```
chrome浏览器：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab3d43f5b38d49ac873cf0cb0f66357c~tplv-k3u1fbpfcp-zoom-1.image)


IE浏览器：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0ad2429d02549c78506b4ab1adbdadd~tplv-k3u1fbpfcp-zoom-1.image)


火狐浏览器：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86281cbee22b4f45b1b84b9014bb859a~tplv-k3u1fbpfcp-zoom-1.image)

从上面的测试可以看出，<div color=#FF827B>**双重求值的速度远远不如直接求值。**</div>





***原因***：每次调用eval()都要创建一个新的解释器/编译器实例，另外三个也是一样，所以这必然会导致代码执行速度变慢
<br>

<div color=#40A9FF>**像`setTimeout`和`setInterval`两个延时函数，第一个参数最好传入函数而不是字符串**。</div>
当然了，正经人谁在延时函数上不写函数写字符串代码呀！ 狗头.jpg




避免双重求值能大大提高JavaScript运行期的性能效率
<br>
<br>
<br>


# <div color=#FFC640>使用Object/Array直接量</div>

在JavaScript中创建对象和数组的方法有很多种，但是**使用对象和数组直接量是最快的方式**


***

直接量赋值和new Object赋值对比：
```javascript
console.time('对象直接量')
for (var i = 0; i < 10000; i++) {
    var obj = {
        name:'空城机',
        age: 25,
        sex: '男'
    }
}
console.timeEnd('对象直接量')

console.time('new Object方式')
for (var i = 0; i < 10000; i++) {
   var obj = new Object();
   obj.name = '空城机';
   obj.age = 25;
   obj.sex = '男';
}
console.timeEnd('new Object方式')
```
chrome浏览器:
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07bbf2e006be46f4986133bf09a4ab95~tplv-k3u1fbpfcp-zoom-1.image)


火狐浏览器：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ae1c56d863d4181978f91457d333d93~tplv-k3u1fbpfcp-zoom-1.image)



**因为在22年IE浏览器即将退出历史舞台，微软一些系统不会支持IE11了，所以这里就不提供IE的测试结果了**
虽然也是一样的，大家可以自己尝试下

***
<br>

数组直接量和new Array对比
<div color=#F00> （**如果觉得测试代码不对的朋友，可以在评论区留言告诉我，不断修正**）</div>

```javascript
    console.time('数组直接量')
    for (var i = 0; i < 10000; i++) {
        var arr = [30, '1', null]
    }
    console.timeEnd('数组直接量')
    console.time('new Array方式')
    for (var i = 0; i < 10000; i++) {
       var arr = new Array();
       arr[0] = 30,
       arr[1] = '1',
       arr[2] = null
    }
    console.timeEnd('new Array方式')
```
**chrome浏览器:**
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eaa1e1be6f8f462dad0d2a65769e26cd~tplv-k3u1fbpfcp-zoom-1.image)


<div color=#FF827B>**<u>下面这里划重点了</u>**</div>，在火狐浏览器测试结果很令我惊讶：

**火狐浏览器：**
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/010551d6b1ed40f38f4b6b50767a1b49~tplv-k3u1fbpfcp-zoom-1.image)


火狐浏览器测试出来数组直接量的时间反倒更长，这河里吗？



然后我赶紧测试了下**IE浏览器**
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ff83afa696e4c40a1088d934a6015b3~tplv-k3u1fbpfcp-zoom-1.image)


**IE也符合之前的结论，那是什么原因导致火狐浏览器结果不同？**

我又直接在火狐浏览器控制条输入代码，发现结果正确
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/335ba64401434b83b39b8b6826200ea9~tplv-k3u1fbpfcp-zoom-1.image)



所以我有两个猜测：
~~1. 测试的数据量不够大~~ 
1. 火狐引擎的调整

接下来我调整了循环次数，但是火狐浏览器控制台结果两种性能差别不大，多次测试还是数组直接量的方式要慢一些

然后我调换了测试方法的位置，让new Array在上面先执行
新的测试代码：

```javascript
    console.time('new Array方式')
    for (var i = 0; i < 10000; i++) {
       var arr = new Array();
       arr[0] = 30,
       arr[1] = '1',
       arr[2] = null
    }
    console.timeEnd('new Array方式')
    console.time('数组直接量')
    for (var i = 0; i < 10000; i++) {
        var arr = [30, '1', null]
    }
    console.timeEnd('数组直接量')
```
火狐：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf0e8808540a484295826f2443b7b8eb~tplv-k3u1fbpfcp-zoom-1.image)


这样结果就很明显了，数组直接量性能更快

好家伙，我直接 ？号就出来了

**这是火狐引擎运行javascript的“小彩蛋”吗，上网找了半天资料也没找到**，可能就是引擎加载的时候的差异吧

之后测试就直接在控制台输入测试了
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d834606b6d1142498a257e347df6bf52~tplv-k3u1fbpfcp-zoom-1.image)


***
<br>

# <div color=#FFC640>避免重复工作</div>

**性能优化说的最多的就是避免重复工作**

方式：
* 延迟加载
    * 在方法被第一次调用时，检查决定使用那种方法去绑定事件处理起，然后原始函数被新函数覆盖
    * 延时函数第一次调用会消耗时间较长
    * 当一个函数在页面中不会立刻调用，可以使用延迟加载优化性能
  
*  条件预加载
    * 在脚本加载前检测，适用于一个函数马上要被用到，并且在整个页面的生命周期中频繁出现的场合 

* 位操作
    * 在JavaScript中也有与或等操作，这些操作可以加快javascript的运算性能
* 原生方法
    * 无论你的JavaScript代码如何优化，都不会比JavaScript引擎提供的原生方法更快
    * JavaScript原生方法依旧提取存在浏览器中了，被编译成了机器码
    * 比如Math方法，进行复杂数学运算时，可以使用内置的Math对象中的方法
    * 菜鸟教程：[JavaScript Math 对象](https://www.runoob.com/javascriptref/javascriptref-obj-math.html)
 
 <br>
 <hr>
<br><br>
 
 # <div color=#FFC640>小节</div>
 
 
**平时写代码时可以优化的点①**：
    避免使用双重求值的方法，比如eval和Function构造器，如果必须要用也没什么办法了。延迟函数记得写方法而不是代码字符串作为第一个参数。
    
**平时写代码时可以优化的点②**：
    对象直接量和数组直接量的性能优于于new出来的Object和Array  （虽然数组直接量在火狐浏览器有点奇怪）
    
**平时写代码时可以优化的点③**：
    去看上面如何避免重复工作
    
<br>
<br>
<br>
 建议把这些知识的应用变成习惯
 
 <br>
<br>

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/769f66fc27964fa48607eab6e6a6a57d~tplv-k3u1fbpfcp-zoom-1.image)
