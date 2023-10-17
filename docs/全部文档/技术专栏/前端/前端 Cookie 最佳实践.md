---
layout: Article
title: 前端 Cookie 最佳实践
date: 2023/10/17
tags: Cookie
category: 技术专栏
preview: /common/4.jpg
intro: Cookie和LocalStorage是前端开发中常用的客户端存储机制。前两天有个前端小伙伴问我几个的Cookie问题，没想到还有前端不熟悉Cookie，今天我们就重点聊一下这个老生常谈的知识点。
---

# 前端 Cookie 最佳实践

Cookie和LocalStorage是前端开发中常用的客户端存储机制。前两天有个前端小伙伴问我几个的Cookie问题，没想到还有前端不熟悉Cookie，今天我们就重点聊一下这个老生常谈的知识点。

### 什么是Cookie？

Cookie是一种存储在用户浏览器中的小型文本文件，由服务器发送给客户端（浏览器），然后存储在客户端的本地文件系统中。当用户访问同一网站时，浏览器会将Cookie发送回服务器，以便服务器可以识别用户。Cookie通常包含键-值对，用于存储各种信息，如用户标识、用户首选项和会话数据。

#### 存储机制

Cookie 是通过服务器发送到客户端的小型文本文件，存储在客户端的文件系统中。它们在每次HTTP请求中都会被发送到服务器。

#### 存储容量

Cookie的数据容量通常受到4KB的限制，这意味着它们适合存储较小的数据。

#### 生命周期

Cookie可以设置生存周期，可以是会话Cookie（在浏览器关闭时过期）或持久性Cookie（可以设置特定过期日期）。

#### 服务器端通信

Cookie会在每个HTTP请求中发送到服务器，这可以用于识别用户或维护用户状态。

#### 安全性

由于Cookie在每个请求中都会发送到服务器，它们可能会更容易受到CSRF（跨站点请求伪造）攻击。

### 使用场景

#### 保存用户登录状态

Cookie经常用于保存用户的登录状态。当用户成功登录后，服务器会创建一个包含用户信息的Cookie，并将其发送到客户端。这允许用户在会话期间保持登录状态，而无需每次都重新登录。

#### 跟踪用户行为

网站可以使用Cookie来跟踪用户的行为，例如记录他们浏览的页面、点击的链接或购物车中的商品。这种信息对于分析用户行为和提供个性化内容非常重要。

### 限制

虽然Cookie在前端开发中非常有用，但它们也有一些限制

#### 数据大小限制

 Cookie的数据容量通常受到4KB的限制，这意味着它们适合存储较小的数据。

#### Cookie数量限制

每个域名下Cookie的数量也是有限制的，通常为20个。这意味着在同一域名下存储太多Cookie可能会引发问题。

#### 安全性问题

Cookie可能会被篡改。因此，它们不适合存储敏感信息，如密码。为了增强Cookie的安全性，可以使用加密来保护数据。

#### 隐私法规合规

随着对隐私的关注不断增加，法规如GDPR等对Cookie的使用提出了更严格的要求。开发人员需要确保他们的网站遵守这些法规。

### 如何避免前端篡改Cookie

为了确保Cookie不会被前端篡改，最佳实践是将Cookie的处理完全委托给服务端。以下是一种常见的实现方式，使用Node.js和Express框架：

1. 服务端生成一个随机字符串，作为用户的身份标识。
2. 将该字符串存储在服务器的数据库中，并作为Cookie的值发送给客户端。
3. 当客户端再次访问网站时，客户端会将Cookie发送给服务器。
4. 服务器根据Cookie中的值来识别用户，并从数据库中获取用户信息。

在实现过程中，确保Cookie的安全性，不要直接在Cookie中存储敏感信息。最好能够将Cookie信息加密，然后在需要使用时，再由服务器端进行解密。

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// 使用 cookie-parser 中间件
app.use(cookieParser());

// 生成随机字符串作为用户的身份标识
function generateToken() {
  const token = Math.random().toString(36).substr(2);
  return token;
}

// 处理登录请求
app.post('/login', (req, res) => {
  // 验证用户名和密码
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    // 生成随机字符串作为用户的身份标识
    const token = generateToken();
    // 将身份标识存储在数据库中
    db.saveToken(username, token);
    // 将身份标识作为 Cookie 的值发送给客户端
    res.cookie('token', token);
    res.send('登录成功');
  } else {
    res.send('用户名或密码错误');
  }
});

// 处理其他请求
app.get('/', (req, res) => {
  // 从 Cookie 中获取身份标识
  const token = req.cookies.token;
  // 根据身份标识从数据库中获取用户信息
  const user = db.getUserByToken(token);
  if (user) {
    res.send(`欢迎您，${user.username}`);
  } else {
    res.send('请先登录');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

这种方式可以帮助避免前端篡改Cookie，从而提高安全性和用户数据的保护。

#### 再谈谈LocalStorage

与Cookie不同，Local Storage是HTML5引入的一种客户端存储机制，数据以键值对的形式存储在浏览器中。Local Storage通常支持更大的存储容量，通常在5MB至10MB之间，这使其适用于存储大量数据。

Local Storage的数据在浏览器中一直保留，除非通过JavaScript代码显式删除。与Cookie不同，Local Storage不会在每个HTTP请求中发送到服务器，这使其更适合用于存储持久性数据，如用户首选项、本地缓存和临时存储。

在前端开发中，开发人员需要根据实际需求选择使用Cookie或LocalStorage。Cookie通常用于需要与服务器通信的情况，如保存用户登录状态，而Local Storage更适用于需要在客户端存储和检索数据的场景，例如保存用户首选项。

### 总结

Cookie和LocalStorage都是前端开发中重要的工具，用于存储用户信息和状态。不过一般情况下还是使用LocalStorage最省心吧😄
