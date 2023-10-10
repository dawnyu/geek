import{_ as s,C as n,o as a,c as l,H as p,w as o,k as e,a as t,Q as c}from"./chunks/framework.f92cd432.js";const r=JSON.parse('{"title":"彻底搞懂jsonp","description":"","frontmatter":{"layout":"Article","title":"彻底搞懂jsonp","date":"2023/10/10","tags":"CSS","category":"技术专栏","preview":"/common/17.jpg","intro":"JSONP是一种很远古用来解决跨域问题的技术，当然现在实际工作当中很少用到该技术了，但是很多同学在找工作面试过程中还是经常被问到，本文将带您深入了解JSONP的工作原理、使用场景及安全注意事项，让您轻松掌握JSONP。"},"headers":[],"relativePath":"article/彻底搞懂jsonp.md","filePath":"全部文档/技术专栏/前端/彻底搞懂jsonp.md","lastUpdated":1696945268000}'),E={name:"article/彻底搞懂jsonp.md"},y=e("h1",{id:"彻底搞懂jsonp",tabindex:"-1"},[t("彻底搞懂jsonp "),e("a",{class:"header-anchor",href:"#彻底搞懂jsonp","aria-label":'Permalink to "彻底搞懂jsonp"'},"​")],-1),i=c('<blockquote><p>JSONP是一种很远古用来解决跨域问题的技术，当然现在实际工作当中很少用到该技术了，但是很多同学在找工作面试过程中还是经常被问到，本文将带您深入了解JSONP的工作原理、使用场景及安全注意事项，让您轻松掌握JSONP。</p></blockquote><h2 id="jsonp是什么" tabindex="-1">JSONP是什么？ <a class="header-anchor" href="#jsonp是什么" aria-label="Permalink to &quot;JSONP是什么？&quot;">​</a></h2><p>JSONP，全称JSON with Padding，是一项用于在不同域之间进行数据交互的技术。这项技术的核心思想是通过在页面上动态创建<code>&lt;script&gt;</code>标签，从另一个域加载包含JSON数据的外部脚本文件，然后将数据包裹在一个函数调用中返回给客户端。JSONP不仅简单而且强大，尤其在处理跨域数据请求时表现出色。</p><h2 id="jsonp的工作原理" tabindex="-1">JSONP的工作原理 <a class="header-anchor" href="#jsonp的工作原理" aria-label="Permalink to &quot;JSONP的工作原理&quot;">​</a></h2><p>JSONP的工作流程如下：</p><ol><li><strong>客户端请求数据</strong>：首先，客户端会创建一个<code>&lt;script&gt;</code>标签，向包含JSON数据的远程服务器发出请求。这个请求通常包括一个名为<code>callback</code>的参数，用来指定在数据加载完毕后应该调用的JavaScript函数的名称。</li></ol><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#85E89D;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">html</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;viewport&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;JSONP Example&lt;/</span><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">head</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;JSONP Example&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;result&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 定义JSONP回调函数</span></span>\n<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callback</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) {</span></span>\n<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">resultDiv</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;result&#39;</span><span style="color:#E1E4E8;">);</span></span>\n<span class="line"><span style="color:#E1E4E8;">            resultDiv.innerHTML </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">`Name: ${</span><span style="color:#E1E4E8;">data</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">}, Age: ${</span><span style="color:#E1E4E8;">data</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">age</span><span style="color:#9ECBFF;">}`</span><span style="color:#E1E4E8;">;</span></span>\n<span class="line"><span style="color:#E1E4E8;">        }</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建JSONP请求</span></span>\n<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;script&#39;</span><span style="color:#E1E4E8;">);</span></span>\n<span class="line"><span style="color:#E1E4E8;">        script.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;http://localhost:3000/data?callback=callback&#39;</span><span style="color:#E1E4E8;">;</span></span>\n<span class="line"><span style="color:#E1E4E8;">        document.body.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(script);</span></span>\n<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;</span></span>\n<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#22863A;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">html</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;viewport&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;JSONP Example&lt;/</span><span style="color:#22863A;">title</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">head</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;JSONP Example&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;result&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 定义JSONP回调函数</span></span>\n<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callback</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;">) {</span></span>\n<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">resultDiv</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;result&#39;</span><span style="color:#24292E;">);</span></span>\n<span class="line"><span style="color:#24292E;">            resultDiv.innerHTML </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">`Name: ${</span><span style="color:#24292E;">data</span><span style="color:#032F62;">.</span><span style="color:#24292E;">name</span><span style="color:#032F62;">}, Age: ${</span><span style="color:#24292E;">data</span><span style="color:#032F62;">.</span><span style="color:#24292E;">age</span><span style="color:#032F62;">}`</span><span style="color:#24292E;">;</span></span>\n<span class="line"><span style="color:#24292E;">        }</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建JSONP请求</span></span>\n<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">script</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;script&#39;</span><span style="color:#24292E;">);</span></span>\n<span class="line"><span style="color:#24292E;">        script.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;http://localhost:3000/data?callback=callback&#39;</span><span style="color:#24292E;">;</span></span>\n<span class="line"><span style="color:#24292E;">        document.body.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(script);</span></span>\n<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;</span></span>\n<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><ol start="2"><li><strong>服务器响应</strong>：服务器收到请求后，将JSON数据包装在指定的回调函数中，并将其返回给客户端。响应的内容类似于：</li></ol><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Koa</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;koa&#39;</span><span style="color:#E1E4E8;">);</span></span>\n<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;koa-router&#39;</span><span style="color:#E1E4E8;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">app</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Koa</span><span style="color:#E1E4E8;">();</span></span>\n<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 定义一个简单的JSON数据</span></span>\n<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">jsonData</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&#39;John&#39;</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">  age: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>\n<span class="line"><span style="color:#E1E4E8;">};</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 添加路由处理JSONP请求</span></span>\n<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/data&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">callback</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ctx.query.callback;</span></span>\n<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (callback) {</span></span>\n<span class="line"><span style="color:#E1E4E8;">    ctx.body </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">`${</span><span style="color:#E1E4E8;">callback</span><span style="color:#9ECBFF;">}(${</span><span style="color:#79B8FF;">JSON</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#9ECBFF;">(</span><span style="color:#E1E4E8;">jsonData</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">})`</span><span style="color:#E1E4E8;">;</span></span>\n<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">    ctx.body </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> jsonData;</span></span>\n<span class="line"><span style="color:#E1E4E8;">  }</span></span>\n<span class="line"><span style="color:#E1E4E8;">});</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 将路由注册到Koa应用程序</span></span>\n<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(router.</span><span style="color:#B392F0;">routes</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(router.</span><span style="color:#B392F0;">allowedMethods</span><span style="color:#E1E4E8;">());</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 启动Koa应用程序</span></span>\n<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">port</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">;</span></span>\n<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(port, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>\n<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">`Server is running on port ${</span><span style="color:#E1E4E8;">port</span><span style="color:#9ECBFF;">}`</span><span style="color:#E1E4E8;">);</span></span>\n<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Koa</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;koa&#39;</span><span style="color:#24292E;">);</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;koa-router&#39;</span><span style="color:#24292E;">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">app</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Koa</span><span style="color:#24292E;">();</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Router</span><span style="color:#24292E;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 定义一个简单的JSON数据</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">jsonData</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&#39;John&#39;</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">  age: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>\n<span class="line"><span style="color:#24292E;">};</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 添加路由处理JSONP请求</span></span>\n<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/data&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">callback</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ctx.query.callback;</span></span>\n<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (callback) {</span></span>\n<span class="line"><span style="color:#24292E;">    ctx.body </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">`${</span><span style="color:#24292E;">callback</span><span style="color:#032F62;">}(${</span><span style="color:#005CC5;">JSON</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#032F62;">(</span><span style="color:#24292E;">jsonData</span><span style="color:#032F62;">)</span><span style="color:#032F62;">})`</span><span style="color:#24292E;">;</span></span>\n<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">    ctx.body </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> jsonData;</span></span>\n<span class="line"><span style="color:#24292E;">  }</span></span>\n<span class="line"><span style="color:#24292E;">});</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 将路由注册到Koa应用程序</span></span>\n<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(router.</span><span style="color:#6F42C1;">routes</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(router.</span><span style="color:#6F42C1;">allowedMethods</span><span style="color:#24292E;">());</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#6A737D;">// 启动Koa应用程序</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">port</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">;</span></span>\n<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(port, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>\n<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">`Server is running on port ${</span><span style="color:#24292E;">port</span><span style="color:#032F62;">}`</span><span style="color:#24292E;">);</span></span>\n<span class="line"><span style="color:#24292E;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><ol start="3"><li><strong>客户端处理数据</strong>：在客户端的页面中，我们必须事先定义好名为<code>callback</code>的函数，以便在响应被加载和执行时被调用。这个函数会接收JSON数据，供我们在页面中使用。</li></ol><h2 id="jsonp使用场景" tabindex="-1">JSONP使用场景 <a class="header-anchor" href="#jsonp使用场景" aria-label="Permalink to &quot;JSONP使用场景&quot;">​</a></h2><p>跨域请求：JSONP主要用于解决跨域请求问题，尤其适用于无法通过CORS或代理等方式实现跨域的情况。 数据共享：在多个域名之间共享数据，可以利用JSONP实现跨域数据共享。 第三方数据获取：当需要从第三方网站获取数据时，可以使用JSONP技术。</p><h2 id="使用jsonp注意事项" tabindex="-1">使用JSONP注意事项 <a class="header-anchor" href="#使用jsonp注意事项" aria-label="Permalink to &quot;使用JSONP注意事项&quot;">​</a></h2><p>JSONP的简单性和广泛的浏览器支持使其成为跨域数据交互的强大工具。然而，我们也必须谨慎使用它，因为它存在一些安全考虑，我们分析下它的优缺点：</p><p><strong>优点</strong>：</p><ul><li><strong>简单易用</strong>：JSONP非常容易实现和使用，无需复杂的配置。</li><li><strong>跨浏览器支持</strong>：几乎所有现代浏览器都支持JSONP。</li><li><strong>绕过同源策略</strong>：JSONP帮助我们绕过了同源策略的限制，轻松获取跨域数据。</li></ul><p><strong>风险考虑</strong>：</p><ul><li><strong>XSS风险</strong>：JSONP未经过滤的数据可能会引起XSS攻击，因此需要对返回的数据进行过滤和验证。</li><li><strong>CSRF攻击</strong>：使用JSONP时要注意防范CSRF攻击，可以通过添加随机数等方式增强安全性。</li><li><strong>仅支持GET请求</strong>：JSONP只支持GET请求，不适用于POST等其他HTTP方法。</li><li><strong>难以处理HTTP错误</strong>：JSONP难以有效处理HTTP错误，在请求失败时的异常处理比较困难。</li></ul><p>随着技术的发展，JSONP已不再是首选跨域解决方案，但了解它的工作原理仍然有助于我们更深入地理解跨域数据交互的基本原理。在实际项目中，根据具体需求和安全考虑，建议优先选择CORS或代理服务器方式处理跨域问题。</p>',19);const F=s(E,[["render",function(s,e,t,c,r,E){const F=n("ArticleMetadata"),b=n("ClientOnly");return a(),l("div",null,[y,p(b,null,{default:o((()=>[p(F)])),_:1}),i])}]]);export{r as __pageData,F as default};
