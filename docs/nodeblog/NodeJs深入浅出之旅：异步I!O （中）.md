---
title: NodeJs深入浅出之旅：异步I/O （中）🐉
date: 8/23/2021, 9:59:44 PM
tags: 
    - Node.js 
    - 前端
categories: 
    - node学习
---

<!--more-->

---

---
**这是我参与8月更文挑战的第23天，活动详情查看：[8月更文挑战](https://juejin.cn/post/6987962113788493831 "https://juejin.cn/post/6987962113788493831")**


## 监听器

此文是承接上文[《NodeJs深入浅出之旅：异步I/O （上）》](https://juejin.cn/post/6997761014192144420#heading-5)的，所以对于监听器的介绍可以查看之前的内容，或者去[API中查看说明](http://nodejs.cn/api/events.html#events_events)

* **事件监听器模式**是一种广泛用于异步编程的模式，是回调函数的事件化，又称**发布/订阅模式**。

* Node自身提供的events事件触发器模块是**发布/订阅模式**的一个简单实现。

* **所有触发事件的对象都是 `EventEmitter` 类的实例**。

### 监听器只监听一次

可以设置监听器为`once()`,这样监听就可以只调用一次，不会过多调用。一旦事件被触发，则监听器就会被注销然后被调用。

这种方法对于某些只需要执行一次的查询时效果很明显，比如SQL在进行查询时，新到来的相同调用只需在队列中等待数据就绪即可，一旦查询结束，得到的结果可以被这些调用共同使用。这种方式能节省重复的调用产生的开销。 由于Node单线程执行的原因，此处也无须担心状态同步问题。


``` javascript
myEmitter.once('event2', (val) => {
    console.log(val);
});
myEmitter.emit('event2', 'hello world!');
myEmitter.emit('event2', 'ok');
```
结果：


![监听一次.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/098ebbc4036c4e489bb11b746dcc4ba3~tplv-k3u1fbpfcp-watermark.image)

此监听器方法可以在读取文件数据时减少读取次数

读取方法设置在 **IOcode/index.js** 中

在这里定义`readTxt`读取方法时，设置了`Promise`，这样时为了之后调用时获取返回值更加简洁方便，如果出现报错或者正确的返回结果也可以直接使用`.then`获取。 （PS：因为工作不能打包，还要兼容IE9，所以根本用不了ES6。 只能自学期间时不时添加一下，也只有平时多练习才能熟练使用，惨😭）
``` javascript
let status = 'ready'
myEmitter.once('read', () => {
    status = 'peding'
})
// 使用once，让接口访问数据第一次生效
function readTxt(namePath) {
    return new Promise((reslove, rejects)=>{
        fs.readFile(namePath, function(err, data) { 
            if (err) {
                rejects('错误');
            } else {
                if (status === 'ready') {
                    myEmitter.emit('read');
                    reslove(data);
                } else {
                    rejects('');
                }
            }
        })
    })
}
module.exports = { readTxt }
```

入口函数： 调用时使用`require`将**IOcode/index.js**导入到入口文件中
``` javascript
var IO = express();
let IoCode = require('./IOcode')
IO.get('/txt', (req, res) => { 
    let dpromise = IoCode.readTxt('./src/a.txt');
    dpromise.then((val)=>{
        res.json({ d: val.toString() })
    }, ()=> {
        res.end();
    })
})
IO.listen('3001',function(){
    console.log("启动了。。。")
})
```
结果：

![监听只执行一次.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fba62dcef1bb4ce1b3b81deba2379751~tplv-k3u1fbpfcp-watermark.image)


***

### 监听器error事件

<div color=#f00 size=2 >为了处理异常，`EventEmitter`对象对`error`事件进行了特殊处理。在` Node.js `中被视为特殊情况</div> 

如果运行期间的错误触发了`error`事件，`EventEmitter`回检查是否对`error`事件添加过监听器。 如果添加了，这个错误将会交由该监听器处理， 否则这个错误将会作为异常抛出。 **如果外部没有捕获这个异常，会引起线程退出。**

**一个健壮的`EventEmitter`实例应该对`error`事件做处理。**

如果只是发布错误, 异常会抛出，打印堆栈跟踪，然后进程结束
``` javascript
myEmitter.emit('error', new Error('mistake!'));
```

![监听器error处理.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/750a4fd128dd46cb828eea49689d51a5~tplv-k3u1fbpfcp-watermark.image)



如果设置了`error`错误监听器，会转入监听器处理错误，然后进程可以走下去
``` javascript
myEmitter.on('error', (err) => {
    console.log('this is an error');
})
myEmitter.emit('error', new Error('mistake!'));
```

![监听器error2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0381e42745994d4198ee31b7e2326505~tplv-k3u1fbpfcp-watermark.image)


### 移除监听器 removeListener

监听器也可以主动进行移除，移除的命令是`removeListener`或者`removeAllListeners`

`removeListener`移除指定监听器，`removeAllListeners`移除所有监听器。

参考：[http://nodejs.cn/api/events.html#events_event_removelistener](http://nodejs.cn/api/events.html#events_event_removelistener)

如下面的例子，`statusChange`方法已经被`removeListener`在`myEmitter`监听器当中移除，在`emit`调用`read`时，是不会被触发的。
例子：
``` javascript
let status = 'ready';
let statusChange = () => {
    status = 'peding';
    console.log(status);
};
myEmitter.once('read', statusChange)

myEmitter.removeListener('read', statusChange);
myEmitter.emit('read');
```

移除监听器大多数使用的情况是在项目中有很多监听器，其他的某些监听器对你是不需要的，但是冒然删除并不合适，可以使用`removeListener`的方式来移除特定的监听器。

***
<br>

## 多异步之间的协作方案

事件发布/订阅模式有其优点。 利用`高阶函数`，**侦听器作为回调函数可以随意添加和删除**，这能够帮助开发者轻松处理随时可能添加的业务逻辑，也可以隔离业务逻辑，保持业务逻辑单元的职责单一。

一般而言，事件与侦听器是**一对多**的关系，但是在异步编程时，可能会出现事件与侦听器是**多对一**的情况。 比如一个业务逻辑依赖多个通过回调或事件传递的结果。

例子： 一个方法`A`的`变量a`改变需要在方法`B`和方法`C`都执行后才能进行
1、定义方法A
``` javascript
function A(res) {
    console.log(`打印结果：`);
    console.log(res);
    Object.values(res).map((item)=>{
        item();
    })
}
```

2、定义一个高阶函数`after`，然后定义一个`done`方法为`after`的返回函数，将方法A传入回调函数当中，设置`times`次数为2。 

以上的意义在于当监听器监听到`done`被调用时，可以将传入的`key`和`value`加入`results`当中，然后根据`results`内的属性名称数量是否等于设定的`times次数`来判断`方法A`是否执行
``` javascript
let after = function(times, callback) {
    let results = {}
    return (key, value)=>{
        let hasArr = Object.getOwnPropertyNames(results);
        if (hasArr.indexOf(key) == -1) {
            results[key] = value;
            if (hasArr.length == times - 1) {
                callback(results);
            }
        }
    }
}
let done = after(2, A)
myEmitter.on('done', done)
```

3、定义需要的`先决方法B、C`
``` javascript
function B() {
    myEmitter.emit('done', 'fun1', ()=> { console.log('fun1'); })
}
function C() {
    myEmitter.emit('done', 'fun2', ()=> { console.log('fun2'); })
}
```

然后执行B和C， A的执行将会在C方法调用后才会执行
``` javascript
setTimeout(()=>{
    IoCode.C();
}, 2000)
IoCode.B();
```
结果：

![监听器异步执行.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41b751ea4f3b480fafc618ee67f957e9~tplv-k3u1fbpfcp-watermark.image)


当然了，在多异步之间的协作时，也可以使用`EventProxy`。 这是一个很轻量的工具，但是能有效的解决高并发大流量的控制。

> 安装：`cnpm install eventproxy` 或者 `yarn add eventproxy`

> 调用：`var EventProxy = require('eventProxy');`

参考文章：[《eventProxy 解决回调坑 (Node.js)》 ](https://www.jianshu.com/p/6117dd4741cc)

示例：`EventProxy`提供了一个`all()`方法来订阅多个事件，需要每个事件都被触发后，侦听器才会执行
``` javascript
let ep = new EventProxy();
ep.all('temp', 'home', function(temp, home) {
    console.log(`${temp}: ${home}`);
})

function E() { ep.emit('temp', 10) }
function F() { ep.emit('home', 8) }
```

`EventProxy`在事件发布/订阅模式的基础上还完善了异常处理。 使用`fail()`方法将可以监听事件中的错误

***

在异步编程解决方案还有Promise/Deferred模式和流程控制库，本次还没学到，就不写了...👻


