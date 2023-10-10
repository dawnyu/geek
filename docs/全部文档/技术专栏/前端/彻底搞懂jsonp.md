---
layout: Article
title: 彻底搞懂jsonp
date: 2023/10/10
tags: CSS
category: 技术专栏
preview: /common/17.jpg
intro: JSONP是一种很远古用来解决跨域问题的技术，当然现在实际工作当中很少用到该技术了，但是很多同学在找工作面试过程中还是经常被问到，本文将带您深入了解JSONP的工作原理、使用场景及安全注意事项，让您轻松掌握JSONP。
---

# 彻底搞懂jsonp

>JSONP是一种很远古用来解决跨域问题的技术，当然现在实际工作当中很少用到该技术了，但是很多同学在找工作面试过程中还是经常被问到，本文将带您深入了解JSONP的工作原理、使用场景及安全注意事项，让您轻松掌握JSONP。

## JSONP是什么？

JSONP，全称JSON with Padding，是一项用于在不同域之间进行数据交互的技术。这项技术的核心思想是通过在页面上动态创建`<script>`标签，从另一个域加载包含JSON数据的外部脚本文件，然后将数据包裹在一个函数调用中返回给客户端。JSONP不仅简单而且强大，尤其在处理跨域数据请求时表现出色。

## JSONP的工作原理

JSONP的工作流程如下：

1. **客户端请求数据**：首先，客户端会创建一个`<script>`标签，向包含JSON数据的远程服务器发出请求。这个请求通常包括一个名为`callback`的参数，用来指定在数据加载完毕后应该调用的JavaScript函数的名称。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSONP Example</title>
</head>
<body>
    <h1>JSONP Example</h1>
    <div id="result"></div>

    <script>
        // 定义JSONP回调函数
        function callback(data) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `Name: ${data.name}, Age: ${data.age}`;
        }

        // 创建JSONP请求
        const script = document.createElement('script');
        script.src = 'http://localhost:3000/data?callback=callback';
        document.body.appendChild(script);
    </script>
</body>
</html>
```

2. **服务器响应**：服务器收到请求后，将JSON数据包装在指定的回调函数中，并将其返回给客户端。响应的内容类似于：

```javascript
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 定义一个简单的JSON数据
const jsonData = {
  name: 'John',
  age: 30,
};

// 添加路由处理JSONP请求
router.get('/data', (ctx) => {
  const callback = ctx.query.callback;
  if (callback) {
    ctx.body = `${callback}(${JSON.stringify(jsonData)})`;
  } else {
    ctx.body = jsonData;
  }
});

// 将路由注册到Koa应用程序
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa应用程序
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

3. **客户端处理数据**：在客户端的页面中，我们必须事先定义好名为`callback`的函数，以便在响应被加载和执行时被调用。这个函数会接收JSON数据，供我们在页面中使用。

## JSONP使用场景

跨域请求：JSONP主要用于解决跨域请求问题，尤其适用于无法通过CORS或代理等方式实现跨域的情况。
数据共享：在多个域名之间共享数据，可以利用JSONP实现跨域数据共享。
第三方数据获取：当需要从第三方网站获取数据时，可以使用JSONP技术。

## 使用JSONP注意事项

JSONP的简单性和广泛的浏览器支持使其成为跨域数据交互的强大工具。然而，我们也必须谨慎使用它，因为它存在一些安全考虑，我们分析下它的优缺点：

**优点**：

- **简单易用**：JSONP非常容易实现和使用，无需复杂的配置。
- **跨浏览器支持**：几乎所有现代浏览器都支持JSONP。
- **绕过同源策略**：JSONP帮助我们绕过了同源策略的限制，轻松获取跨域数据。

**风险考虑**：

- **XSS风险**：JSONP未经过滤的数据可能会引起XSS攻击，因此需要对返回的数据进行过滤和验证。
- **CSRF攻击**：使用JSONP时要注意防范CSRF攻击，可以通过添加随机数等方式增强安全性。
- **仅支持GET请求**：JSONP只支持GET请求，不适用于POST等其他HTTP方法。
- **难以处理HTTP错误**：JSONP难以有效处理HTTP错误，在请求失败时的异常处理比较困难。

随着技术的发展，JSONP已不再是首选跨域解决方案，但了解它的工作原理仍然有助于我们更深入地理解跨域数据交互的基本原理。在实际项目中，根据具体需求和安全考虑，建议优先选择CORS或代理服务器方式处理跨域问题。
