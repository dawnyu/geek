import{_ as s,C as n,o as a,c as l,H as p,w as o,k as e,a as t,Q as r}from"./chunks/framework.e34e23c1.js";const c=JSON.parse('{"title":"JSON stringify 特性","description":"","frontmatter":{"createTime":"2022/10/11","tags":"js"},"headers":[],"relativePath":"interview-question/JSON stringify特性.md","filePath":"全部文档/前端面试题/js/JSON stringify特性.md","lastUpdated":1696860910000}'),i={name:"interview-question/JSON stringify特性.md"},y=e("h1",{id:"json-stringify-特性",tabindex:"-1"},[t("JSON stringify 特性 "),e("a",{class:"header-anchor",href:"#json-stringify-特性","aria-label":'Permalink to "JSON stringify 特性"'},"​")],-1),E=r('<h2 id="json-stringify" tabindex="-1">JSON.stringify() <a class="header-anchor" href="#json-stringify" aria-label="Permalink to &quot;JSON.stringify()&quot;">​</a></h2><h3 id="json-stringify-第一大特性总结" tabindex="-1">JSON.stringify() 第一大特性总结 <a class="header-anchor" href="#json-stringify-第一大特性总结" aria-label="Permalink to &quot;JSON.stringify() 第一大特性总结&quot;">​</a></h3><ul><li>undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 对跳过（忽略）它们进行序列化</li><li>undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null</li><li>undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时，都会返回 undefined</li></ul><h3 id="json-stringify-第二大特性" tabindex="-1">JSON.stringify() 第二大特性 <a class="header-anchor" href="#json-stringify-第二大特性" aria-label="Permalink to &quot;JSON.stringify() 第二大特性&quot;">​</a></h3><ul><li>非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">  a: </span><span style="color:#9ECBFF;">&quot;aaa&quot;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">  b: </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">  c: </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dd&quot;</span><span style="color:#E1E4E8;">),</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>\n<span class="line"><span style="color:#E1E4E8;">  },</span></span>\n<span class="line"><span style="color:#E1E4E8;">  d: </span><span style="color:#9ECBFF;">&quot;ddd&quot;</span></span>\n<span class="line"><span style="color:#E1E4E8;">};</span></span>\n<span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(data); </span><span style="color:#6A737D;">// 输出：？</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;{&quot;a&quot;:&quot;aaa&quot;,&quot;d&quot;:&quot;ddd&quot;}&quot;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&quot;aaa&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">aa</span><span style="color:#E1E4E8;">() {</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>\n<span class="line"><span style="color:#E1E4E8;">  }, </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dd&#39;</span><span style="color:#E1E4E8;">),</span><span style="color:#9ECBFF;">&quot;eee&quot;</span><span style="color:#E1E4E8;">])  </span><span style="color:#6A737D;">// 输出：？</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// &quot;[&quot;aaa&quot;,null,null,null,&quot;eee&quot;]&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">  a: </span><span style="color:#032F62;">&quot;aaa&quot;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">  b: </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">  c: </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dd&quot;</span><span style="color:#24292E;">),</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>\n<span class="line"><span style="color:#24292E;">  },</span></span>\n<span class="line"><span style="color:#24292E;">  d: </span><span style="color:#032F62;">&quot;ddd&quot;</span></span>\n<span class="line"><span style="color:#24292E;">};</span></span>\n<span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(data); </span><span style="color:#6A737D;">// 输出：？</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;{&quot;a&quot;:&quot;aaa&quot;,&quot;d&quot;:&quot;ddd&quot;}&quot;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&quot;aaa&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">aa</span><span style="color:#24292E;">() {</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>\n<span class="line"><span style="color:#24292E;">  }, </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;dd&#39;</span><span style="color:#24292E;">),</span><span style="color:#032F62;">&quot;eee&quot;</span><span style="color:#24292E;">])  </span><span style="color:#6A737D;">// 输出：？</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// &quot;[&quot;aaa&quot;,null,null,null,&quot;eee&quot;]&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="json-stringify-第三大特性" tabindex="-1">JSON.stringify() 第三大特性 <a class="header-anchor" href="#json-stringify-第三大特性" aria-label="Permalink to &quot;JSON.stringify() 第三大特性&quot;">​</a></h3><ul><li>转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">({</span></span>\n<span class="line"><span style="color:#E1E4E8;">    say: </span><span style="color:#9ECBFF;">&quot;hello JSON.stringify&quot;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">toJSON</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>\n<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;today i learn&quot;</span><span style="color:#E1E4E8;">;</span></span>\n<span class="line"><span style="color:#E1E4E8;">    }</span></span>\n<span class="line"><span style="color:#E1E4E8;">  })</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;today i learn&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">({</span></span>\n<span class="line"><span style="color:#24292E;">    say: </span><span style="color:#032F62;">&quot;hello JSON.stringify&quot;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">toJSON</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>\n<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;today i learn&quot;</span><span style="color:#24292E;">;</span></span>\n<span class="line"><span style="color:#24292E;">    }</span></span>\n<span class="line"><span style="color:#24292E;">  })</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;today i learn&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="json-stringify-第四大特性" tabindex="-1">JSON.stringify()第四大特性 <a class="header-anchor" href="#json-stringify-第四大特性" aria-label="Permalink to &quot;JSON.stringify()第四大特性&quot;">​</a></h3><ul><li>JSON.stringify() 将会正常序列化 Date 的值。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">({ now: </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Date</span><span style="color:#E1E4E8;">() });</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;{&quot;now&quot;:&quot;2019-12-08T07:42:11.973Z&quot;}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">({ now: </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Date</span><span style="color:#24292E;">() });</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;{&quot;now&quot;:&quot;2019-12-08T07:42:11.973Z&quot;}&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="json-stringify-第五大特性" tabindex="-1">JSON.stringify() 第五大特性 <a class="header-anchor" href="#json-stringify-第五大特性" aria-label="Permalink to &quot;JSON.stringify() 第五大特性&quot;">​</a></h3><p>NaN 和 Infinity 格式的数值及 null 都会被当做 null。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>\n<span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">NaN</span><span style="color:#E1E4E8;">)</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;null&quot;</span></span>\n<span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;null&quot;</span></span>\n<span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">Infinity</span><span style="color:#E1E4E8;">)</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;null&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>\n<span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">NaN</span><span style="color:#24292E;">)</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;null&quot;</span></span>\n<span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;null&quot;</span></span>\n<span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">Infinity</span><span style="color:#24292E;">)</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;null&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="json-stringify-第六大特性" tabindex="-1">JSON.stringify() 第六大特性 <a class="header-anchor" href="#json-stringify-第六大特性" aria-label="Permalink to &quot;JSON.stringify() 第六大特性&quot;">​</a></h3><p>关于基本类型的序列化：</p><ul><li>布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">([</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">), </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;false&quot;</span><span style="color:#E1E4E8;">), </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Boolean</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">)]);</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;[1,&quot;false&quot;,false]&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">([</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">), </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;false&quot;</span><span style="color:#24292E;">), </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Boolean</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">)]);</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;[1,&quot;false&quot;,false]&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="json-stringify-第七大特性" tabindex="-1">JSON.stringify() 第七大特性 <a class="header-anchor" href="#json-stringify-第七大特性" aria-label="Permalink to &quot;JSON.stringify() 第七大特性&quot;">​</a></h3><p>关于对象属性的是否可枚举：</p><ul><li>其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 不可枚举的属性默认会被忽略：</span></span>\n<span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(</span></span>\n<span class="line"><span style="color:#E1E4E8;">    Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(</span></span>\n<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">        {</span></span>\n<span class="line"><span style="color:#E1E4E8;">            x: { value: </span><span style="color:#9ECBFF;">&#39;json&#39;</span><span style="color:#E1E4E8;">, enumerable: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> },</span></span>\n<span class="line"><span style="color:#E1E4E8;">            y: { value: </span><span style="color:#9ECBFF;">&#39;stringify&#39;</span><span style="color:#E1E4E8;">, enumerable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> }</span></span>\n<span class="line"><span style="color:#E1E4E8;">        }</span></span>\n<span class="line"><span style="color:#E1E4E8;">    )</span></span>\n<span class="line"><span style="color:#E1E4E8;">);</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;{&quot;y&quot;:&quot;stringify&quot;}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 不可枚举的属性默认会被忽略：</span></span>\n<span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(</span></span>\n<span class="line"><span style="color:#24292E;">    Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(</span></span>\n<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">        {</span></span>\n<span class="line"><span style="color:#24292E;">            x: { value: </span><span style="color:#032F62;">&#39;json&#39;</span><span style="color:#24292E;">, enumerable: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> },</span></span>\n<span class="line"><span style="color:#24292E;">            y: { value: </span><span style="color:#032F62;">&#39;stringify&#39;</span><span style="color:#24292E;">, enumerable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> }</span></span>\n<span class="line"><span style="color:#24292E;">        }</span></span>\n<span class="line"><span style="color:#24292E;">    )</span></span>\n<span class="line"><span style="color:#24292E;">);</span></span>\n<span class="line"><span style="color:#6A737D;">// &quot;{&quot;y&quot;:&quot;stringify&quot;}&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="json-stringify-第八大特性" tabindex="-1">JSON.stringify() 第八大特性 <a class="header-anchor" href="#json-stringify-第八大特性" aria-label="Permalink to &quot;JSON.stringify() 第八大特性&quot;">​</a></h3><p>我们都知道实现深拷贝最简单粗暴的方式就是序列化：JSON.parse(JSON.stringify())，这个方式实现深拷贝会因为序列化的诸多特性从而导致诸多的坑点：比如现在我们要说的循环引用问题。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。</span></span>\n<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&quot;loopObj&quot;</span></span>\n<span class="line"><span style="color:#E1E4E8;">};</span></span>\n<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">loopObj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">  obj</span></span>\n<span class="line"><span style="color:#E1E4E8;">};</span></span>\n<span class="line"><span style="color:#6A737D;">// 对象之间形成循环引用，形成闭环</span></span>\n<span class="line"><span style="color:#E1E4E8;">obj.loopObj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> loopObj;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 封装一个深拷贝的函数</span></span>\n<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deepClone</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">) {</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(obj));</span></span>\n<span class="line"><span style="color:#E1E4E8;">}</span></span>\n<span class="line"><span style="color:#6A737D;">// 执行深拷贝，抛出错误</span></span>\n<span class="line"><span style="color:#B392F0;">deepClone</span><span style="color:#E1E4E8;">(obj)</span></span>\n<span class="line"><span style="color:#6A737D;">/**</span></span>\n<span class="line"><span style="color:#6A737D;"> VM44:9 Uncaught TypeError: Converting circular structure to JSON</span></span>\n<span class="line"><span style="color:#6A737D;">    --&gt; starting at object with constructor &#39;Object&#39;</span></span>\n<span class="line"><span style="color:#6A737D;">    |     property &#39;loopObj&#39; -&gt; object with constructor &#39;Object&#39;</span></span>\n<span class="line"><span style="color:#6A737D;">    --- property &#39;obj&#39; closes the circle</span></span>\n<span class="line"><span style="color:#6A737D;">    at JSON.stringify (&lt;anonymous&gt;)</span></span>\n<span class="line"><span style="color:#6A737D;">    at deepClone (&lt;anonymous&gt;:9:26)</span></span>\n<span class="line"><span style="color:#6A737D;">    at &lt;anonymous&gt;:11:13</span></span>\n<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&quot;loopObj&quot;</span></span>\n<span class="line"><span style="color:#24292E;">};</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">loopObj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">  obj</span></span>\n<span class="line"><span style="color:#24292E;">};</span></span>\n<span class="line"><span style="color:#6A737D;">// 对象之间形成循环引用，形成闭环</span></span>\n<span class="line"><span style="color:#24292E;">obj.loopObj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> loopObj;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 封装一个深拷贝的函数</span></span>\n<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deepClone</span><span style="color:#24292E;">(</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">) {</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(obj));</span></span>\n<span class="line"><span style="color:#24292E;">}</span></span>\n<span class="line"><span style="color:#6A737D;">// 执行深拷贝，抛出错误</span></span>\n<span class="line"><span style="color:#6F42C1;">deepClone</span><span style="color:#24292E;">(obj)</span></span>\n<span class="line"><span style="color:#6A737D;">/**</span></span>\n<span class="line"><span style="color:#6A737D;"> VM44:9 Uncaught TypeError: Converting circular structure to JSON</span></span>\n<span class="line"><span style="color:#6A737D;">    --&gt; starting at object with constructor &#39;Object&#39;</span></span>\n<span class="line"><span style="color:#6A737D;">    |     property &#39;loopObj&#39; -&gt; object with constructor &#39;Object&#39;</span></span>\n<span class="line"><span style="color:#6A737D;">    --- property &#39;obj&#39; closes the circle</span></span>\n<span class="line"><span style="color:#6A737D;">    at JSON.stringify (&lt;anonymous&gt;)</span></span>\n<span class="line"><span style="color:#6A737D;">    at deepClone (&lt;anonymous&gt;:9:26)</span></span>\n<span class="line"><span style="color:#6A737D;">    at &lt;anonymous&gt;:11:13</span></span>\n<span class="line"><span style="color:#6A737D;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><ul><li>对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。 这也就是为什么用序列化去实现深拷贝时，遇到循环引用的对象会抛出错误的原因。</li></ul><h3 id="json-stringify-第九大特性" tabindex="-1">JSON.stringify() 第九大特性 <a class="header-anchor" href="#json-stringify-第九大特性" aria-label="Permalink to &quot;JSON.stringify() 第九大特性&quot;">​</a></h3><ul><li>所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">({ [Symbol.</span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;json&quot;</span><span style="color:#E1E4E8;">)]: </span><span style="color:#9ECBFF;">&quot;stringify&quot;</span><span style="color:#E1E4E8;"> }, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">k</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">v</span><span style="color:#E1E4E8;">) {</span></span>\n<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> k </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;symbol&quot;</span><span style="color:#E1E4E8;">) {</span></span>\n<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> v;</span></span>\n<span class="line"><span style="color:#E1E4E8;">    }</span></span>\n<span class="line"><span style="color:#E1E4E8;">  })</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// undefined</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">({ [Symbol.</span><span style="color:#6F42C1;">for</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;json&quot;</span><span style="color:#24292E;">)]: </span><span style="color:#032F62;">&quot;stringify&quot;</span><span style="color:#24292E;"> }, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">k</span><span style="color:#24292E;">, </span><span style="color:#E36209;">v</span><span style="color:#24292E;">) {</span></span>\n<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> k </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;symbol&quot;</span><span style="color:#24292E;">) {</span></span>\n<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> v;</span></span>\n<span class="line"><span style="color:#24292E;">    }</span></span>\n<span class="line"><span style="color:#24292E;">  })</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// undefined</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>replacer 是 JSON.stringify() 的第二个参数，我们比较少用到，所以很多时候我们会忘记 JSON.stringify() 第二个、第三个参数，场景不多，但是用的好的话会非常方便，关于 JSON.stringify() 第九大特性的例子中对 replacer 参数不明白的同学先别急，其实很简单，我们马上就会在下面的学习中弄懂。</p><h2 id="json-stringify-第二个参数和第三个参数" tabindex="-1">JSON.stringify() 第二个参数和第三个参数 <a class="header-anchor" href="#json-stringify-第二个参数和第三个参数" aria-label="Permalink to &quot;JSON.stringify() 第二个参数和第三个参数&quot;">​</a></h2><h3 id="强大的第二个参数" tabindex="-1">强大的第二个参数 <a class="header-anchor" href="#强大的第二个参数" aria-label="Permalink to &quot;强大的第二个参数&quot;">​</a></h3><ul><li>作为函数时，它有两个参数，键（key）和值（value），函数类似就是数组方法 map、filter 等方法的回调函数，对每一个属性值都会执行一次该函数（期间我们还简单实现过一个 map 函数）。</li><li>如果 replacer 是一个数组，数组的值代表将被序列化成 JSON 字符串的属性名。</li></ul><h3 id="华丽的第三个参数" tabindex="-1">华丽的第三个参数 <a class="header-anchor" href="#华丽的第三个参数" aria-label="Permalink to &quot;华丽的第三个参数&quot;">​</a></h3><ul><li>如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；</li><li>如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前10个字符）。</li></ul>',36);const u=s(i,[["render",function(s,e,t,r,c,i){const u=n("ArticleMetadata"),b=n("ClientOnly");return a(),l("div",null,[y,p(b,null,{default:o((()=>[p(u)])),_:1}),E])}]]);export{c as __pageData,u as default};
