---
title: Node の MongoDB Driver
date: 6/8/2022, 9:07:19 PM
tags: 
    - Node.js 
    - 前端
categories: 
    - node学习
---

<!--more-->
持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第8天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

# 序

本文其实是承接上一篇文章：[《 Node连接MongoDB（一）》](https://juejin.cn/post/7105738802110398471)，在上一篇文章中，主要说的是如何安装`MongoDB`和其可视化界面`Compass`。

现在来说说node怎么连接使用`MongoDB`，对于node连接，可以使用两种方式，都是下载库：

* mongodb： MongoDB有一个基础库`mongodb`(Node.js MongoDB Driver)
* Mongoose: 现在主流使用的库，在mongodb基础上进行封装的，在代码量上更优，只需增删改查推荐


# mongodb

这是基础库，不过基本的功能都是有的，如果需求不是太多使用这个即可。

## 下载

安装命令：`yarn add mongodb`

可参考：https://www.mongodb.org.cn/drivers/5.html

然后创建mongo文件夹和index.js，里面写`mongodb`库的使用方法。

> nodemon运行的主程序是main.js


![结构1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a1eba0ce2a1402b844e1c8f378d1d35~tplv-k3u1fbpfcp-watermark.image?)

## 连接

首先测试mongodb数据库是否存在，能否进行相连。

从`mongodb`库中导入`MongoClient`客户端模块，该模块可以用来连接数据库

测试方法如下：(这里的baseUrl是依据之前数据库的地址，也可以在可视化界面中查看要连接的数据库url)


![url地址.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adf66ef9772e4de983a9a27b786aa1e1~tplv-k3u1fbpfcp-watermark.image?)

```javascript
const MongoClient = require('mongodb').MongoClient;

const baseUrl = 'mongodb://127.0.0.1:27017/mongodbTest'
function TestConnect() {
    MongoClient.connect(baseUrl, function(err, db) {
        if (err) throw err;
        console.log("数据库已创建!");
        db.close();
    });
}
```

运行：


![mongodb连接1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0d8a9a2a8dc4d54944f49d2a5718035~tplv-k3u1fbpfcp-watermark.image?)


但其实此时数据库`mongodbTest`没有创建出来，在可视化界面`compass`或者cmd中都没有


![数据库不存在.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87d051df9562457895332a0d6d1c0d8b~tplv-k3u1fbpfcp-watermark.image?)

然后，我在网上找了半天，发现这只是连接到了27017那里，没有将不存在的数据库创建出来。（这里菜鸟教程上的代码应该是不对的）


![菜鸟.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c05a4425f344a38805da3903b5db7ff~tplv-k3u1fbpfcp-watermark.image?)


所以这里自己先手动创建一个数据库吧，可以在可视化界面中创建，简单一点，然后可以在数据库中再创建一个集合。


![手动创建数据库.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b589ee9e7d840449999daf2fc53a4e5~tplv-k3u1fbpfcp-watermark.image?)


![手动新增集合.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/313aa661bfb54f81a80f61d9e4775347~tplv-k3u1fbpfcp-watermark.image?)

***

慢着，接下来我去mongodb官网进行了一波搜索，终于成功用代码创建上了数据库了，并且菜鸟上的方法确实不行了。

> PS: 这里发了一波沸点，还有掘友给了比较完整的回复，哈哈哈
> ![沸点评论.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c07eef517d5e4b8cafc977c2d29aa210~tplv-k3u1fbpfcp-watermark.image?)

在之前的测试连接方法中可以稍作修改，使用async和await来进行，这样让代码看上去更舒服一些。

mongodb官方API：https://mongodb.github.io/node-mongodb-native/4.5/

这里用到了`MongoClient.db`方法，此方法会使用或者建立一个数据库，但是，如果没有给这个数据库创建集合，那么此数据库也不会生成出来的。


```javascript
const baseUrl = 'mongodb://127.0.0.1:27017'
// 创建对象
const client = new MongoClient(baseUrl);

async function TestConnect() {
    try {
        // 连接到数据库
        await client.connect();
        // 使用之前手动创建的mongodbTest数据库
        const db = await client.db('mongodbTest');
        console.log(db.databaseName)

        // 创建一个新的集合 (如果是代码新建的数据库，那么必须创建一个集合)
        db.createCollection('collection01')
    } catch(e) {
        console.log(e)
        await client.close();
    }
}

module.exports = { TestConnect }
```


<br>

<br>


## 获取集合列表

既然成功创建了数据库，那么尝试获取该数据库下的所有集合信息`collections`，可以使用`collectionName`将这些集合的名称打印出来

```javascript
// 连接到数据库
await client.connect();
// 使用之前手动创建的mongodbTest数据库
const db = await client.db('mongodbTest');
// 获取当前数据库下所有集合
let collections = await db.collections();
// 打印集合名称
collections.forEach(item=>{
    console.log(item.collectionName)
})
```

集合列表名称：


![集合列表名称.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a73cfb1dfd804b1fa6ea641714c265ad~tplv-k3u1fbpfcp-watermark.image?)

上面对数据库和集合列表简单使用完了之后，可以对单个集合进行操作。

> PS: 对于数据库db的操作方法可以参考具体的API文档，里面的方法也比较全面
> ![db的API.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adea7c39f4294aab8385420c2bdb88f6~tplv-k3u1fbpfcp-watermark.image?)


## 创建集合并插入数据

这里使用db中的**createCollection**方法，可以用来创建新的集合


**createCollection**方法参数：

| 参数 | 作用 |
|--|--|
| name | 创建集合的名称 |
| Optional | 命令可选设置 |
| callback | 回调方法，`Callback<Collection<TSchema>>` |

测试代码：
```javascript
// 创建新集合
db.createCollection('collection03', { autoIndexId: true }, (err, res)=>{
    if (err) console.log('集合创建失败');
    console.log(res.collectionName)  // collection03
})
```

创建完一个空集合后，就该给此集合插入数据了

在mongodb中，集合中大部分都是文档，或者前端可以看成键值对的JSON数据

实例：定义一个文档，并使用`insertOne`插入到目标集合当中：

```javascript
// 使用集合collection03
let c3 = db.collection('collection03');
// 定义文档
let doc = {
    name: '张三',
    age: 18,
    hobby: '打李四',
}
// 将文档插入集合
const result = await c3.insertOne(doc);
```

insertOne插入如果成功，将会返回当前文档在集合中的id


![插入集合01.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/772755fb2f824d009906ec1d16072091~tplv-k3u1fbpfcp-watermark.image?)


![插入集合02.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8413039d4fa42ae8fcb4b6071c68316~tplv-k3u1fbpfcp-watermark.image?)


关于插入文档到集合中的方法有以下3种：（这三种方法的返回值都是Promise，可以使用async和await来解决回调）

* insert： 将单个文档或文档数组插入MongoDB。如果传入的文档不包含\u id字段，驱动程序将向缺少该字段的每个文档中添加一个，从而改变文档
* insertMany： 将文档数组插入MongoDB。如果传入的文档不包含\u id字段，驱动程序将向缺少该字段的每个文档中添加一个，从而改变文档
* insertOne： 将单个文档插入MongoDB。如果传入的文档不包含\u id字段，驱动程序将向缺少该字段的每个文档中添加一个，从而改变文档


接下来试试插入文档数组：
```javascript
let doc = [
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
// 将文档插入集合
const result = await c3.insertMany(doc);
```


![插入集合数组01.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41b30d40a42a4ff98b990638adc8f7b6~tplv-k3u1fbpfcp-watermark.image?)


![插入集合数组02.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc8671d4989148ef8ee43c8376b365ec~tplv-k3u1fbpfcp-watermark.image?)


## 读取集合中的数据

在上面已经将文档内容插入到数据库的集合当中了，那么如何将数据从数据库中读取出来呢？

`MongoDB`库提供了`find`方法

| 方法 | 作用 |
|--|--|
| find | 为过滤器创建游标，该过滤器可用于迭代MongoDB的结果 |
| findOne | 获取与筛选器匹配的第一个文档 |
| findOneAndDelete | 查找文档并在一个原子操作中删除它，在操作期间需要写锁 |
| findOneAndReplace | 查找文档并在一个原子操作中替换它。在操作期间需要写锁 |
| findOneAndUpdate | 查找文档并在一个原子操作中更新它。在操作期间需要写锁 |


示例: 这里需要用toArray转换一下，或者也可以使用回调方法查看
```javascript
// 读取集合中数据
const res = await c3.find().toArray();
console.log(res)
```


![find获取数据.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61d1053afff14a078d099998c36e9e13~tplv-k3u1fbpfcp-watermark.image?)

如果检索数据时，需要过滤掉一些无用的数据，那么可以在`find`中写入参数进行配置。



这里使用`projection`限制返回的字段，将不需要读取的属性设置为0，或者将需要读取的内容设置为1。

注意，这里最好不要同时设置出0和1，只需要设置读取**或者**不读取即可。否则可能会出现报错：`MongoServerError: Cannot do inclusion on field name in exclusion projection` （如果在同一对象中同时指定0和1值，则会出现错误，除非其中一个字段是\u id字段）


以下示例就是将`_id`和`age`不进行读取：
```javascript
// 读取集合中数据
const res = await c3.find({}, { 
    projection: { _id: 0, age: 0 }
}).toArray();
console.log(res)
```

结果：


![projection.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bccecfd744384737b1699898c55ac641~tplv-k3u1fbpfcp-watermark.image?)

<br>

在上面的示例中，会发现`find`方法中第一个参数是`{}`，因为这是查询对象，用于限制搜索的。可以使用来筛选。

query示例：
```javascript
// 读取集合中数据
const res = await c3.find({
    name: /张/
}, { 
    projection: { _id: 0, age: 0 }
}).toArray();
console.log(res)
```

这样返回的结果只有张三的信息了：


![query筛选.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90ade96808c246859b4dc77af84969c0~tplv-k3u1fbpfcp-watermark.image?)

***

## 删除集合信息

现在尝试去将之前存入的文档从集合中删除

同样也有delete删除方法

| 方法 | 作用 |
|--|--|
| deleteOne | 从集合中删除单个文档 |
| deleteMany | 从集合中删除文档数组 |


```javascript
// 读取集合中数据
const res = await c3.deleteOne({
    name: /张/
});
console.log(res)  // { acknowledged: true, deletedCount: 1 }
```


![delete删除文档.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1945ac5897044cfa8b003253f05db66f~tplv-k3u1fbpfcp-watermark.image?)


***

### 更新集合

上面已经写好了增删查，现在curd还剩下更新

| 方法 | 作用 |
|--|--|
| update | 不推荐使用，建议使用下面两种 |
| updateOne | 更新集合中的单个文档 |
| updateMany | 更新集合中的多个文档 |

示例：
```javascript
// 读取集合中数据
let newvalue = { $set: { hobby: '打李四' } }
const res = await c3.updateOne({
    name: /王/
}, newvalue);
console.log(res)
```

此时，数据库中王五的爱好就从打张三变成了打李四


![update更新.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5927468a34f247209f01bf763ca0f2a9~tplv-k3u1fbpfcp-watermark.image?)


***

以上就是mongodb库的基本使用，没想到会写这么多，而且这些也只是基础的CRUD。

mongoose的基础说明留到下次了...

