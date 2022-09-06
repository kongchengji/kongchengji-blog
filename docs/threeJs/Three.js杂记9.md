---
title: Three.js杂记（九）—— 练习：地球
date: 3/24/2021, 4:27:06 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---


# 制作地球

* [效果](#\_2)
* [主要原理](#\_6)
* [代码](#\_22)
* [素材](#\_116)

## 效果

上传图片大小限制，减少了gif的帧数\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec6173a500bf4dafa16421361eced64b~tplv-k3u1fbpfcp-zoom-1.image)

## 主要原理

制作地球的练习原理比较简单，主要使用了贴图的效果。先构建一个球缓冲几何体，然后将地球表面图的素材贴过去\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8392ba1709184b99ab67844bea3cbb34~tplv-k3u1fbpfcp-zoom-1.image)\
主要代码：

```javascript
var geometry = new THREE.SphereBufferGeometry(34, 50, 50);
var textureLoader = new THREE.TextureLoader(); // 纹理加载器
var texture = textureLoader.load('./img/earth/css_globe_diffuse.jpg'); // 加载图片，返回Texture对象
var material = new THREE.MeshBasicMaterial({
	map: texture, // 设置纹理贴图
});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
```

## 代码

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>地球</title>
		<!-- three.js和OrbitControls.js来自three的下载 -->
		<script src="./js/three.js" type="text/javascript" charset="utf-8"></script>
		<script src="./js/OrbitControls.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css">
			* {
				margin: 0;
				padding: 0;
			}

			.bg {
				width: 100%;
				height: 100%;
				background: url(./img/earth/css_globe_bg.jpg) no-repeat center center;
				background-size: 100% 100%;
				position: absolute;
				z-index: -1;
			}
			.border_bg {
				width: 730px;
				height: 715px;
				margin: 0 auto;
				background: url(./img/earth/css_globe_halo.png) no-repeat -2px 7px;
				background-size: 100% 100%;
			}
			#app {
				width: 730px;
				height: 715px;
				margin: 0 auto;
			}
		</style>
	</head>
	<body>
		<div class="bg">
			<div class="border_bg"></div>
		</div>
		<div id="app"></div>

		<script type="text/javascript">
			var scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(105, 730 / 715, 1, 1000);
			render = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true    //设置canvas为背景透明
			});
			render.setPixelRatio(window.devicePixelRatio);
			render.setSize(730, 715)
			
			/********************************************************/
			var app = document.getElementById("app");
			app.appendChild(render.domElement);

			var geometry = new THREE.SphereBufferGeometry(34, 50, 50);

			var textureLoader = new THREE.TextureLoader(); // 纹理加载器
			var texture = textureLoader.load('./img/earth/css_globe_diffuse.jpg'); // 加载图片，返回Texture对象

			var material = new THREE.MeshBasicMaterial({
				map: texture, // 设置纹理贴图
			});
			var sphere = new THREE.Mesh(geometry, material);
			scene.add(sphere);


			// 相机
			camera.position.set(20, 20, 40); //设置相机位置
			camera.lookAt(new THREE.Vector3(0, 0, 0))
			// 鼠标控件
			var controls = new THREE.OrbitControls(camera, render.domElement);
			render.domElement.removeAttribute('tabindex');   //去除鼠标控件使用时的白色边框
			// 坐标轴
			// var axisHelper = new THREE.AxisHelper(100);
			// scene.add(axisHelper)
			/********************************************************/
			function animate() {
				// meshs.rotation.y += 0.03;
				render.render(scene, camera);
				window.requestAnimationFrame(animate);
			}
			animate();
		</script>

	</body>
</html>
```

## 素材

![星空背景](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53b336255d6a49c3a8fe950dce1ed726~tplv-k3u1fbpfcp-zoom-1.image)\
![地球图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c068d56162dd44b997e2f28665b9828d~tplv-k3u1fbpfcp-zoom-1.image)\
![地球外圈](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a44684e94aa646e5b6f0f0bb7013b411~tplv-k3u1fbpfcp-zoom-1.image)
