---
title: 高性能JavaScriptの笔记（六）
date: 2021/06/14
tags:
 - 高性能JavaScript
 - 前端
 - 性能优化
categories:
 - 高性能JavaScript
---

# <center><div color=#40A9FF>Ajax</div></center>

Ajax全称：<div color=#9254DE> **Asynchronous Javascript And XML （异步 JavaScript 和 XML）**</div>

有关Ajax的博客其实数不胜数了，我之前写过的博客中也存在一些Ajax的内容
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f17833033184896b139e6dc79f56b46~tplv-k3u1fbpfcp-zoom-1.image)


不过Ajax也是高性能JavaScript的基础知识，可以通过延迟下载体积较大的资源文件来使得页面加载速度更快。

通过异步方式在客户端和服务端之间传输数据，甚至可以只用一个HTTP请求就获取整个页面的资源<div color=#73D13D> （肯定不是赞成这种方式）</div>


<hr>
<br>

## <div color=#FFC640>数据传输</div>

Ajax从最基本层面上： 一种与服务器通信而无须重载页面的方法


## <div color=#FFC640>请求数据</div>

五种常用技术用于向服务器请求数据：
* XMLHttpRequest（XHR）
* Dynamic script tag insertion 动态脚本注入
* iframes
* Comet
* Multipart XHR

当然在目前来说，只有三种比较常用，那就是XHR、动态脚本注入和Multipart XHR

<br>

<br>

### <div color=#FF827B>XMLHttpRequest（XHR）</div>

这是目前最常用的技术，允许异步发送和接收数据

[MDN介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

<div color=#40A9FF>**这是Ajax的核心**</div>，所有主流浏览器对它都提供了完善的支持，<div color=#f00>也就是说不支持这个的都是非主流浏览器</div>


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5827e1f08934789a2071c7356ede45b~tplv-k3u1fbpfcp-watermark.image)


使用范例：
```javascript
let url = '接口名称';
let params = ['id=123', 'name=456']  //请求参数
const req = new XMLHttpRequest();
req.onreadystatechange = function(){
    if(req.readyState === 4) {  //判断响应状态是否成功
        let responseHeaders = req.getAllResponseHeaders(); //获取响应头信息
        let data = req.responseText; //获取响应数据
        // 数据处理
    }
}
// 这是get方法&des=get方法的参数直接在接口后面追加
req.open('GET',url + '?' + params.join('&'), true);
req.setRequestHeader('X-Requested-with','XMLHttpRequest');//设置请求头信息
req.send();//发送请求
```

<div color=#9254DE>**readyState状态值**</div>有五种状态 （这和status状态码还是有区别的）：
* 0 － （未初始化）还没有调用send()方法 
 * 1 － （载入）已调用send()方法，正在发送请求 
 * 2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
 * 3 － （交互）正在解析响应内容，接收到部分信息，但不是所有
 * 4 － （完成）响应内容解析完成，可以在客户端调用了， 接收到了所有信息


<div color=#9254DE>**status状态码**</div>是XMLHttpRequest对象的一个属性，表示响应的HTTP状态码

举个例子：404，也就是我们常说的和谐之光，实际指的是没有发现文件或者URL没有找到对应页面

区别：
* readyState，是指运行请求所经历过的几种状态，无论访问是否成功都将响应的步骤
* status，是指无论访问是否成功，由HTTP协议根据所提交的信息，服务器所返回的HTTP头信息代码


**由于XHR提供了高级的控制，所以浏览器增加了一些使用XHR的限制**


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecc2802d4dfb467a806a1511bf01869d~tplv-k3u1fbpfcp-watermark.image)




最出名的限制就是[同源策略](https://wiki.developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)了，不能使用XHR从外域请求数据

<br>


至于低版本的IE不仅不支持“流”，也不会提供readyState为3的状态，从服务器传回的数据会被当作字符串或者XML对象，导致处理大量数据变慢。 <div color=#f00> 不过这一点我认为可以略过了，这里低版本IE指IE6及以下，如果现在做的项目还需要兼容这些浏览器，那真的也没什么可说的了 </div>
<br>


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9619d51c184c45e39c249947de1e77e7~tplv-k3u1fbpfcp-watermark.image)

**注意（下面主要是从性能上说）**：
* 不管直接使用XHR还是Ajax请求数据时，都需要在POST和GET中选择一下
* 如果是不需要改变服务器状态，那么建议使用GET请求。 GET好处是请求数据会被缓存起来，如果需要多次请求同一数据，会有助于提升性能
* 当URL加上参数的长度超过或接近2048个字符时，用POST获取数据比较好。IE的url最大长度是2083个字节,可以用于GET传递数据的长度是2048个字节

<br>

### <div color=#FF827B>动态脚本注入</div>

这种技术**最大的好处**，就是<div color=#F00>**相较于XHR来说，能够进行跨域请求**。</div>

因为这是一个Hack，所以不需要实例化一个对象，可以直接用JavaScript创建一个新的脚本标签，并设置src属性为不同域的URL。
```javascript
let scriptElement = document.createElement('script');
scriptElement.src = '路径';
document.getElementsByClassName('head')[0].appendChild(scriptElement);
```

这一点其实大部分人也看到过，前端的跨域解决方案之一
就是可以使用script标签进行跨域


<div color=#F00> **你以为这种方式解决跨域就好了吗？**</div>

![\[加图 太年轻\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a5c8846189b4618b1c249ea0f06c79c~tplv-k3u1fbpfcp-zoom-1.image)

<hr>

* 和XHR相比，动态脚本注入控制有限，参数传递也只能使用GET方式，而不是POST方式
* 并且不能设置请求超时处理或重试，所以就算请求失败，那你也不知道
* 这里没有readyState，数据必须全部返回后才可以访问
* 不能访问请求的头部信息，也不能把整个响应消息作为字符串来处理 
<hr>

这缺点好多/(ㄒoㄒ)/~~
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8483a52e4f04d6f9583acfc8963c7a3~tplv-k3u1fbpfcp-zoom-1.image)




**注意**：
虽然缺陷比较多，但是**这项技术的速度非常快**，响应消息是作为JavaScript执行的。

引入外部JavaScript代码时一定要多加小心，这种技术从你无法直接控制的服务器上请求数据时可能会有危险，JavaScript没有任何权限和访问控制的概念，<div color=#9254DE>**谁知道你引入的到底是什么东西**</div>
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a111d9d288e4d3f8406860e6431a269~tplv-k3u1fbpfcp-zoom-1.image)



<br>
<br>

### <div color=#FF827B>Multipart XHR</div>

MXHR允许客户端用一个http请求就从服务器想客户端传送多个资源。

Multipart XHR通过在服务器将资源打包成一个由双方约定的字符串分割的长字符串发送到客户端，然后在客户端解析这个长字符串，根据mime-type类型和传入的其他信息解析出每个资源

这个其实也是基于XHR的变种吧？

<br>
<br>
<br>

### <div color=#FF827B>信标（beacons)</div>

这项技术**类似于动态脚本注入**

使用JavaScript创建一个新的Image对象, 并把src属性设置为服务器上的脚本URL.。该URL包含了我们要通过GET传回的键值对数据。信标无法发送POST请求

<div color=#F00>**请注意并没有创建img元素或把它插入DOM**</div>

```javascript
var url = '接口名称';
var params = [数据]
var beacon = new Image();
beacon.src = url + '?' + params.join('&');
// 用load事件监听服务器是否成功接收数据
// 可以在服务端做出不同的响应，比如返回x宽的空白图片代表成功接收，y宽的空白图片代表接收失败
beacon.onload = function() {
    if (this.width == x) {
        // 成功
    } else if (this.width == y){
        // 失败，请重试
    }
}
beacon.onerror = function() {
    // 出错，稍后重试并创建另一个信标
}
```
<hr>
信标的好处是性能消耗比较小，而且服务器端的错误不会影响到客户端，数据传输很快
但是，能够接收到的响应类型是有限的，而且传输的数据量也很小，**数据量大一些还是用XHR吧**

<hr>


**范例：**
HTML页面：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> beacons </title>
</head>
<body>
    <button onclick="beaconbtn()"> 信标 </button>
    <script>
        function beaconbtn() {
            var url = 'http://localhost:3001/goodsList.png';
            var params = ['id=123', 'name=空城机', 'data=测试数据是否能够在后台接收']  //发送的数据
            var beacon = new Image();
            beacon.src = url + '?' + params.join('&');
            // 用load事件监听服务器是否成功接收数据
            // 可以在服务端做出不同的响应，比如返回x宽的空白图片代表成功接收，y宽的空白图片代表接收失败
            beacon.onload = function() {
                console.log(this)
                if (this.width == 1) {
                    // 成功
                    console.log("服务器获取数据成功")
                } else {
                    // 失败，请重试
                    console.log("服务器获取数据失败，请重试")
                }
            }
            beacon.onerror = function() {
                // 出错，稍后重试并创建另一个信标
            }
        }
    </script>
</body>
</html>
```

Node.js服务器：
```javascript
const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express');

var app = express();
app.use('/',function(req, res) {
    //解析出请求的文件路径
    var pathname = url.parse(req.url).pathname;
    console.log('接收到请求，请求的是：' + pathname);    
    console.log('服务器接收：')
    console.log(req.query)
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err)
        } else {
            res.end(data)
        }
    });
    
})

//服务器本地主机的数字
app.listen('3001',function(){
    console.log("启动了。。。, 运行 http:localhost:3001/beacons.html ")
})
```

VS Code终端获取的数据：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/175417b0da4b4aee93d5b59160b32d99~tplv-k3u1fbpfcp-zoom-1.image)


HTML界面效果：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77e7ee14554a47c5bdef97d73f7fc7e3~tplv-k3u1fbpfcp-zoom-1.image)
<hr>
<br>


## <div color=#FFC640>数据格式</div>

当考虑数据传输技术时，你必须考虑这些因素：功能性、兼容性、性能以及方向（你发送给服务器还是服务器发送给你）

**如果考虑数据格式，那唯一需要比较的标准就是速度，没有哪一种数据格式会始终比其他格式更好，但目前JSON最主流**

### <div color=#FF827B>XML</div>

最初Ajax开始流行时，选择的是XML作为数据格式 **（PS：那时JSON还没正式作为交换格式）**

但是相比其他格式，XML极其冗长，对JavaScript程序员解析时十分费力，不能轻易完成。
最重要的是XML解析起来的性能你远比其他数据格式慢，在高性能Ajax中，XML已经没有立足之地了

<div color=#F00>**所以我建议，不是特别老的项目就不要用这个XML了，让前端轻松一点吧！！！**</div>




### <div color=#FF827B>JSON</div>

嗯，这是目前最流行的数据格式，其实也不需要我多说，大部分前后端数据交流应该都会用到

JSON是一种`使用JavaScript对象和数组直接来编写的轻量级且易于解析`的数据格式

上面JSON的定义中已经把好处说的明明白白了，JSON是高性能Ajax的基础

**小知识：**
JavaScript中可以使用eval来解析JSON字符串，但是在代码中使用`eval`其实很危险，特别是用于执行可能包含恶意代码的第三方JSON数据。 所以尽可能使用`JSON.parse()`来解析

<br>

### <div color=#FF827B>HTML</div>
这种数据格式与XML类似，JavaScript可以将较大的数据结构转换为简单的HTML，但是服务器处理更快，服务器可以处理好整个HTML传回客户端。

但是这项技术的缺点也十分明显，数据更加臃肿，在网络中传输速度会变慢
<br>


### <div color=#FF827B>自定义格式</div>

理想的数据格式应该只包含必要结构，可以自己定义一种这样的格式，简单地把数据用分隔符连接起来
```javascript
Jojo;data;hello world;the;people;new;
```
这种方式速度最快，可以使用split分割字符串的方式进行。 但这里需要确认的是分割的字符是设定好的，不然可能会分割出错

<br>
<hr>
<br>
<br>

# <center><div color=#40A9FF>Ajax性能指南</div></center>

**最快的Ajax请求就是没有请求**


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b1a60f536b144fbbc376372ee90cd47~tplv-k3u1fbpfcp-watermark.image)


有两种主要方法可以避免发送不必要的请求：
* 在服务端，设置HTTP头信息以确保你的响应会被浏览器缓存
* 在客户端，把获取到的信息存储到本地，从而避免再次请求

第一种技术使用最简单而且好维护，第二种技术给你最大的控制权
<br>

### <div color=#FF827B>设置HTTP头信息</div>

**如果希望Ajax响应能被浏览器缓存，那么必须使用GET方式发送请求**

还需要在响应中发送正确的HTTP头部信息

设置Expires是最简单确保浏览器缓存Ajax响应的方式

<br><br>

### <div color=#FF827B>本地数据存储</div>

这种方式就是比较手工了

把从服务器接收到的数据存到本地，比如说cookie、local storage

这里就不多介绍了，可以参考以下文章：

[Cookie、Session、AJAX、JSON](https://blog.csdn.net/qq_36171287/article/details/105312086)


[浅谈cookie、sessionStorage 和 localStorage](https://blog.csdn.net/zhouziyu2011/article/details/58591829)

<br>
<hr>
<br>

## <div color=#FFC640>小节</div>
一些准则有利于加速Ajax：
* 减少请求数，可以通过合并JavaScript和CSS文件，或者使用提过一次Multipart XHR
* 缩短页面加载时间，待主要内容加载后，才使用Ajax获取次要文件
* 确保代码错误不输送给用户，服务端要处理好错误
* 使用一些比较成熟的Ajax类库，比如jQuery.ajax，或者自己编写底层Ajax方法代码


顺便推荐一波别人的讲解 狗头.jpg：[教你怎么用ajax来进行交互（入门必看）！！！](https://blog.csdn.net/weixin_44070254/article/details/117201966)