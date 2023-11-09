import{_ as a,C as s,o as e,c as n,H as p,w as l,k as o,a as i,Q as r}from"./chunks/framework.e34e23c1.js";const t=JSON.parse('{"title":"link 创建软链","description":"","frontmatter":{"createTime":"2022/10/24","tags":"npm"},"headers":[],"relativePath":"interview-question/npm link创建软链.md","filePath":"全部文档/前端面试题/npm/npm link创建软链.md","lastUpdated":1696860910000}'),c={name:"interview-question/npm link创建软链.md"},d=o("h1",{id:"link-创建软链",tabindex:"-1"},[i("link 创建软链 "),o("a",{class:"header-anchor",href:"#link-创建软链","aria-label":'Permalink to "link 创建软链"'},"​")],-1),h=r('<h3 id="使用软链-npm-link" tabindex="-1">使用软链 npm link <a class="header-anchor" href="#使用软链-npm-link" aria-label="Permalink to &quot;使用软链 npm link&quot;">​</a></h3><p>主要是平时开发时，有npm包需要在本地调试好了再发布。发一版测一版，或者把代码复制粘贴到项目文件夹里去调试，很不优雅。软链就变得极为有用了，特别是需要调试的npm包不止一个，且彼此之间需要联调。</p><h3 id="_1-什么是软链" tabindex="-1">1. 什么是软链？ <a class="header-anchor" href="#_1-什么是软链" aria-label="Permalink to &quot;1. 什么是软链？&quot;">​</a></h3><p>简单说就是为开发的模块(待发布的npm包)创造一个全局链接，在主项目里链接这个依赖的模块，进行测试。</p><h3 id="_2-如何创建、使用、去除软链" tabindex="-1">2. 如何创建、使用、去除软链？ <a class="header-anchor" href="#_2-如何创建、使用、去除软链" aria-label="Permalink to &quot;2. 如何创建、使用、去除软链？&quot;">​</a></h3><h4 id="_2-1-先在对应npm包的文件创建一个全局的链接" tabindex="-1">2.1 先在对应npm包的文件创建一个全局的链接 <a class="header-anchor" href="#_2-1-先在对应npm包的文件创建一个全局的链接" aria-label="Permalink to &quot;2.1 先在对应npm包的文件创建一个全局的链接&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cd </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">projects</span><span style="color:#F97583;">/package-</span><span style="color:#E1E4E8;">project npm link</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cd </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">projects</span><span style="color:#D73A49;">/package-</span><span style="color:#24292E;">project npm link</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_2-2-然后再想要使用该包的项目里使用这个软链" tabindex="-1">2.2 然后再想要使用该包的项目里使用这个软链 <a class="header-anchor" href="#_2-2-然后再想要使用该包的项目里使用这个软链" aria-label="Permalink to &quot;2.2 然后再想要使用该包的项目里使用这个软链&quot;">​</a></h4><p>Tips: 注意这里的packageName一定要对应你的npm包package.json里的name字段值。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cd </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">projects</span><span style="color:#F97583;">/package-</span><span style="color:#E1E4E8;">project npm link packageName</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cd </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">projects</span><span style="color:#D73A49;">/package-</span><span style="color:#24292E;">project npm link packageName</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>好啦，通过上边两步，我们已经可以在主项目里使用位于本地的npm包了😊。</p><h4 id="_2-3-用完了如何去除软链呢" tabindex="-1">2.3 用完了如何去除软链呢？ <a class="header-anchor" href="#_2-3-用完了如何去除软链呢" aria-label="Permalink to &quot;2.3 用完了如何去除软链呢？&quot;">​</a></h4><p>下边两步的顺序，我自己试了下，颠倒顺序其实也没报错。但是既然有同学提出来了，我觉得逻辑上先unlink包再删掉全局link可能更合理些。</p><h4 id="_2-31-先在使用npm包的项目的文件目录下解除特定的链接" tabindex="-1">2.31 先在使用npm包的项目的文件目录下解除特定的链接 <a class="header-anchor" href="#_2-31-先在使用npm包的项目的文件目录下解除特定的链接" aria-label="Permalink to &quot;2.31 先在使用npm包的项目的文件目录下解除特定的链接&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm unlink packageName</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm unlink packageName</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_2-32-再在npm包所在的文件目录下去除全局链接" tabindex="-1">2.32 再在npm包所在的文件目录下去除全局链接 <a class="header-anchor" href="#_2-32-再在npm包所在的文件目录下去除全局链接" aria-label="Permalink to &quot;2.32 再在npm包所在的文件目录下去除全局链接&quot;">​</a></h4><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm unlink</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm unlink</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>到这里其实就OK了</p><h4 id="_2-33-强制解除创建的某个特定全局链接" tabindex="-1">2.33 强制解除创建的某个特定全局链接 <a class="header-anchor" href="#_2-33-强制解除创建的某个特定全局链接" aria-label="Permalink to &quot;2.33 强制解除创建的某个特定全局链接&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo npm rm </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">global packageName</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo npm rm </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">global packageName</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_2-34-查看所有创建的全局链接名称" tabindex="-1">2.34 查看所有创建的全局链接名称 <a class="header-anchor" href="#_2-34-查看所有创建的全局链接名称" aria-label="Permalink to &quot;2.34 查看所有创建的全局链接名称&quot;">​</a></h4><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm ls </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">global </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">depth </span><span style="color:#79B8FF;">0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm ls </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">global </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">depth </span><span style="color:#005CC5;">0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>',22);const m=a(c,[["render",function(a,o,i,r,t,c){const m=s("ArticleMetadata"),u=s("ClientOnly");return e(),n("div",null,[d,p(u,null,{default:l((()=>[p(m)])),_:1}),h])}]]);export{t as __pageData,m as default};
