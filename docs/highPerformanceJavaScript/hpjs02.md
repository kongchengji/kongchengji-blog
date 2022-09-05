---
title: 高性能JavaScriptの笔记（二）
date: 2021/05/21
tags:
 - 高性能JavaScript
 - 前端
 - 性能优化
categories:
 - 高性能JavaScript
---

# DOM操作
访问DOM次数越多，耗费的性能也就越高

通常经验法则是减少访问DOM次数，把运算尽量留在ECMAScript这一端处理

## 元素节点
大部分现代浏览器提供的API只返回元素节点，**如果可用的话推荐使用这些API**

因为这些API的执行效率比在JavaScript代码中实现过滤的效率要高

比如：使用children比childNodes效率更高，集合相更少
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-tyLe1QZO-1621085803712)(en-resource://database/536:1)\]](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/121e100862334261a414034f7caa93c0~tplv-k3u1fbpfcp-zoom-1.image)



## 重绘和重排（回流）
具体可以参考：[HTML 回流与重绘](https://xie.infoq.cn/article/a8bedc099254cbe20757032bc)

对DOM元素进行一系列操作时，可以通过以下步骤减少重绘和重排：
1. 使元素脱离文档流
2. 对其应用多重改变
3. 把元素带回文档中

这三步过程中触发两次重排——第一步和第三步。  但是在第二步操作中将会产生很多次重排

有三种基本方式可以使得DOM脱离文档：
* 隐藏元素。应用修改，重新显示 -- display:none
* 使用文档片段（docuement fragment）在当前DOM之外构建一个子树（createDocumentFragment），再把它拷贝回文档
```javascript
<script>
    const fragment = document.createDocumentFragment();
    const fruits = ['Apple', 'Orange', 'Banana', 'Melon'];
    fruits.forEach(fruit => {
        const li = document.createElement('li');
        li.innerHTML = fruit;
        fragment.appendChild(li);
    });
    document.getElementById('a').append(fragment)
</script>
```
* 将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素


## 事件委托
当页面存在大量元素，且每个元素都绑定事件处理器（比如onclick方法），这种情况会影响性能

每绑定一个事件处理器都是有代价：
* 要么加重了页面的负担（更多的标签或JavaScript代码）
* 要么增加了运行期的执行时间

DOM事件要经历三个阶段：
* 捕获
* 直到达到目标元素
* 冒泡


### DOM 事件机制
1. 事件流html 元素触发事件的顺序。
2. 事件捕获（从外向内）

	* 网景的事件流叫做事件捕获，从外向内，找监听函数，叫事件捕获；

3. 事件冒泡（从内向外）

	* IE的事件流叫做事件冒泡(event bubbling)，从内向外，找监听函数，叫事件冒泡；

4. 取消冒泡

	*  捕获不可取消，但是冒泡可取消

	*  e.stopPropagation() 可中断冒泡，浏览器不在向上走；


### 事件委托
事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

### 事件委托的原理
事件从最深的节点开始，然后逐步向上传播事件；

### 事件委托的性能优化

原理： 基于这样一个事实，事件逐层冒泡并能被父级元素捕获。使用事件代理，只需要给外层元素绑定一个处理器，就可以处理在其子元素上触发的所有事件，比如使用target判断元素

例子：
点击某一行的苹果，这一行的背景颜色改变orange，文字变成橙子
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0943a3e022b24882b0e23b80ad41692d~tplv-k3u1fbpfcp-zoom-1.image)


如果给每一个li标签添加onclick事件，对性能会造成较大消耗，所以可以给ul绑定onclick事件
代码：
```javascript
<ul id="a" onclick="aclick()">
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
        <li class="ali"> 苹果 </li>
    </ul>
    <script>
        function aclick(e) {
            var e = e || window.event;
            e.target.style.cssText = 'background-color:orange';
            e.target.innerText = '橙子';
        }
    </script>
```
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6aa00a70b974619bd0e86434a47e18e~tplv-k3u1fbpfcp-zoom-1.image)

## 小节
***平时写代码时可以优化的点①：***

减少重绘和回流，要进行多次DOM操作时，最好将这部分先从文档流中脱离，然后处理好后放回文档流中

***平时写代码时可以优化的点②：***

使用事件代理，只需要给外层元素绑定一个处理器，就可以处理在其子元素上触发的所有事件，比如使用target判断元素



## 学习来源：[《高性能JavaScript-中文版》（仅供学习使用）](https://gitee.com/wzckongchengji/high_performance_javascript)