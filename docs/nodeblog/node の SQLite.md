---
title: node の SQLite
date: 6/14/2022, 9:02:05 PM
tags: 
    - Node.js 
    - 前端
categories: 
    - node学习
---

<!--more-->

---

---
持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第9天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

# node操作SQLite

之前在做electron桌面制作番茄钟应用时曾经想过用数据库存储数据，一开始打算`mongodb`，但是发现不能实现无服务器，那么只能使用`SQLite`了。

> 介绍：SQLite 是一个软件库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。SQLite 是在世界上最广泛部署的 SQL 数据库引擎。SQLite 源代码不受版权限制

现在先让我们尝试使用node来操作`SQLite`

## 安装sqlite3库

从前面的介绍当中，可以知道，sqlite是免安装的数据库，所以这里使用数据库就只需要添加一个`node`的`sqlite3`库就可以了。

安装命令：`yarn add sqlite3 -D`


![安装sqlite.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c55476c266154ed5b4b4370fc4473d5f~tplv-k3u1fbpfcp-watermark.image?)


## 创建sqlite数据库

当前的node项目地址中并没有sqlite数据库，所以可以通过命令先创建一个数据库，这里使用`new sqlite3.Database`来连接数据库，**如果当前没有，会自动创建一个数据库**，并且不同于之前操作`mongodb`，不用再创建一个集合。

```javascript
const path = require('path');
const sqlite3 = require('sqlite3');

function SQLiteInit() {
    let rootPath = path.join(__dirname, '../sqlite3.db');

    let db = new sqlite3.Database(rootPath, (err)=>{
        if (err) throw err;
        console.log('数据库连接')
    })
}
```

效果：


![创建sqlite.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bd65df479764915b81e5c3ecadac37b~tplv-k3u1fbpfcp-watermark.image?)

## 创建表格并插入数据

有了数据库之后，就需要创建一个数据库表格了

可以创建一个sql语句执行方法，此方法可以通过`db.run`方法来运行数据sql语句
```javascript
// 执行sql语句
function runSQL(sqlstr) {
    db.serialize(()=>{
        db.run(sqlstr);
    })
}
```
创建数据表worker
```javascript
let db = null;
function SQLiteInit() {
    // 连接数据库
    let rootPath = path.join(__dirname, '../sqlite3.db');
    db = new sqlite3.Database(rootPath)
    // 创建表格
    runSQL(`
        create table worker 
        (
            name text not null,
            age int not null,
            hobby text not null
        );
    `)
    // 关闭连接
    db.close();
}
```

现在数据库表格worker已经存在了。

接下来的操作就是在表中插入数据了，这里可以使用`db.run`来一次性插入，也可以通过`prepare`来分步插入。

```javascript
let doc = [{
        name: '张三',
        age: 18,
        hobby: '打李四',
    },
    {
        name: '李四',
        age: 18,
        hobby: '打王五',
    },
    {
        name: '王五',
        age: 18,
        hobby: '打张三',
    },
]
let insertInfo = db.prepare('insert into worker (name, age, hobby) values (?, ?, ?)')
doc.forEach((item)=>{
    insertInfo.run(item.name, item.age, item.hobby);
})
insertInfo.finalize();
```

现在数据也已经插入到数据库当中了

***

## `vs code`的`sqlite`插件

对于数据库，最好使用可视化界面去操作，一般对`sqlite`都是推荐用[navicate](http://www.navicat.com.cn/)

不过我这里为了操作快捷，就不用了，在`vs code`当中，也存在插件可以对`sqlite`数据库进行简单的操作。插件的名称就叫做**SQLite**


![vscode的sqlite插件.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/455f446bac9c4a708c062a107e3d10f4~tplv-k3u1fbpfcp-watermark.image?)

安装完插件之后，如果想要打开之前创建的`sqlite3.db`数据库，需要使用`Ctrl+Shift+P`打开命令面板，然后输入`sqlite`，找到`Open Database`选项打开。


![vscode打开命令面板.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5289ec55cc8946a0bf7571e128880fc9~tplv-k3u1fbpfcp-watermark.image?)

这样在左侧资源管理器界面中会出现`SQLITE EXPLORER`

这里可以查看之前创建的`sqlite3.db`数据库中的表格，在右侧选择创建`New Query`


![vscode插件打开.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4423a16f42b1492da7d83be8a7ab64e3~tplv-k3u1fbpfcp-watermark.image?)

会创建一个`.sql`文件用于执行sql的命令和语句

写入查询表格命令：
```javascript
-- SQLite
select * from worker
```

鼠标右键选择数据库并运行此query


![vscode插件查询.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a030220f8e564c91badb3833967ee3d1~tplv-k3u1fbpfcp-watermark.image?)


![查询结果.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8220a6e9a8ea4cc98099ad5ee59c15ef~tplv-k3u1fbpfcp-watermark.image?)


***

接下来对于数据的查询、删除和更新操作其实都与插入类似，其实主要就是在于sqlite语句的编写，这里就不详细写了。并且sqlite主要的应用还是一些小型项目，因为其不需要部署服务器，所以像一些桌面应用就可以将其嵌入进去。

