import{_ as i,r as p,o as l,c,a as n,b as a,e,d as s}from"./app.44e72aae.js";const o={},u=e(`<h2 id="\u7269\u4F53\u8FD0\u52A8" tabindex="-1"><a class="header-anchor" href="#\u7269\u4F53\u8FD0\u52A8" aria-hidden="true">#</a> \u7269\u4F53\u8FD0\u52A8</h2><p>\u5728three.js\u4E2D\u60F3\u8981\u8BA9\u9759\u6B62\u7684\u7269\u4F53\u5448\u73B0\u51FA\u8FD0\u52A8\u6548\u679C\u6709\u4E24\u79CD\u65B9\u6CD5\uFF1A</p><ol><li>\u8BA9\u7269\u4F53geometry\u8FDB\u884C\u8FD0\u52A8</li><li>\u8BA9\u76F8\u673Acamera\u8FDB\u884C\u8FD0\u52A8</li></ol><p>\u6D4B\u8BD5\u4EE3\u7801\uFF1A \u8BA9\u5706\u67F1\u4F53\u8FDB\u884C\u79FB\u52A8\uFF0C\u5B9E\u9645\u79FB\u52A8\u7684\u662F\u76F8\u673A\u3002<br> \u5706\u67F1\u4F53\u53EF\u4EE5\u4F7F\u7528EdgesGeometry\u7ED8\u5236\u8FB9\u6846\u7EBF</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;meta charset=&quot;utf-8&quot;&gt;
		&lt;title&gt;\u8FD0\u52A8&lt;/title&gt;
		&lt;script src=&quot;js/three.js&quot;&gt;&lt;/script&gt;
	&lt;/head&gt;
	&lt;body&gt;
			&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
			&lt;script&gt;
				// \u521B\u5EFA\u573A\u666F
				var scene = new THREE.Scene();
				// \u521B\u5EFA\u76F8\u673A   \u53C2\u6570\uFF1A\u89C6\u89D2\u3001\u89C6\u89D2\u6BD4\u4F8B\uFF08\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u6BD4\uFF09\u3001\u6700\u8FD1\u50CF\u7D20\u3001\u6700\u8FDC\u50CF\u7D20
				camera = new THREE.PerspectiveCamera(105,
					window.innerWidth / window.innerHeight, 1, 1000);	
				// \u6E32\u67D3\u5668
				render = new THREE.WebGLRenderer({
					antialias: true
				});
				// \u8BA1\u7B97\u5904\u7406dpi
				render.setPixelRatio(window.devicePixelRatio);
				// \u8BBE\u7F6E\u753B\u5E03\u5927\u5C0F
				render.setSize(window.innerWidth, window.innerHeight)
				
				var app = document.getElementById(&quot;app&quot;);
				// \u7ED8\u5236\u51FA\u4E00\u4E2Acanvas\u5C0F\u9762\u677F
				app.appendChild(render.domElement);
				
				// \u521B\u9020\u4E00\u4E2A\u7ACB\u65B9\u4F53, \u70B9\u6A21\u578B
				var geometry = new THREE.CylinderGeometry(10, 10, 20, 15); //\u521B\u5EFA\u4E00\u4E2A\u7ACB\u65B9\u4F53\u51E0\u4F55\u5BF9\u8C61Geometry
				// \u521B\u9020\u4E00\u4E2A\u7ACB\u65B9\u4F53, \u7F51\u683C\u6A21\u578B
				var material3 = new THREE.MeshBasicMaterial({
					color: 0xffff00,
				}); 
				var meshs = new THREE.Mesh(geometry, material3);
				// \u521B\u5EFA\u7269\u4F53\u7684\u8FB9\u6846\u7EBF
				var geoEdges = new THREE.EdgesGeometry(geometry, 1);
				var edgesMtl =  new THREE.LineBasicMaterial({color: 0xff0000});
				var geoLine = new THREE.LineSegments(geoEdges, edgesMtl);
				
				meshs.add(geoLine);
				scene.add(meshs);
				//\u6267\u884C\u6E32\u67D3\u64CD\u4F5C   \u6307\u5B9A\u573A\u666F\u3001\u76F8\u673A\u4F5C\u4E3A\u53C2\u6570
				camera.position.z = 40;
				camera.position.y = 20;
				camera.position.x = 0;
				render.render(scene, camera);
				
				// \u4EA7\u751F\u52A8\u6548
				function animate(){
					// 1.\u7167\u76F8\u673A\u79FB\u52A8
					camera.position.y -= 0.05;
					if(camera.position.y &lt; -10) {
						camera.position.z += 0.05;
					}
					
					render.render(scene, camera);
				}
				setInterval(animate,10);
		&lt;/script&gt;
	&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6548\u679C\uFF1A<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97bdfba28c0b4b408a1617a100aede51~tplv-k3u1fbpfcp-zoom-1.image" alt="\u67F1\u4F53\u6A21\u62DF\u5B54\u660E\u706F\u653E\u98DE\u6548\u679C"><br> \u5982\u679C\u662F\u8BA9\u7269\u4F53\u79FB\u52A8\uFF0C\u5C06\u8FD0\u52A8\u51FD\u6570\u7A0D\u4F5C\u4FEE\u6539\u5373\u53EF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u4EA7\u751F\u52A8\u6548</span>
<span class="token keyword">function</span> <span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// if(camera.position.y &gt;= -1000){</span>
	<span class="token comment">// 	// 1.\u7167\u76F8\u673A\u79FB\u52A8</span>
	<span class="token comment">// 	camera.position.y -= 0.3;</span>
	<span class="token comment">// 	if(camera.position.y &lt; -10) {</span>
	<span class="token comment">// 		camera.position.z += 0.3;</span>
	<span class="token comment">// 	}</span>
	<span class="token comment">// }</span>
	<span class="token comment">//2.\u7269\u4F53\u79FB\u52A8</span>
	meshs<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">+=</span> <span class="token number">0.3</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span>meshs<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
		meshs<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">-=</span> <span class="token number">0.3</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	render<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
	window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>animate<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6027\u80FD" tabindex="-1"><a class="header-anchor" href="#\u6027\u80FD" aria-hidden="true">#</a> \u6027\u80FD</h2><p>\u5728\u5B9E\u9645\u751F\u6D3B\u4E2D\uFF0C\u7ECF\u5E38\u53EF\u4EE5\u770B\u5230\u7ED8\u5236\u51FA\u6765\u7684\u52A8\u753B\u6548\u679C\uFF0C\u800C\u6709\u4E9B\u52A8\u753B\u6548\u679C\u770B\u8D77\u6765\u975E\u5E38\u6D41\u7545\uFF0C\u6709\u4E9B\u5219\u662F\u5341\u5206\u5361\u987F\u3002\u8FD9\u4E9B\u4E0E\u7A0B\u5E8F\u8FD0\u52A8\u540E\u7684\u6027\u80FD\u606F\u606F\u76F8\u5173\u3002<br><br><br> \u5173\u4E8E\u6027\u80FD\uFF1A\u6D4B\u8BD5\u4E00\u4E2A\u7A0B\u5E8F\uFF0C\u6027\u80FD\u4E0A\u662F\u5426\u6709\u74F6\u9888\uFF0C\u57283D\u4E16\u754C\u91CC\uFF0C\u7ECF\u5E38\u4F7F\u7528\u5E27\u6570\u7684\u6982\u5FF5\uFF0C\u9996\u5148\u6211\u4EEC\u6765\u5B9A\u4E49\u4E00\u4E0B\u5E27\u6570\u7684\u610F\u4E49\u3002</p><p>\u5E27\u6570\uFF1A\u56FE\u5F62\u5904\u7406\u5668\u6BCF\u79D2\u949F\u80FD\u591F\u5237\u65B0\u51E0\u6B21\uFF0C\u901A\u5E38\u7528fps\uFF08Frames Per Second\uFF09\u6765\u8868\u793A</p><p>\u7269\u4F53\u8FD0\u52A8\u5728\u4EBA\u773C\u4E2D\uFF1A<br> \u5F53\u7269\u4F53\u5728\u5FEB\u901F\u8FD0\u52A8\u65F6,\u5F53\u4EBA\u773C\u6240\u770B\u5230\u7684\u5F71\u50CF\u6D88\u5931\u540E\uFF0C\u4EBA\u773C\u4ECD\u80FD\u7EE7\u7EED\u4FDD\u7559\u5176\u5F71\u50CF1/24\u79D2\u5DE6\u53F3\u7684\u56FE\u50CF\uFF0C\u8FD9\u79CD\u73B0\u8C61\u88AB\u79F0\u4E3A\u89C6\u89C9\u6682\u7559\u73B0\u8C61\u3002\u662F\u4EBA\u773C\u5177\u6709\u7684\u4E00\u79CD\u6027\u8D28\u3002\u4EBA\u773C\u89C2\u770B\u7269\u4F53\u65F6\uFF0C\u6210\u50CF\u4E8E\u89C6\u7F51\u819C\u4E0A\uFF0C\u5E76\u7531\u89C6\u795E\u7ECF\u8F93\u5165\u4EBA\u8111\uFF0C\u611F\u89C9\u5230\u7269\u4F53\u7684\u50CF\u3002\u4E00\u5E27\u4E00\u5E27\u7684\u56FE\u50CF\u8FDB\u5165\u4EBA\u8111\uFF0C\u4EBA\u8111\u5C31\u4F1A\u5C06\u8FD9\u4E9B\u56FE\u50CF\u7ED9\u8FDE\u63A5\u8D77\u6765\uFF0C\u5F62\u6210\u52A8\u753B\u3002</p><p>\u5728three.js\u4E2D\uFF0C\u4E3A\u4E86\u80FD\u8BA9\u6211\u4EEC\u66F4\u597D\u7684\u770B\u5230\u8FD9\u4E9B\u6570\u636E\uFF0C\u5C31\u53EF\u4EE5\u4F7F\u7528\u6027\u80FD\u76D1\u89C6\u5668Stats\u53BB\u5BF9\u8FD0\u52A8\u505A\u51FA\u68C0\u6D4B\u7BA1\u7406\u3002</p><h3 id="\u6027\u80FD\u76D1\u89C6\u5668stats" tabindex="-1"><a class="header-anchor" href="#\u6027\u80FD\u76D1\u89C6\u5668stats" aria-hidden="true">#</a> \u6027\u80FD\u76D1\u89C6\u5668Stats</h3>`,13),r=s("\u5173\u4E8EStats\u5B98\u65B9\u4ECB\u7ECD\uFF1Ahttps://github.com/mrdoob/stats.js"),d=n("br",null,null,-1),m=s(" \u5728\u4E0B\u8F7DThree.js\u540E\u4E5F\u53EF\u4EE5\u5728\u6587\u4EF6\u5939\u4E2D\u627E\u5230\uFF0C\u4ECEGitHub\u4E0A\u4E0B\u8F7D\u53EF\u80FD\u6709\u4E9B\u6162\uFF0C\u6211\u662F\u4ECEgitee\u4E0A\u4E0B\u8F7D\u7684\u3002\u7ED9\u51FA\u51E0\u4E2A\u94FE\u63A5\uFF1A"),v=n("br",null,null,-1),b={href:"https://gitee.com/lyon_en/three.js?_from=gitee_search",target:"_blank",rel:"noopener noreferrer"},k=s("three.js\u4E0B\u8F7D\u5730\u574001"),h=n("br",null,null,-1),g={href:"https://gitee.com/kitlab/three.js?_from=gitee_search",target:"_blank",rel:"noopener noreferrer"},f=s("three.js\u4E0B\u8F7D\u5730\u574002"),_=n("br",null,null,-1),y={href:"https://github.com/mrdoob/three.js",target:"_blank",rel:"noopener noreferrer"},E=s("GitHub\u5730\u5740"),w=n("br",null,null,-1),j=n("img",{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46b6bf665de44dcda3bbc9bbe139b647~tplv-k3u1fbpfcp-zoom-1.image",alt:"\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"},null,-1),x=n("br",null,null,-1),T=s(" \u5728\u4F7F\u7528\u65F6\u8BB0\u5F97\u5F15\u5165stats\u6587\u4EF6\uFF0C\u4E00\u822C\u6765\u8BF4\u4F7F\u7528\u7684\u6548\u679C\u5982\u4E0B\uFF1A"),H=n("br",null,null,-1),R=s(" 1\u3001setMode\u51FD\u6570"),S=e(`<p>\u53C2\u6570\u4E3A0\u7684\u65F6\u5019\uFF0C\u8868\u793A\u663E\u793A\u7684\u662FFPS\u754C\u9762\uFF0C\u53C2\u6570\u4E3A1\u7684\u65F6\u5019\uFF0C\u8868\u793A\u663E\u793A\u7684\u662FMS\u754C\u9762\u3002</p><p>2\u3001stats\u7684domElement</p><p>stats\u7684domElement\u8868\u793A\u7ED8\u5236\u7684\u76EE\u7684\u5730\uFF08DOM\uFF09\uFF0C\u6CE2\u5F62\u56FE\u5C31\u7ED8\u5236\u5728\u8FD9\u4E0A\u9762\u3002</p><p>3\u3001stats\u7684begin\u51FD\u6570</p><p>begin\uFF0C\u5728\u4F60\u8981\u6D4B\u8BD5\u7684\u4EE3\u7801\u524D\u9762\u8C03\u7528begin\u51FD\u6570\uFF0C\u5728\u4F60\u4EE3\u7801\u6267\u884C\u5B8C\u540E\u8C03\u7528end()\u51FD\u6570\uFF0C\u8FD9\u6837\u5C31\u80FD\u591F\u7EDF\u8BA1\u51FA\u8FD9\u6BB5\u4EE3\u7801\u6267\u884C\u7684\u5E73\u5747\u5E27\u6570\u4E86\u3002<br><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f08c805b19f846a2894ad0c3adb0407f~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"><br> \u4F7F\u7528\u65B9\u6CD5\uFF1A\u5728\u4EE3\u7801\u4E2D\u63D2\u5165\u5373\u53EF</p><ol><li>new \u4E00\u4E2Astats\u5BF9\u8C61\uFF0C\u4EE3\u7801\uFF1Astats = new Stats();</li><li>\u5C06\u8FD9\u4E2A\u5BF9\u8C61\u52A0\u5165\u5230html\u7F51\u9875\u4E2D\u53BB</li><li>\u8C03\u7528stats.update()\u51FD\u6570\u6765\u7EDF\u8BA1\u65F6\u95F4\u548C\u5E27\u6570</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u6027\u80FD\u76D1\u89C6\u5668</span>
<span class="token keyword">var</span> stats <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stats</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
stats<span class="token punctuation">.</span><span class="token function">setMode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0: fps, 1: ms</span>
<span class="token comment">// \u5C06stats\u7684\u754C\u9762\u5BF9\u5E94\u5DE6\u4E0A\u89D2</span>
stats<span class="token punctuation">.</span>domElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span>position <span class="token operator">=</span> <span class="token string">&#39;absolute&#39;</span><span class="token punctuation">;</span>
stats<span class="token punctuation">.</span>domElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token string">&#39;30px&#39;</span><span class="token punctuation">;</span>
stats<span class="token punctuation">.</span>domElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span>top <span class="token operator">=</span> <span class="token string">&#39;0px&#39;</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span> stats<span class="token punctuation">.</span>domElement <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u5728\u8FD0\u52A8\u51FD\u6570\u4E2D\u5199\u5165stats.update();</span>
<span class="token keyword">function</span> <span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span>camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&gt;=</span> <span class="token operator">-</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 1.\u7167\u76F8\u673A\u79FB\u52A8</span>
		camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">-=</span> <span class="token number">0.3</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">&lt;</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">+=</span> <span class="token number">0.3</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	render<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
	window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>animate<span class="token punctuation">)</span><span class="token punctuation">;</span>
	stats<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e4d26c1ea624078a18aea72cf8a1842~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p>`,8);function q(z,M){const t=p("ExternalLinkIcon");return l(),c("div",null,[u,n("p",null,[r,d,m,v,n("a",b,[k,a(t)]),h,n("a",g,[f,a(t)]),_,n("a",y,[E,a(t)]),w,j,x,T,H,R]),S])}var L=i(o,[["render",q],["__file","Three.js\u6742\u8BB03.html.vue"]]);export{L as default};
