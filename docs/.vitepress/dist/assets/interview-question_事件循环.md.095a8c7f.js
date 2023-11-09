import{_ as l,C as i,o as e,c as a,H as t,w as s,k as r,a as n,Q as o}from"./chunks/framework.e34e23c1.js";const u=JSON.parse('{"title":"阐述一下 JS 的事件循环","description":"","frontmatter":{"createTime":"2022/11/30","tags":"js,面试题"},"headers":[],"relativePath":"interview-question/事件循环.md","filePath":"全部文档/前端面试题/js/事件循环.md","lastUpdated":1696860910000}'),d={name:"interview-question/事件循环.md"},_=r("h1",{id:"阐述一下-js-的事件循环",tabindex:"-1"},[n("阐述一下 JS 的事件循环 "),r("a",{class:"header-anchor",href:"#阐述一下-js-的事件循环","aria-label":'Permalink to "阐述一下 JS 的事件循环"'},"​")],-1),m=o("<ul><li>事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。</li><li>官方叫做 event loop 浏览器叫做 message loop</li><li>在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列未尾即可。过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。 <ul><li>事件循环历史队列 <ul><li>微队列</li><li>宏队列</li></ul></li><li>事件循环最新队列 列举三个常见的 <ul><li>微队列</li><li>延时队列</li><li>交互队列</li></ul></li></ul></li><li>根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。</li><li>不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行</li></ul>",1);const c=l(d,[["render",function(l,r,n,o,u,d){const c=i("ArticleMetadata"),f=i("ClientOnly");return e(),a("div",null,[_,t(f,null,{default:s((()=>[t(c)])),_:1}),m])}]]);export{u as __pageData,c as default};
