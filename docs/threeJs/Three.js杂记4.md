---
title: Three.js杂记（四）—— 更好的运动：TweenMax
date: 3/24/2021, 4:27:43 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---



## 运动效果

在之前的three.js运动效果制作时可以通过移动相机和移动物体来产生动画的效果。\
在实际中开发中，移动相机和移动物体是在渲染循环里去移动相机或者物体的位置。如果动画稍微复杂一些，这种方式实现起来就比较麻烦一些了。\
这时候就又要学新东西了，比如说——动画引擎…\
\
\
（吐槽：我是从工作需求中因为IE浏览器兼容性放弃了CSS animation动画，然后去用canvas解决了问题。之后就对这个有兴趣 ，开始学起来，学了canvas之后，又发现three.js，然后才开始学就发现好的效果用动画引擎比较好，发现了Tween.js，一比较觉得TweenMax更流畅，然后就…只能学了，都给我学(◔‸◔））

TweenMax官网：<https://www.tweenmax.com.cn/>\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e56d1ac52506457d97eff4c325f90ea3~tplv-k3u1fbpfcp-zoom-1.image)\
有关TweenMax引入以及使用方法：<https://www.tweenmax.com.cn/start/init/>\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/240bc93aa3f8421da702b95a39f6a4a9~tplv-k3u1fbpfcp-zoom-1.image)

### 使用方法

#### 1、加载TweenMax文件

与所有的前端插件一样，必须要加载核心工具TweenLite.min.js或者TweenMax.min.js。

TweenMax其他的还有一些相应的插件，如下。加载了相应的插件后即可使用相应的功能。

```javascript
<script src="js/greensock-js/TweenLite.min.js"> </script>  -- 核心工具，可初始化TweenLite对象
<script src="js/greensock-js/plugins/CSSPlugin.min.js"> </script>  -- 基础插件，用于制作CSS动画2D，3D动画
<script src="js/greensock-js/plugins/BezierPlugin.min.js"> </script>  -- 基础插件，用于制作贝塞尔曲线
<script src="js/greensock-js/TimelineLite.min.js"> </script>  -- 核心工具，创建时间轴管理动画
<script src="js/greensock-js/easing/EasePack.min.js"> </script>  -- 拓展的时间曲线，例如bounce
```

建议在开发中使用TweenMax这个全功能的js文件，它包括了GreenSock动画平台的大部分核心功能。\
使用TweenMax上面的加载可以简约为：

```javascript
<script src="js/greensock-js/TweenMax.min.js"> </script>
```

#### 2、制作动画

动画的三要素：

1. 动画目标对象
2. 动画的持续时间
3. 变化的属性

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8315ae4a971d47978e1676f3b285e48f~tplv-k3u1fbpfcp-zoom-1.image)

#### 和Three配合使用示例：

TweenMax中移动采用了onUpdate去改变\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01d8a90163604d19ba811c599e89d2ac~tplv-k3u1fbpfcp-zoom-1.image)

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>TweenMax学习</title>
		<script src="../js/three.js" type="text/javascript" charset="utf-8"></script>
		<script src="Js/TweenMax.min.js" type="text/javascript" charset="utf-8"></script>
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
			camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 1, 1000);
			render = new THREE.WebGLRenderer({
				antialias: true
			});
			render.setPixelRatio(window.devicePixelRatio);
			render.setSize(window.innerWidth, window.innerHeight)
			
			var app = document.getElementById("app");
			app.appendChild(render.domElement);
			/*****************************************************************/
			var geometry = new THREE.CylinderGeometry(10, 10, 20, 15);
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
			
			camera.position.z = 40;
			camera.position.y = 20;
			camera.position.x = 0;
			render.render(scene, camera);
			/*****************************************************************/
			// 产生动效
			var TweenMax = new TimelineMax(); // 必须创建对象
			// 参数： 指定的目标obj
			TweenMax.to(meshs.position, 3, {
				onUpdate:function(){
					meshs.position.y += 0.3;
					if(meshs.position.y > 25) { 
						meshs.position.z -= 0.3;
					}
				},
			});
			// 重复一次上面步骤，因为只用了onUpdate，所以相当于将时间延长3秒
			// TweenMax.repeat(1);
			
			function animate(){
				render.render(scene, camera);
				window.requestAnimationFrame(animate);
			}
			animate();

		</script>
		
	</body>
</html>
```

效果：\
![放飞](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/475a8a55d272430f9f22bd18033c8d94~tplv-k3u1fbpfcp-zoom-1.image)
