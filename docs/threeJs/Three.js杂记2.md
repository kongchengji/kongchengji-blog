---
title: Three.js杂记（二）——绘制点、线、面
date: 3/24/2021, 4:27:50 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---



## 点和线

Threejs使用的是右手坐标系，这源于opengl默认情况下，也是右手坐标系\
![左手和右手坐标系](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f331f8bceaf94071a69f09827069bfa4~tplv-k3u1fbpfcp-zoom-1.image)\
图中右边那个手对应的坐标系，就是右手坐标系。在Threejs中，坐标和右边的坐标完全一样。x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外。




一维指的是一条线，没有宽度和高度\
二维指的是一个面，没有高度\
三位指的是立体空间，由面组成

示例代码：

```javascript
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
		
/*********************************内容绘制区域************************************************/
		
		// 创造一个立方体, 点模型
		var geometry = new THREE.BoxGeometry(10, 10, 10); //创建一个立方体几何对象Geometry
		var material1 = new THREE.PointsMaterial({
			color:"red",
			size: 1.0 //点对象像素尺寸
		}); 
		//点模型
		var point = new THREE.Points(geometry, material1);
		
		// 创造一个立方体, 线模型
		var material2 = new THREE.LineBasicMaterial({
			color:"red",
		}); 
		var lines = new THREE.Line(geometry, material2);
		
		// 创造一个立方体, 网格模型
		var material3 = new THREE.MeshBasicMaterial({
			color:"red",
			wireframe:true,//网格模型以线条的模式渲染
		}); 
		var meshs = new THREE.Mesh(geometry, material3);
		
		
		//网格模型添加到场景中
		scene.add(meshs);
		// 让渲染器渲染一下
		//执行渲染操作   指定场景、相机作为参数
		camera.position.z = 50;
		camera.position.y = 10;
		camera.position.x = 20;
		render.render(scene, camera);
		
/*********************************内容绘制区域************************************************/		

		// 产生动效  网格对象进行旋转
		function animate(){
			render.render(scene, camera);
		}
		setInterval(animate,100);
	</script>
</body>
```

效果：\
![点模型](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/841b493ced3a466fb6b49f2b89f132c4~tplv-k3u1fbpfcp-zoom-1.image)\
![线模型](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c36dc9b2893e430a87de577f136dbc0d~tplv-k3u1fbpfcp-zoom-1.image)\
![网格模型](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad93dc5ece8147f0874426a3469e0f4c~tplv-k3u1fbpfcp-zoom-1.image)

#### 绘制渐变色线

```javascript
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

/*********************************内容绘制区域************************************************/

var light;
var geometry = new THREE.Geometry();
function initLight() {
	// 设置线点的颜色
	var material = new THREE.LineBasicMaterial({
		// color:"red",
		vertexColors: true
	});
	geometry.vertices.push(
		new THREE.Vector3(-10,0,0),   // 起始点
		new THREE.Vector3(0,0,0), 
		new THREE.Vector3(0,10,0),
		new THREE.Vector3(-10,0,0)   //结束回到原点
	);
	geometry.colors.push(
		new THREE.Color( "#38E92D" ), 
		new THREE.Color( "#F2EC2D" ),
		new THREE.Color( "#2B64EE" ),
		new THREE.Color( "#E75427" )
	)
	light = new THREE.Line(geometry, material);
	scene.add(light);
}

/*********************************内容绘制区域************************************************/

camera.position.z = 10;
camera.position.y = 0;
camera.position.x = 0;


function animate() {
	initLight();
	render.clear();
	render.render(scene, camera);
}
setInterval(animate, 100);
```

效果：\
![渐变色线](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bd4bfe1f92d404d839a184d15807db8~tplv-k3u1fbpfcp-zoom-1.image)\
绘制完成的线可以进行平移和旋转，通过这些操作可以组成不同的图形

```javascript
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

/*********************************内容绘制区域************************************************/

var light;
var geometry = new THREE.Geometry();

// 随机颜色
function fn5(){
    var colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
    var colorArray = colorValue.split(",");
    var color = "#";
    for( var i = 0; i < 6; i++ ){
        color += colorArray[ Math.floor( Math.random() * 16 ) ];
    }
    return color;
}
// 绘制平面坐标系
function PlaneCoordinates() {
	// 设置线点的颜色
	var material = new THREE.LineBasicMaterial({
		vertexColors: true
	});
	geometry.vertices.push( 
		new THREE.Vector3(0,0,0),   // 起始点
		new THREE.Vector3(0,10,0)    // 结束点
	);
	for(var i = 0; i < 11; i++) {
		var color01 = fn5(), color02 = fn5();
		geometry.colors.push(
			new THREE.Color( color01 ),
			new THREE.Color( color02 ),
		);
		light = new THREE.Line(geometry, material);
		light.position.x += i; 
		scene.add(light);
		light = new THREE.Line(geometry, material);
		light.rotation.z = -90 * Math.PI / 180;
		light.position.y += i; 
		scene.add(light);
		console.log(light)
	}
}

/*********************************内容绘制区域************************************************/

camera.position.z = 10;
camera.position.y = 0;
camera.position.x = 0;


function animate() {
	PlaneCoordinates();
	render.clear();
	render.render(scene, camera);
}
animate()
```

效果：\
![表格](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fe8d77dd4b743e89d6e1ef7bd6da614~tplv-k3u1fbpfcp-zoom-1.image)\
![表格](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee39bc4a857d4bad8f4409dc2dc33d7a~tplv-k3u1fbpfcp-zoom-1.image)
