import{_ as t,r as e,o,c,a as n,b as l,e as s,d as a}from"./app.34e7ec3f.js";const i={},u=s('<h1 id="\u88C5\u9970\u5668-\u4FEE\u9970\u5668-decorator" tabindex="-1"><a class="header-anchor" href="#\u88C5\u9970\u5668-\u4FEE\u9970\u5668-decorator" aria-hidden="true">#</a> \u88C5\u9970\u5668/\u4FEE\u9970\u5668 Decorator</h1><p>\u5B9A\u4E49\uFF1A\u88C5\u9970\u5668\u662F\u4E00\u79CD\u7279\u6B8A\u7C7B\u578B\u7684\u58F0\u660E\uFF0C\u80FD\u591F\u88AB\u9644\u52A0\u5230\u7C7B\u7684\u58F0\u660E\u3001\u65B9\u6CD5\u3001\u5C5E\u6027\u6216\u53C2\u6570\u4E0A\uFF0C\u53EF\u4EE5\u4FEE\u6539\u7C7B\u7684\u5C5E\u6027</p><p>\u901A\u4FD7\u7684\u8BB2\u88C5\u9970\u5668\u5C31\u662F\u4E00\u4E2A\u65B9\u6CD5\uFF1A\u53EF\u4EE5\u6CE8\u5165\u5230\u7C7B\u3001\u65B9\u6CD5\u3001\u5C5E\u6027\u53C2\u6570\u4E0A\u6765\u6269\u5C55\u7C7B\u3001\u5C5E\u6027\u3001\u65B9\u6CD5\u3001\u53C2\u6570\u7684\u529F\u80FD\u3002\u88C5\u9970\u5668\u662F\u5B9E\u73B0 <code>AOP</code>\uFF08\u9762\u5411\u5207\u9762\uFF09\u7F16\u7A0B\u7684\u4E00\u79CD\u91CD\u8981\u65B9\u5F0F\u3002</p><p>\u901A\u8FC7\u6CE8\u5165\u7684\u5BF9\u8C61\u4E0D\u540C\uFF0C\u53EF\u4EE5\u5C06\u88C5\u9970\u5668\u5206\u4E3A\uFF1A</p><ul><li>\u7C7B\u88C5\u9970\u5668</li><li>\u7C7B\u5C5E\u6027\u88C5\u9970\u5668</li><li>\u7C7B\u65B9\u6CD5\u88C5\u9970\u5668</li><li>\u7C7B\u65B9\u6CD5\u53C2\u6570\u88C5\u9970\u5668</li></ul><p>\u88C5\u9970\u5668\u7684\u5199\u6CD5\uFF1A</p><ul><li>\u666E\u901A\u88C5\u9970\u5668\uFF08\u65E0\u6CD5\u4F20\u53C2\uFF09</li><li>\u88C5\u9970\u5668\u5DE5\u5382\uFF08\u53EF\u4F20\u53C2\uFF09</li></ul><p>\u88C5\u9970\u5668\u76EE\u524D\u5DF2\u7ECF\u662F<code>ES7</code>\u7684\u6807\u51C6\u7279\u6027\u4E4B\u4E00\u4E86\uFF0C\u4F46\u662F\u5728\u4F7F\u7528\u65F6\u9700\u8981\u7528<code>Babel</code>\u8FDB\u884C\u8F6C\u6362\uFF0C\u6216\u8005\u5728<code>tsconfig.json</code>\u7F16\u8BD1\u9009\u9879\u4E2D\u6253\u5F00<code>experimentalDecorators</code>,\u7136\u540E\u4F7F\u7528<code>tsc</code>\u8FDB\u884C\u7F16\u8BD1</p><blockquote><p>&quot;experimentalDecorators&quot;: true // \u542F\u7528\u5BF9ES7\u88C5\u9970\u5668\u7684\u5B9E\u9A8C\u6027\u652F\u6301</p></blockquote>',9),r=a("\u53C2\u8003\uFF1A"),d={href:"https://www.bookstack.cn/read/es6/docs-decorator.md",target:"_blank",rel:"noopener noreferrer"},k=a("\u300A\u962E\u4E00\u5CF0ECMAScript6\u5165\u95E8\u6559\u7A0B -- \u4FEE\u9970\u5668\u300B "),v=s(`<br><hr><br><h2 id="\u7C7B\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u88C5\u9970\u5668" aria-hidden="true">#</a> \u7C7B\u88C5\u9970\u5668</h2><p>\u7C7B\u88C5\u9970\u5668\uFF1A\u7C7B\u88C5\u9970\u5668\u5728\u7C7B\u58F0\u660E\u524D\u88AB\u58F0\u660E\uFF08\u7D27\u9760\u7740\u7C7B\u58F0\u660E\uFF09\uFF0C\u662F\u4E00\u4E2A\u5BF9\u7C7B\u8FDB\u884C\u5904\u7406\u7684\u51FD\u6570</p><p>\u7C7B\u88C5\u9970\u5668\u5E94\u7528\u4E8E\u7C7B\u6784\u9020\u51FD\u6570\uFF0C\u53EF\u4EE5\u7528\u4E86\u89C1\u8BC6\uFF0C\u4FEE\u6539\u6216\u66FF\u6362\u7C7B\u5B9A\u4E49\u3002\u7C7B\u88C5\u9970\u5668\u8868\u8FBE\u5F0F\u4F1A\u5728\u8FD0\u884C\u65F6\u88AB\u5F53\u4F5C\u51FD\u6570\u8C03\u7528\uFF0C<strong>\u7C7B\u7684\u6784\u9020\u51FD\u6570\u662F\u5176\u552F\u4E00\u7684\u53C2\u6570\uFF08\u5BF9\u4E8E\u88C5\u9970\u5668\uFF09</strong></p><h3 id="\u666E\u901A\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#\u666E\u901A\u88C5\u9970\u5668" aria-hidden="true">#</a> \u666E\u901A\u88C5\u9970\u5668</h3><p>\u5B9A\u4E49\u4E00\u4E2A\u666E\u901A\u88C5\u9970\u5668<code>Decorator</code>\uFF0C<strong>\u666E\u901A\u88C5\u9970\u5668\u4E0D\u80FD\u4F20\u53C2</strong></p><p>\u867D\u7136\u5728<code>Decorator</code>\u65B9\u6CD5\u5B9A\u4E49\u65F6\u6709\u53C2\u6570\uFF0C\u4F46\u662F\u5728\u8C03\u7528\u88C5\u9970\u5668\u65F6\u4E0D\u9700\u8981\u4F20\u53C2\uFF0C\u56E0\u4E3A\u53C2\u6570<code>params</code>\u5176\u5B9E\u662F\u4E4B\u540E\u8981\u4FEE\u9970\u7684\u7C7B<code>class</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Decorator</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">params</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// \u7ED9\u7C7B\u6DFB\u52A0\u539F\u578B\u94FE\u5C5E\u6027</span>
    params<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;#f00&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u4FEE\u9970\u65B9\u6CD5\u662F\u5728\u7C7B\u4E0A\u4E00\u884C\u6DFB\u52A0<code>@\u88C5\u9970\u5668\u540D</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@Decorator
<span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u60F3\u4F20\u53C2\u5C31\u4F1A\u6709\u9519\u8BEF\u63D0\u793A\uFF1A ![\u8282\u70B9](./../noteMd/img/\u666E\u901A\u88C5\u9970\u5668\u4F20\u53C2.png]</p><p>\u73B0\u5728\u628A\u4F7F\u7528\u4E86\u88C5\u9970\u5668\u7684\u7C7B\u8FDB\u884C\u5B9E\u4F8B\u751F\u6210\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token literal-property property">animal</span><span class="token operator">:</span>any <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>animal<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u751F\u6210\u7684<code>animal</code>\u4E2D<code>__proto__</code>\u5C31\u5B58\u5728\u88C5\u9970\u5668\u8D4B\u4E88\u7684color\u5C5E\u6027\u4E86</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fda2d7fc7db4707a1a9ae8ee04e564e~tplv-k3u1fbpfcp-watermark.image" alt="\u88C5\u9970\u5668\u539F\u578B\u94FE.png"></p><h3 id="\u88C5\u9970\u5668\u5DE5\u5382" tabindex="-1"><a class="header-anchor" href="#\u88C5\u9970\u5668\u5DE5\u5382" aria-hidden="true">#</a> \u88C5\u9970\u5668\u5DE5\u5382</h3><p>\u4E0A\u9762\u7684\u666E\u901A\u88C5\u9970\u5668\u4F7F\u7528\u65F6\u4E0D\u80FD\u4F20\u53C2\uFF0C\u4F46\u662F\u53EF\u4EE5\u4F7F\u7528<code>\u88C5\u9970\u5668\u5DE5\u5382</code>\u5B9A\u4E49\u6765\u8FDB\u884C\u4F20\u53C2\u3002</p><p>\u88C5\u9970\u5668\u5DE5\u5382\u5176\u5B9E\u53EF\u4EE5\u7406\u89E3\u4E3A\uFF1A\u5728\u88C5\u9970\u5668\u5916\u90E8\u518D\u5C01\u88C5\u4E00\u4E2A\u51FD\u6570\uFF0C\u5916\u90E8\u51FD\u6570\u53EF\u4EE5\u4F20\u5165\u53C2\u6570\uFF0C\u5185\u90E8\u624D\u662F\u771F\u6B63\u7684\u88C5\u9970\u5668</p><p>\u88C5\u9970\u5668\u5DE5\u5382\uFF1A\u4F7F\u7528\u65F6\u53EF\u4F20\u5165\u53C2\u6570\uFF0C\u4E0B\u9762\u628A\u53C2\u6570\u8D4B\u7ED9<code>params</code>\uFF0C\u628A\u7C7B\u8D4B\u7ED9<code>target</code>\u3002\u5E76\u4E14\u5728\u4F7F\u7528\u65F6\u4E5F\u53EF\u4EE5\u53EA\u7528<code>()</code>\uFF0C\u5185\u90E8\u4E0D\u4F20\u53C2\u6570</p><p>\u50CF\u4E0B\u9762\u7684\u4F8B\u5B50\u4E2D\uFF0C\u5176\u5B9E\u5C31\u662F\u5BF9\u4E24\u4E2A\u88C5\u9970\u5668\u8FDB\u884C\u5224\u65AD\uFF0C\u5916\u90E8\u5176\u5B9E\u662F\u4E00\u4E2A\u4F20\u5165\u53C2\u6570\u7684\u51FD\u6570</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Decorator2</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>params<span class="token operator">:</span> string<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>params<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>target<span class="token operator">:</span>any<span class="token punctuation">)</span><span class="token operator">:</span><span class="token parameter"><span class="token keyword">void</span></span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>color <span class="token operator">=</span> params<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>target<span class="token operator">:</span>any<span class="token punctuation">)</span><span class="token operator">:</span><span class="token parameter"><span class="token keyword">void</span></span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>color <span class="token operator">=</span> params<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7C7B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>@<span class="token function">Decorator2</span><span class="token punctuation">(</span><span class="token string">&#39;#f00&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#0f0&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#00f&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Time</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> time0 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>time0<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58d7d1b19975481c9a079364ebbd516c~tplv-k3u1fbpfcp-watermark.image" alt="\u88C5\u9970\u5668\u5DE5\u5382.png"></p><h3 id="\u88C5\u9970\u5668\u91CD\u6784\u6784\u9020\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u88C5\u9970\u5668\u91CD\u6784\u6784\u9020\u51FD\u6570" aria-hidden="true">#</a> \u88C5\u9970\u5668\u91CD\u6784\u6784\u9020\u51FD\u6570</h3><p>\u5982\u679C\u7C7B\u88C5\u9970\u5668\u8FD4\u56DE\u4E00\u4E2A\u503C\uFF0C\u4F1A\u4F7F\u7528\u63D0\u4F9B\u7684\u6784\u9020\u51FD\u6570\u6765\u66FF\u6362\u7C7B\u7684\u58F0\u660E</p><p>\u4E0B\u9762\u6784\u9020\u5668\u4E2D\uFF0C\u8FD4\u56DE\u7684\u662F<code>class extends target</code>\u3002 \u8FD9\u6837<code>look</code>\u5C5E\u6027\u548C<code>Look()</code>\u65B9\u6CD5\u90FD\u88AB\u91CD\u65B0\u4FEE\u6539\u4E86\uFF0C\u5B9E\u4F8B\u4E5F\u662F\u4F7F\u7528\u7684\u91CD\u6784\u540E\u7684\u65B9\u6CD5\u548C\u5C5E\u6027</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Decorator3</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token class-name">extends</span> target<span class="token punctuation">{</span>
        look <span class="token operator">=</span> <span class="token string">&#39;\u4FEE\u6539\u6570\u636E&#39;</span><span class="token punctuation">;</span>
        <span class="token function">Look</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;123&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
@Decorator3
<span class="token keyword">class</span> <span class="token class-name">Doing</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">look</span><span class="token operator">:</span> string<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">look</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>look <span class="token operator">=</span> look<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">Look</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>look<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> done <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Doing</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B63\u5728\u770B\u4EC0\u4E48&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>done<span class="token punctuation">.</span>look<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// \u4FEE\u6539\u6570\u636E</span>
done<span class="token punctuation">.</span><span class="token function">Look</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><br><h2 id="\u7C7B\u5C5E\u6027\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u5C5E\u6027\u88C5\u9970\u5668" aria-hidden="true">#</a> \u7C7B\u5C5E\u6027\u88C5\u9970\u5668</h2><p>\u5C5E\u6027\u88C5\u9970\u5668\u8868\u8FBE\u5F0F\u5FBD\u7AE0\u8FD0\u884C\u65F6\u5F53\u51FD\u6570\u88AB\u8C03\u7528\uFF0C\u4F20\u5165\u4E24\u4E2A\u53C2\u6570\uFF1A</p><ul><li>\u5BF9\u9759\u6001\u6210\u5458\u662F\u7C7B\u7684\u6784\u9020\u51FD\u6570\uFF0C\u5BF9\u5B9E\u4F8B\u6210\u5458\u662F\u7C7B\u7684\u539F\u578B\u5BF9\u8C61</li><li>\u6210\u5458\u7684\u540D\u5B57</li></ul><p>\u4E0B\u9762\u4F8B\u5B50\u4E2D\uFF0C\u7B2C\u4E00\u4E2A<code>target</code>\u4F1A\u6253\u5370<code>constructor</code>\u6784\u9020\u51FD\u6570\uFF0C\u7B2C\u4E8C\u4E2A<code>attr</code>\u4F1A\u6253\u5370<code>bed</code>\u3002 \u7136\u540E\u5C06<code>bed</code>\u4FEE\u6539\u4E3A\u8349\u5E2D\uFF0C\u8FD9\u6837\u5B9E\u4F8B\u4E2D\u7684bed\u5C31\u4F1A\u7EDF\u4E00\u53D8\u6210\u8349\u5E2D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Decorator4</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>any<span class="token punctuation">,</span> <span class="token literal-property property">attr</span><span class="token operator">:</span>any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    target<span class="token punctuation">[</span>attr<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;\u8349\u5E2D&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Sleep</span> <span class="token punctuation">{</span>
    @Decorator4
    <span class="token literal-property property">bed</span><span class="token operator">:</span> string<span class="token operator">|</span><span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> sleep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sleep<span class="token punctuation">.</span>bed<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2e3dbb2147e41949facff4622ed5f3d~tplv-k3u1fbpfcp-watermark.image" alt="\u8349\u5E2D.png"></p><hr><br><h2 id="\u7C7B\u65B9\u6CD5\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u65B9\u6CD5\u88C5\u9970\u5668" aria-hidden="true">#</a> \u7C7B\u65B9\u6CD5\u88C5\u9970\u5668</h2><p>\u88AB\u5E94\u7528\u5230\u65B9\u6CD5\u7684\u5C5E\u6027\u63CF\u8FF0\u7B26\u4E0A\uFF0C\u53EF\u4EE5\u7528\u6765\u76D1\u89C6\uFF0C\u4FEE\u6539\u6216\u8005\u66FF\u6362\u65B9\u6CD5\u5B9A\u4E49</p><p>\u65B9\u6CD5\u88C5\u9970\u5668\u5728\u8FD0\u884C\u662F\u65F6\u4F20\u5165\u4E09\u79CD\u53C2\u6570\uFF1A</p><ul><li>\u5BF9\u9759\u6001\u6210\u5458\u662F\u7C7B\u7684\u6784\u9020\u51FD\u6570\uFF0C\u5BF9\u5B9E\u4F8B\u6210\u5458\u662F\u7C7B\u7684\u539F\u578B\u5BF9\u8C61</li><li>\u6210\u5458\u7684\u540D\u5B57</li><li>\u6210\u5458\u7684\u5C5E\u6027\u63CF\u8FF0\u7B26</li></ul><p>\u65B9\u6CD5\u88C5\u9970\u5668\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Decorator5</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>any<span class="token punctuation">,</span> <span class="token literal-property property">attr</span><span class="token operator">:</span>any<span class="token punctuation">,</span> <span class="token literal-property property">desc</span><span class="token operator">:</span>any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u7C7B\u7684\u65B9\u6CD5\u4E0A\u8FDB\u884C\u4F7F\u7528\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Doing</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    @Decorator5
    <span class="token function">Look</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6253\u5370\u7684\u7ED3\u679C\uFF08\u8FD9\u91CC\u5728\u4F7F\u7528\u65F6\uFF0C\u6211\u4F7F\u7528\u4E86<code>webpack</code>\u6253\u5305\u540E\u7684js\uFF09\uFF1A</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e369b0065c584f12bb0f4a6a03b817b4~tplv-k3u1fbpfcp-watermark.image" alt="\u65B9\u6CD5\u88C5\u9970\u5668.png"></p><p>\u5728\u5C5E\u6027\u63CF\u8FF0\u7B26\u4E2D\u6709\u4E0B\u9762\u7684\u5185\u5BB9\uFF1A</p><ul><li><strong><code>configurable</code></strong>: \u5F53\u4E14\u4EC5\u5F53\u8BE5\u5C5E\u6027\u7684 configurable \u952E\u503C\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u7684\u63CF\u8FF0\u7B26\u624D\u80FD\u591F\u88AB\u6539\u53D8\uFF0C\u540C\u65F6\u8BE5\u5C5E\u6027\u4E5F\u80FD\u4ECE\u5BF9\u5E94\u7684\u5BF9\u8C61\u4E0A\u88AB\u5220\u9664\u3002 \u9ED8\u8BA4\u4E3A false\u3002</li><li><strong><code>enumerable</code></strong>: \u5F53\u4E14\u4EC5\u5F53\u8BE5\u5C5E\u6027\u7684 enumerable \u952E\u503C\u4E3A true \u65F6\uFF0C\u8BE5\u5C5E\u6027\u624D\u4F1A\u51FA\u73B0\u5728\u5BF9\u8C61\u7684\u679A\u4E3E\u5C5E\u6027\u4E2D\u3002 \u9ED8\u8BA4\u4E3A false\u3002</li><li><strong><code>value</code></strong>: \u8BE5\u5C5E\u6027\u5BF9\u5E94\u7684\u503C\u3002\u53EF\u4EE5\u662F\u4EFB\u4F55\u6709\u6548\u7684 JavaScript \u503C\uFF08\u6570\u503C\uFF0C\u5BF9\u8C61\uFF0C\u51FD\u6570\u7B49\uFF09\u3002 \u9ED8\u8BA4\u4E3A undefined\u3002</li><li><strong><code>writable</code></strong>: \u5F53\u4E14\u4EC5\u5F53\u8BE5\u5C5E\u6027\u7684 writable \u952E\u503C\u4E3A true \u65F6\uFF0C\u5C5E\u6027\u7684\u503C\uFF0C\u4E5F\u5C31\u662F\u4E0A\u9762\u7684 value\uFF0C\u624D\u80FD\u88AB\u8D4B\u503C\u8FD0\u7B97\u7B26 (en-US)\u6539\u53D8\u3002 \u9ED8\u8BA4\u4E3A false\u3002</li></ul><p>\u5982\u679C\u8981\u4F7F\u7528\u65B9\u6CD5\u88C5\u9970\u5668\u4FEE\u6539\u5F53\u524D\u65B9\u6CD5\uFF0C\u4E3B\u8981\u5C31\u662F\u4F7F\u7528<code>desc</code>\u7684\u5185\u5BB9\u3002\u5F53\u524D\u65B9\u6CD5\u5176\u5B9E\u662F<code>desc</code>\u7684<code>value</code>\u3002</p><p>\u4F8B\u5B50\uFF1A\u65B9\u6CD5\u88C5\u9970\u5668\u4FEE\u6539\u5F53\u524D\u65B9\u6CD5\uFF0C\u5E76\u4E14\u539F\u65B9\u6CD5\u7EE7\u7EED\u6267\u884C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Decorator5</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>any<span class="token punctuation">,</span> <span class="token literal-property property">attr</span><span class="token operator">:</span>any<span class="token punctuation">,</span> <span class="token literal-property property">desc</span><span class="token operator">:</span>any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> oldmethod <span class="token operator">=</span> desc<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    desc<span class="token punctuation">.</span><span class="token function-variable function">value</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args<span class="token operator">:</span>string<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">oldmethod</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><br><h2 id="\u7C7B\u65B9\u6CD5\u53C2\u6570\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u65B9\u6CD5\u53C2\u6570\u88C5\u9970\u5668" aria-hidden="true">#</a> \u7C7B\u65B9\u6CD5\u53C2\u6570\u88C5\u9970\u5668</h2><p>\u53C2\u6570\u88C5\u9970\u5668\u6C47\u603B\u8FD0\u884C\u65F6\u5F53\u4F5C\u51FD\u6570\u8C03\u7528\uFF0C\u4F20\u5165\u4E09\u4E2A\u53C2\u6570\uFF1A</p><ul><li>\u5BF9\u9759\u6001\u6210\u5458\u662F\u7C7B\u7684\u6784\u9020\u51FD\u6570\uFF0C\u5BF9\u5B9E\u4F8B\u6210\u5458\u662F\u7C7B\u7684\u539F\u578B\u5BF9\u8C61</li><li>\u65B9\u6CD5\u7684\u540D\u5B57</li><li>\u53C2\u6570\u5728\u51FD\u6570\u53C2\u6570\u5217\u8868\u4E2D\u7684\u7D22\u5F15</li></ul><p>\u4F8B\u5B50\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Decorator6</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span>any<span class="token punctuation">,</span> <span class="token literal-property property">attr</span><span class="token operator">:</span>any<span class="token punctuation">,</span> <span class="token literal-property property">index</span><span class="token operator">:</span>any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u8C03\u7528\u65F6\u5199\u5165\u65B9\u6CD5\u7684<code>()</code>\u4E2D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">Look</span><span class="token punctuation">(</span>@Decorator6 <span class="token operator">...</span>args<span class="token operator">:</span>string<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\uFF1A</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99715130b0284ae3a0bbcd5394db3b6a~tplv-k3u1fbpfcp-watermark.image" alt="\u53C2\u6570\u88C5\u9970\u5668.png"></p>`,66);function m(b,g){const p=e("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[r,n("a",d,[k,l(p)])]),v])}var y=t(i,[["render",m],["__file","\u4ECE0\u5F00\u59CB\u7684TypeScript\u306E\u5341\u4E8C\uFF1A\u88C5\u9970\u5668.html.vue"]]);export{y as default};
