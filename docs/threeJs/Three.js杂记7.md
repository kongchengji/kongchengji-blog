---
title: Three.js杂记（七）—— 全景效果制作·上（含python爬虫偷碎图，canvas重组图片）
date: 3/24/2021, 4:27:30 PM
tags: 
    - ThreeJs 
    - 网页3D
categories: 
	- ThreeJs
---


## 起步

学了一段时间的three.js之后，就可以尝试做一个VR全景效果出来。


当时已经靠近2020年的年底了，那就做一个过年的场景效果吧，就类似于网页上的VR全景\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b028a9b09fc446f989d5a29efff2e509~tplv-k3u1fbpfcp-zoom-1.image)\
那就要有一个目标，VR全景需要确定一个地点，我身处在江南，那就拿江南的小镇来做three.js的背景布局啦！ 而江南小镇繁多，但与互联网有关的恐怕典型就是乌镇了，地点get

## 下面先提前展示一下效果：

在2020年年底已经完成了效果的制作，因为不能上传太大的图片，所以gif制作时帧图被我删减了，看起来有些卡顿

项目可在网盘中下载：<https://pan.baidu.com/s/1cmDsGEUlBJsvJTJQcmFxpw>

提取码： yvjq\
\
\
效果：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/873af693affa4d5a8b9d72eca1d50c11~tplv-k3u1fbpfcp-zoom-1.image)\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cb7e651111c4139a74689b28d8abd35~tplv-k3u1fbpfcp-zoom-1.image)

## 布局

three.js需要一个场景，这个场景的制作是以Scene的background属性来设置的，这样的设置能够让摄像头不超出背景，如果只是把摄像头camera放在一个立方体盒子中，就可能出现“穿模”的现象\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc205c01e6264b2794cf10e282cc06ca~tplv-k3u1fbpfcp-zoom-1.image)

场景可以使用THREE.CubeTextureLoader设置为：

```
var scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
.setPath( 'img/' )       // 地址
 //图片    顺序为 前 后 上 下 左 右
.load( [ 'w04.png', 'w05.png', 'w06.png', 'w02.png', 'w01.png', 'w03.png' ] ); 
```

#### 图片 ----- 在本文最后

不过我提供的图片上传到CSDN会出现水印，如果想要无水印的图片也可以从百度网盘中项目中找，或者通过我之后的方法去获取适合的图片（python爬虫获取网上的图片）

场景布置好了之后，如果想要左右旋转查看可以使用OrbitControls.js

```
<script src="js/OrbitControls.js" type="text/javascript" charset="utf-8"></script>
// 鼠标控件
var controls = new THREE.OrbitControls(camera, render.domElement); //创建控件对象
controls.update();  //更新方法，写在动画方法内
```

## 图片的获取 （python）

制作VR场景对图片的要求很高，虽然场景的实质是一个立方体盒子，但是立方体六个面上的图片之间需要无缝衔接，并且我选择了乌镇作为背景，所以我首选是从网上找图片，从网站上“偷”图\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/124379a412064ae99d5f86c423653199~tplv-k3u1fbpfcp-zoom-1.image)\
被我不幸选中的网站 -------- [全景视觉](https://www.quanjing.com/)\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39007ffcb6d24d28b92c1817dda17d95~tplv-k3u1fbpfcp-zoom-1.image)我选择的场景：[乌镇 - 西山风景区](https://vr.quanjing.com/image/qp61029957)\
\
\
但是该怎么盗图呢，场景中的标签是canvas，不能直接复制下来图片\
这里就可以看network中对方服务器提供的图片了，又一次计划通，哈哈哈\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e7ee6b3f4394d66ae1f290c9c4afb59~tplv-k3u1fbpfcp-zoom-1.image)\
但是对方怎么可能不防备一手，六面的图片被切碎了，一张图片切成了9份（这也是我后来爬下图片重组后才发现的）。 九等分的防盗…\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1847ae152b014f44b9ff352a67580618~tplv-k3u1fbpfcp-zoom-1.image)\
![九等分的防盗](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59b5ee97dd714e8fa8579184ccac0800~tplv-k3u1fbpfcp-zoom-1.image)\
当时我一脸懵，哇，那要怎么办，用鼠标点击一张张下载下了不到10张我就受不了了，下载的全部删除。\
那就选个省力些的方法，不会python的前端程序员不是一个好的摸鱼专家。

### 开始python盗图之路：

#### first

选择图片，查看这些图片URL之间的规律，这些图片必然有其规律\
看了几张之后，我发现图片有一个共同的前缀： https\://360.quanjing.com/ul/nd/QP61029957/\
之后的是由\[‘r’,‘l’, ‘u’, ‘d’, ‘b’, ‘f’] 六个字母中某一个组成\
之后组成分析后为\[’/l1/1/l1\_’, ‘/l2/1/l2\_’, ‘/l1/2/l1\_’, ‘/l2/2/l2\_’, ‘/l1/3/l1\_’, ‘/l2/3/l2\_’]中的某一个\
最后是图片的名称后两位 1\_1 到 3\_3 之间\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6fbdd5d2e4d44b69ff86bbc792a2ed9~tplv-k3u1fbpfcp-zoom-1.image)\
这样就能写出遍历所有图片URL地址的方法了

```python
arr = []
def getArr():
    rootPath = 'https://360.quanjing.com/ul/nd/QP61029957/';
    for i in ['r','l', 'u', 'd', 'b', 'f']:
        for j in ['/l1/1/l1_', '/l2/1/l2_', '/l1/2/l1_', '/l2/2/l2_', '/l1/3/l1_', '/l2/3/l2_']:
            for z in range(1,4):
                for k in range(1,4):
                    arr.append(rootPath + i + j + i + "_" + str(z) + "_" + str(k) + ".jpg" )
    # print(arr)
```

#### second

知道了图片的URL，那就好办了，python爬虫最擅长的就是访问URL地址了\
在python中存在一个urllib库，可以直接通过urllib.request方法的urlretrieve去完成下载步骤。\
使用此方法时需要给定一个下载后图片存储的地址

以下直接上python爬虫的代码：

```python
import requests
import re
import time
import random
import urllib.request
import os

arr = []
def getArr():
    rootPath = 'https://360.quanjing.com/ul/nd/QP61029957/';
    for i in ['r','l', 'u', 'd', 'b', 'f']:
        for j in ['/l1/1/l1_', '/l2/1/l2_', '/l1/2/l1_', '/l2/2/l2_', '/l1/3/l1_', '/l2/3/l2_']:
            for z in range(1,4):
                for k in range(1,4):
                    arr.append(rootPath + i + j + i + "_" + str(z) + "_" + str(k) + ".jpg" )

def getimg(arr,topath):
    for url in arr:
        # 把图片下载到本地存储
        path = os.path.join(topath, url.rsplit("/",maxsplit=1)[1])
        print(path)
        try:
            urllib.request.urlretrieve(url, filename=path)
        except Exception as e:
            print(e)
        # time.sleep(1)


if __name__ == '__main__':

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
    }
    getArr()
    toPath = r'E:\工作文件04\图片素材\乌镇'
    getimg(arr, toPath)
```

爬取下来的图片：\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9002c1fca794408eb353c62fb29b196d~tplv-k3u1fbpfcp-zoom-1.image)

#### third

但是盗下来的图是碎的怎么办，three.js中CubeTextureLoader方法参数只能传递6张图片，不能把这一堆碎图全部传进去\
接下来就只能把图片重新组合起来了

* 路子1： 使用ps把图片一张张拼接起来。但是我是一个懒人，这样做好像效率太低了，而且图片也是有规律的，那肯定有更方便的方法呀
* 路子2： 使用canvas拼接图片，然后把canvas中的复制下来

方法：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>canvas合成图片</title>
		<style type="text/css">
			#app {
				margin: 80px;
				border: 1px solid black;
			}
			#aa{
				width: 500px;
				height: 400px;
			}
		</style>
	</head>
	<body>
		<canvas id="app" width="1280" height="1280">
		</canvas>
		<button onclick="createImg()">下载</button>
		<img id="aa" />
		<script type="text/javascript">
			var abc = ['l2_b_', 'l2_d_', 'l2_f_', 'l2_l_', 'l2_r_', 'l2_u_'];
			var imgSrcArray = [];
			for (var i = 0; i < abc.length; i++) {
				for (var j = 1; j < 4; j++) {
					for (var k = 1; k < 4; k++) {
						// 图片地址，前缀可以是碎图存放的地方
						let jpgsrc = '../img/wuzhen/' + abc[i] + j + '_' + k + '.jpg';
						imgSrcArray.push(jpgsrc);
					}
				}
			}

			var canvas = document.getElementById('app');
			var ctx = canvas.getContext('2d');
			// 定义一个图片对象
			function ImageDraw(x, y, src, callback) { 
				this.img = new Image();
				this.img.src = src;
				var self = this;
				this.x = x;
				this.y = y;
				this.img.onload = function(){
					console.log(self.img, self.x, self.y)
					ctx.drawImage(self.img, self.x, self.y);
					ctx.save();
					if(typeof callback == "function") callback();
				}
			}	
			function createImg(){
				var strDataURI = canvas.toDataURL("image/png");  //toDataURL方法可以将canvas内容变成图片
				var dataImg = new Image();
				dataImg.src = strDataURI;   //strDataURI是组合出的图片地址
				document.getElementById('aa').src = strDataURI;
				// 之后的下载方法不想写了，可以直接从网页上下载了
			}
			// 每9张可以组成一张完整的图
			var img1 = new ImageDraw(0, 0,      imgSrcArray[0]);
			var img2 = new ImageDraw(512, 0,    imgSrcArray[1]);
			var img3 = new ImageDraw(1024, 0,   imgSrcArray[2]);
			var img4 = new ImageDraw(0, 512,    imgSrcArray[3]);
			var img5 = new ImageDraw(512, 512,  imgSrcArray[4]);
			var img6 = new ImageDraw(1024, 512, imgSrcArray[5]);
			var img7 = new ImageDraw(0, 1024,   imgSrcArray[6]);
			var img8 = new ImageDraw(512, 1024, imgSrcArray[7]);
			var img9 = new ImageDraw(1024, 1024,imgSrcArray[8]);
		</script>
	</body>
</html>
```

通过这一系列步骤，我就完成了从全景视觉网站上把VR图盗取下来的过程\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfb08a51948d4ebb9b2c07ef4c6d8dfa~tplv-k3u1fbpfcp-zoom-1.image)\
写到这里太累了，先告一段落了\
未完待续… （黄金镇魂曲：你永远到达不了完结的真实）\
![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b76576d173d446397786e52b50547e6~tplv-k3u1fbpfcp-zoom-1.image)

### 拼接好的图片

* w01\
  ![w01](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/57f35f86929d46de8eb9ae4218c8fa99~tplv-k3u1fbpfcp-zoom-1.image)
* w02\
  ![w02](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9cff476ddbdf4eaa8ce2ac4ec9285f2b~tplv-k3u1fbpfcp-zoom-1.image)
* w03\
  ![w03](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/211da7ac03f54bf5bc3301ef42011195~tplv-k3u1fbpfcp-zoom-1.image)
* w04\
  ![w04](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4c951a57d8f4dbda70e7d4202c109ff~tplv-k3u1fbpfcp-zoom-1.image)
* w05\
  ![w05](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d21a84a7fae143da95c71aa7a8201ec9~tplv-k3u1fbpfcp-zoom-1.image)
* w06\
  ![w06](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0d0e86047094e16ad000a035bcb2beb~tplv-k3u1fbpfcp-zoom-1.image)
