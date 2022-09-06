---
title: node爬虫爬取小说章节
date: 4/28/2022, 9:56:10 PM
tags: 
    - Node.js 
    - 前端
    - 爬虫
categories: 
    - node学习
---

<!--more-->

---

---
一起养成写作习惯！这是我参与「掘金日新计划 · 4 月更文挑战」的第6天，[点击查看活动详情](https://juejin.cn/post/7080800226365145118 "https://juejin.cn/post/7080800226365145118")。

# 使用node爬取数据

准备用`electron`制作一个小说阅读工具练练手，那么首先要解决的就是数据问题，也就是小说的文本。

这里准备使用node对小说网站进行爬虫爬取，尝试爬下一本小说，数据就不存放数据库了，先使用`txt`作为文本存储

在`node`中对于网站的请求，本身就存在`http`和`https`库，内部含有`request`请求方法。

实例:
```js
request = https.request(TestUrl, { encoding:'utf-8' }, (res)=>{
    let chunks = ''
    res.on('data', (chunk)=>{
        chunks += chunk
    })
    res.on('end',function(){
        console.log('请求结束');
    })
})
```

但是也就到此为止了，只是存取了一个`html`的文本数据，并不能够对内部元素进行提取之类的工作（也可以正则拿，但是太过复杂）。

我将访问到的数据通过`fs.writeFile`方法存储起来了，这只是整个网页的html


![存储访问到的数据.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee5cc88274c144ac9caa34b0520f0ead~tplv-k3u1fbpfcp-watermark.image?)

但是我想要的还有各个章节中的内容，这样一来就需要获取章节的超链接，组成超链接链表进去爬取


![超链接01.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78b6af4762e14e87bd3ce367358ac18b~tplv-k3u1fbpfcp-watermark.image?)

## cheerio库

所以，这里就要介绍一个js的库了，`cheerio`

官方文档：https://cheerio.js.org/
中文文档：https://github.com/cheeriojs/cheerio/wiki/Chinese-README

在文档中，可以使用示例进行调试


![cheerio介绍.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68b25d0c94cd42f5a90a6fc9713b719b~tplv-k3u1fbpfcp-watermark.image?)

***

## 使用cheerio解析HTML

cheerio解析html时，获取dom节点的方式与`jquery`相似。

根据之前获取到的书籍首页的html，查找自己想要的dom节点数据

```javascript
const fs = require('fs')
const cheerio = require('cheerio');

// 引入读取方法
const { getFile, writeFun } = require('./requestNovel')

let hasIndexPromise = getFile('./hasGetfile/index.html');

let bookArray = [];

hasIndexPromise.then((res)=>{
    let htmlstr = res;
    let $ = cheerio.load(htmlstr);

    $(".listmain dl dd a").map((index, item)=>{
        let name = $(item).text(), href = 'https://www.shuquge.com/txt/147032/' + $(item).attr('href')
        if (index > 11){
            bookArray.push({ name, href })
        }
        
    })
    // console.log(bookArray)
    writeFun('./hasGetfile/hrefList.txt', JSON.stringify(bookArray), 'w')
})

```

打印一下信息

![章节超链接.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51fa237c21374ee5aa5f0306e3c46332~tplv-k3u1fbpfcp-watermark.image?)


可以同时将这些信息也存储起来


![章节超链接02.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b036bac7209e4827a9e63e8f8397f4be~tplv-k3u1fbpfcp-watermark.image?)

***

现在章节数和章节的链接都有了，那么就可以获取章节的内容了。

> 因为批量爬取最后需要IP代理，这里还没准备，暂时先写获取某一章节小说的内容方法

爬取某一章节的内容其实也比较简单：

```javascript
// 爬取某一章节的内容方法
function getOneChapter(n) {
    return new Promise((resolve, reject)=>{
        if (n >= bookArray.length) {
            reject('未能找到')
        }
        let name = bookArray[n].name;
        request = https.request(bookArray[n].href, { encoding:'gbk' }, (res)=>{
            let html = ''
            res.on('data', chunk=>{
                html += chunk;
            })
            res.on('end', ()=>{           
                let $ = cheerio.load(html);
                let content = $("#content").text();
                if (content) {
                    // 写成txt
                    writeFun(`./hasGetfile/${name}.txt`, content, 'w')
                    resolve(content);
                } else {
                    reject('未能找到')
                }
            })
        })
        request.end();
    })
}

getOneChapter(10)
```


![爬取章节内容.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9baa2c71ed844e95a59c854d519392ee~tplv-k3u1fbpfcp-watermark.image?)

***

这样，就可以根据上面的方法，来创造一个调用接口，传入不同的章节参数，获取当前章节的数据

```javascript
const express = require('express'); 
const IO = express();
const { getAllChapter, getOneChapter } = require('./readIndex')
// 获取章节超链接链表
getAllChapter();

IO.use('/book',function(req, res) {
    // 参数
    let query = req.query;
    if (query.n) {
        // 获取某一章节数据
        let promise = getOneChapter(parseInt(query.n - 1));
        promise.then((d)=>{
            res.json({ d: d })
        }, (d)=>{
            res.json({ d: d })
        })
    } else {
        res.json({ d: 404 })
    }
    
})

//服务器本地主机的数字
IO.listen('7001',function(){
    console.log("启动了。。。");
})
```

效果：

![接口查找章节.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f2204e029b046039dcda61e16c1f0cc~tplv-k3u1fbpfcp-watermark.image?)

现在，一个简单的查找章节接口就做好了，并且也可以做一些参数超出判断。

对于不同的数据接口，爬虫处理方式也不一样，不过在本次爬取的链接中，内容的显示并不是由前端动态渲染出来的，所以可以直接爬取静态的html即可。如果遇到数据是通过Ajax之类的方式获取到的json串，那就要通过网络接口去请求数据了。

