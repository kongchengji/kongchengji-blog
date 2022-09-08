import{_ as e,r as o,o as l,c as r,a as s,b as t,e as p,d as a}from"./app.34e7ec3f.js";const c={},i=p('<h1 id="dom\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#dom\u64CD\u4F5C" aria-hidden="true">#</a> DOM\u64CD\u4F5C</h1><p>\u8BBF\u95EEDOM\u6B21\u6570\u8D8A\u591A\uFF0C\u8017\u8D39\u7684\u6027\u80FD\u4E5F\u5C31\u8D8A\u9AD8</p><p>\u901A\u5E38\u7ECF\u9A8C\u6CD5\u5219\u662F\u51CF\u5C11\u8BBF\u95EEDOM\u6B21\u6570\uFF0C\u628A\u8FD0\u7B97\u5C3D\u91CF\u7559\u5728ECMAScript\u8FD9\u4E00\u7AEF\u5904\u7406</p><h2 id="\u5143\u7D20\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#\u5143\u7D20\u8282\u70B9" aria-hidden="true">#</a> \u5143\u7D20\u8282\u70B9</h2><p>\u5927\u90E8\u5206\u73B0\u4EE3\u6D4F\u89C8\u5668\u63D0\u4F9B\u7684API\u53EA\u8FD4\u56DE\u5143\u7D20\u8282\u70B9\uFF0C<strong>\u5982\u679C\u53EF\u7528\u7684\u8BDD\u63A8\u8350\u4F7F\u7528\u8FD9\u4E9BAPI</strong></p><p>\u56E0\u4E3A\u8FD9\u4E9BAPI\u7684\u6267\u884C\u6548\u7387\u6BD4\u5728JavaScript\u4EE3\u7801\u4E2D\u5B9E\u73B0\u8FC7\u6EE4\u7684\u6548\u7387\u8981\u9AD8</p><p>\u6BD4\u5982\uFF1A\u4F7F\u7528children\u6BD4childNodes\u6548\u7387\u66F4\u9AD8\uFF0C\u96C6\u5408\u76F8\u66F4\u5C11 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/121e100862334261a414034f7caa93c0~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5916\u94FE\u56FE\u7247\u8F6C\u5B58\u5931\u8D25,\u6E90\u7AD9\u53EF\u80FD\u6709\u9632\u76D7\u94FE\u673A\u5236,\u5EFA\u8BAE\u5C06\u56FE\u7247\u4FDD\u5B58\u4E0B\u6765\u76F4\u63A5\u4E0A\u4F20(img-tyLe1QZO-1621085803712)(en-resource://database/536:1)"></p><h2 id="\u91CD\u7ED8\u548C\u91CD\u6392-\u56DE\u6D41" tabindex="-1"><a class="header-anchor" href="#\u91CD\u7ED8\u548C\u91CD\u6392-\u56DE\u6D41" aria-hidden="true">#</a> \u91CD\u7ED8\u548C\u91CD\u6392\uFF08\u56DE\u6D41\uFF09</h2>',8),k=a("\u5177\u4F53\u53EF\u4EE5\u53C2\u8003\uFF1A"),u={href:"https://xie.infoq.cn/article/a8bedc099254cbe20757032bc",target:"_blank",rel:"noopener noreferrer"},d=a("HTML \u56DE\u6D41\u4E0E\u91CD\u7ED8"),g=p(`<p>\u5BF9DOM\u5143\u7D20\u8FDB\u884C\u4E00\u7CFB\u5217\u64CD\u4F5C\u65F6\uFF0C\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u6B65\u9AA4\u51CF\u5C11\u91CD\u7ED8\u548C\u91CD\u6392\uFF1A</p><ol><li>\u4F7F\u5143\u7D20\u8131\u79BB\u6587\u6863\u6D41</li><li>\u5BF9\u5176\u5E94\u7528\u591A\u91CD\u6539\u53D8</li><li>\u628A\u5143\u7D20\u5E26\u56DE\u6587\u6863\u4E2D</li></ol><p>\u8FD9\u4E09\u6B65\u8FC7\u7A0B\u4E2D\u89E6\u53D1\u4E24\u6B21\u91CD\u6392\u2014\u2014\u7B2C\u4E00\u6B65\u548C\u7B2C\u4E09\u6B65\u3002 \u4F46\u662F\u5728\u7B2C\u4E8C\u6B65\u64CD\u4F5C\u4E2D\u5C06\u4F1A\u4EA7\u751F\u5F88\u591A\u6B21\u91CD\u6392</p><p>\u6709\u4E09\u79CD\u57FA\u672C\u65B9\u5F0F\u53EF\u4EE5\u4F7F\u5F97DOM\u8131\u79BB\u6587\u6863\uFF1A</p><ul><li>\u9690\u85CF\u5143\u7D20\u3002\u5E94\u7528\u4FEE\u6539\uFF0C\u91CD\u65B0\u663E\u793A -- display:none</li><li>\u4F7F\u7528\u6587\u6863\u7247\u6BB5\uFF08docuement fragment\uFF09\u5728\u5F53\u524DDOM\u4E4B\u5916\u6784\u5EFA\u4E00\u4E2A\u5B50\u6811\uFF08createDocumentFragment\uFF09\uFF0C\u518D\u628A\u5B83\u62F7\u8D1D\u56DE\u6587\u6863</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token keyword">const</span> fragment <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> fruits <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Apple&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Orange&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Banana&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Melon&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    fruits<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fruit</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> li <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        li<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> fruit<span class="token punctuation">;</span>
        fragment<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>fragment<span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5C06\u539F\u59CB\u5143\u7D20\u62F7\u8D1D\u5230\u4E00\u4E2A\u8131\u79BB\u6587\u6863\u7684\u8282\u70B9\u4E2D\uFF0C\u4FEE\u6539\u526F\u672C\uFF0C\u5B8C\u6210\u540E\u518D\u66FF\u6362\u539F\u59CB\u5143\u7D20</li></ul><h2 id="\u4E8B\u4EF6\u59D4\u6258" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u4EF6\u59D4\u6258" aria-hidden="true">#</a> \u4E8B\u4EF6\u59D4\u6258</h2><p>\u5F53\u9875\u9762\u5B58\u5728\u5927\u91CF\u5143\u7D20\uFF0C\u4E14\u6BCF\u4E2A\u5143\u7D20\u90FD\u7ED1\u5B9A\u4E8B\u4EF6\u5904\u7406\u5668\uFF08\u6BD4\u5982onclick\u65B9\u6CD5\uFF09\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4F1A\u5F71\u54CD\u6027\u80FD</p><p>\u6BCF\u7ED1\u5B9A\u4E00\u4E2A\u4E8B\u4EF6\u5904\u7406\u5668\u90FD\u662F\u6709\u4EE3\u4EF7\uFF1A</p><ul><li>\u8981\u4E48\u52A0\u91CD\u4E86\u9875\u9762\u7684\u8D1F\u62C5\uFF08\u66F4\u591A\u7684\u6807\u7B7E\u6216JavaScript\u4EE3\u7801\uFF09</li><li>\u8981\u4E48\u589E\u52A0\u4E86\u8FD0\u884C\u671F\u7684\u6267\u884C\u65F6\u95F4</li></ul><p>DOM\u4E8B\u4EF6\u8981\u7ECF\u5386\u4E09\u4E2A\u9636\u6BB5\uFF1A</p><ul><li>\u6355\u83B7</li><li>\u76F4\u5230\u8FBE\u5230\u76EE\u6807\u5143\u7D20</li><li>\u5192\u6CE1</li></ul><h3 id="dom-\u4E8B\u4EF6\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#dom-\u4E8B\u4EF6\u673A\u5236" aria-hidden="true">#</a> DOM \u4E8B\u4EF6\u673A\u5236</h3><ol><li><p>\u4E8B\u4EF6\u6D41html \u5143\u7D20\u89E6\u53D1\u4E8B\u4EF6\u7684\u987A\u5E8F\u3002</p></li><li><p>\u4E8B\u4EF6\u6355\u83B7\uFF08\u4ECE\u5916\u5411\u5185\uFF09</p><ul><li>\u7F51\u666F\u7684\u4E8B\u4EF6\u6D41\u53EB\u505A\u4E8B\u4EF6\u6355\u83B7\uFF0C\u4ECE\u5916\u5411\u5185\uFF0C\u627E\u76D1\u542C\u51FD\u6570\uFF0C\u53EB\u4E8B\u4EF6\u6355\u83B7\uFF1B</li></ul></li><li><p>\u4E8B\u4EF6\u5192\u6CE1\uFF08\u4ECE\u5185\u5411\u5916\uFF09</p><ul><li>IE\u7684\u4E8B\u4EF6\u6D41\u53EB\u505A\u4E8B\u4EF6\u5192\u6CE1(event bubbling)\uFF0C\u4ECE\u5185\u5411\u5916\uFF0C\u627E\u76D1\u542C\u51FD\u6570\uFF0C\u53EB\u4E8B\u4EF6\u5192\u6CE1\uFF1B</li></ul></li><li><p>\u53D6\u6D88\u5192\u6CE1</p><ul><li><p>\u6355\u83B7\u4E0D\u53EF\u53D6\u6D88\uFF0C\u4F46\u662F\u5192\u6CE1\u53EF\u53D6\u6D88</p></li><li><p>e.stopPropagation() \u53EF\u4E2D\u65AD\u5192\u6CE1\uFF0C\u6D4F\u89C8\u5668\u4E0D\u5728\u5411\u4E0A\u8D70\uFF1B</p></li></ul></li></ol><h3 id="\u4E8B\u4EF6\u59D4\u6258-1" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u4EF6\u59D4\u6258-1" aria-hidden="true">#</a> \u4E8B\u4EF6\u59D4\u6258</h3><p>\u4E8B\u4EF6\u59D4\u6258\u5C31\u662F\u5229\u7528\u4E8B\u4EF6\u5192\u6CE1\uFF0C\u53EA\u6307\u5B9A\u4E00\u4E2A\u4E8B\u4EF6\u5904\u7406\u7A0B\u5E8F\uFF0C\u5C31\u53EF\u4EE5\u7BA1\u7406\u67D0\u4E00\u7C7B\u578B\u7684\u6240\u6709\u4E8B\u4EF6\u3002</p><h3 id="\u4E8B\u4EF6\u59D4\u6258\u7684\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u4EF6\u59D4\u6258\u7684\u539F\u7406" aria-hidden="true">#</a> \u4E8B\u4EF6\u59D4\u6258\u7684\u539F\u7406</h3><p>\u4E8B\u4EF6\u4ECE\u6700\u6DF1\u7684\u8282\u70B9\u5F00\u59CB\uFF0C\u7136\u540E\u9010\u6B65\u5411\u4E0A\u4F20\u64AD\u4E8B\u4EF6\uFF1B</p><h3 id="\u4E8B\u4EF6\u59D4\u6258\u7684\u6027\u80FD\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#\u4E8B\u4EF6\u59D4\u6258\u7684\u6027\u80FD\u4F18\u5316" aria-hidden="true">#</a> \u4E8B\u4EF6\u59D4\u6258\u7684\u6027\u80FD\u4F18\u5316</h3><p>\u539F\u7406\uFF1A \u57FA\u4E8E\u8FD9\u6837\u4E00\u4E2A\u4E8B\u5B9E\uFF0C\u4E8B\u4EF6\u9010\u5C42\u5192\u6CE1\u5E76\u80FD\u88AB\u7236\u7EA7\u5143\u7D20\u6355\u83B7\u3002\u4F7F\u7528\u4E8B\u4EF6\u4EE3\u7406\uFF0C\u53EA\u9700\u8981\u7ED9\u5916\u5C42\u5143\u7D20\u7ED1\u5B9A\u4E00\u4E2A\u5904\u7406\u5668\uFF0C\u5C31\u53EF\u4EE5\u5904\u7406\u5728\u5176\u5B50\u5143\u7D20\u4E0A\u89E6\u53D1\u7684\u6240\u6709\u4E8B\u4EF6\uFF0C\u6BD4\u5982\u4F7F\u7528target\u5224\u65AD\u5143\u7D20</p><p>\u4F8B\u5B50\uFF1A \u70B9\u51FB\u67D0\u4E00\u884C\u7684\u82F9\u679C\uFF0C\u8FD9\u4E00\u884C\u7684\u80CC\u666F\u989C\u8272\u6539\u53D8orange\uFF0C\u6587\u5B57\u53D8\u6210\u6A59\u5B50 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0943a3e022b24882b0e23b80ad41692d~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><p>\u5982\u679C\u7ED9\u6BCF\u4E00\u4E2Ali\u6807\u7B7E\u6DFB\u52A0onclick\u4E8B\u4EF6\uFF0C\u5BF9\u6027\u80FD\u4F1A\u9020\u6210\u8F83\u5927\u6D88\u8017\uFF0C\u6240\u4EE5\u53EF\u4EE5\u7ED9ul\u7ED1\u5B9Aonclick\u4E8B\u4EF6 \u4EE3\u7801\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&lt;</span>ul id<span class="token operator">=</span><span class="token string">&quot;a&quot;</span> onclick<span class="token operator">=</span><span class="token string">&quot;aclick()&quot;</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>li <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;ali&quot;</span><span class="token operator">&gt;</span> \u82F9\u679C <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
        <span class="token keyword">function</span> <span class="token function">aclick</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> e <span class="token operator">=</span> e <span class="token operator">||</span> window<span class="token punctuation">.</span>event<span class="token punctuation">;</span>
            e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>cssText <span class="token operator">=</span> <span class="token string">&#39;background-color:orange&#39;</span><span class="token punctuation">;</span>
            e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">&#39;\u6A59\u5B50&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6aa00a70b974619bd0e86434a47e18e~tplv-k3u1fbpfcp-zoom-1.image" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><h2 id="\u5C0F\u8282" tabindex="-1"><a class="header-anchor" href="#\u5C0F\u8282" aria-hidden="true">#</a> \u5C0F\u8282</h2><p><em><strong>\u5E73\u65F6\u5199\u4EE3\u7801\u65F6\u53EF\u4EE5\u4F18\u5316\u7684\u70B9\u2460\uFF1A</strong></em></p><p>\u51CF\u5C11\u91CD\u7ED8\u548C\u56DE\u6D41\uFF0C\u8981\u8FDB\u884C\u591A\u6B21DOM\u64CD\u4F5C\u65F6\uFF0C\u6700\u597D\u5C06\u8FD9\u90E8\u5206\u5148\u4ECE\u6587\u6863\u6D41\u4E2D\u8131\u79BB\uFF0C\u7136\u540E\u5904\u7406\u597D\u540E\u653E\u56DE\u6587\u6863\u6D41\u4E2D</p><p><em><strong>\u5E73\u65F6\u5199\u4EE3\u7801\u65F6\u53EF\u4EE5\u4F18\u5316\u7684\u70B9\u2461\uFF1A</strong></em></p><p>\u4F7F\u7528\u4E8B\u4EF6\u4EE3\u7406\uFF0C\u53EA\u9700\u8981\u7ED9\u5916\u5C42\u5143\u7D20\u7ED1\u5B9A\u4E00\u4E2A\u5904\u7406\u5668\uFF0C\u5C31\u53EF\u4EE5\u5904\u7406\u5728\u5176\u5B50\u5143\u7D20\u4E0A\u89E6\u53D1\u7684\u6240\u6709\u4E8B\u4EF6\uFF0C\u6BD4\u5982\u4F7F\u7528target\u5224\u65AD\u5143\u7D20</p>`,30),h={id:"\u5B66\u4E60\u6765\u6E90-\u300A\u9AD8\u6027\u80FDjavascript-\u4E2D\u6587\u7248\u300B-\u4EC5\u4F9B\u5B66\u4E60\u4F7F\u7528",tabindex:"-1"},v=s("a",{class:"header-anchor",href:"#\u5B66\u4E60\u6765\u6E90-\u300A\u9AD8\u6027\u80FDjavascript-\u4E2D\u6587\u7248\u300B-\u4EC5\u4F9B\u5B66\u4E60\u4F7F\u7528","aria-hidden":"true"},"#",-1),m=a(" \u5B66\u4E60\u6765\u6E90\uFF1A"),b={href:"https://gitee.com/wzckongchengji/high_performance_javascript",target:"_blank",rel:"noopener noreferrer"},f=a("\u300A\u9AD8\u6027\u80FDJavaScript-\u4E2D\u6587\u7248\u300B\uFF08\u4EC5\u4F9B\u5B66\u4E60\u4F7F\u7528\uFF09");function _(q,y){const n=o("ExternalLinkIcon");return l(),r("div",null,[i,s("p",null,[k,s("a",u,[d,t(n)])]),g,s("h2",h,[v,m,s("a",b,[f,t(n)])])])}var w=e(c,[["render",_],["__file","hpjs02.html.vue"]]);export{w as default};
