---
layout: Article
title: Bun.js基础入门
date: 2023/10/10
tags: Node,Bun,JavaScript
category: 技术专栏
preview: https://cdn.geekbuluo.com/blog/20231010/b23f18.jpg
intro: Bun是Node.js和Deno的竞争对手，是一个新的JavaScript运行时。在本文中，我们将介绍Bun 1.0，以及它可能让你尝试去使用的理由。
---

# Bun.js基础入门

Bun是Node.js和Deno的竞争对手，是一个新的JavaScript运行时。在本文中，我们将介绍Bun 1.0，以及它可能让你尝试去使用的理由。

## 历史：Bun在Node和Deno中的位置

Ryan Dahl于2009年发布了Node.js。虽然它不是第一个服务器端JavaScript运行时，但Node.js迅速崭露头角。[2023年发布了第20版](https://www.sitepoint.com/node-js-20-new/)，Node.js拥有最大的开发生态系统，拥有320万个模块，每周下载量接近5000亿次。

2020年，Ryan Dahl发布了[Deno](https://www.sitepoint.com/learn-deno/)，它是“noDe”的一种*混合体*，旨在现代化JavaScript开发并解决Node.js安全性、API兼容性、[工具](https://www.sitepoint.com/deno-built-in-tools/)和模块管理方面的传统问题。虽然Deno受到了积极的评价，但尚未挑战Node的主导地位。

2022年，Jarred Sumner发布了Bun，因为他在开发Next.js项目时对Node.js的速度感到不满。

Bun使用JavaScriptCore引擎，该引擎驱动WebKit浏览器，如Safari，而不是Node.js、Deno和Chrome中使用的V8引擎。

Bun运行时侧重于性能和开发人员体验。其目标是消除速度慢和复杂性，而不是放弃JavaScript的所有优点。

Bun可以比Node.js更快地发展，后者必须与现有的JavaScript和npm生态系统保持（基本）向后兼容。

与Deno一样，Bun对JavaScript和TypeScript本地支持，无需第三方转译器或配置。

Bun正在成为Node.js、Deno、无服务器运行时、构建和测试工具的即插即用替代品。它可以替代npm、npx、yarn、TypeScript编译器、dotenv、nodemon、pm2、Webpack、Babel和Jest，为在单一平台上开发应用程序提供了一个完整的多合一工具箱。

最初的运行时是稳定的，但多亏了[近300名开发人员的贡献](https://github.com/oven-sh/bun/graphs/contributors)，[Bun版本1.0发布](https://bun.sh/blog/bun-v1.0)于2023年9月发布。这将不可避免地诱使更多的开发人员迁移到Bun，他们可以享受下文描述的[好处](https://www.sitepoint.com/bun-javascript-runtime-introduction/#tastybunbenefits)。

### “Bun”这个名字有什么

来历？“Bun”这个名字的起源不清楚，标志也没有帮助！它可能与食物、蓬松的兔子、“bundle”或者可能是一个简短、容易记住的名字有关，而且[bun.sh](https://bun.sh/)域名也可用。

![](https://cdn.geekbuluo.com/blog/20231010/b23f18.jpg)

## 美味的Bun好处

Node.js和Deno使用Chrome的[V8 JavaScript引擎](https://v8.dev/)。Bun选择了[JavaScriptCore引擎](https://github.com/WebKit/WebKit/tree/main/Source/JavaScriptCore)，该引擎驱动WebKit浏览器，如Safari。Bun本身是用[Zig](https://ziglang.org/)编写的，这是一种具有手动内存管理和本机线程处理能力的低级编程语言。其结果是一个轻量级运行时，具有更小的内存占用、更快的启动时间，以及在某些（基准测试）条件下性能可以比Node.js和Deno快四倍。

与Deno一样，Bun对JavaScript和[TypeScript](https://www.typescriptlang.org/)都有本机支持，无需第三方转译器或配置。它还支持[.jsx和.tsx文件](https://bun.sh/docs/runtime/loaders#jsx)，以将类似HTML的标记转换为本机JavaScript。还提供了运行[WebAssembly编译的.wasm文件](https://webassembly.org/)的实验性支持。

在内部Bun使用[ES模块](https://www.sitepoint.com/understanding-es6-modules/)，支持顶级`await`，翻译CommonJS，并实现了Node的`node_modules`解析算法。Bun将模块缓存到`~/.bun/install/cache/`中，并使用硬链接将它们“复制”到项目的`node_modules`目录中。因此，您系统上的所有项目都将引用同一库的单个实例，这减少了磁盘空间需求并提高了安装性能。(请注意，macOS安装保留本地版本以提高速度。)

Bun支持Node的`package.json`，与`npm`等效命令，以及[bunx](https://bun.sh/docs/cli/bunx)，这是一个类似`npx`的选项，可以在单个命令中自动安装和运行包。例如：

```bash
bunx cowsay "Hello, world!"

```

`bun init`与`npm init`相同，用于创建空项目，但您还可以使用`bun create <template> <destination>`来[模板化新项目](https://bun.sh/docs/templates)，其中`<template>`是一个[官方包](https://github.com/bun-community/create-templates)、GitHub存储库或本地包。例如，要创建一个新的Next.js项目：

```bash
bun create next ./myapp

```

Bun包含一个[bundler](https://bun.sh/docs/cli/build)，用于将所有依赖项导入单个文件，并且可以针对Bun、Node.js和客户端JavaScript。这减少了使用[esbuild](https://esbuild.github.io/)或[Rollup](https://www.sitepoint.com/rollup-javascript-bundler-introduction/)等工具的需求：

```bash
bun build ./index.ts —outdir ./out

```

大多数命令行界面选项都可以通过JavaScript API使用，因此可以创建复杂的构建脚本，而无需专门的任务运行器。以下是与上述命令相同的构建：

```jsx
await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './out',
})

```

Bun具有标准的[测试运行器](https://bun.sh/docs/cli/test)，类似于[Deno](https://www.sitepoint.com/deno-built-in-tools/#testrunner)和[Node.js 20](https://www.sitepoint.com/node-js-20-new/#nativetestrunner)。运行`bun test`会执行如下命名的脚本：

```bash
*.test.{js|jsx|ts|tsx}
*_test.{js|jsx|ts|tsx}
*.spec.{js|jsx|ts|tsx}
*_spec.{js|jsx|ts|tsx}

```

无需[nodemon](https://nodemon.io/)等工具，因为`bun`具有`--watch`标志，可在修改依赖文件时重新启动脚本或测试。重新启动速度如此之快，以至于可以在每次按键时进行实时重新加载。(是否实用而不会分散注意力是另一回事！)

*实时重新加载不太美观！ (警告：内容闪烁！)* [查看原始动画GIF。](https://user-images.githubusercontent.com/709451/228439002-7b9fad11-0db2-4e48-b82d-2b88c8625625.gif)

类似的`—hot`模式也可用，Bun会监视更改并重新加载模块。所有文件都将重新评估，但全局状态保持不变。

项目`.env`文件中包含的环境变量会自动加载和解析，使它们在Bun应用程序中可用，因此无需使用[dotenv](https://www.npmjs.com/package/dotenv)等包。

除了自己的[Bun APIs](https://bun.sh/docs/runtime/bun-apis)，用于网络、文件访问、子进程等方面，Bun还支持：

- [Web API](https://bun.sh/docs/runtime/web-apis)

，例如`fetch`、`URL`、`blob`、`WebSocket`、`JSON`、`setTimeout`和事件。

- [Node.js兼容性API](https://bun.sh/docs/runtime/nodejs-apis)，例如`console`、`assert`、`dns`、`http`、`path`、`stream`和`util`，以及全局变量，包括`__dirname`和`__filename`*。Bun声称已经完全实现了最常用API的90%，尽管您应该仔细检查与项目特定的API。

最后，Bun具有本机的SQLite3客户端——[bun:sqlite](https://bun.sh/docs/api/sqlite)，这可以减少某些项目中所需的依赖项数量。

## 安装 Bun

Bun 可以作为一个单一的二进制文件安装在 Linux、macOS 和 Windows WSL 上，使用 curl：

```bash
curl -fsSL <https://bun.sh/install> | bash

```

它也可以通过 Node 包管理器安装：

```bash
npm install -g bun

```

或者通过 macOS 上的 Brew 安装：

```bash
brew tap oven-sh/bun
brew install bun

```

或者通过 Docker 安装：

```bash
docker pull oven/bun
docker run --rm --init --ulimit memlock=-1:-1 oven/bun

```

安装完成后，您可以使用以下命令升级 Bun：

```bash
bun upgrade

```

要卸载 Bun，只需删除 `~/.bun` 二进制文件和缓存目录：

```bash
rm -rf ~/.bun

```

然后更新您的 shell 配置文件（`.bashrc`、`.zshrc` 或类似文件），以从 `$PATH` 变量中删除 `~/.bun/bin` 的引用。

## 使用 Bun

如果您从项目的开始使用 Bun，它是可靠的。速度比 Node.js 更快，尽管除非您的应用程序执行特定的密集任务，如大量的 SQLite 处理或 WebSocket 消息传递，否则不太可能看到显著的性能提升。

对于较小、较简单的项目，Node.js 的兼容性很好，我成功地使用 `bun start` 启动了一些脚本，而没有进行任何更改。但对于更复杂的应用程序，可能会失败，并生成在 `node_modules` 层次结构深处生成的晦涩错误消息。

## Bun vs Deno vs Node.js

Deno解决了Node的许多缺点，但开发人员并不一定感到有必要切换：

- Deno不支持Node的第三方模块。
- 从Node.js迁移到Deno需要学习新的技术。
- 虽然Deno提供了更好的开发体验，但Node.js已经足够好用。

现在，Deno已经添加了Node.js兼容选项。这是让开发人员转向Deno的最简单方法，但与此同时，Node.js也采用了Deno的一些功能，包括ES模块、本地测试运行程序和`--watch`模式。

Bun采取了不同的方法，旨在成为一个快速、与Node兼容的引擎，具有Deno的先进功能。迹象是令人鼓舞的，但还没有完全达到目标：

- 性能很好，但很少有开发人员抱怨Node.js的速度。
- 兼容性很好，但在不同的JavaScript引擎中支持所有Node.js模块将是一项挑战。JavaScriptCore是否能够跟上V8的发展，而投入远远少于V8？
- Bun有潜力替代您的工具套件，但尚未提供与Deno中找到的完整范围相匹配的功能。

## Bun 与 Node.js 的兼容性

对于较小、较简单的项目，与Node.js的兼容性通常很好。您可能可以启动一些脚本，而不需要进行任何更改，只需使用`bun start`代替`npm start`。

Bun支持：

- 内置Node.js模块和API，如`fs`、`path`、`http`、`console`、`assert`等
- 全局变量和对象，如`__dirname`和`process`
- Node.js模块解析算法，以在`node_modules`中查找文件

Bun 1.0 声称可以运行“几乎任何野外的Node.js应用程序”。我尚未完全相信；复杂的应用程序可能会由于在第三方模块中生成的晦涩错误消息而失败。

## ES模块和CommonJS兼容性

Bun支持ESM和CommonJS两种模块系统，还支持顶级`await`。ESM在Node.js中花了几年时间才推出，生态系统仍然以CommonJS为主导。使用Bun，无需特定的文件扩展名（`.js`、`.cjs`、`.mjs`）或在`package.json`中的`"type": "module"`。您可以在任何文件中交替使用`import`或`require()`！

在内部，Bun将所有模块都转换为CommonJS，并实现了Node的`node_modules`解析算法。是否如预期地工作是另一回事：

- ES6模块会在执行代码之前预先解析，以解析更多导入。动态导入是可能的，但应该只被视为最后的选择。
- CommonJS模块在执行代码时按需加载依赖项。动态导入问题较少。

在某些应用程序中，执行顺序可能至关重要，这也是Node.js限制您在单个文件中使用EMS或CommonJS的原因。

## Web API

Bun具有内置对浏览器中可用的Web标准API的支持，例如`fetch`、`Request`、`Response`、`URL`、`blob`、`WebSocket`、`JSON`、`setTimeout`和`ReadableStream`。Deno将这些API引入其服务器运行时，使Web编码更加一致。Node.js正在赶上，但像`fetch`这样的功能最近才在18版中加入。

## Bun API

Bun附带了高度优化的用于常见操作的标准API，例如文件读取、文件写入、HTTP服务、SQLite查询和密码哈希。

WebSockets支持HTTP，无需第三方模块，例如`ws`：

```jsx
Bun.s

erve({
  port: 8000,
  fetch(request) {
    return new Response('Hello from the Bun server!');
  },
  websocket: {
    open(ws) { ... },
    message(ws, data) { ... },
    close(ws, code, reason) { ... },
  }
});

```

## TypeScript 和 JSX 支持

与Deno一样，Bun在运行时内置了JavaScript转译器。您可以在不需要第三方依赖项的情况下运行JavaScript、TypeScript、JSX或TSX文件。例如：

```bash
bun index.ts
bun index.jsx
bun index.tsx

```

## 包管理

您可以直接在任何Node.js项目中使用Bun作为`npm`的替代品。例如：

```bash
bun install
bun add <package> [--dev|--production|--peer]
bun remove <package>
bun update <package>

```

Bun将模块缓存到`~/.bun/install/cache/`，并使用硬链接将它们复制到项目的`node_modules`目录中。因此，您系统上的所有项目都引用相同库的单个实例。这可以减少磁盘空间使用，并将安装性能提高多达30倍。

## 实时重载

无需像nodemon这样的工具，因为`bun`可执行文件具有`-watch`标志，可以在修改文件时重新启动脚本或测试。

还提供了类似的`--hot`模式，其中Bun会监视更改并进行软重载模块。所有文件都将重新评估，但全局状态保持不变。

## 测试

Bun提供了与Jest兼容的`bun:test`测试运行器，支持快照测试、模拟和代码覆盖。例如：

```jsx
import { test, expect } from "bun:test";

test('2 + 2', () => {
  expect(2 + 2).toBe(4);
});

```

从Jest或Vitest迁移非常简单，因为来自`@jest/globals`或`vitest`的导入会在内部重新映射到`bun:test`。不应该需要进行代码更改。

运行`bun test`会执行以下命名的脚本：

```
*.test.{js|jsx|ts|tsx}
*_test.{js|jsx|ts|tsx}
*.spec.{js|jsx|ts|tsx}
*_spec.{js|jsx|ts|tsx}

```

## 脚本捆绑

Bun是一个JavaScript和TypeScript捆绑器和代码缩小工具，可以针对浏览器、Node.js和其他平台的代码进行目标定位。它受到esbuild的启发，并提供了一个兼容的插件API：

```jsx
// 简单的构建
Bun.build({
  entrypoints: ['index.js'],
  outdir: 'build'
});

```

基准测试显示，与Go编译的esbuild相比，Bun的性能可以快两倍，而且节省的缩小程度相似。

与esbuild不同，Bun不支持CSS捆绑，但考虑到有一个通用的插件API，这很可能会到来...

通用插件API

Bun的插件API是通用的：它适用于捆绑器和运行时。您可以定义插件以拦截导入并执行自定义加载逻辑。以下示例实现了对`.yaml`文件的导入：

```jsx
import { plugin } from "bun";

plugin({
  name: 'YAML',
  async setup(build) {
    const { load } = await import('js-yaml');
    const { readFileSync } = await import('fs');
    build.onLoad({ filter: /\\.(yaml|yml)$/ }, (args) => {
      const text = readFileSync(args.path, 'utf8');
      const exports = load(text) as Record<string, any>;
      return { exports, loader: 'object' };
    });
  },
});

```

## 启动和执行速度

与`npm run <script>`相比，使用`bun run <script>`通常会快150毫秒启动应用程序。这可能是一个小的改进，但是比Node.js快4倍，当您运行许多命令和构建脚本时会非常明显。当使用TypeScript时，性能改进将更为显著，因为没有编译步骤。

Bun还提供以下关于Node.js性能的声称：

- 比`npx`快5倍
- 文件读取速度快10倍（使用`Bun.read()`）
- 文件写入速度快3倍（使用`Bun.write()`）
- 提供HTTP请求时，速度快4倍（使用`Bun.serve()`）
- SQLite查询速度快4倍（使用`bun:sqlite`）
- 在测试时比Jest快13倍
- 在测试时比Vitest快8倍

对于捆绑，Bun是：

- 几乎比esbuild快两倍
- 比Parcel 2快150倍
- 比使用Terser的Rollup快180倍
- 比Webpack快220倍

您不太可能在每个项目中都看到这样的提升，但Bun应该能够改善您的开发体验

## 实验性 Windows 版本

Bun 的本机构建将很快提供给 Windows 用户。这是一个高度实验性的版本，仅支持 JavaScript 运行时，没有性能优化。像包管理器、测试运行器和捆绑器等功能都已禁用，直到它们变得稳定为止。

目前，Windows 用户可以在[Windows 子系统 Linux（WSL）](https://www.sitepoint.com/wsl2/) 上安装 Bun，这仍然是进行任何重型 JavaScript 工作的最佳选择。

## 总结：您应该尝试使用 Bun 吗？

Bun 是一个成熟的 JavaScript 运行时，但对于关键任务或传统应用程序，Node.js 仍然是首选。您可以尝试使用 `bun start` 运行您的应用程序，但是代码库越大，执行而无需修改的机会就越小。

对于新项目来说，Deno 可能比 Bun 更好，因为它更加成熟且功能更完整。

Bun 很棒，而且正在积极开发，但它是新的。运行时是稳定的，但在这个阶段，很少有人会押注它的长期未来。尽管如此，Bun 提出了一些有趣的想法，我希望 Node.js 和 Deno 团队都会考虑采纳（CLI API 和自动加载的 `.env` 请注意！）

*另外，我喜欢 Bun 的名称，但在搜索资源时可能会有些困难。ChatGPT 大胆地声明：“没有一个被广泛知晓的名为 'Bun' 的 JavaScript 运行时。据我所知，JavaScript 生态系统中没有这样的技术。”这可能是因为后续数据有限，尽管某些问题会返回 Bun 的响应并对错误表示道歉！*

我怀疑我们正走向一个同构的服务器端 JavaScript 时代，在这个时代，模块开发人员试图编写与所有运行时兼容的代码：Node.js、Deno、Bun、无服务器、边缘、嵌入式等等。我们最终可能会达到一个 JavaScript 运行时基本上可以互换使用的程度，就像今天的浏览器一样。

Bun 版本 1.0 里程碑在技术上可能没有太多意义，鉴于与 0.8 版本相比的[微小更改](https://bun.sh/blog/bun-v1.0#changelog-since-v0-8)。但心理上的差异更大：Bun *感觉上* 更完整、更可用。更多开发人员将考虑将其用于自己的项目的运行时和工具集。

Deno 最初走了自己（不错的）方向，但不得不后退。对于许多 Node.js 开发人员来说，它过于激进和不兼容。在项目中从 Node.js 切换到 Deno 仍然不是一件您应该考虑而不接受后果的事情。

Bun 从一开始就提供了兼容性和速度，这在使用不同的 JavaScript 引擎的情况下是一项重大成就。它是否能够实现接近 100% 的 Node.js 兼容性还有待观察，但您可以考虑将其用于传统项目中工具集的一部分。

Bun 的性能声称令人印象深刻，但很少有人抱怨原始 Node.js 的性能，特别是当它在每个版本中都有所提高时。一些框架可能较慢，但这通常是由于膨胀而不是运行时的固有故障。

目前，Node.js 仍然是无可争议的 JavaScript 冠军。选择 Node.js 的人很少会因此而被解雇，但 Bun 避免了一些 Deno 的错误，并迅速成为一个吸引人的选择。

> 翻译原文：[https://www.sitepoint.com/bun-javascript-runtime-introduction/](https://www.sitepoint.com/bun-javascript-runtime-introduction/)
>