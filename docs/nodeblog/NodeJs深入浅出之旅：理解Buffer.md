---
title: NodeJs深入浅出之旅：理解Buffer 🐰
date: 11/22/2021, 9:06:01 PM
tags: 
    - Node.js 
    - 前端
categories: 
    - node学习
---

<!--more-->

这是我参与11月更文挑战的第10天，活动详情查看：[2021最后一次更文挑战](https://juejin.cn/post/7023643374569816095 "https://juejin.cn/post/7023643374569816095")

# 理解Buffer

`JavaScript`对于字符串的操作十分友好

`Buffer`是一个像`Array`的对象，主要用于操作字节。



***

<br>


## Buffer结构

`Buffer`是一个典型的JavaScript和C++结合的模块，将性能相关部分用C++实现，将非性能相关部分用JavaScript实现。


![Buffer分工.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1c2cab6d557431bad522d056aedd584~tplv-k3u1fbpfcp-watermark.image?)

Buffer所占用的内存不是通过V8分配，属于堆外内存。 由于V8垃圾回收性能影响，将常用的操作对象用更高效和专有的内存分配回收政策来管理是个不错的思路。 

> Buffer在Node进程启动时就已经价值，并且放在全局对象（global）上。所以使用buffer无需require引入

***

## Buffer对象

Buffer对象的元素未16进制的两位数，即0-255的数值

```javascript
let buf01 = Buffer.alloc(8);
console.log(buf01);  // <Buffer 00 00 00 00 00 00 00 00>
```

可以使用`fill`填充buf的值(默认为`utf-8`编码)，如果填充的值超过buffer，将不会被写入。

> 如果buffer长度大于内容，则会反复填充

如果想要清空之前填充的内容，可以直接`fill()`

```javascript
buf01.fill('12345678910')

console.log(buf01);   // <Buffer 31 32 33 34 35 36 37 38>
console.log(buf01.toString()); // 12345678
```
如果填入的内容是中文，在`utf-8`的影响下，中文字会占用3个元素，字母和半角标点符号占用1个元素。

```javascript
let buf02 = Buffer.alloc(18, '开始我们的新路程', 'utf-8');
console.log(buf02.toString());  // 开始我们的新
```

`Buffer`受`Array类型`影响很大，可以访问length属性得到长度，也可以通过下标访问元素，也可以通过indexOf查看元素位置。

```javascript
console.log(buf02);  // <Buffer e5 bc 80 e5 a7 8b e6 88 91 e4 bb ac e7 9a 84 e6 96 b0>
console.log(buf02.length)  // 18字节
console.log(buf02[6])  // 230： e6 转换后就是 230
console.log(buf02.indexOf('我'))  // 6：在第7个字节位置
console.log(buf02.slice(6, 9).toString())  // 我: 取得<Buffer e6 88 91>，转换后就是'我'
```

如果给字节赋值不是0~255之间的整数，或者赋值时小数时，赋值小于0，将该值逐次加256.直到得到0~255之间的整数。如果大于255，就逐次减去255。 如果是小数，舍去小数部分(不做四舍五入)

***


## Buffer内存分配

`Buffer`对象的内存分配不是在V8的堆内存中，而是在Node的C++层面实现内存的申请。 因为处理大量的字节数据不能采用需要一点内存就向操作系统申请一点内存的方式。为此Node在内存上使用的是在C++层面申请内存，在`JavaScript`中分配内存的方式

`Node`采用了`slab分配机制`，`slab`是以中动态内存管理机制，目前在一些`*nix`操作系统用中有广泛的应用，比如`Linux`

`slab`就是一块申请好的固定大小的内存区域，slab具有以下三种状态：
* full：完全分配状态
* partial：部分分配状态
* empty：没有被分配状态

Node以**8KB**为界限来区分Buffer是大对象还是小对象

```javascript
console.log(Buffer.poolSize);  // 8192
```

> 这个8KB的值就额是每个slab的大小值，在JavaScript层面，以它作为单位单元进行内存的分配

### 分配小buffer对象

如果指定`Buffer`大小小于8KB，Node会按照小对象方式进行分配

1. 构造一个新的slab单元，目前slab处于empty空状态


![buffer内存分配01.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82e16d5fdb114ed2a4ae8d3516291a07~tplv-k3u1fbpfcp-watermark.image?)

2. 构造小`buffer`对象1024KB，当前的`slab`会被占用1024KB，并且记录下是从这个`slab`的哪个位置开始使用的


![buffer内存分配02.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9112d765af93400ba90556ecd1155bc1~tplv-k3u1fbpfcp-watermark.image?)

3. 这时再创建一个`buffer`对象，大小为3072KB。 构造过程会判断当前`slab`剩余空间是否足够，如果足够，使用剩余空间，并更新`slab`的分配状态。 3072KB空间被使用后，目前此slab剩余空间4096KB。


![buffer内存分配03.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f706444b4a684b778b8d1783258cac32~tplv-k3u1fbpfcp-watermark.image?)

4. 如果此时创建一个6144KB大小的`buffer`，当前slab空间不足，会构造新的`slab`（这会造成原slab剩余空间浪费）


![buffer内存分配04.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/974a7a7cc2724cf4aa2a14b767c2919c~tplv-k3u1fbpfcp-watermark.image?)

比如下面的例子中：
```javascript
Buffer.alloc(1)
Buffer.alloc(8192)
```
第一个`slab`中只会存在1字节的buffer对象，而后一个buffer对象会构建一个新的slab存放

> 由于一个slab可能分配给多个Buffer对象使用，只有这些小buffer对象在作用域释放并都可以回收时，slab的空间才会被回收。 尽管只创建1字节的buffer对象，但是如果不释放，实际是8KB的内存都没有释放

**小结：**

真正的内存是在Node的C++层面提供，JavaScript层面只是使用。当进行小而频繁的Buffer操作时，采用slab的机制进行预先申请和时候分配，使得JavaScript到操作系统之间不必有过多的内存申请方面的系统调用。 对于大块的buffer，直接使用C++层面提供的内存即可，无需细腻的分配操作。


***

<br>

## Buffer的拼接

buffer在使用场景中，通常是以一段段的方式进行传输。

```javascript
const fs = require('fs');

let rs = fs.createReadStream('./静夜思.txt', { flags:'r'});
let str = ''
rs.on('data', (chunk)=>{
    str += chunk;
})

rs.on('end', ()=>{
    console.log(str);
})
```
以上是读取流的范例，data时间中获取到的chunk对象就是buffer对象。

但是当输入流中有宽字节编码（`一个字占多个字节`）时，问题就会暴露。在`str += chunk`中隐藏了`toString()`操作。等价于`str = str.toString() + chunk.toString()`。

下面将可读流的每次读取buffer长度限制为11.

```javascript
fs.createReadStream('./静夜思.txt', { flags:'r', highWaterMark: 11});
```
输出得到：

![buffer拼接1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/938c4f68edf644c28f3443e2b6bec806~tplv-k3u1fbpfcp-watermark.image?)

上面出现了乱码`�`，上面限制了buffer长度为11，对于任意长度的buffer而言，宽字节字符串都有可能存在被截断的情况，只不过buffer越长出现概率越低。

### encoding

但是如果设置了`encoding`为`utf-8`，就不会出现此问题了。
```javascript
fs.createReadStream('./静夜思.txt', { flags:'r', highWaterMark: 11, encoding:'utf-8'});
```


![buffer拼接2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64bb5c2380d74db3aac8cb443a75c0fb~tplv-k3u1fbpfcp-watermark.image?)

<br>


**原因：** 虽然无论怎么设置编码，流的触发次数都是一样，但是在调用`setEncoding`时，可读流对象在内部设置了一个`decoder对象`。每次data事件都会通过`decoder对象`进行buffer到字符串的解码，然后传递给调用者。

`string_decoder` 模块提供了用于将 Buffer 对象解码为字符串（以保留编码的多字节 UTF-8 和 UTF-16 字符的方式）的 API

```javascript
const { StringDecoder } = require('string_decoder');
let s1 = Buffer.from([0xe7, 0xaa, 0x97, 0xe5, 0x89, 0x8d, 0xe6, 0x98, 0x8e, 0xe6, 0x9c])
let s2 = Buffer.from([0x88, 0xe5, 0x85, 0x89, 0xef, 0xbc, 0x8c, 0x0d, 0x0a, 0xe7, 0x96])
console.log(s1.toString());
console.log(s2.toString());
console.log('------------------');

const decoder = new StringDecoder('utf8');
console.log(decoder.write(s1));
console.log(decoder.write(s2));
```


![buffer拼接3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/823b6fdeb3894a688091b4f04b8327e6~tplv-k3u1fbpfcp-watermark.image?)

> `StringDecoder`在得到编码之后，知道了宽字节字符串在`utf-8`编码下是以3个字节的方式存储的，所以第一次`decoder.write`只会输出前9个字节转码的字符，后两个字节会被保留在`StringDecoder`内部。

***
<br>

<br>

## Buffer与性能

buffer在文件I/O和网络I/O中运用广泛，尤其在网络传输中，性能举足轻重。在应用中，通常会操作字符串，但是一旦在网络中传输，都需要转换成buffer，以进行二进制数据传输。 在web应用中，字符串转换到buffer是时时刻刻发生的，提高字符串到buffer的转换效率，可以很大程度地提高网络吞吐率。

如果通过纯字符串的方式向客户端发送，性能会比发送buffer对象更差，因为buffer对象无须在每次响应时进行转换。通过预先转换静态内容为buffer对象，可以有效地减少CPU重复使用，节省服务器资源。 

可以选择将页面中动态和静态内容分离，静态内容部分预先转换为buffer的方式，使得性能得到提升。

在文件的读取时，`highWaterMark`设置对性能影响至关重要。在理想状态下，每次读取的长度就是用户指定的`highWaterMark`。

`highWaterMark`大小对性能有两个影响的点：
* 对buffer内存的分配和使用有一定影响
* 设置过小，可能导致系统调用次数过多