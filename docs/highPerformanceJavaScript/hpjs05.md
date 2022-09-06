---
title: 高性能JavaScriptの笔记（五）
date: 2021/06/13
tags:
 - 高性能JavaScript
 - 前端
 - 性能优化
categories:
 - 高性能JavaScript
---

# <div color=#40A9FF>快速响应的用户界面</div>
你愿意体验一个交互流畅的网页，还是愿意体验一个点击后卡一会儿才响应的页面<div color=#0ff size=3>（如在学校抢课时网页）</div>？

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6268bf2837d0463daf2a1a8ba6ede3e6~tplv-k3u1fbpfcp-zoom-1.image)


**好的JavaScript编写方式能够提升页面交互响应的速度，以下知识可进行了解与应用**

## <div color=#FFC640>浏览器UI线程</div>
用于执行JavaScript和更新用户界面的进程通常被称为 **“浏览器UI线程”**

UI线程的工作基于一个简单的队列系统，任务会被保存到队列中直到进程空闲。 一旦空闲，队列中下一个任务就被重新提取出来并运行。

例子分析：
```javascript
<button onclick="handleClick()">按钮</button>
<script>
    function handleClick() {
        var div = document.createElement("div");
        div.innerText = "点击了按钮";
        document.body.appendChild(div)
    }
</script>
```
这是一个点击按钮，触发handleClick方法的例子

当按钮被点击时，会触发UI线程来创建两个任务并添加到队列当中

两个任务：
1. 更新按钮样式，表示被点击的UI
2. 执行JavaScript，包含handleClick方法中的代码

实际上，handleClick方法执行中，会添加一个新的div元素到`<body>`末尾，这又引发了一次UI变化
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d5750ce18234806868b6ed1832664bd~tplv-k3u1fbpfcp-zoom-1.image)

大多数浏览器在JavaScript运行时会停止把新任务加入**UI线程的队列**中，所以JavaScript任务必须尽快结束，以避免对用户体验造成不良影响


<br>
<hr>
<br>

## <div color=#FFC640>浏览器限制</div>
浏览器会限制JavaScript任务的运行时间

这种限制是必须的，为了确保某些恶意代码不能通过永不停止的密集操作锁住用户的浏览器或计算机

这种限制分为两种：
* 调用栈大小限制
* 长时间运行（long-running）脚本限制

长时间运行脚本限制也会被称为失控脚本定时器

原理是浏览器会记录一个脚本的运行时间，并在达到一定限度时终止它，浏览器向用户显示一个长时间无响应对话框。

* * *

chrome浏览器：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76b951bf6ebe41309e4b5ef969086194~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcb330b2af5646bea7f4c4e1c079eb82~tplv-k3u1fbpfcp-watermark.image)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e100e1f5c4f4400cae71021fe594cc14~tplv-k3u1fbpfcp-watermark.image)

* * *


### <div color=#FF7021>定时器</div>

JavaScript 定时器可以和UI线程进行交互，有助于把运行耗时较长的脚本拆分为较短的片段

#### 定时器的精度

**JavaScript定时器的延时通常不会特别精确，相差大约几毫秒，因此定时器不可用于测量实际时间**。

在Windows系统中定时器分辨率为15.6毫秒，这是微软故意设置的，它觉得设置精度更低对资源消耗过大，所以一个延时15.6毫秒的定时器将根据最后一次系统时间刷新而转换为0 或 15.

设置定时器延时小于15将会导致IE浏览器锁定，所以延迟的最小值建议设置为25以确保至少有15毫秒延迟。               
————  <div color=#F00>**这就是在写`setTimeout`和`setInterval`定时方法时，几乎都会把延时时间写的超过一定毫秒以上的原因。**</div>

<br>
<br>

## <div color=#FFC640>Web Workers</div>

自JavaScript诞生以来，一直是单线程的方式。 但是其实JavaScript也有`多线程 `存在了，这就是Web Workers的功劳啦！

参考链接来喽：
* [MDN中Web Workers API介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)
* [MDN中 Worker 的介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)
* [阮一峰大神的博客](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)


通过使用Web Workers，Web应用程序可以在独立于主线程的后台线程中，运行一个脚本操作。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a6382f9308a431eb5c665f8b5f8af87~tplv-k3u1fbpfcp-watermark.image)

好处想必大家也都可以理解，Web Workers API引入了一个接口，能使代码运行且不占用浏览器UI线程的时间。每个新的worker都在自己的线程中运行代码，这意味着Worker运行代码不仅不会影响浏览器UI，也不会影响其他Worker中运行的代码。

<br>
<hr>
<br>

### <div color=#FF7021>Worker运行环境</div>


Worker 接口是 `Web Workers API` 的一部分，指的是一种可由脚本创建的后台任务，任务执行中可以向其创建者收发信息。要创建一个 Worker ，只须调用 Worker(URL) 构造函数，函数参数 `URL` 为指定的脚本。Worker 也可以创建新的 Worker，当然，所有 Worker 必须与其创建者[同源](https://wiki.developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

* 由于 `Web Workers`没有绑定UI线程，这也就意味这它们不能访问浏览器的许多资源了
* JavaScript和UI共享同一进程的**部分原因**是它们之间互相频繁的访问，因此任务失控会导致糟糕的用户体验
*  `Web Workers`从外部线程修改DOM会导致用户界面出错，但是每个` Web Workers`都有自己的全局运行环境
    *  一个navigator对象，只包括四个属性：appName、appVersion、userAgent和platform
    *  一个location对象（**与window.location相同，不过所有属性都是只读**）
    *  一个self对象，指向全局worker对象
    *  一个importScripts() 方法，用来加载Worker所用到的外部JavaScript文件
    *  所有的ECMAScript对象，诸如：Object、Array、Date等
    *  XMLHttpRequest构造器
    *  setTimeout()和setInterval()方法
    *  一个close()方法，能够立刻停止Worker运行

由于 `Web Workers`是不同的全局运行环境，所以需要我们创建一个完全独立的js文件，里面是在Worker中运行的代码。然后在主流程中 new Worker(`Web Workers`代码路径)
```javascript
 var worker = new Worker('code.js')
```
此代码一旦执行，将创建一个新的线程和一个新的Worker运行环境。该文件会被异步下载，知道文件下载并执行完成后才启动此worker

<br>

### <div color=#FF7021>示例</div>
**基础示例：**
结构
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-vd2oZqpt-1621694214686)(en-resource://database/582:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb3d7f3467c547aea55b52f568b20177~tplv-k3u1fbpfcp-zoom-1.image)



HTML中

```html
<body>
    <button onclick="clickHandle()"> 点击 </button>
    <script>      
        let worker = new Worker('code.js')
        console.log(worker)
        function clickHandle() {
            // 往worker对象发送一个对象数据
            worker.postMessage({
                msg: '发送数据进入'
            })
        }
    </script>
</body>
```
code.js中

```javascript
console.log("worker启动了！")
// 接收传送的数据
onmessage = function(e) {
    console.log(e)
}
```

达到的效果
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1536b3d3d36e4de3a9f232a68bfdbbc9~tplv-k3u1fbpfcp-zoom-1.image)




#### 注意
这里我使用的软件是vs code，如果大家直接这样打开HTML是会找不到web worker的js文件，这是因为上面提到的**同源策略**的影响。

可能会报下面的错误

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff102009a28f4cb79ae1c4537efb541a~tplv-k3u1fbpfcp-zoom-1.image)


所以需要使其运行在服务器中，这里为了方便简化，我推荐使用一款叫做**Live Server**的插件。

这款插件具有实时加载功能的小型服务器，可以使用它来破解html/css/javascript，但是不能用于部署最终站点。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c54451b5c194ae49871414bd095a02d~tplv-k3u1fbpfcp-zoom-1.image)


运行index.html文件时

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c5196727b84d8d8d7708d42a02b8a7~tplv-k3u1fbpfcp-zoom-1.image)


<br>

### <div color=#FF7021>实际应用</div>

`Web Workers`适用于哪些处理纯数据，或者与浏览器UI无关的长时间运行脚本。

一些可以受益与`Web Workers`的任务：
* 编码/解码大字符串
* 复杂数学运算（包括图像或视频处理）
* 大数组排序

<br>

## <div color=#FFC640>小节</div>

* JavaScript的任务最好不要超过100毫秒，过长的运行时间会导致UI更新出现明显的延迟
* 定时器可以帮助你拆分长时间运行脚本为一系列的小任务
* `Web Workers`是新版浏览器支持的特性，是JavaScript的多线程解决方案

**Web应用越复杂，管理UI线程就越重要
即使JavaScript再重要，也不应该影响用户体验**