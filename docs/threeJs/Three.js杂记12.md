---
title: Three.js杂记（十二）—— VR全景效果制作·中
date: 6/21/2021, 9:48:35 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---


# <div color=#40A9FF> 序 </div>

在web的前端发展过程中，对于视觉化的要求已经越来越高

有关于VR全景的效果也同样可以在网页中实现了，不用戴上VR设备，你也可以在网页上体会一把“身临其境”的感觉
[全景视觉](https://vr.quanjing.com/image/qp62596386)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021061320443112.gif#pic_center)


之前的我ThreeJS系列博客中也曾经写过一篇关于如何制作全景效果的文章，不过只有上半部分的素材采集<div color=#F00>**（虽然这很重要）**</div>

<div color=#EE5D1C>**这是我ThreeJs系列地址，如果对页面3D感兴趣的同学可以过去学习：**</div> 

[https://blog.csdn.net/qq_36171287/category_10641247.html](https://blog.csdn.net/qq_36171287/category_10641247.html) 

<div color=#EE5D1C>之前对于VR介绍过的文章是（效果还可以）</div>：

[《Three.js杂记（七）—— 全景效果制作·上（含python爬虫偷碎图，canvas重组图片）》](https://kongchengji.blog.csdn.net/article/details/112438341)

***
<br><br>

# <div color=#40A9FF> 正文开始</div>
因为距离上一次的全景效果制作文章已经过去很久了，所以本次就换一个全景场景来演示吧，原理都是一样的。
本次项目使用vue cli搭建，所以就不像之前script导入了
<br>

## <div color=#EC4420> 引入threeJs</div>
首先是threeJS的库，这是肯定要安装或者script导入的
本次我在vue项目中安装导入，方法：

* npm安装three.js依赖

```javascript
npm install three --save-dev
```

* yarn安装three.js依赖
```javascript
yarn add three --dev
```

在main.js中引入：

```javascript
import * as THREE from 'three';
Vue.use(THREE)
```
或者使用时直接导入：

```javascript
const THREE = require('three')
```

***

运行项目，打开页面后在控制台输入__THREE__，可以看到THREE的版本号
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/557b0526d1074f8791f7bd9bdb9fdf66~tplv-k3u1fbpfcp-zoom-1.image)
***
<br>

## <div color=#EC4420> 材料收集</div>
这一部分内容是为了收集全景需要的前后左右上下六个面的图片，具体操作在[《Three.js杂记（七）—— 全景效果制作·上（含python爬虫偷碎图，canvas重组图片）》](https://kongchengji.blog.csdn.net/article/details/112438341)中已经包含了，这里我就不重复叙述了

最终收集到的图片如下：
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fb94b466f784f289c8f5cb9ec1a173e~tplv-k3u1fbpfcp-zoom-1.image)
<br>

## <div color=#EC4420> 实现原理</div>
全景图的实现原理：通过创造一个球体/正方体，并在其表面贴上专门的背景图，然后将相机放在球体/正方体的中心，监听手指拖动/陀螺仪移动来改变相机的面向，从而实现全景图

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4633ac6b3f1c46669b26858982feb1dc~tplv-k3u1fbpfcp-zoom-1.image)


我使用的是建立正方体的方法，所以需要六个面，而摄像头被放在正方体的中央，六面衔接的需要很好，所以对图片素材的要求较高，或者自己拍摄下来进行裁剪也可以。
<br><br>

## <div color=#EC4420> 实现步骤</div>
第一步，先初始化THREE的场景
data中添加：

```javascript
data() {
    return {
        scene: null,   //场景
        camera: null, //摄像机
        render:null,  //渲染器
        controls:null,  //鼠标控制
    };
},
```
添加初始化方法：
```javascript
// 初始化THREE需要的场景
init() {
    this.scene = new THREE.Scene();  
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    this.render = new THREE.WebGLRenderer({
        antialias: true
    });
    this.render.setPixelRatio(window.devicePixelRatio);  //设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    this.render.setSize(window.innerWidth, window.innerHeight) //设置THREE场景大小为整个页面
    var app = document.getElementById("threedemo");  
    app.appendChild(this.render.domElement);  //添加场景到DOM中
    this.camera.position.set(200, 0, 0);  //摄像头摆放位置
}
```
这样设置好了之后，页面就会全部变成黑色


***
<br><br>

第二步，然后创建场景贴图
这里就是把之前的图片覆盖到场景之上，让场景的background成为CubeTextureLoader立方体

CubeTextureLoader：加载CubeTexture的一个类。 内部使用ImageLoader来加载文件

```javascript
initImg() {
    // 创建场景贴图
	this.scene.background = new THREE.CubeTextureLoader()
	.setPath( '../RESULT/' )
	.load( [ 'w04.png', 'w05.png', 'w06.png', 'w02.png', 'w01.png', 'w03.png' ] );
},
```
***
<br>
第三步，因为THREE是在canvas画布上面的，所以要设定时时更新

更新方法：
```javascript
animate() {
    this.controls.update();
    this.render.render(this.scene, this.camera);
    window.requestAnimationFrame(this.animate);
}
```
***
<br>

第四步，因为是全景效果，鼠标应当可以拖动视角

但是这需要THREE.OrbitControls的支持

**OrbitControls**
> Orbit controls allow the camera to orbit around a target.
To use this, as with all files in the /examples directory, you will have to include the file seperately in your HTML.

这里使用npm或者yarn进行下载
命令：`npm install three-orbitcontrols`

使用方式：

```javascript
const OrbitControls = require('three-orbitcontrols')

// 鼠标控件  设置在init方法中
this.controls = new OrbitControls(this.camera, this.render.domElement); //创建控件对象
```
***
<br>

## <div color=#EC4420> 基础的全景完成</div>
通过以上步骤，基础的全景效果就已经完成了，让我们康康完成的结果如何：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a94de02fc68340019049ff14983e9d9f~tplv-k3u1fbpfcp-zoom-1.image)




***
<br>

# <div color=#40A9FF> 完整Vue代码</div>

```html
<template>
  <div id="threedemo">
  </div>
</template>

<script>
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')
export default {
    name: "threedemo",
    props: {},
    data() {
        return {
            scene: null,   //场景
            camera: null, //摄像机
            render:null,  //渲染器
            controls:null,  //鼠标控制
        };
    },
    mounted() {
        this.init();
        this.initImg();
        this.animate();
    },
    watch: {},
    methods: {
        // 初始化THREE需要的场景
        init() {
            this.scene = new THREE.Scene();  
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
            this.render = new THREE.WebGLRenderer({
                antialias: true
            });
            this.render.setPixelRatio(window.devicePixelRatio);  //设置设备像素比。通常用于避免HiDPI设备上绘图模糊
            this.render.setSize(window.innerWidth, window.innerHeight) //设置THREE场景大小为整个页面
            var app = document.getElementById("threedemo");  
            app.appendChild(this.render.domElement);  //添加场景到DOM中
            this.camera.position.set(200, 0, 0);  //摄像头摆放位置
            // 鼠标控件
			this.controls = new OrbitControls(this.camera, this.render.domElement); //创建控件对象
        },
        initImg() {
            // 创建场景贴图
			this.scene.background = new THREE.CubeTextureLoader()
			.setPath( '../RESULT/' )
				.load( [ 'w04.png', 'w05.png', 'w06.png', 'w02.png', 'w01.png', 'w03.png' ] );
        },
        animate() {
            this.controls.update();
            this.render.render(this.scene, this.camera);
            window.requestAnimationFrame(this.animate);
        }
    },
    components: {},
    computed: {},
};
</script>
<style scoped>
    #threedemo {
        overflow: hidden;
    }
</style>
```

***
<br>

# <div color=#40A9FF> 总结</div>

本次的VR实例其实属于看起来高大上，但是实际操作比较简单的那种

如果对于ThreeJS有过相关性学习的，那么上手起来非常简单

所以大家不要觉得VR这样的效果实现就很难，其实自己简单操作也可以完成，不妨自己试一下吧

