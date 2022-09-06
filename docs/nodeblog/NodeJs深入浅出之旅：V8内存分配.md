---
title: NodeJs深入浅出之旅：V8内存分配🧙‍♂️
date: 11/4/2021, 11:23:02 PM
tags: 
    - Node.js 
    - 前端
categories: 
    - node学习
---

<!--more-->

---

---
这是我参与11月更文挑战的第2天，活动详情查看：[2021最后一次更文挑战](https://juejin.cn/post/7023643374569816095 "https://juejin.cn/post/7023643374569816095")


# V8内存分配

本文紧接上文[《NodeJs深入浅出之旅：内存控制（上）》](https://juejin.cn/post/7022993954677194766#heading-13)

当在代码中声明变量并赋值时，所使用对象的内存就分配在堆中。如果已申请的堆空闲内存不够分配新的对象，将继续申请堆内存，直到堆的大小超过V8的限制。

`Node`查看内存命令**memoryUsage**：
此命令是返回描述 Node.js 进程的内存使用量（以字节为单位）的对象, 并且不同的电脑下可能相同项目的进程也会不同。
``` javascript
// 查看可使用内存大小
let mU = process.memoryUsage();
console.log('内存大小:');
console.log(mU);
```

![Node_查看内存大小.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d09c43689a854b819b0c0c1ec25307c3~tplv-k3u1fbpfcp-watermark.image?)


各内存的说明：
|属性名|说明|
|--|--|
|rss|常驻集大小，是进程在主内存设备（即总分配内存的子集）中占用的空间量，包括所有 `C++` 和 `JavaScript` 对象和代码。|
|heapTotal|`V8` 的内存使用量，已申请到的内存|
|heapUsed|`V8` 的内存使用量，当前已使用的内存|
|external|绑定到 `V8` 管理的 `JavaScript` 对象的 `C++` 对象的内存使用量。|
|arrayBuffers|为 `ArrayBuffer` 和 `SharedArrayBuffer` 分配的内存，包括所有 `Node.js Buffer`。 这也包含在 `external` 值中。 当 `Node.js` 被用作嵌入式库时，此值可能为 `0`，因为在这种情况下可能不会跟踪 `ArrayBuffer` 的分配|


> 小知识：在浏览器的控制台中输入`window.performance`命令也可以查看内存
> ![浏览器命令查看内存.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29b454172fa540529bc8a3bf9f9ef6e9~tplv-k3u1fbpfcp-watermark.image?)
> 
> 其中有三个值，分别是:
> ``` javascript
> jsHeapSizeLimit: 2172649472
> totalJSHeapSize: 25233728
> usedJSHeapSize: 22200444
> ```
> * `jsHeapSizeLimit`代表内存大小限制， 2172649472/1024/1024 ≈ 2072M，也就是2G，这也佐证了新的V8已经将内存从1.4G限制提升上来了。 
> * `totalJSHeapSize`代表可使用内存
> * `usedJSHeapSize`是JavaScript对象占用的内存，不能大于`totalJSHeapSize`，如果大于，可能出现了内存泄漏


内存主要存储变量等数据：
* 局部变量当程序执行结束，且没有引用时就会消失
* 全局对象回始终存活到程序结束运行


### 手动内存分配

接下来让尝试使用`--max-old-space-size`进行手动内存分配

首先编写简单的JavaScript代码，让代码内存不断增加。
```javascript
const os = require('os');
function getMemory() {
    let memory = process.memoryUsage();

    // console.log(`系统总内存：${(totalmem/1024/1024).toFixed(1)}MB`);
    console.log(`申请到内存：${(memory.heapTotal/1024/1024).toFixed(1)}MB`);
    
    console.log(`已使用内存：${(memory.heapUsed/1024/1024).toFixed(1)}MB`);
    console.log('--------------------')
}

// 测试内存超出代码
let count = 0;

// 每次都会接受一个大数组
let useMem = function(){
    let size = 20 * 1024 * 1024;
    let arr = new Array(size);
    return arr;
}
```
接下来开始编写运行方法：
```javascript
// 全局变量
let total = [];
for (let j = 0; j < 10; j++) {
    getMemory();
    total.push(useMem());
}
console.log('success');
```

以上循环10次，是不会超出的，能正常输出`success`


![代码内存超出1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85939ab85af9455d984b08d5add6ec8e~tplv-k3u1fbpfcp-watermark.image?)

如果循环15次，就会超出，下方出现垃圾回收跟踪日志


![代码内存超出2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/682da5a79b4a4c0a9ee232f053645429~tplv-k3u1fbpfcp-watermark.image?)

其中`Last few GCs`显示的是最后几次垃圾回收的情况，`JS stacktrace`代表JavaScript的堆栈跟踪。

报错的原因是：`JavaScript heap out of memory`，达到堆限制分配失败-JavaScript堆内存不足

对于当前这种情况而言，就可以使用`--max-old-space-size`命令来扩充堆内存空间了，一般而言新生代内存空间扩充并没有多大必要，堆内存不足主要还是需要扩充老生代的内存。

node运行`js`时添加：`--max-old-space-size=2698`，这可以将老生代内存空间扩充到2698MB。

命令：`node --max-old-space-size=2698 .\getMemory.js`，成功的看到了`success`的输出


![代码内存超出3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/664ccc1c7bde46799481f2fa1e86f4d3~tplv-k3u1fbpfcp-watermark.image?)

这条命令的配置也可以添加在项目的`package.json`中，可以使用`yarn`或者`npm`运行node命令


![代码内存超出4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa7066a36d834346a716131d6917ceed~tplv-k3u1fbpfcp-watermark.image?)

> **注意**： 在分配内存时需要注意系统空闲内存，不能超过系统的空闲内存。并且一般只能接受空闲内存的75%。可以使用导入`os`来进行查看。
> ```javascript
> const os = require('os');
> let totalmem = os.totalmem();  // 以整数形式返回系统内存总量（以字节为单位）
> let freemem = os.freemem();  // 以整数形式返回空闲的系统内存量（以字节为单位）。
> console.log(`系统总内存：${ (totalmem/1024/1024).toFixed(1) }，系统空闲内存：${ (freemem/1024/1024).toFixed(1) }`);
> ```
> 

![代码内存超出5.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a4faa052d1648c190f81502dcfc6662~tplv-k3u1fbpfcp-watermark.image?)
***

<br>


## 查看垃圾回收日志

查看垃圾回收日志的方式主要是在启动时添加`--trace_gc`参数。 在进行垃圾回收时，将会从标准输出中打印垃圾回收的日志信息

在上面的node运行命令中修改：`node --trace_gc getMemory.js`


![垃圾回收日志.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f88e971ef5d4e03be9fb0b7e0cad504~tplv-k3u1fbpfcp-watermark.image?)

此时在终端中出现的就是垃圾回收的日志信息，通过分析垃圾回收日志，可以了解垃圾回收的运行情况，找出哪些阶段比较耗时。

***

当然此时日志是存在终端，后续查看并不方便，所以可以通过添加`> gc.log`命令生成gc.log文件。命令：`node --trace_gc getMemory.js > gc.log`


![垃圾回收日志1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bbc124aa3f6478798c1756522b16dd5~tplv-k3u1fbpfcp-watermark.image?)

命令运行后终端不会显示日志，但是在文件夹中会出现垃圾回收日志，这样我们查看更加方便了。


![垃圾回收日志2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01cb9cc9b9044c14817ffd9c30039c24~tplv-k3u1fbpfcp-watermark.image?)

***

对于垃圾回收GC的信息还可以通过`--prof`生成V8分析器输出来查看，命令：`node --prof getMemory.js`。当然此时生成的v8.log日志不具备可读性


![垃圾回收日志3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63f680ace7824a439189039fc531de5c~tplv-k3u1fbpfcp-watermark.image?)

<br>

<br>

对于该v8.log日志文件，可以使用`--prof-process`命令，也可以达到与`linux-tick-processor`工具类似的效果。

生成命令：`node --prof-process v8.log > processed.txt`

此命令会生成一个分析的txt文件：


![prof内存1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/292e87cf9ff74a6b8287f6209a499a8a~tplv-k3u1fbpfcp-watermark.image?)


![prof内存2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a386ab42935a49bfa6fc58148b5cc2e1~tplv-k3u1fbpfcp-watermark.image?)


> 这里就不按照《深入浅出node.js》一书中走了，书中是使用v8的`linux-tick-processor`工具
> V8也提供了`linux-tick-processor`工具用于统计日志信息，该工具在Node的源码目录`deps/v8/tools`下可以找到，地址：https://github.com/nodejs/node/tree/v16.13.0/deps/v8/tools
> ![垃圾回收日志4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04ae23d2330f4624b0fbc0b45fdcfe24~tplv-k3u1fbpfcp-watermark.image?)
> 可以将Node源码clone到本地：在源码目录`deps/v8/tools`找到`linux-tick-processor`工具，Windows下对应命令文件为`windows-tick-processor.bat`，将该目录添加到环境变量Path中，就可以直接调用。
> ![Node源码.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d54249734d214de5add3ae469cfc1441~tplv-k3u1fbpfcp-watermark.image?)



