---
title: Three.js杂记（三）——物体运动
date: 3/24/2021, 4:27:45 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---


## 物体运动

在three.js中想要让静止的物体呈现出运动效果有两种方法：

1. 让物体geometry进行运动
2. 让相机camera进行运动

测试代码： 让圆柱体进行移动，实际移动的是相机。\
圆柱体可以使用EdgesGeometry绘制边框线

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>运动</title>
		<script src="js/three.js"></script>
	</head>
	<body>
			<div id="app"></div>
			<script>
				// 创建场景
				var scene = new THREE.Scene();
				// 创建相机   参数：视角、视角比例（宽度和高度比）、最近像素、最远像素
				camera = new THREE.PerspectiveCamera(105,
					window.innerWidth / window.innerHeight, 1, 1000);	
				// 渲染器
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
					// 1.照相机移动
					camera.position.y -= 0.05;
					if(camera.position.y < -10) {
						camera.position.z += 0.05;
					}
					
					render.render(scene, camera);
				}
				setInterval(animate,10);
		</script>
	</body>
</html>
```

效果：\
![柱体模拟孔明灯放飞效果](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97bdfba28c0b4b408a1617a100aede51~tplv-k3u1fbpfcp-zoom-1.image)\
如果是让物体移动，将运动函数稍作修改即可

```javascript
// 产生动效
function animate(){
	// if(camera.position.y >= -1000){
	// 	// 1.照相机移动
	// 	camera.position.y -= 0.3;
	// 	if(camera.position.y < -10) {
	// 		camera.position.z += 0.3;
	// 	}
	// }
	//2.物体移动
	meshs.position.y += 0.3;
	if(meshs.position.y > 10) { 
		meshs.position.z -= 0.3;
	}
	render.render(scene, camera);
	window.requestAnimationFrame(animate);
}
```

## 性能

在实际生活中，经常可以看到绘制出来的动画效果，而有些动画效果看起来非常流畅，有些则是十分卡顿。这些与程序运动后的性能息息相关。\
\
\
关于性能：测试一个程序，性能上是否有瓶颈，在3D世界里，经常使用帧数的概念，首先我们来定义一下帧数的意义。

帧数：图形处理器每秒钟能够刷新几次，通常用fps（Frames Per Second）来表示

物体运动在人眼中：\
当物体在快速运动时,当人眼所看到的影像消失后，人眼仍能继续保留其影像1/24秒左右的图像，这种现象被称为视觉暂留现象。是人眼具有的一种性质。人眼观看物体时，成像于视网膜上，并由视神经输入人脑，感觉到物体的像。一帧一帧的图像进入人脑，人脑就会将这些图像给连接起来，形成动画。

在three.js中，为了能让我们更好的看到这些数据，就可以使用性能监视器Stats去对运动做出检测管理。

### 性能监视器Stats

关于Stats官方介绍：https\://github.com/mrdoob/stats.js\
在下载Three.js后也可以在文件夹中找到，从GitHub上下载可能有些慢，我是从gitee上下载的。给出几个链接：\
[three.js下载地址01](https://gitee.com/lyon_en/three.js?\_from=gitee_search)\
[three.js下载地址02](https://gitee.com/kitlab/three.js?\_from=gitee_search)\
[GitHub地址](https://github.com/mrdoob/three.js)\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46b6bf665de44dcda3bbc9bbe139b647~tplv-k3u1fbpfcp-zoom-1.image)\
在使用时记得引入stats文件，一般来说使用的效果如下：\
1、setMode函数

参数为0的时候，表示显示的是FPS界面，参数为1的时候，表示显示的是MS界面。

2、stats的domElement

stats的domElement表示绘制的目的地（DOM），波形图就绘制在这上面。

3、stats的begin函数

begin，在你要测试的代码前面调用begin函数，在你代码执行完后调用end()函数，这样就能够统计出这段代码执行的平均帧数了。\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f08c805b19f846a2894ad0c3adb0407f~tplv-k3u1fbpfcp-zoom-1.image)\
使用方法：在代码中插入即可

1. new 一个stats对象，代码：stats = new Stats();
2. 将这个对象加入到html网页中去
3. 调用stats.update()函数来统计时间和帧数

```javascript
// 性能监视器
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms
// 将stats的界面对应左上角
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '30px';
stats.domElement.style.top = '0px';
app.appendChild( stats.domElement );

// 在运动函数中写入stats.update();
function animate(){
	if(camera.position.y >= -1000){
		// 1.照相机移动
		camera.position.y -= 0.3;
		if(camera.position.y < -10) {
			camera.position.z += 0.3;
		}
	}
	render.render(scene, camera);
	window.requestAnimationFrame(animate);
	stats.update();
}
```

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e4d26c1ea624078a18aea72cf8a1842~tplv-k3u1fbpfcp-zoom-1.image)
