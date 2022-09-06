---
title: Three.js杂记（八）—— 文本几何体
date: 3/24/2021, 4:27:08 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---



# 文本几何体

- [文本几何体](#文本几何体)
	- [FontLoader](#fontloader)
	- [TextGeometry](#textgeometry)
	- [中文乱码问题](#中文乱码问题)
	- [字体包](#字体包)

## FontLoader

在three.js中，如果想要显示出文本文字的效果，可以使用FontLoader，这是使用JSON格式中加载字体的一个类。返回Font, 返回值是表示字体的Shape类型的数组。 其内部使用FileLoader来加载文件。\
`var loader = new THREE.FontLoader();`

## TextGeometry

使用FontLoader后，生成几何体时，可以使用TextGeometry。一个用于将文本生成为单一的几何体的类。 它是由一串给定的文本，以及由加载的Font（字体）和该几何体ExtrudeGeometry父类中的设置所组成的参数来构造的。\
核心：

```javascript
// 文本几何体
var loader = new THREE.FontLoader(); 

loader.load( './Json/helvetiker_regular.typeface.json', function ( font ) { 
	geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 100,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 2,
		bevelSegments: 5
	} );
})
```

使用示例：

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>day09_TweenMax学习</title>
		<script src="./js/three.js" type="text/javascript" charset="utf-8"></script>
		<script src="./js/OrbitControls.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
		</style>
	</head>
	<body>
		<div id="app"></div>
		
		<script type="text/javascript">
			var scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
			render = new THREE.WebGLRenderer({
				antialias: true
			});
			render.setPixelRatio(window.devicePixelRatio);
			render.setSize(window.innerWidth, window.innerHeight)
			
			var app = document.getElementById("app");
			app.appendChild(render.domElement);
			/********************************************************/
			// 文本几何体
			var loader = new THREE.FontLoader();
			var geometry;
			var material = new THREE.MeshBasicMaterial( {
				color: '#ff0000' ,
			} );
			
			loader.load( './Json/helvetiker_regular.typeface.json', function ( font ) { 
				geometry = new THREE.TextGeometry( 'Hello three.js!', {
					font: font,
					size: 100,
					height: 5,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 10,
					bevelSize: 2,
					bevelSegments: 5
				} );
				
				var mesh = new THREE.Mesh( geometry, material );
				mesh.scale.set(0.03,0.03,0.03);
				scene.add(mesh)
			})
			
			// 相机
			camera.position.set(20, 20, 40); //设置相机位置
			camera.lookAt(new THREE.Vector3(0, 0, 0))
			
			// 鼠标控件
			var controls = new THREE.OrbitControls(camera, render.domElement);
			
			/********************************************************/
			function animate() {
				render.render(scene, camera);
				window.requestAnimationFrame(animate);
			}
			animate();
		</script>
		
	</body>
</html>
```

具体效果：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89359b26abd1425dbd859bf5331c4265~tplv-k3u1fbpfcp-zoom-1.image)

## 中文乱码问题

如果将文字内容修改为中文，就会出现乱码现象\
`Hello three.js! --- > 你好 three.js!`

显示样式：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f852e0e8fef481b95d0acc326f44422~tplv-k3u1fbpfcp-zoom-1.image)\
这是由于使用的**helvetiker_regular.typeface.json**不支持中文的缘故\
之后我使用了**Microsoft YaHei_Regular.json**，可以使得中文正常显示

```javascript
loader.load( './Json/Microsoft YaHei_Regular.json', function ( font ) { 
	geometry = new THREE.TextGeometry( '你好 three.js!', {
		font: font,
		size: 100,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 2,
		bevelSegments: 5
	} );
	
	var mesh = new THREE.Mesh( geometry, material );
	mesh.scale.set(0.03,0.03,0.03);
	scene.add(mesh)
})
```

显示样式：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/158cf09360b1498db79379f7e615833b~tplv-k3u1fbpfcp-zoom-1.image)

## 字体包

使用的字体包Microsoft YaHei_Regular.json和helvetiker_regular.typeface.json可以从下面两个地方进行下载：\
百度网盘：<https://pan.baidu.com/s/1T8SLJs7HLkum2cSE3kqCTQ>\
提取码：730t

CSDN下载：<https://download.csdn.net/download/qq_36171287/15365234>

也可以使用Facetype.js进行转换 [Facetype.js](https://gero3.github.io/facetype.js/)
