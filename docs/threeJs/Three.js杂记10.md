---
title: Three.js杂记（十）——贴图
date: 3/24/2021, 4:27:04 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---


### 纹理贴图

- [贴图介绍](#贴图介绍)
- [简单的纹理贴图](#简单的纹理贴图)
- [canvas纹理贴图](#canvas纹理贴图)
- [video视频纹理贴图](#video视频纹理贴图)
	- [视频作为Three.js纹理贴图(VideoTexture)](#视频作为threejs纹理贴图videotexture)
- [凹凸贴图bumpMap和法线贴图normalMap](#凹凸贴图bumpmap和法线贴图normalmap)

# 贴图介绍

纹理贴图是Threejs一个很重要的内容，游戏、产品720展示、物联网3D可视化等项目程序员加载模型的同时需要处理纹理贴图。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fba9506bafd4a149aae4b191afedfa3~tplv-k3u1fbpfcp-zoom-1.image)

# 简单的纹理贴图

通过纹理贴图加载器`TextureLoader`的load()方法加载一张图片可以返回一个`纹理对象Texture`，`纹理对象Texture`可以作为模型材质颜色贴图.map属性的值。

材质的颜色贴图属性.map设置后，模型会从纹理贴图上采集像素值，这时候一般来说不需要在设置材质颜色.color。.map贴图之所以称之为颜色贴图就是因为网格模型会获得颜色贴图的颜色值RGB。\
例子：\
使用平铺的方式，将草地图片贴到`PlaneGeometry`上，图片如下：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e526efb802c74371854eaed379285364~tplv-k3u1fbpfcp-zoom-1.image)

代码：

```javascript
<div id="app"></div>
<script type="text/javascript">
	var scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	render = new THREE.WebGLRenderer({
		antialias: true
	});
	render.setPixelRatio(window.devicePixelRatio);
	render.setSize(window.innerWidth, window.innerHeight)
	/********************************************************/
	var app = document.getElementById("app");
	app.appendChild(render.domElement);
		
	var geometry = new THREE.PlaneGeometry(20, 20, 32); //平面
	var textureLoader = new THREE.TextureLoader(); // 纹理加载器
	var texture = textureLoader.load('./img/grass/grass.png'); 
	// 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	// uv两个方向纹理重复数量
	texture.repeat.set(10, 10);
	var material = new THREE.MeshBasicMaterial({
		map: texture, // 设置纹理贴图
		side: THREE.DoubleSide
	});
	var plane = new THREE.Mesh(geometry, material);
	scene.add(plane);

	// 相机
	camera.position.set(20, 20, 40); //设置相机位置
	camera.lookAt(new THREE.Vector3(0, 0, 0))
	/********************************************************/
	function animate(){
		render.render(scene, camera);
		window.requestAnimationFrame(animate);
	}
	animate();
</script>
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e38ed9e13f44898a58a58ad38bc84fc~tplv-k3u1fbpfcp-zoom-1.image)

此时纹理贴图是静止状态，如果想要一个运动的纹理贴图，可以设置`texture.offset`位置

```javascript
function animate(){
	// 设置纹理偏移
	texture.offset.x -= 0.06
	render.render(scene, camera);
	window.requestAnimationFrame(animate);
}
animate();
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c75d999283a4cb3b64c3b425ddd2510~tplv-k3u1fbpfcp-zoom-1.image)

# canvas纹理贴图

在使用贴图的过程中，贴图上可以使用不同的材质

通过Three.js类`CanvasTexture`可以分别实现把Canvas画布作为纹理贴图使用。

Canvas画布作为Three.js纹理贴图(`CanvasTexture`)\
Canvas画布可以通过2D API绘制各种各样的几何形状，可以通过Canvas绘制一个轮廓后然后作为Three.js网格模型、精灵模型等模型对象的纹理贴图。

核心代码：

```javascript
var textureLoader = new THREE.TextureLoader(); // 纹理加载器
var texture = new THREE.CanvasTexture(canvas); 
```

使用canvas当作贴图的图片，首先先创建好canvas的内容，不需要将canvas加入dom树中

```javascript
var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 128;
var c = canvas.getContext('2d');
// 矩形区域填充背景
c.fillStyle = "#ff0000";
c.fillRect(0, 0, 512, 128);
c.beginPath();
// 文字
c.beginPath();
c.translate(256, 64);
c.fillStyle = "#fff"; //文本填充颜色
c.font = "bold 28px 宋体"; //字体样式设置
c.textBaseline = "middle"; //文本与fillText定义的纵坐标
c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
c.fillText("空城机  (￣ε(#￣)☆╰╮o(￣皿￣///)", 0, 0);
```

```javascript
var geometry = new THREE.PlaneGeometry(40, 20, 32); 
var textureLoader = new THREE.TextureLoader(); // 纹理加载器
var texture = new THREE.CanvasTexture(canvas);  // canvas做画布

// 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(1, 1);

var material = new THREE.MeshBasicMaterial({
	map: texture, // 设置纹理贴图
	side: THREE.DoubleSide  // 双面
});
var box = new THREE.Mesh(geometry, material);
scene.add(box);
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00b3b4d5a6ce40759c4bba6c0b75c864~tplv-k3u1fbpfcp-zoom-1.image)

# video视频纹理贴图

通过Three.js类`VideoTexture`可以分别实现把视频作为纹理贴图使用。

## 视频作为Three.js纹理贴图(VideoTexture)

视频本质上就是一帧帧图片流构成，把视频作为Threejs模型的纹理贴图使用，就是从视频中提取一帧一帧的图片作为模型的纹理贴图，然后不停的更新的纹理贴图就可以产生视频播放的效果。

使用视频当作贴图的图片，首先先创建好video的内容，不需要将video加入dom树中\
代码：

```javascript
let video = document.createElement('video'); //创建video对象
video.src = "../img/灭世 第二季1.mp4"; // 设置视频地址
video.autoplay = "autoplay"; //要设置播放
video.loop = "loop";  //循环播放
```

核心代码：

```javascript
var textureLoader = new THREE.TextureLoader(); // 纹理加载器
var texture = new THREE.VideoTexture(video);  //视频当作贴图
```

效果：（因上传图片大小限制，删减了gif图的帧数，造成下图显示效果卡顿）\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d4a1748c4e144c9a602ee88590e466d~tplv-k3u1fbpfcp-zoom-1.image)

# 凹凸贴图bumpMap和法线贴图normalMap

一个复杂的曲面模型，往往模型顶点数量比较多，模型文件比较大，为了降低模型文件大小，法线贴图.normalMap算法自然就产生了，复杂的三维模型3D美术可以通过减面操作把精模简化为简模，然后把精模表面的复杂几何信息映射到法线贴图.normalMap上\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a0453c7bf8941d0a53ebe6300321d47~tplv-k3u1fbpfcp-zoom-1.image)\
在之前的一篇文章中，其实就已经使用贴图制作了一个旋转的地球模型了，具体可参考：[Three.js杂记（九）—— 练习：地球](https://blog.csdn.net/qq\_36171287/article/details/113955747?spm=1001.2014.3001.5501)

之前的地球上并没有什么山脉突起，只是一个平面图。而现在，可以使用发现贴图，来造成山脉的效果\
法线贴图：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0271ca6cf4946b8a6246de519c4c012~tplv-k3u1fbpfcp-zoom-1.image)

代码：

```javascript
var textureLoader = new THREE.TextureLoader(); // 纹理加载器
var texture = textureLoader.load('./img/earth/css_globe_diffuse.jpg'); // 加载图片，返回Texture对象
// 加载法线贴图
var textureNormal = textureLoader.load('./img/earth/earth_normal_2048.jpg');

var material = new THREE.MeshPhongMaterial({
	map: texture, // 设置纹理贴图
	normalMap: textureNormal, //法线贴图
    //设置深浅程度，默认值(1,1)。
    normalScale: new THREE.Vector2(1.2, 1.2),
});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3992789c14a43609a4cfdfc914cb713~tplv-k3u1fbpfcp-zoom-1.image)
