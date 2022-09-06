---
title: Three.js杂记（六）——3D模型
date: 3/24/2021, 4:27:36 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---



在three.js程序的制作与编写过程中，当然不可避免的会遇到一个问题

## 3D模型的导入

3D模型由顶点(vertex)组成，顶点之间连成三角形或四边形（在一个平面上），多个三角形或者四边形就能够组成复杂的立体模型

虽然在three.js可以使用提供的几何图形去堆积起一个3D模型，奈何本作者的美术水平远远不过关，以下模型可做对比

#### 网上找的3D模型

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/677673c06a8a44e38f002c929f3eae2a~tplv-k3u1fbpfcp-zoom-1.image)

#### 自己做的3D模型

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f34d304acaa409687c200435663ad91~tplv-k3u1fbpfcp-zoom-1.image)\
3D模型能够让我们制作的场景更加具有表现力，并且一些场景可以直接通过3D模型导入，避免重新绘制带来的重复性

目前在网上找3d模型的软件基本上一系列全都是推荐3D Max。但是3D max属于较大的制作模型软件，如果对实施需求不高，可以尝试使用ParaView进行代替。甚至可以使用Windows中自带的3D查看器和画图3D，但是后两者对你的3D模型的格式要求就有一些限制。\
[ParaView官网](https://www.paraview.org/download/)

画图3D\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0294feaa2d642b6b8c8314077449fff~tplv-k3u1fbpfcp-zoom-1.image)

## 3D模型的导入

模型：stanford-bunny.fbx\
分享两个模型：[百度网盘](https://pan.baidu.com/s/1nXRwzL--j0L5RAJUM6\_J_Q)\
提取码：b33z

兔子模型也可以从three文件夹example中查找\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d815f356dd7a4df9a76f811f383c3419~tplv-k3u1fbpfcp-zoom-1.image)\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb1c32216930462b9eb2d75f93d4c3f6~tplv-k3u1fbpfcp-zoom-1.image)

代码：

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="../函数式编程/textbook/js/jquery-1.10.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/three.js"></script>
		<script src="js/OrbitControls.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/OBJLoader.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/FBXLoader.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/inflate.min.js" type="text/javascript" charset="utf-8"></script>

	</head>
	<body>
		<div id="app">

		</div>
		<script type="text/javascript">
			var scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 1, 1000);
			render = new THREE.WebGLRenderer();
			render.setPixelRatio(window.devicePixelRatio);
			render.setSize(window.innerWidth, window.innerHeight)
			var app = document.getElementById("app");
			app.appendChild(render.domElement);
			/********************************************************/
			// 加载提示
			var manager = new THREE.LoadingManager();
			manager.onProgress = function(item, loaded, total){
			    console.log(item, loaded, total);
			};			
			var onProgress = function(xhr){
			    if(xhr.lengthComputable){
			        var percentComplete = xhr.loaded / xhr.total * 100;
			        console.log(Math.round(percentComplete, 2) + '% downloaded');
			    }
			};		
			var onError = function(xhr){
			    console.error(xhr);
			};
			var loader = new THREE.FBXLoader();//创建一个FBX加载器
			var model, self = this ;			
			loader.load("./modules/stanford-bunny.fbx", function(obj) {
				  console.log(obj);//查看加载后返回的模型对象
				  obj.scale.multiplyScalar(0.0003);  //缩小模型
				  self.model = obj;
				  scene.add(self.model)
				  animate();
			}, onProgress, onError)
				
			// 光源
			var point = new THREE.PointLight("white", 10, 100);
			point.position.set(40, 30, 30);
			scene.add(point);
			
			camera.position.set(20, 20, 30);
			// 坐标轴
			var axisHelper = new THREE.AxisHelper(100);
			scene.add(axisHelper)

			// 鼠标控件
			var controls = new THREE.OrbitControls(camera, render.domElement); //创建控件对象
			/********************************************************/
			function animate() {
				self.model.rotation.y += 0.03;
				controls.update();
				render.render(scene, camera);
				window.requestAnimationFrame(animate);
			}
			
		</script>
	</body>
</html>
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/843e8c34d2d54360b750ec8d99b52ea0~tplv-k3u1fbpfcp-zoom-1.image)
