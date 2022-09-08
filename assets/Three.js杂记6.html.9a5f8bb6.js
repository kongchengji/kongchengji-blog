import{_ as d,r as l,o as r,c as a,a as t,b as i,e as s,d as e}from"./app.44e72aae.js";const o={},c=s('<p>\u5728three.js\u7A0B\u5E8F\u7684\u5236\u4F5C\u4E0E\u7F16\u5199\u8FC7\u7A0B\u4E2D\uFF0C\u5F53\u7136\u4E0D\u53EF\u907F\u514D\u7684\u4F1A\u9047\u5230\u4E00\u4E2A\u95EE\u9898</p><h2 id="_3d\u6A21\u578B\u7684\u5BFC\u5165" tabindex="-1"><a class="header-anchor" href="#_3d\u6A21\u578B\u7684\u5BFC\u5165" aria-hidden="true">#</a> 3D\u6A21\u578B\u7684\u5BFC\u5165</h2><p>3D\u6A21\u578B\u7531\u9876\u70B9(vertex)\u7EC4\u6210\uFF0C\u9876\u70B9\u4E4B\u95F4\u8FDE\u6210\u4E09\u89D2\u5F62\u6216\u56DB\u8FB9\u5F62\uFF08\u5728\u4E00\u4E2A\u5E73\u9762\u4E0A\uFF09\uFF0C\u591A\u4E2A\u4E09\u89D2\u5F62\u6216\u8005\u56DB\u8FB9\u5F62\u5C31\u80FD\u591F\u7EC4\u6210\u590D\u6742\u7684\u7ACB\u4F53\u6A21\u578B</p><p>\u867D\u7136\u5728three.js\u53EF\u4EE5\u4F7F\u7528\u63D0\u4F9B\u7684\u51E0\u4F55\u56FE\u5F62\u53BB\u5806\u79EF\u8D77\u4E00\u4E2A3D\u6A21\u578B\uFF0C\u5948\u4F55\u672C\u4F5C\u8005\u7684\u7F8E\u672F\u6C34\u5E73\u8FDC\u8FDC\u4E0D\u8FC7\u5173\uFF0C\u4EE5\u4E0B\u6A21\u578B\u53EF\u505A\u5BF9\u6BD4</p><h4 id="\u7F51\u4E0A\u627E\u76843d\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u7F51\u4E0A\u627E\u76843d\u6A21\u578B" aria-hidden="true">#</a> \u7F51\u4E0A\u627E\u76843D\u6A21\u578B</h4><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/677673c06a8a44e38f002c929f3eae2a~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><h4 id="\u81EA\u5DF1\u505A\u76843d\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5DF1\u505A\u76843d\u6A21\u578B" aria-hidden="true">#</a> \u81EA\u5DF1\u505A\u76843D\u6A21\u578B</h4><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f34d304acaa409687c200435663ad91~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"><br> 3D\u6A21\u578B\u80FD\u591F\u8BA9\u6211\u4EEC\u5236\u4F5C\u7684\u573A\u666F\u66F4\u52A0\u5177\u6709\u8868\u73B0\u529B\uFF0C\u5E76\u4E14\u4E00\u4E9B\u573A\u666F\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC73D\u6A21\u578B\u5BFC\u5165\uFF0C\u907F\u514D\u91CD\u65B0\u7ED8\u5236\u5E26\u6765\u7684\u91CD\u590D\u6027</p>',8),v=e("\u76EE\u524D\u5728\u7F51\u4E0A\u627E3d\u6A21\u578B\u7684\u8F6F\u4EF6\u57FA\u672C\u4E0A\u4E00\u7CFB\u5217\u5168\u90FD\u662F\u63A8\u83503D Max\u3002\u4F46\u662F3D max\u5C5E\u4E8E\u8F83\u5927\u7684\u5236\u4F5C\u6A21\u578B\u8F6F\u4EF6\uFF0C\u5982\u679C\u5BF9\u5B9E\u65BD\u9700\u6C42\u4E0D\u9AD8\uFF0C\u53EF\u4EE5\u5C1D\u8BD5\u4F7F\u7528ParaView\u8FDB\u884C\u4EE3\u66FF\u3002\u751A\u81F3\u53EF\u4EE5\u4F7F\u7528Windows\u4E2D\u81EA\u5E26\u76843D\u67E5\u770B\u5668\u548C\u753B\u56FE3D\uFF0C\u4F46\u662F\u540E\u4E24\u8005\u5BF9\u4F60\u76843D\u6A21\u578B\u7684\u683C\u5F0F\u8981\u6C42\u5C31\u6709\u4E00\u4E9B\u9650\u5236\u3002"),u=t("br",null,null,-1),m={href:"https://www.paraview.org/download/",target:"_blank",rel:"noopener noreferrer"},b=e("ParaView\u5B98\u7F51"),p=t("p",null,[e("\u753B\u56FE3D"),t("br"),t("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0294feaa2d642b6b8c8314077449fff~tplv-k3u1fbpfcp-zoom-1.image",alt:"\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"})],-1),h=t("h2",{id:"_3d\u6A21\u578B\u7684\u5BFC\u5165-1",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_3d\u6A21\u578B\u7684\u5BFC\u5165-1","aria-hidden":"true"},"#"),e(" 3D\u6A21\u578B\u7684\u5BFC\u5165")],-1),f=e("\u6A21\u578B\uFF1Astanford-bunny.fbx"),g=t("br",null,null,-1),_=e(" \u5206\u4EAB\u4E24\u4E2A\u6A21\u578B\uFF1A"),q={href:"https://pan.baidu.com/s/1nXRwzL--j0L5RAJUM6_J_Q",target:"_blank",rel:"noopener noreferrer"},j=e("\u767E\u5EA6\u7F51\u76D8"),x=t("br",null,null,-1),w=e(" \u63D0\u53D6\u7801\uFF1Ab33z"),E=s(`<p>\u5154\u5B50\u6A21\u578B\u4E5F\u53EF\u4EE5\u4ECEthree\u6587\u4EF6\u5939example\u4E2D\u67E5\u627E<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d815f356dd7a4df9a76f811f383c3419~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"><br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb1c32216930462b9eb2d75f93d4c3f6~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><p>\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;meta charset=&quot;utf-8&quot;&gt;
		&lt;title&gt;&lt;/title&gt;
		&lt;script src=&quot;../\u51FD\u6570\u5F0F\u7F16\u7A0B/textbook/js/jquery-1.10.1.min.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
		&lt;script src=&quot;js/three.js&quot;&gt;&lt;/script&gt;
		&lt;script src=&quot;js/OrbitControls.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
		&lt;script src=&quot;js/OBJLoader.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
		&lt;script src=&quot;js/FBXLoader.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
		&lt;script src=&quot;js/inflate.min.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;

	&lt;/head&gt;
	&lt;body&gt;
		&lt;div id=&quot;app&quot;&gt;

		&lt;/div&gt;
		&lt;script type=&quot;text/javascript&quot;&gt;
			var scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 1, 1000);
			render = new THREE.WebGLRenderer();
			render.setPixelRatio(window.devicePixelRatio);
			render.setSize(window.innerWidth, window.innerHeight)
			var app = document.getElementById(&quot;app&quot;);
			app.appendChild(render.domElement);
			/********************************************************/
			// \u52A0\u8F7D\u63D0\u793A
			var manager = new THREE.LoadingManager();
			manager.onProgress = function(item, loaded, total){
			    console.log(item, loaded, total);
			};			
			var onProgress = function(xhr){
			    if(xhr.lengthComputable){
			        var percentComplete = xhr.loaded / xhr.total * 100;
			        console.log(Math.round(percentComplete, 2) + &#39;% downloaded&#39;);
			    }
			};		
			var onError = function(xhr){
			    console.error(xhr);
			};
			var loader = new THREE.FBXLoader();//\u521B\u5EFA\u4E00\u4E2AFBX\u52A0\u8F7D\u5668
			var model, self = this ;			
			loader.load(&quot;./modules/stanford-bunny.fbx&quot;, function(obj) {
				  console.log(obj);//\u67E5\u770B\u52A0\u8F7D\u540E\u8FD4\u56DE\u7684\u6A21\u578B\u5BF9\u8C61
				  obj.scale.multiplyScalar(0.0003);  //\u7F29\u5C0F\u6A21\u578B
				  self.model = obj;
				  scene.add(self.model)
				  animate();
			}, onProgress, onError)
				
			// \u5149\u6E90
			var point = new THREE.PointLight(&quot;white&quot;, 10, 100);
			point.position.set(40, 30, 30);
			scene.add(point);
			
			camera.position.set(20, 20, 30);
			// \u5750\u6807\u8F74
			var axisHelper = new THREE.AxisHelper(100);
			scene.add(axisHelper)

			// \u9F20\u6807\u63A7\u4EF6
			var controls = new THREE.OrbitControls(camera, render.domElement); //\u521B\u5EFA\u63A7\u4EF6\u5BF9\u8C61
			/********************************************************/
			function animate() {
				self.model.rotation.y += 0.03;
				controls.update();
				render.render(scene, camera);
				window.requestAnimationFrame(animate);
			}
			
		&lt;/script&gt;
	&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/843e8c34d2d54360b750ec8d99b52ea0~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p>`,4);function y(k,D){const n=l("ExternalLinkIcon");return r(),a("div",null,[c,t("p",null,[v,u,t("a",m,[b,i(n)])]),p,h,t("p",null,[f,g,_,t("a",q,[j,i(n)]),x,w]),E])}var R=d(o,[["render",y],["__file","Three.js\u6742\u8BB06.html.vue"]]);export{R as default};
