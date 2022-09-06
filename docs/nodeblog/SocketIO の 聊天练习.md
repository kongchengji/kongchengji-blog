---
title: SocketIO の 聊天练习
date: 2/21/2022, 11:43:11 AM
tags: 
    - JavaScript 
    - 后端
    - Node.js
categories: 
    - websocket
---

<!--more-->

---

---
# SocketIO の 聊天练习

好久没有更新过博客，这次动手写写

## socketIO

> **socketIO概念**
> 
> 一个库，基于 Node.js 的实时应用程序框架。可以在浏览器和服务器之间实现实时，双向和基于事件的通信。它适用于每个平台、浏览器或设备，同样注重可靠性和速度。 

> **与websocket关系**
>
> 在`websocket`出现之前，客户端和服务器之间的即时通信往往依赖于客户端进行轮询操作，`websocket`使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据，同时也降低了服务器的性能消耗。但是，`websocket`并不能兼容所有的浏览器，所以`socketIO`是不仅包含了`websocket`,还对轮询（Polling）机制以及其它的实时通信方式封装成了通用的接口
> ![socketio与websocket.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0920294d7d2c4f4d80a7de674fe3faac~tplv-k3u1fbpfcp-watermark.image?)


***

## 聊天练习结构

基于socketIO的双向通信，准备制作一个聊天界面。 

前端：聊天界面的大体样式参考于微信界面
后台：使用`node.js` + `socketIO`

在动手之前，首先要规划一下需要有的功能（虽然很多是我自己后面想到再加的 🐶 ）


![SocketIO聊天.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ca1e3962e2c4162824ef48b301110db~tplv-k3u1fbpfcp-watermark.image?)

***

## 项目步骤

1. 首先使用`yarn init`创建一个项目
2. 下载需要的express和socket.io, 命令：`yarn add socket.io express`

![项目init.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2570daf1be1b45eb9886d2003076016a~tplv-k3u1fbpfcp-watermark.image?)
3. 在main.js中定义好需要io, 并且为了防止socketIO连接时产生**跨域问题**，可以使用**cors**进行设置

```js
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        allowedHeaders: ["chat-room"],  // 被允许的请求头
    },
});
```
4. 在main.js中编写io的连接监听，**测试**客户端是否连接到服务器，这里使用`of`建立一个房间

> 这里可以参照官方的实例（不过是非跨域的）：https://socket.io/get-started/chat
>
> 如果想要处理跨域可参考：https://socket.io/docs/v4/handling-cors/#cors-header-access-control-allow-origin-missing

```js
io.of('my-chatroom').on('connection', (socket)=>{
    console.log('有新用户连接了');
})
//服务器本地主机的数字   注意这里不是app
server.listen(3007, function(){
    console.log("http:127.0.0.1:3007 启动了。。。");
})
```
前端测试页面：(这里的`socket.io.js`是从`node_module`中拿出来的)

![socketjs的位置.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ec9fc42947f45c6b19c870b7382d106~tplv-k3u1fbpfcp-watermark.image?)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./js/socket.io.js"></script>
    <title>Document</title>
</head>
<body>
    <script>
        socket = io('http://127.0.0.1:3007/my-chatroom', {
            // 用于通知服务器在真正的请求中会采用chat-room请求头
            extraHeaders: {
                "chat-room": "123456789"
            },
        });
    </script>
</body>
</html>
```
然后使用nodemon运行main.js, 并且使用`live server`运行前端测试的html页面，可以看到终端中服务器和客户端已经通过socketIO连接了。

![测试连接.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3f46fc05e874380a3d1589b09ddf66e~tplv-k3u1fbpfcp-watermark.image?)

5. 本次使用的数据没有写入在数据库或其他文件内，而是直接定义的。 
数据格式基本如下所示：
```js
// 数据格式
"userList": [
    // 用户
    {
        "name": "张三",   // 姓名
        "password": "123",   // 密码
        "online": false,   // 是否在线
        "nowSocketId": null,   // 当前的socketid
        "headPortrait": "http://127.0.0.1:3007/img/cherry.png",  // 头像
        // 聊天信息
        "infos": [
            // 聊天对象
            {
                "name": "李四",   // 对象名
                // 最后一次信息
                "lastMsg": {
                    "msg": "这是最后一次了",
                    "time": 78495
                },
                // 所有信息
                "allMsg": [
                    {
                        "msg": "这是最后一次了",
                        "time": 78495
                    }
                ]
            },
        ]
    },
]
```

6. 同时为了避免代码过多，新建一个routerGet.js来应对http访问的请求，前端访问的get请求方法也是使用promise自定义的
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52899845cfb24e6bb613d8d5811a486b~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07453053cca545ca81bce6211c25bcc5~tplv-k3u1fbpfcp-watermark.image?)

7. 因为代码过长的缘故，这里部分过程就开始简略，测试登录http请求是否成功，在`loginCheck`判断时，还需要增加一个重复登录的判断，为了防止用户连续登录

```js
let options = ['userName=' + name, 'password=' + this.password ]
getAjaxNew({url:"http://127.0.0.1:3007/loginCheck", method:'GET', options: options})
.then((response)=>{
    let res = JSON.parse(response)
    console.log(res);
});
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/710f7fac93454a17acd3f06a37916540~tplv-k3u1fbpfcp-watermark.image?)

如果登录成功，再获取用户列表，并且返回用户列表信息时为了安全性，需要将列表中一些关键数据比如password等进行隐藏，置空。


```js
// 隐藏关键信息
function dataDeal(arr, myName) {
    arr = JSON.parse(JSON.stringify(arr));
    for(let i = 0; i <arr.length; i++) {
        let item = arr[i];
        item.password = null;
        for(let p of item.infos) {
            p.allMsg = null;
        }
        if (myName == item.name) {
            arr.splice(i, 1)
        }
    }
    return arr;
}
```

![获取用户列表.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec051915f29e4f9599d0f08fad7c5491~tplv-k3u1fbpfcp-watermark.image?)

8. 在socketIO的后台方法中，介绍一下消息的**收发** 

* 后台通过`socket.on`接收前端传来的请求，并且通过`socket.emit`来发送数据给请求者
* 登录或者离线，那么就要发送给除自己之外的用户，可以使用`.broadcast()`来进行广播消息
* 发送给指定的用户，可以使用`.to()`方法，传入的参数是指定用户的socketid

更多方法可以查看官方API：https://socket.io/docs/v4/server-api/
或者书栈上的中文文档： https://www.bookstack.cn/read/veaba-socket.io-docs/README.md

```js
io.of('my-chatroom').on('connection', (socket)=>{
    // 当有用户登录时
    socket.on('login', (info)=>{
        // uName：登录者的名称  needToEmit:是否需要通知其他用户
        let uName = info.auth.name, needToEmit = false;
        ......
        // 通知其他用户谁登录了  broadcast:除自己以外广播消息
        socket.broadcast.emit('newUserLogin', {
            newUser: uName
        })
    })
    // 接收新消息，存入数据，发送给需要提醒的某人
    socket.on('chatSend', (data)=>{
        ......
        // 如果键存在，则发送消息
        if (anotherid) {
            // to 发送给指定socketid用户
            socket.to(anotherid).emit('hasNewMsg', {
                originName: data.myName,
                time: data.time,
                con: data.con
            })
        }
    })
})
```

效果：

登录和离线左侧的头像栏会改变颜色
聊天的话也会时时进行

![登录聊天离线.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d836c87fc6d94cacbd78fee3adef9f4c~tplv-k3u1fbpfcp-watermark.image?)

***

## 总结

其实这个练习不足之处还是挺多的，没有把数据保存到下来，并且一些安全性问题和一些交互问题上其实也有待考虑。但是大致上使用socketIO做好了，因为本次目的还是为了学习socketIO