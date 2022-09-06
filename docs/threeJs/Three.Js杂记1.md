---
title: Three.Js杂记（一）-- 起步
date: 3/24/2021, 4:27:52 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---


# Three.js

Three.js是基于原生WebGL封装运行的三维引擎，在所有WebGL引擎中，Three.js是国内文资料最多、使用最广泛的三维引擎。\
Three.js通俗的讲就是制作3D效果的js插件

## 兼容性问题

### 移动端

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1aa57aaf546a4b9e96711c4d3d6ef894~tplv-k3u1fbpfcp-zoom-1.image)

### PC端

Google Chrome 9+、Firefox 4+、Opera 15+、Safari 5.1+、Internet Explorer 11 和 Microsoft Edge\
可以使用Detector.js文件进行检测，可在网上进行下载，也可以直接copy下面的代码\
查看版本：***THREE.REVISION***

#### Detector.js代码如下：

```javascript
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function () {
        try {
            var canvas = document.createElement('canvas');
            return !!( window.WebGLRenderingContext && ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );
        } catch (e) {
            return false;
        }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    getWebGLErrorMessage: function () {

        var element = document.createElement('div');
        element.id = 'webgl-error-message';
        element.style.fontFamily = 'monospace';
        element.style.fontSize = '13px';
        element.style.fontWeight = 'normal';
        element.style.textAlign = 'center';
        element.style.background = '#ffd598';
        element.style.color = '#000';
        element.style.padding = '1em 0';
        element.style.position = 'absolute';
        element.style.top = '0';
        element.style.left = '0';
        element.style.width = '100%';
        element.style.zIndex = '10';

        if (!this.webgl) {
            element.innerHTML = window.WebGLRenderingContext ?
                '您的显卡似乎不支持 <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>。<br />点击 <a href="http://get.webgl.org/" style="color:#000">这里</a> 查看如何获取WebGL支持'
                :
                '您的浏览器似乎不支持 <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>。<br />点击 <a href="http://get.webgl.org/" style="color:#000">这里</a> 查看如何获取WebGL支持';
        }
        return element;

    },

    addGetWebGLMessage: function (parameters) {
        var parent, id, element;
        parameters = parameters || {};
        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';
        element = Detector.getWebGLErrorMessage();
        element.id = id;
        parent.appendChild(element);
    }
};
```

#### 使用Detector.js测试代码

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script src="js/vue.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/Detector.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="container"></div>
		<script type="text/javascript">
			if (Detector.webgl) {    
			} else {
			    var warning = Detector.getWebGLErrorMessage();
			    document.getElementById('container').appendChild(warning);
			} 
		</script>
	</body>
</html>
```

效果：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d607b6ecf4c444abb68f826bb0cfa11~tplv-k3u1fbpfcp-zoom-1.image)



## Three.js四大组件

### 场景 scene

在Threejs中场景就只有一种，用THREE.Scene来表示，要构件一个场景也很简单，只要new一个对象就可以了，代码如下：var scene = new THREE.Scene();\
相当于舞台

### 相机

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/342aa7cd6c2040319622baaef2b02d10~tplv-k3u1fbpfcp-zoom-1.image)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa23eb92ea6e4d3b9709aed3e6f19263~tplv-k3u1fbpfcp-zoom-1.image)\
相机分为两种：

* 透视相机：透视投影符合人们心理习惯，即离视点近的物体大，离视点远的物体小，远到极点即为消失，成为灭点。透视相机并非真的“透视”
* 正投影相机：就是远处和近处是一样大的。




### 渲染器

渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制\
相当于一个画笔，将内容绘制在画布也就是场景之上

渲染有两种方式：实时渲染和离线渲染 。

先看看离线渲染，想想《西游降魔篇》中最后的佛主，他肯定不是真的，是电脑渲染出来的，其画面质量是很高的，它是事先渲染好一帧一帧的图片，然后再把图片拼接成电影的。这就是离线渲染。如果不事先处理好一帧一帧的图片，那么电影播放得会很卡。CPU和GPU根本没有能力在播放的时候渲染出这种高质量的图片。

实时渲染：就是需要不停的对画面进行渲染，即使画面中什么也没有改变，也需要重新渲染。



### 物体

物体是要绘制到scene场景中的东西，比如最简单的Geometry立方体或者圆体，也可以导入3D模型。



#### 几何体本质

查看下面一段代码，你可以看出来立方体网格模型Mesh是由立方体几何体geometry和材质material两部分构成，立方体几何体BoxGeometry本质上就是一系列的顶点构成，只是Threejs的APIBoxGeometry把顶点的生成细节封装了，用户可以直接使用。比如一个立方体网格模型，有6个面，每个面至少两个三角形拼成一个矩形平面，每个三角形三个顶点构成，对于球体网格模型而言，同样是通过三角形拼出来一个球面，三角形数量越多，网格模型表面越接近于球形。

参考：[Three.js - EdgesGeometry 几何体边框辅助线](https://blog.csdn.net/ithanmang/article/details/81531822)

代码：

```html
<body>
	<div id="app"></div>
		
	<script>
		// 创建场景
		var scene = new THREE.Scene();
		
		// 创建相机   参数：视角、视角比例（宽度和高度比）、最近像素、最远像素
		camera = new THREE.PerspectiveCamera(105,
			window.innerWidth / window.innerHeight, 1, 1000);
		
		// 渲染器
		// 把眼睛看到的大千世界绘制到HTML页面中
		render = new THREE.WebGLRenderer({
			antialias: true
		});
		// 计算处理dpi
		render.setPixelRatio(window.devicePixelRatio);
		// 设置画布大小
		render.setSize(window.innerWidth, window.innerHeight)
		
		var app = document.getElementById("app");
		// 绘制出一个canvas小面板
		app.appendChild(render.domElement);
		
		// 创造一个立方体, 点模型
		var geometry = new THREE.CylinderGeometry(10, 10, 20, 15); //创建一个立方体几何对象Geometry
		// 创造一个立方体, 网格模型
		var material3 = new THREE.MeshBasicMaterial({
			color: 0xffff00,
		}); 
		var meshs = new THREE.Mesh(geometry, material3);
		// 创建物体的边框线
		var geoEdges = new THREE.EdgesGeometry(geometry, 1);
		var edgesMtl =  new THREE.LineBasicMaterial({color: 0xff0000});
		var geoLine = new THREE.LineSegments(geoEdges, edgesMtl);
		
		meshs.add(geoLine);
		scene.add(meshs);
		//执行渲染操作   指定场景、相机作为参数
		camera.position.z = 40;
		camera.position.y = 20;
		camera.position.x = 0;
		render.render(scene, camera);
		
		// 产生动效
		function animate(){
			render.render(scene, camera);
		}
		setInterval(animate,100);
	</script>
</body>
```

效果：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88777e0c035649afa94e57be56e1a450~tplv-k3u1fbpfcp-zoom-1.image)
