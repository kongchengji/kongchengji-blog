---
title: NodeJs深入浅出之旅：文件系统
date: 11/17/2021, 7:12:16 PM
tags: 
    - Node.js 
    - 前端
categories: 
    - node学习
---

<!--more-->

---
highlight: androidstudio

---
这是我参与11月更文挑战的第9天，活动详情查看：[2021最后一次更文挑战](https://juejin.cn/post/7023643374569816095 "https://juejin.cn/post/7023643374569816095")


# Fs文件系统

在node中可以使用fs模块来对文件进行读写等操作。其实有关于`fs文件系统`模块最好的学习方法就是查看`官方API`

官方网址：[http://nodejs.cn/api/fs.html#file-system](http://nodejs.cn/api/fs.html#file-system)

fs读写文件有封装好的方法，这些方法也分为同步读写和异步读写（一般而言都会使用异步读写进行操作）。

## 读写文件操作

### 同步读取 readFileSync

| 参数 | 说明 |
|--|--|
|path| 文件名或文件描述符（包括文件路径） |
| options | flag: 默认为'r'只读， encoding: 编码格式 |


![同步读取文件.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b589a631d2e47d084598ac548137fbf~tplv-k3u1fbpfcp-watermark.image?)

> **小知识**： 在查看API时会发现options参数是被`[]`包括的，使用`[]`包裹的参数是可选参数

例子：
``` javascript
const fs = require('fs');
let contant = fs.readFileSync('./文件1.txt', { flag: 'r', encoding:'utf-8' });
```

### 异步读取 readFile

异步读取方法比之前多了一个回调函数`callback`， **API: fs.readFile(path[, options], callback)**

并且在回调函数中，第一个参数是err错误信息，原因是异步执行分成两段，在两段之间抛出异常和错误程序无法直接捕获，只能当做参数传入第二段

例子： 
``` javascript
contant = fs.readFile(path, { flag: 'r', encoding:'utf-8' }, (err, data) => {
    if (err) {
    }
}); 
```
如果需要读取多个文件，使用嵌套的方法进行读取很容易产生回调地狱，所以可以使用`Promise`、`async`、`await`来进行封装编写

在下面的`readList`中，上一个文件中的内容就是获取下次一要读取的文件名称
```javascript
// 封装方法
function getFile(path) {
    return new Promise((resolve, reject)=>{
        contant = fs.readFile(path, { flag: 'r', encoding:'utf-8' }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        }); 
    })
}
async function readList() {
    let res1 = await getFile('./文件1.txt');
    let res2 = await getFile(`${res1}.txt`);
    let res3 = await getFile(`${res2}.txt`);
    console.log(res3);
}
```

### 文件写入 writeFile

有了文件读取，当然也就存在文件写入，这里就不介绍同步写入`writeFileSync`方法了

`writeFile`方法有四个参数

| 参数 | 说明 |
|--|--|
| file | 文件名或文件描述符（包括文件路径） |
| data | 需要写入文件的内容 |
| options | flag: 默认为'w'只写（通常也会用来清理文件内容）， encoding: 编码格式， mode: 一般不需要修改， signal：可以中止正在写入的文件 |
| callback | 异步写入操作的回调函数 |





例子：同样可以使用`Promise`、`async`、`await`避免写入回调地狱

```javascript
function writeFun(path, content, flag = 'a') {
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, content, { flag: flag, encoding:'utf-8' }, (err)=>{
            if (err) {
                reject(err);
            } else {
                resolve('写入成功');
            }
        })
    })
    
}

async function wirteList() {
    writeFun('./k.html', '', 'w'); // 清理文件中内容 
    await writeFun('./k.html', '<h1>1. 当前内存</h1>\n');
    await writeFun('./k.html', '<h2>2. 当前内存</h2>\n');
    await writeFun('./k.html', '<h3>3. 当前内存</h3>\n');
    await writeFun('./k.html', '<h4>4. 当前内存</h4>');  
}
```

### 删除文件 unlink

对于文件有了读写后，如果不需要此文件了，也可以通过`unlink`方法进行删除

异步删除`unlink`只有两个参数， path和callback

```javascript
function deleteFile(path) {
    return new Promise((resolve, reject)=>{
        fs.unlink(path, (err)=>{
            if (err) {
                reject('删除失败');
            } else {
                resolve('删除成功');
            }
        })
    })
}
```

除了以上这几个方法外，还有对目录进行操作的`mkdir`和`rmdir`， 此外还有别的东西，当然这些内容大多数能否熟练掌握还是需要平时多写和多看API

***

## readline 逐行读取

readline 模块提供了用于从可读流（例如 process.stdin）每次一行地读取数据的接口。

下面的例子中，input和output代表输入输出
```javascript
const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
```
可以通过question方法来编写输入信息
```javascript
rl.question('开始输入?', (answer)=>{
    console.log(`我的输入： ${answer}`);
    rl.pause();  // 暂停input输入流
    // rl.close();  // 关闭实例并放弃对input和output流的控制
})
// on监听，触发暂停方法
rl.on('pause', ()=>{
    console.log('Readline paused.');
})
```

效果：


![readline01.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97f7e657c4764ad79c3622d7e022819d~tplv-k3u1fbpfcp-watermark.image?)

如果需要输入多条命令，可以对question进行封装。

使用`readline`就可以在终端中对node进行简单的交互操作了

例子：这是一个存入多条信息到txt中的实例
```javascript
function inputQue(question) {
    return new Promise((resolve, reject)=>{
        rl.question(question, (answer)=>{
            resolve(answer);
        })
    }) 
}

async function quesList() {
    let name = await inputQue('您的姓名是： ');
    let age = await inputQue('您的年龄是： ');
    let sex = await inputQue('您的性别是： ');
    let money = await inputQue('您的存入金额是： ');

    let str = `
        姓 名： ${name}
        年 龄： ${age}
        性 别:  ${sex}
        金 额： ${money} 元
    `
    writeFun('./new.txt', str, 'a');  // writeFun是上面的写入文件方法
    rl.close();  
}

quesList();
```

效果：


![readline02.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f68bfaf4d094fd0a99abe6cf7de839e~tplv-k3u1fbpfcp-watermark.image?)


> **小知识**： 
>
> 在操作时，如果觉得readline依旧不够方便，可以使用`inquirer`，这是一个用来实现命令行交互式界面的工具集合。
> 安装： **yarn add inquirer**

> 使用`inquirer`进行登录的例子
> ```javascript
> const inquirer = require('inquirer')
> 
> var questions = [
>   {
>     type: 'input',
>     name: 'name',
>     message: "您的用户名?",
>     default: 'kcj'
>   },{
>     type: 'password',
>     name: 'password',
>     message: "您的密码?",
>     mask: true,
>     // 校验  校验通过返回true会继续走下去  回调函数內传递两个参数，第一个是用户输入的参数，第二个是之前所有会话的答案
>     validate: (val, proval)=>{
>         if (val != '123') { return '您的密码错误，请重试'; }
>         else {
>             return true;
>         }
>     },
>   }
> ]
> function verificate() {
>     return inquirer.prompt(questions).then(answers => {
>         if (answers['name'] == 'kcj')
>             console.log(` 您好 ${answers['name']}! \n 欢迎登录`);
>         else {
>             console.log('您的账号不存在，请重试');
>             return verificate();  // 重新从输入用户名开始校验
>         }
>     })
> }
> ```
> 
> **效果**： 输入正确
> ![inquirer01.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed81d223e79646f0bad1032e15cf278b~tplv-k3u1fbpfcp-watermark.image?)
>
> 输入错误
> ![inquirer02.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47001d7e3f7748deac4e25c21e52dcbb~tplv-k3u1fbpfcp-watermark.image?)


## 流

对于文件内容的写入与读取还可以考虑以流的形式

一般来说对于小文件，读取和写入都可以直接使用上面的`readFile`和`writeFile`。

但是大文件还是需要使用`fs.createReadStream`和`fs.createWriteStream`


