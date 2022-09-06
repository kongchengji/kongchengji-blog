---
title: Three.js杂记（五）——坐标轴、光源
date: 3/24/2021, 4:27:42 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---



## 坐标轴

之前有关与物体与场景的点线面中坐标可以进行一下补充：\
可以使用THREE.AxisHelper(); 去绘制出坐标轴线，里面填写的参数是坐标轴线的长度\
示例：

```javascript
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
			
			// 坐标轴
			var axisHelper = new THREE.AxisHelper(40);
			scene.add(axisHelper);
			
			camera.position.z = 40;
			camera.position.y = 20;
			camera.position.x = 10;
			
			function animate(){
				render.render(scene, camera);
				window.requestAnimationFrame(animate);
			}
			animate();
		</script>
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edd6c69b914b4d43944bf5f30319680d~tplv-k3u1fbpfcp-zoom-1.image)\
可以使用object3D将物体和坐标轴绑定起来，三维物体（Object3D）是Three.js中大部分对象的基类，提供了一系列的属性和方法来对三维空间中的物体进行操纵。

可以通过.add( object )方法来将对象进行组合，该方法将对象添加为子对象，但为此最好使用Group（来作为父对象）。

### 构造器

Object3D() ： 构造器中不带有参数。

代码示例：

```javascript
// 总物体对象集合
var objectTotal = new THREE.Object3D();

var geometry = new THREE.BoxGeometry(10, 10, 10);
var material1 = new THREE.PointsMaterial({ color:"yellow" }); 
var meshs = new THREE.Mesh(geometry, material1);
objectTotal.add(meshs)
// scene.add(meshs);
// 坐标轴
var axisHelper = new THREE.AxisHelper(40);
objectTotal.add(axisHelper)
// scene.add(axisHelper);

scene.add(objectTotal);
```

## 光源

作为3D仿真技术来说，光源的照射是必不可少的。就像unity3d中一样，光线可以从不同角度照射过来，让物体呈现在相机中的效果也是不一样。一个好的光源能够让物体渲染出来更加真实。

### 光源类型

| 光源               | 简介        |
| ---------------- | --------- |
| AmbientLight     | 环境光       |
| PointLight       | 点光源       |
| DirectionalLight | 平行光，比如太阳光 |
| SpotLight        | 聚光源       |

### 光源基类

在Threejs中，光源用Light表示，它是所有光源的基类。它的构造函数是：

THREE.Light ( hex )

它有一个参数hex，接受一个16进制的颜色值。例如要定义一种红色的光源，我们可以这样来定义：

var redLight = new THREE.Light(0xFF0000);

##### 注意：此处绘制物体时，不能使用new MeshBasicMaterial()设置材料属性。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc4e5e5be6984499ac591380bcaab42e~tplv-k3u1fbpfcp-zoom-1.image)\
此处可以使用MeshLambertMaterial来添加物体的材质\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88f0feb431a34958a655dd912b143a0d~tplv-k3u1fbpfcp-zoom-1.image)

### 其他光源

#### 环境光AmbientLight

环境光是经过多次反射而来的光称为环境光，无法确定其最初的方向。环境光是一种无处不在的光。环境光源放出的光线被认为来自任何方向。因此，当你仅为场景指定环境光时，所有的物体无论法向量如何，都将表现为同样的明暗程度。 （这是因为，反射光可以从各个方向进入您的眼睛）

环境光用THREE.AmbientLight来表示，它的构造函数如下所示：

THREE.AmbientLight( 颜色 )

```
var light = new THREE.AmbientLight( 0xff0000 );

scene.add( light );
```

例子：

```
<script src="js/three.js"></script>
	<style type="text/css">
		*{
			margin: 0;
			padding: 0;
		}
	</style>
<body>
	<div id="app">
		
	</div>
	
	<script type="text/javascript">
		var scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 1, 1000);
		render = new THREE.WebGLRenderer({
			antialias: true
		});
		render.setPixelRatio(window.devicePixelRatio);
		render.setSize(window.innerWidth, window.innerHeight)
		/********************************************************/
		var app = document.getElementById("app");
		app.appendChild(render.domElement);
		
		var geometry = new THREE.BoxGeometry(10, 10, 10);
		var textureLoader = new THREE.TextureLoader();
		var texture = textureLoader.load('img/back.jpg'); //加载纹理贴图，就是由图片组成一个纹理
		var basicMaterial = new THREE.MeshLambertMaterial({
			map: texture //设置颜色贴图属性值
		})
		var meshs = new THREE.Mesh(geometry, basicMaterial);
		scene.add(meshs);
		
		// 光源
		var ambient = new THREE.AmbientLight("white");
		scene.add(ambient);
		
		// 相机
		camera.position.set(20, 20, 40); //设置相机位置
		camera.lookAt(new THREE.Vector3(0, 0, 0))
		
		/********************************************************/
		function animate(){
			meshs.rotation.y += 0.03;  //转动
			render.render(scene, camera);
			window.requestAnimationFrame(animate);
		}
		animate();
	</script>
</body>
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f3bbd6f620241449ef2a284d8a55e25~tplv-k3u1fbpfcp-zoom-1.image)

\
\#### 点光PointLight 点光源：由这种光源放出的光线来自同一点，且方向辐射自四面八方。例如蜡烛放出的光，萤火虫放出的光。

点光源用PointLight来表示，它的构造函数如下所示：

PointLight( color, intensity, distance )

* Color：光的颜色
* Intensity：光的强度，默认是1.0,就是说是100%强度的灯光
* distance：光的距离，从光源所在的位置，经过distance这段距离之后，光的强度将从Intensity衰减为0。 默认情况下，这个值为0.0，表示光源强度不衰减。

例子： 将上面例子中环境光源进行替换

```
			// 光源
			var point = new THREE.PointLight("white", 10, 100);
			point.position.set(40, 30, 30);
			scene.add(point);
```

效果：

* 光源强度为10\
  ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ec7aba836744a8f8c64a5c6083a3dd7~tplv-k3u1fbpfcp-zoom-1.image)
* 光源强度为5\
  ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d32f850cad3241bbabbb2ba39fdaea8e~tplv-k3u1fbpfcp-zoom-1.image)

\


#### 平行光DirectionalLight

平行光是沿着特定方向发射的光。这种光的表现像是无限远,从它发出的光线都是平行的。常常用平行光来模拟太阳光 的效果; 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的

Three.js 的平行光常见的困惑是设置旋转没有效果。这是因为 three.js 的平行光类似与其他引擎的"目标平行光"\
例子：

```
// 光源
var directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
directionalLight.position.set(1, 1, 1)  //方向
scene.add(directionalLight);
			
```

效果：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/718cf4e30fde435695848f2b8050953e~tplv-k3u1fbpfcp-zoom-1.image)

#### 聚光SpotLight

聚光灯：这种光源的光线从一个锥体中射出，在被照射的物体上产生聚光的效果。使用这种光源需要指定光的射出方向以及锥体的顶角α

是从一个方向上的一个点发出，沿着一个圆锥体，它离光越远，它的尺寸就越大\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c3d8c28883042b5af79084cb3d8c728~tplv-k3u1fbpfcp-zoom-1.image)\
聚光灯的构造函数是：

THREE.SpotLight( hex, intensity, distance, angle, exponent )

函数的参数如下所示：

* Hex：聚光灯发出的颜色，如0xFFFFFF
* Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些。和上面点光源一样。
* Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.
* Angle：聚光灯着色的角度，用弧度作为单位，这个角度是和光源的方向形成的角度。
* exponent：光源模型中，衰减的一个参数，越大衰减约快。

例子：

```
// 光源
var spotLight = new THREE.SpotLight( "#fff", 10, 100, 0.1, 0.8 )
spotLight.position.set(30,30,30)
scene.add(spotLight);
```

效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ac417a5245248978b88f5a795cd986a~tplv-k3u1fbpfcp-zoom-1.image)
