---
title: Three.js杂记（十一）—— 精灵与粒子（绘制中国地图）
date: 3/24/2021, 4:27:02 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---

<!--more-->

### 精灵模型Sprite

- [精灵模型Sprite简介](#精灵模型sprite简介)
- [Sprite和SpriteMaterial](#sprite和spritematerial)
- [Sprite用途](#sprite用途)
- [练习：中国城市粒子地图](#练习中国城市粒子地图)
- [地图数据](#地图数据)

# 精灵模型Sprite简介

[精灵模型对象Sprite](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Sprite)。精灵模型对象和网格模型一样需要设置材质，不过精灵模型不需要程序员设置几何体，Threejs系统渲染的时候会自动设置。

通过Threejs精灵模型可以给场景中模型对象设置标签，也可以生成大量精灵模型对象模拟一个粒子系统

Three.js的精灵模型对象Sprite和Threejs的网格模型Mesh一样都是模型对象，基类都是Object3D,关于精灵模型对象Sprite的方法和属性除了可以查看文档Sprite，也可以查看基类Object3D。

创建精灵模型对象Sprite和创建网格模型对象一样需要创建一个材质对象，不同的地方在于创建精灵模型对象不需要创建几何体对象Geometry，精灵模型对象本质上你可以理解为已经内部封装了一个平面矩形几何体PlaneGeometry，***矩形精灵模型与矩形网格模型的区别在于精灵模型的矩形平面会始终平行于Canvas画布***。

如果你想理解精灵模型的本质可以阅读官方文件three.js-master精灵模型对象的封装源码`\src\objects\Sprite.js`、解析渲染精灵模型的源码`\src\renderers\webgl\WebGLSpriteRenderer.js`。

# Sprite和SpriteMaterial

通过Sprite创建精灵模型不需要几何体，只需要给构造函数Sprite的参数设置为一个[精灵材质SpriteMaterial](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/SpriteMaterial)即可。

精灵材质对象SpriteMaterial和普通的网格材质一样可以设置颜色.color、颜色贴图.map、开启透明.transparent、透明度.opacity等属性，精灵材质对象SpriteMaterial的基类是[材质Material](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/Material)。

# Sprite用途

说到精灵模型对象，这种情况下你肯定关心它的用途，关于用途，你可以在三维场景中把精灵模型作为一个模型的标签，标签上可以显示一个写模型的信息，你可以通过足够多的精灵模型对象，构建一个粒子系统，来模拟一个下雨、森林、或下雪的场景效果。

# 练习：中国城市粒子地图

先准备一份载有中国各个城市位置的Json数据文件，如下所示即可，具体数据在文本最下方\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5a96ed7c54945f28a80728f00f8537c~tplv-k3u1fbpfcp-zoom-1.image)\
可以准备一张纹理图片\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/230d909d00504d81a6ca02c8960d3e38~tplv-k3u1fbpfcp-zoom-1.image)\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa8dfa83484144ad88d8dac0f3dd41a2~tplv-k3u1fbpfcp-zoom-1.image)

显示效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5dc91945d8b4c0fb556d20cb1918177~tplv-k3u1fbpfcp-zoom-1.image)

如果不使用纹理贴图效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed751b23532c4306acbef6a40601c866~tplv-k3u1fbpfcp-zoom-1.image)\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1b91f139a084ab5a830aa2207dcd070~tplv-k3u1fbpfcp-zoom-1.image)

难点：编写粒子地图，在鼠标的移动过程中需要获取对应的城市粒子模型，在这里使用了[光线投射Raycaster](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Raycaster)。光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。

最终代码如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>粒子地图</title>
		<!-- 来自three.js文件包 -->
		<script src="../js/three.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/OrbitControls.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			#cityInfo {
				background-color: #F3E9B4;
				position: absolute;
				z-index: 10;
				top: 100px;
				left: 375px;
			}
		</style>
	</head>
	<body>
		<div id="app"></div>
		<div id="cityInfo">全国</div>
		
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
			var group = new THREE.Group();  // 创建组对象，包含所有精灵对象
			var loader = new THREE.FileLoader().setResponseType('json');  // 文件加载对象
			let texture = new THREE.TextureLoader().load("../img/sprite/sprite.png");  // 粒子贴图
			
			// 进行光线投射来获取鼠标坐标点
			var raycaster = new THREE.Raycaster();
			var mouse = new THREE.Vector2();
			
			// 加载json文件资料
			loader.load('../img/sprite/chinaCity.json', function(data) {
				//遍历数据
				for (let elem in data) { 
					
					if (elem.indexOf('北京') > -1) { var color = '#FF0000' } else { var color = '#1A41E5' }
					// 精灵材质
					let spriteMaterial = new THREE.SpriteMaterial({
						color: color,
						transparent: true,
						opacity: 0.6,
						map: texture,//设置精灵纹理贴图
					})
					let sprite = new THREE.Sprite(spriteMaterial);   // 创建精灵模型对象
					sprite.title = elem;  // 给精灵模型添加title属性
					group.add(sprite);
					sprite.scale.set(0.5, 0.5, 1);
					//获得城市坐标设置精灵模型对象的位置
					sprite.position.set(data[elem][0], data[elem][1], 0)
				}
				scene.add(group);//把精灵群组插入场景中
				// 中国城市坐标整体的几何中心不在坐标原点，需要适当的平移
				group.position.set(-110, -30, 0);
				let hainanSpriteMaterial = new THREE.SpriteMaterial({
					map: new THREE.TextureLoader().load("../img/sprite/hainan9.jpg"),//设置精灵纹理贴图
				})
				let hainanSprite = new THREE.Sprite(hainanSpriteMaterial); 
				hainanSprite.position.set(120, 16, 0);
				hainanSprite.scale.set(8, 8);
				hainanSprite.title = '海南九段图'
				group.add(hainanSprite);
			})
			
			function onMouseMove( event ) {
				// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}
			window.addEventListener( 'mousemove', onMouseMove, false );
			
			scene.background = new THREE.Color('#fff'); //设置场景颜色
			camera.position.set(20, 20, 60); //设置相机位置
			camera.lookAt(new THREE.Vector3(0, 0, 0))
			// 鼠标控件
			var controls = new THREE.OrbitControls(camera, render.domElement);
			/********************************************************/
			let currentSprite = null, currentSpriteTitle = '';
			function animate(){
				// 通过摄像机和鼠标位置更新射线
				raycaster.setFromCamera( mouse, camera );
				// 计算物体和射线的焦点    true代表包括后代模型
				let intersects = raycaster.intersectObjects( scene.children, true );
				
				if (intersects.length > 0) {  //判断鼠标移动到的模型数量
					if (currentSprite != intersects && currentSprite) {
						for (let i = 0; i < currentSprite.length; i++ ) {
							if (currentSprite[i].object.title.indexOf('北京') > -1) { currentSprite[i].object.material.color.set( '#FF0000' ); } 
							else { currentSprite[i].object.material.color.set( '#1A41E5' ); }
							if (currentSprite[i].object.title == '海南九段图') currentSprite[i].object.material.color.set('#FFF')
						}
					}
					for (let i = 0; i < intersects.length; i++ ) {
						if (intersects[i].object.title == '海南九段图') intersects[i].object.material.color.set('#FFF')
						else intersects[i].object.material.color.set( '#F7AA07' );
					}
					currentSprite = intersects;
					if (!currentSpriteTitle || currentSpriteTitle != currentSprite[0].object.title) {    // 判断是否在城市上，和城市名是否改变
						currentSpriteTitle = currentSprite[0].object.title;
						showCity(currentSpriteTitle, true)
					}
				}
				render.render(scene, camera);
				window.requestAnimationFrame(animate);
			}
			function showCity(name, flag) {  //显示当前鼠标移动到的城市名称
				if (flag) {
					document.getElementById('cityInfo').style.visibility = 'visible';
					document.getElementById('cityInfo').innerText = name;
				}
				else document.getElementById('cityInfo').style.visibility = 'hidden';
			}
			animate();
		</script>
		
	</body>
</html>
```

# 地图数据

上传至CSDN：[中国城市坐标位置](https://download.csdn.net/download/qq\_36171287/15514914)
