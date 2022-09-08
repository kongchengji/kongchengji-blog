import{_ as p,r as t,o as e,c,a as n,b as o,d as s,e as u}from"./app.34e7ec3f.js";const l={},i=s("\u8FD9\u662F\u6211\u53C2\u4E0E11\u6708\u66F4\u6587\u6311\u6218\u7684\u7B2C10\u5929\uFF0C\u6D3B\u52A8\u8BE6\u60C5\u67E5\u770B\uFF1A"),r={href:"https://juejin.cn/post/7023643374569816095",title:"https://juejin.cn/post/7023643374569816095",target:"_blank",rel:"noopener noreferrer"},k=s("2021\u6700\u540E\u4E00\u6B21\u66F4\u6587\u6311\u6218"),d=u(`<h1 id="\u7406\u89E3buffer" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3buffer" aria-hidden="true">#</a> \u7406\u89E3Buffer</h1><p><code>JavaScript</code>\u5BF9\u4E8E\u5B57\u7B26\u4E32\u7684\u64CD\u4F5C\u5341\u5206\u53CB\u597D</p><p><code>Buffer</code>\u662F\u4E00\u4E2A\u50CF<code>Array</code>\u7684\u5BF9\u8C61\uFF0C\u4E3B\u8981\u7528\u4E8E\u64CD\u4F5C\u5B57\u8282\u3002</p><hr><br><h2 id="buffer\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#buffer\u7ED3\u6784" aria-hidden="true">#</a> Buffer\u7ED3\u6784</h2><p><code>Buffer</code>\u662F\u4E00\u4E2A\u5178\u578B\u7684JavaScript\u548CC++\u7ED3\u5408\u7684\u6A21\u5757\uFF0C\u5C06\u6027\u80FD\u76F8\u5173\u90E8\u5206\u7528C++\u5B9E\u73B0\uFF0C\u5C06\u975E\u6027\u80FD\u76F8\u5173\u90E8\u5206\u7528JavaScript\u5B9E\u73B0\u3002</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1c2cab6d557431bad522d056aedd584~tplv-k3u1fbpfcp-watermark.image?" alt="Buffer\u5206\u5DE5.png"></p><p>Buffer\u6240\u5360\u7528\u7684\u5185\u5B58\u4E0D\u662F\u901A\u8FC7V8\u5206\u914D\uFF0C\u5C5E\u4E8E\u5806\u5916\u5185\u5B58\u3002 \u7531\u4E8EV8\u5783\u573E\u56DE\u6536\u6027\u80FD\u5F71\u54CD\uFF0C\u5C06\u5E38\u7528\u7684\u64CD\u4F5C\u5BF9\u8C61\u7528\u66F4\u9AD8\u6548\u548C\u4E13\u6709\u7684\u5185\u5B58\u5206\u914D\u56DE\u6536\u653F\u7B56\u6765\u7BA1\u7406\u662F\u4E2A\u4E0D\u9519\u7684\u601D\u8DEF\u3002</p><blockquote><p>Buffer\u5728Node\u8FDB\u7A0B\u542F\u52A8\u65F6\u5C31\u5DF2\u7ECF\u4EF7\u503C\uFF0C\u5E76\u4E14\u653E\u5728\u5168\u5C40\u5BF9\u8C61\uFF08global\uFF09\u4E0A\u3002\u6240\u4EE5\u4F7F\u7528buffer\u65E0\u9700require\u5F15\u5165</p></blockquote><hr><h2 id="buffer\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#buffer\u5BF9\u8C61" aria-hidden="true">#</a> Buffer\u5BF9\u8C61</h2><p>Buffer\u5BF9\u8C61\u7684\u5143\u7D20\u672A16\u8FDB\u5236\u7684\u4E24\u4F4D\u6570\uFF0C\u53730-255\u7684\u6570\u503C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> buf01 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf01<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// &lt;Buffer 00 00 00 00 00 00 00 00&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u4F7F\u7528<code>fill</code>\u586B\u5145buf\u7684\u503C(\u9ED8\u8BA4\u4E3A<code>utf-8</code>\u7F16\u7801)\uFF0C\u5982\u679C\u586B\u5145\u7684\u503C\u8D85\u8FC7buffer\uFF0C\u5C06\u4E0D\u4F1A\u88AB\u5199\u5165\u3002</p><blockquote><p>\u5982\u679Cbuffer\u957F\u5EA6\u5927\u4E8E\u5185\u5BB9\uFF0C\u5219\u4F1A\u53CD\u590D\u586B\u5145</p></blockquote><p>\u5982\u679C\u60F3\u8981\u6E05\u7A7A\u4E4B\u524D\u586B\u5145\u7684\u5185\u5BB9\uFF0C\u53EF\u4EE5\u76F4\u63A5<code>fill()</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>buf01<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token string">&#39;12345678910&#39;</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf01<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// &lt;Buffer 31 32 33 34 35 36 37 38&gt;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf01<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 12345678</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u586B\u5165\u7684\u5185\u5BB9\u662F\u4E2D\u6587\uFF0C\u5728<code>utf-8</code>\u7684\u5F71\u54CD\u4E0B\uFF0C\u4E2D\u6587\u5B57\u4F1A\u5360\u75283\u4E2A\u5143\u7D20\uFF0C\u5B57\u6BCD\u548C\u534A\u89D2\u6807\u70B9\u7B26\u53F7\u5360\u75281\u4E2A\u5143\u7D20\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> buf02 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">&#39;\u5F00\u59CB\u6211\u4EEC\u7684\u65B0\u8DEF\u7A0B&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf02<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// \u5F00\u59CB\u6211\u4EEC\u7684\u65B0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Buffer</code>\u53D7<code>Array\u7C7B\u578B</code>\u5F71\u54CD\u5F88\u5927\uFF0C\u53EF\u4EE5\u8BBF\u95EElength\u5C5E\u6027\u5F97\u5230\u957F\u5EA6\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u4E0B\u6807\u8BBF\u95EE\u5143\u7D20\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7indexOf\u67E5\u770B\u5143\u7D20\u4F4D\u7F6E\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf02<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// &lt;Buffer e5 bc 80 e5 a7 8b e6 88 91 e4 bb ac e7 9a 84 e6 96 b0&gt;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf02<span class="token punctuation">.</span>length<span class="token punctuation">)</span>  <span class="token comment">// 18\u5B57\u8282</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf02<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment">// 230\uFF1A e6 \u8F6C\u6362\u540E\u5C31\u662F 230</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf02<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;\u6211&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// 6\uFF1A\u5728\u7B2C7\u4E2A\u5B57\u8282\u4F4D\u7F6E</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>buf02<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// \u6211: \u53D6\u5F97&lt;Buffer e6 88 91&gt;\uFF0C\u8F6C\u6362\u540E\u5C31\u662F&#39;\u6211&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u7ED9\u5B57\u8282\u8D4B\u503C\u4E0D\u662F0~255\u4E4B\u95F4\u7684\u6574\u6570\uFF0C\u6216\u8005\u8D4B\u503C\u65F6\u5C0F\u6570\u65F6\uFF0C\u8D4B\u503C\u5C0F\u4E8E0\uFF0C\u5C06\u8BE5\u503C\u9010\u6B21\u52A0256.\u76F4\u5230\u5F97\u52300~255\u4E4B\u95F4\u7684\u6574\u6570\u3002\u5982\u679C\u5927\u4E8E255\uFF0C\u5C31\u9010\u6B21\u51CF\u53BB255\u3002 \u5982\u679C\u662F\u5C0F\u6570\uFF0C\u820D\u53BB\u5C0F\u6570\u90E8\u5206(\u4E0D\u505A\u56DB\u820D\u4E94\u5165)</p><hr><h2 id="buffer\u5185\u5B58\u5206\u914D" tabindex="-1"><a class="header-anchor" href="#buffer\u5185\u5B58\u5206\u914D" aria-hidden="true">#</a> Buffer\u5185\u5B58\u5206\u914D</h2><p><code>Buffer</code>\u5BF9\u8C61\u7684\u5185\u5B58\u5206\u914D\u4E0D\u662F\u5728V8\u7684\u5806\u5185\u5B58\u4E2D\uFF0C\u800C\u662F\u5728Node\u7684C++\u5C42\u9762\u5B9E\u73B0\u5185\u5B58\u7684\u7533\u8BF7\u3002 \u56E0\u4E3A\u5904\u7406\u5927\u91CF\u7684\u5B57\u8282\u6570\u636E\u4E0D\u80FD\u91C7\u7528\u9700\u8981\u4E00\u70B9\u5185\u5B58\u5C31\u5411\u64CD\u4F5C\u7CFB\u7EDF\u7533\u8BF7\u4E00\u70B9\u5185\u5B58\u7684\u65B9\u5F0F\u3002\u4E3A\u6B64Node\u5728\u5185\u5B58\u4E0A\u4F7F\u7528\u7684\u662F\u5728C++\u5C42\u9762\u7533\u8BF7\u5185\u5B58\uFF0C\u5728<code>JavaScript</code>\u4E2D\u5206\u914D\u5185\u5B58\u7684\u65B9\u5F0F</p><p><code>Node</code>\u91C7\u7528\u4E86<code>slab\u5206\u914D\u673A\u5236</code>\uFF0C<code>slab</code>\u662F\u4EE5\u4E2D\u52A8\u6001\u5185\u5B58\u7BA1\u7406\u673A\u5236\uFF0C\u76EE\u524D\u5728\u4E00\u4E9B<code>*nix</code>\u64CD\u4F5C\u7CFB\u7EDF\u7528\u4E2D\u6709\u5E7F\u6CDB\u7684\u5E94\u7528\uFF0C\u6BD4\u5982<code>Linux</code></p><p><code>slab</code>\u5C31\u662F\u4E00\u5757\u7533\u8BF7\u597D\u7684\u56FA\u5B9A\u5927\u5C0F\u7684\u5185\u5B58\u533A\u57DF\uFF0Cslab\u5177\u6709\u4EE5\u4E0B\u4E09\u79CD\u72B6\u6001\uFF1A</p><ul><li>full\uFF1A\u5B8C\u5168\u5206\u914D\u72B6\u6001</li><li>partial\uFF1A\u90E8\u5206\u5206\u914D\u72B6\u6001</li><li>empty\uFF1A\u6CA1\u6709\u88AB\u5206\u914D\u72B6\u6001</li></ul><p>Node\u4EE5<strong>8KB</strong>\u4E3A\u754C\u9650\u6765\u533A\u5206Buffer\u662F\u5927\u5BF9\u8C61\u8FD8\u662F\u5C0F\u5BF9\u8C61</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">.</span>poolSize<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 8192</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>\u8FD9\u4E2A8KB\u7684\u503C\u5C31\u989D\u662F\u6BCF\u4E2Aslab\u7684\u5927\u5C0F\u503C\uFF0C\u5728JavaScript\u5C42\u9762\uFF0C\u4EE5\u5B83\u4F5C\u4E3A\u5355\u4F4D\u5355\u5143\u8FDB\u884C\u5185\u5B58\u7684\u5206\u914D</p></blockquote><h3 id="\u5206\u914D\u5C0Fbuffer\u5BF9\u8C61" tabindex="-1"><a class="header-anchor" href="#\u5206\u914D\u5C0Fbuffer\u5BF9\u8C61" aria-hidden="true">#</a> \u5206\u914D\u5C0Fbuffer\u5BF9\u8C61</h3><p>\u5982\u679C\u6307\u5B9A<code>Buffer</code>\u5927\u5C0F\u5C0F\u4E8E8KB\uFF0CNode\u4F1A\u6309\u7167\u5C0F\u5BF9\u8C61\u65B9\u5F0F\u8FDB\u884C\u5206\u914D</p><ol><li>\u6784\u9020\u4E00\u4E2A\u65B0\u7684slab\u5355\u5143\uFF0C\u76EE\u524Dslab\u5904\u4E8Eempty\u7A7A\u72B6\u6001</li></ol><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82e16d5fdb114ed2a4ae8d3516291a07~tplv-k3u1fbpfcp-watermark.image?" alt="buffer\u5185\u5B58\u5206\u914D01.png"></p><ol start="2"><li>\u6784\u9020\u5C0F<code>buffer</code>\u5BF9\u8C611024KB\uFF0C\u5F53\u524D\u7684<code>slab</code>\u4F1A\u88AB\u5360\u75281024KB\uFF0C\u5E76\u4E14\u8BB0\u5F55\u4E0B\u662F\u4ECE\u8FD9\u4E2A<code>slab</code>\u7684\u54EA\u4E2A\u4F4D\u7F6E\u5F00\u59CB\u4F7F\u7528\u7684</li></ol><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9112d765af93400ba90556ecd1155bc1~tplv-k3u1fbpfcp-watermark.image?" alt="buffer\u5185\u5B58\u5206\u914D02.png"></p><ol start="3"><li>\u8FD9\u65F6\u518D\u521B\u5EFA\u4E00\u4E2A<code>buffer</code>\u5BF9\u8C61\uFF0C\u5927\u5C0F\u4E3A3072KB\u3002 \u6784\u9020\u8FC7\u7A0B\u4F1A\u5224\u65AD\u5F53\u524D<code>slab</code>\u5269\u4F59\u7A7A\u95F4\u662F\u5426\u8DB3\u591F\uFF0C\u5982\u679C\u8DB3\u591F\uFF0C\u4F7F\u7528\u5269\u4F59\u7A7A\u95F4\uFF0C\u5E76\u66F4\u65B0<code>slab</code>\u7684\u5206\u914D\u72B6\u6001\u3002 3072KB\u7A7A\u95F4\u88AB\u4F7F\u7528\u540E\uFF0C\u76EE\u524D\u6B64slab\u5269\u4F59\u7A7A\u95F44096KB\u3002</li></ol><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f706444b4a684b778b8d1783258cac32~tplv-k3u1fbpfcp-watermark.image?" alt="buffer\u5185\u5B58\u5206\u914D03.png"></p><ol start="4"><li>\u5982\u679C\u6B64\u65F6\u521B\u5EFA\u4E00\u4E2A6144KB\u5927\u5C0F\u7684<code>buffer</code>\uFF0C\u5F53\u524Dslab\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u4F1A\u6784\u9020\u65B0\u7684<code>slab</code>\uFF08\u8FD9\u4F1A\u9020\u6210\u539Fslab\u5269\u4F59\u7A7A\u95F4\u6D6A\u8D39\uFF09</li></ol><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/974a7a7cc2724cf4aa2a14b767c2919c~tplv-k3u1fbpfcp-watermark.image?" alt="buffer\u5185\u5B58\u5206\u914D04.png"></p><p>\u6BD4\u5982\u4E0B\u9762\u7684\u4F8B\u5B50\u4E2D\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">8192</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B2C\u4E00\u4E2A<code>slab</code>\u4E2D\u53EA\u4F1A\u5B58\u57281\u5B57\u8282\u7684buffer\u5BF9\u8C61\uFF0C\u800C\u540E\u4E00\u4E2Abuffer\u5BF9\u8C61\u4F1A\u6784\u5EFA\u4E00\u4E2A\u65B0\u7684slab\u5B58\u653E</p><blockquote><p>\u7531\u4E8E\u4E00\u4E2Aslab\u53EF\u80FD\u5206\u914D\u7ED9\u591A\u4E2ABuffer\u5BF9\u8C61\u4F7F\u7528\uFF0C\u53EA\u6709\u8FD9\u4E9B\u5C0Fbuffer\u5BF9\u8C61\u5728\u4F5C\u7528\u57DF\u91CA\u653E\u5E76\u90FD\u53EF\u4EE5\u56DE\u6536\u65F6\uFF0Cslab\u7684\u7A7A\u95F4\u624D\u4F1A\u88AB\u56DE\u6536\u3002 \u5C3D\u7BA1\u53EA\u521B\u5EFA1\u5B57\u8282\u7684buffer\u5BF9\u8C61\uFF0C\u4F46\u662F\u5982\u679C\u4E0D\u91CA\u653E\uFF0C\u5B9E\u9645\u662F8KB\u7684\u5185\u5B58\u90FD\u6CA1\u6709\u91CA\u653E</p></blockquote><p><strong>\u5C0F\u7ED3\uFF1A</strong></p><p>\u771F\u6B63\u7684\u5185\u5B58\u662F\u5728Node\u7684C++\u5C42\u9762\u63D0\u4F9B\uFF0CJavaScript\u5C42\u9762\u53EA\u662F\u4F7F\u7528\u3002\u5F53\u8FDB\u884C\u5C0F\u800C\u9891\u7E41\u7684Buffer\u64CD\u4F5C\u65F6\uFF0C\u91C7\u7528slab\u7684\u673A\u5236\u8FDB\u884C\u9884\u5148\u7533\u8BF7\u548C\u65F6\u5019\u5206\u914D\uFF0C\u4F7F\u5F97JavaScript\u5230\u64CD\u4F5C\u7CFB\u7EDF\u4E4B\u95F4\u4E0D\u5FC5\u6709\u8FC7\u591A\u7684\u5185\u5B58\u7533\u8BF7\u65B9\u9762\u7684\u7CFB\u7EDF\u8C03\u7528\u3002 \u5BF9\u4E8E\u5927\u5757\u7684buffer\uFF0C\u76F4\u63A5\u4F7F\u7528C++\u5C42\u9762\u63D0\u4F9B\u7684\u5185\u5B58\u5373\u53EF\uFF0C\u65E0\u9700\u7EC6\u817B\u7684\u5206\u914D\u64CD\u4F5C\u3002</p><hr><br><h2 id="buffer\u7684\u62FC\u63A5" tabindex="-1"><a class="header-anchor" href="#buffer\u7684\u62FC\u63A5" aria-hidden="true">#</a> Buffer\u7684\u62FC\u63A5</h2><p>buffer\u5728\u4F7F\u7528\u573A\u666F\u4E2D\uFF0C\u901A\u5E38\u662F\u4EE5\u4E00\u6BB5\u6BB5\u7684\u65B9\u5F0F\u8FDB\u884C\u4F20\u8F93\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> rs <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">&#39;./\u9759\u591C\u601D.txt&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">flags</span><span class="token operator">:</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    str <span class="token operator">+=</span> chunk<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

rs<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;end&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE5\u4E0A\u662F\u8BFB\u53D6\u6D41\u7684\u8303\u4F8B\uFF0Cdata\u65F6\u95F4\u4E2D\u83B7\u53D6\u5230\u7684chunk\u5BF9\u8C61\u5C31\u662Fbuffer\u5BF9\u8C61\u3002</p><p>\u4F46\u662F\u5F53\u8F93\u5165\u6D41\u4E2D\u6709\u5BBD\u5B57\u8282\u7F16\u7801\uFF08<code>\u4E00\u4E2A\u5B57\u5360\u591A\u4E2A\u5B57\u8282</code>\uFF09\u65F6\uFF0C\u95EE\u9898\u5C31\u4F1A\u66B4\u9732\u3002\u5728<code>str += chunk</code>\u4E2D\u9690\u85CF\u4E86<code>toString()</code>\u64CD\u4F5C\u3002\u7B49\u4EF7\u4E8E<code>str = str.toString() + chunk.toString()</code>\u3002</p><p>\u4E0B\u9762\u5C06\u53EF\u8BFB\u6D41\u7684\u6BCF\u6B21\u8BFB\u53D6buffer\u957F\u5EA6\u9650\u5236\u4E3A11.</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">&#39;./\u9759\u591C\u601D.txt&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">flags</span><span class="token operator">:</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">highWaterMark</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u51FA\u5F97\u5230\uFF1A</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/938c4f68edf644c28f3443e2b6bec806~tplv-k3u1fbpfcp-watermark.image?" alt="buffer\u62FC\u63A51.png"></p><p>\u4E0A\u9762\u51FA\u73B0\u4E86\u4E71\u7801<code>\uFFFD</code>\uFF0C\u4E0A\u9762\u9650\u5236\u4E86buffer\u957F\u5EA6\u4E3A11\uFF0C\u5BF9\u4E8E\u4EFB\u610F\u957F\u5EA6\u7684buffer\u800C\u8A00\uFF0C\u5BBD\u5B57\u8282\u5B57\u7B26\u4E32\u90FD\u6709\u53EF\u80FD\u5B58\u5728\u88AB\u622A\u65AD\u7684\u60C5\u51B5\uFF0C\u53EA\u4E0D\u8FC7buffer\u8D8A\u957F\u51FA\u73B0\u6982\u7387\u8D8A\u4F4E\u3002</p><h3 id="encoding" tabindex="-1"><a class="header-anchor" href="#encoding" aria-hidden="true">#</a> encoding</h3><p>\u4F46\u662F\u5982\u679C\u8BBE\u7F6E\u4E86<code>encoding</code>\u4E3A<code>utf-8</code>\uFF0C\u5C31\u4E0D\u4F1A\u51FA\u73B0\u6B64\u95EE\u9898\u4E86\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">&#39;./\u9759\u591C\u601D.txt&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">flags</span><span class="token operator">:</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">highWaterMark</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token literal-property property">encoding</span><span class="token operator">:</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64bb5c2380d74db3aac8cb443a75c0fb~tplv-k3u1fbpfcp-watermark.image?" alt="buffer\u62FC\u63A52.png"></p><br><p><strong>\u539F\u56E0\uFF1A</strong> \u867D\u7136\u65E0\u8BBA\u600E\u4E48\u8BBE\u7F6E\u7F16\u7801\uFF0C\u6D41\u7684\u89E6\u53D1\u6B21\u6570\u90FD\u662F\u4E00\u6837\uFF0C\u4F46\u662F\u5728\u8C03\u7528<code>setEncoding</code>\u65F6\uFF0C\u53EF\u8BFB\u6D41\u5BF9\u8C61\u5728\u5185\u90E8\u8BBE\u7F6E\u4E86\u4E00\u4E2A<code>decoder\u5BF9\u8C61</code>\u3002\u6BCF\u6B21data\u4E8B\u4EF6\u90FD\u4F1A\u901A\u8FC7<code>decoder\u5BF9\u8C61</code>\u8FDB\u884Cbuffer\u5230\u5B57\u7B26\u4E32\u7684\u89E3\u7801\uFF0C\u7136\u540E\u4F20\u9012\u7ED9\u8C03\u7528\u8005\u3002</p><p><code>string_decoder</code> \u6A21\u5757\u63D0\u4F9B\u4E86\u7528\u4E8E\u5C06 Buffer \u5BF9\u8C61\u89E3\u7801\u4E3A\u5B57\u7B26\u4E32\uFF08\u4EE5\u4FDD\u7559\u7F16\u7801\u7684\u591A\u5B57\u8282 UTF-8 \u548C UTF-16 \u5B57\u7B26\u7684\u65B9\u5F0F\uFF09\u7684 API</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> StringDecoder <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;string_decoder&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s1 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0xe7</span><span class="token punctuation">,</span> <span class="token number">0xaa</span><span class="token punctuation">,</span> <span class="token number">0x97</span><span class="token punctuation">,</span> <span class="token number">0xe5</span><span class="token punctuation">,</span> <span class="token number">0x89</span><span class="token punctuation">,</span> <span class="token number">0x8d</span><span class="token punctuation">,</span> <span class="token number">0xe6</span><span class="token punctuation">,</span> <span class="token number">0x98</span><span class="token punctuation">,</span> <span class="token number">0x8e</span><span class="token punctuation">,</span> <span class="token number">0xe6</span><span class="token punctuation">,</span> <span class="token number">0x9c</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0x88</span><span class="token punctuation">,</span> <span class="token number">0xe5</span><span class="token punctuation">,</span> <span class="token number">0x85</span><span class="token punctuation">,</span> <span class="token number">0x89</span><span class="token punctuation">,</span> <span class="token number">0xef</span><span class="token punctuation">,</span> <span class="token number">0xbc</span><span class="token punctuation">,</span> <span class="token number">0x8c</span><span class="token punctuation">,</span> <span class="token number">0x0d</span><span class="token punctuation">,</span> <span class="token number">0x0a</span><span class="token punctuation">,</span> <span class="token number">0xe7</span><span class="token punctuation">,</span> <span class="token number">0x96</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s1<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s2<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;------------------&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> decoder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringDecoder</span><span class="token punctuation">(</span><span class="token string">&#39;utf8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>decoder<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>decoder<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/823b6fdeb3894a688091b4f04b8327e6~tplv-k3u1fbpfcp-watermark.image?" alt="buffer\u62FC\u63A53.png"></p><blockquote><p><code>StringDecoder</code>\u5728\u5F97\u5230\u7F16\u7801\u4E4B\u540E\uFF0C\u77E5\u9053\u4E86\u5BBD\u5B57\u8282\u5B57\u7B26\u4E32\u5728<code>utf-8</code>\u7F16\u7801\u4E0B\u662F\u4EE53\u4E2A\u5B57\u8282\u7684\u65B9\u5F0F\u5B58\u50A8\u7684\uFF0C\u6240\u4EE5\u7B2C\u4E00\u6B21<code>decoder.write</code>\u53EA\u4F1A\u8F93\u51FA\u524D9\u4E2A\u5B57\u8282\u8F6C\u7801\u7684\u5B57\u7B26\uFF0C\u540E\u4E24\u4E2A\u5B57\u8282\u4F1A\u88AB\u4FDD\u7559\u5728<code>StringDecoder</code>\u5185\u90E8\u3002</p></blockquote><hr><br><br><h2 id="buffer\u4E0E\u6027\u80FD" tabindex="-1"><a class="header-anchor" href="#buffer\u4E0E\u6027\u80FD" aria-hidden="true">#</a> Buffer\u4E0E\u6027\u80FD</h2><p>buffer\u5728\u6587\u4EF6I/O\u548C\u7F51\u7EDCI/O\u4E2D\u8FD0\u7528\u5E7F\u6CDB\uFF0C\u5C24\u5176\u5728\u7F51\u7EDC\u4F20\u8F93\u4E2D\uFF0C\u6027\u80FD\u4E3E\u8DB3\u8F7B\u91CD\u3002\u5728\u5E94\u7528\u4E2D\uFF0C\u901A\u5E38\u4F1A\u64CD\u4F5C\u5B57\u7B26\u4E32\uFF0C\u4F46\u662F\u4E00\u65E6\u5728\u7F51\u7EDC\u4E2D\u4F20\u8F93\uFF0C\u90FD\u9700\u8981\u8F6C\u6362\u6210buffer\uFF0C\u4EE5\u8FDB\u884C\u4E8C\u8FDB\u5236\u6570\u636E\u4F20\u8F93\u3002 \u5728web\u5E94\u7528\u4E2D\uFF0C\u5B57\u7B26\u4E32\u8F6C\u6362\u5230buffer\u662F\u65F6\u65F6\u523B\u523B\u53D1\u751F\u7684\uFF0C\u63D0\u9AD8\u5B57\u7B26\u4E32\u5230buffer\u7684\u8F6C\u6362\u6548\u7387\uFF0C\u53EF\u4EE5\u5F88\u5927\u7A0B\u5EA6\u5730\u63D0\u9AD8\u7F51\u7EDC\u541E\u5410\u7387\u3002</p><p>\u5982\u679C\u901A\u8FC7\u7EAF\u5B57\u7B26\u4E32\u7684\u65B9\u5F0F\u5411\u5BA2\u6237\u7AEF\u53D1\u9001\uFF0C\u6027\u80FD\u4F1A\u6BD4\u53D1\u9001buffer\u5BF9\u8C61\u66F4\u5DEE\uFF0C\u56E0\u4E3Abuffer\u5BF9\u8C61\u65E0\u987B\u5728\u6BCF\u6B21\u54CD\u5E94\u65F6\u8FDB\u884C\u8F6C\u6362\u3002\u901A\u8FC7\u9884\u5148\u8F6C\u6362\u9759\u6001\u5185\u5BB9\u4E3Abuffer\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u6709\u6548\u5730\u51CF\u5C11CPU\u91CD\u590D\u4F7F\u7528\uFF0C\u8282\u7701\u670D\u52A1\u5668\u8D44\u6E90\u3002</p><p>\u53EF\u4EE5\u9009\u62E9\u5C06\u9875\u9762\u4E2D\u52A8\u6001\u548C\u9759\u6001\u5185\u5BB9\u5206\u79BB\uFF0C\u9759\u6001\u5185\u5BB9\u90E8\u5206\u9884\u5148\u8F6C\u6362\u4E3Abuffer\u7684\u65B9\u5F0F\uFF0C\u4F7F\u5F97\u6027\u80FD\u5F97\u5230\u63D0\u5347\u3002</p><p>\u5728\u6587\u4EF6\u7684\u8BFB\u53D6\u65F6\uFF0C<code>highWaterMark</code>\u8BBE\u7F6E\u5BF9\u6027\u80FD\u5F71\u54CD\u81F3\u5173\u91CD\u8981\u3002\u5728\u7406\u60F3\u72B6\u6001\u4E0B\uFF0C\u6BCF\u6B21\u8BFB\u53D6\u7684\u957F\u5EA6\u5C31\u662F\u7528\u6237\u6307\u5B9A\u7684<code>highWaterMark</code>\u3002</p><p><code>highWaterMark</code>\u5927\u5C0F\u5BF9\u6027\u80FD\u6709\u4E24\u4E2A\u5F71\u54CD\u7684\u70B9\uFF1A</p><ul><li>\u5BF9buffer\u5185\u5B58\u7684\u5206\u914D\u548C\u4F7F\u7528\u6709\u4E00\u5B9A\u5F71\u54CD</li><li>\u8BBE\u7F6E\u8FC7\u5C0F\uFF0C\u53EF\u80FD\u5BFC\u81F4\u7CFB\u7EDF\u8C03\u7528\u6B21\u6570\u8FC7\u591A</li></ul>`,80);function f(b,m){const a=t("ExternalLinkIcon");return e(),c("div",null,[n("p",null,[i,n("a",r,[k,o(a)])]),d])}var g=p(l,[["render",f],["__file","NodeJs\u6DF1\u5165\u6D45\u51FA\u4E4B\u65C5\uFF1A\u7406\u89E3Buffer.html.vue"]]);export{g as default};
