---
layout: Article
title: node实现云函数
date: 2023/10/01
tags: Node
category: 技术专栏
preview: /common/62.jpg
intro: 云函数是一种无服务器计算模型，它允许你在需要时运行代码，而无需管理服务器的基础架构。它适用于各种场景，包括事件驱动型的任务，如响应 HTTP 请求、处理队列等。
---

# node实现云函数


云函数是一种无服务器计算模型，它允许你在需要时运行代码，而无需管理服务器的基础架构。它适用于各种场景，包括事件驱动型的任务，如响应 HTTP 请求、处理队列等。
举个🌰：

```javascript
// 示例：简单的云函数
exports.handler = async (event) => {
  const message = "第一个云函数";
  return {
    statusCode: 200,
    body: { message, event },
  };
};
```

# 常见的云开发方式

- 小程序云开发
- 腾讯云serverless
- BFF服务编排等

# 不想花钱怎么搞？

自己撸一个不就得了😁~

## 先了解下沙箱

沙箱是一个计算机安全概念，用于隔离和保护一个程序或一段代码不受其他程序或系统的影响，以确保其安全性和稳定性。沙箱技术通常被用来运行不受信任的代码，如用户提交的脚本或第三方插件，同时限制其对系统和资源的访问权限。

1. **隔离性：** 沙箱通过创建一个独立的执行环境，将运行的代码与主系统或其他代码隔离开来。这意味着在沙箱中运行的代码无法直接访问主系统的资源或其他进程的数据。
2. **资源限制：** 沙箱可以对运行的代码施加资源限制，例如内存、CPU 使用量和文件系统访问权限。这有助于防止代码耗尽系统资源或执行恶意操作。
3. **权限控制：** 沙箱可以根据需要对代码的权限进行精细的控制。这意味着你可以指定哪些系统资源和功能可用于运行的代码，哪些不可用。例如，可以限制网络访问或文件访问权限。
4. **错误隔离：** 如果在沙箱中运行的代码发生错误或崩溃，它通常不会影响到主系统或其他代码。沙箱提供了错误隔离，确保问题局限在沙箱内部。
5. **安全性：** 沙箱用于运行不受信任的代码，以减少潜在的安全漏洞和攻击。通过限制代码的访问权限，可以降低潜在风险。
6. **多用途性：** 沙箱不仅用于运行不受信任的代码，还可以用于测试、调试和隔离应用程序的不同部分。

## 几种实现沙箱环境的方法

**vm**
vm是node内置模块之一，用于创建虚拟机环境，以便在其中运行 JavaScript 代码。虚拟机环境提供了隔离和安全性，允许你在不污染当前 Node.js 进程的全局环境的情况下执行代码。；
相对于eval，Function来说，安全性也更好一点；

```javascript
eval('1+2') // 3
func = new Function('a', 'b', 'return a+b')
func(1, 2)// 3

// 使用vm
const vm = require('vm');
const context = {
  x: 10,
  y: 20
};
const code = `
  const result = x + y;
  result;
`;
const result = vm.runInNewContext(code, context);
```

VM常用的api：

1. **vm.createContext(sandbox)**: 创建一个新的上下文对象，可用于在虚拟机中执行代码。**sandbox** 参数是一个可选的对象，它会被注入到虚拟机的全局作用域中，可以在其中访问对象的属性和方法。
2. **vm.runInContext(code, context, options)**: 在指定的上下文环境中执行 JavaScript 代码。**code** 参数是要执行的代码字符串，**context** 参数是由 **vm.createContext** 创建的上下文对象。**options** 参数是一个可选的配置，可参考官网；
3. **vm.runInThisContext(code, options)**: 在当前上下文环境中执行 JavaScript 代码。不需要指定上下文对象，代码将在当前环境中执行。

**runInThisContext**会在当前上下文中执行JavaScript 代码，能够访问全局变量和全局函数。
一般用于动态加载，比如：

```javascript
const code = fs.readFileSync('externalScript.js', 'utf8'); 
vm.runInThisContext(code);
```

4. **vm.runInNewContext(code, sandbox, options)**: 在新的上下文环境中执行 JavaScript 代码。与 **runInContext** 类似，但会创建一个新的上下文环境，而不是在现有的上下文中执行。

以上都是直接执行，不会返回编译后的代码；下面几个api是先编译后，可以在程序中多次执行；

5. **vm.createScript(code, options)**: 创建一个 **Script** 对象，该对象包含要执行的 JavaScript 代码。**code** 参数是代码字符串，**options** 参数是一个可选的选项对象。
6. **Script.runInContext(contextifiedSandbox, options)**: 在指定的上下文环境中执行 **Script** 对象中包含的代码。

```javascript
const script = vm1.createScript(`var a = 1;a;`);
const content = vm1.createContext({});
const result = script.runInContext(content);
```

7. **Script.runInNewContext(sandbox, options)**: 在新的上下文环境中执行 **Script** 对象中包含的代码。
8. **Script.runInThisContext(options)**: 在当前上下文环境中执行 **Script** 对象中包含的代码。

- 优点：
  - 简单，不需要额外的依赖。
  - 适用于一些基本的隔离需求。
- 缺点：
  - 安全性有限，不能提供高级的隔离；

比如这段代码：

```javascript
const code = `const fs = require('fs'); const data = fs.readFileSync('/etc/passwd', 'utf8');console.log(data);`;
vm.runInContext(evilCode, context);
```

**vm2**
**vm2** 是开源社区提供的一个库，它基于vm在 Node.js 中创建一个隔离的 JavaScript 执行环境，通过es6新增的代理（Proxy）机制，来拦截对外部属性的访问，同时限制对敏感资源的访问，可以自定义全局对象，提供安全配置和错误处理来提高代码的安全性和隔离性。
vm2 提供3个类：
**VM：**其中**VM**只支持简单的JavaScript代码执行，不支持require，所以VM不支持CommonJS模块加载。
**NodeVM：**这是 **vm2** 的核心类，用于创建一个沙箱环境。
**VMScript**：用于预编译 JavaScript 代码的类。
**NodeVM核心方法：**

1. **vm.run(code: string)**：在沙箱环境中执行 JavaScript 代码，并返回执行结果。

```javascript
const result = vm.run('console.log("Hello from sandbox!");');
```

2. **vm.runScript(script: VMScript)**：运行一个预编译的 **VMScript** 对象，可以提高执行效率。

```javascript
const script = new VMScript('console.log("Hello from script!");');
const result = vm.runScript(script);
```

3. **vm.freeze(object: any, name: string)**：冻结一个对象，阻止其在沙箱中被修改。

```javascript
const obj = { value: 42 };
vm.freeze(obj, 'obj');
```

4. **vm.unfreeze(name: string)**：解冻被冻结的对象，允许其在沙箱中被修改。

```javascript
vm.unfreeze('obj');
```

- **优点：**

1. **上下文隔离**：**vm2** 使用内置 **vm** 模块来创建一个新的上下文执行环境，与当前 Node.js 应用程序的全局上下文完全隔离。
2. **安全沙箱配置**：通过限制访问 Node.js 核心模块、系统模块和一些敏感资源来创建沙箱环境。不能直接访问文件系统、网络、操作系统命令等敏感功能，从而提高了安全性。你可以选择是否允许代码访问某些全局对象、设置执行时间限制、限制内存使用等。
3. **自定义全局对象**： 限制了访问核心模块和系统资源，但它允许你定义自己的全局对象，以供沙箱中的代码使用。
4. **错误处理**：提供错误处理机制，可以捕获沙箱中的异常并返回给主程序，便于做错误处理和日志记录。
5. **性能优化**：通过代码预编译和缓存，来提高代码执行的性能。

- **缺点：**

1. **不适合高性能应用**：例如游戏引擎或高吞吐量的服务器应用，更适合直接执行代码。
2. **无法完全隔离**：虽然 **vm2** 提供了一定程度的隔离性，但它仍然无法完全隔离代码。一些全局对象和变量仍然可以在沙箱中访问。

**isolated-vm：**
这个npm库也是vm2作者开发的，作者认为vm2现在越来越难维护，已经到了不得不终止项目的地步 🤣🤣

> ![](https://cdn.nlark.com/yuque/0/2023/jpeg/459613/1694576156716-7e2c9f1c-b2cf-4eeb-9a99-067d559b62f7.jpeg#averageHue=%23382923&clientId=u6594667b-4e02-4&from=paste&height=40&id=u8474f9a0&originHeight=460&originWidth=460&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf33c09ad-bca0-40b1-8cc5-2319a0a655e&title=&width=40)：Unfortunately, the growing complexity of Node has brought us to a crossroads. We now find ourselves facing an escape so complicated that fixing it seems impossible. And this isn't about one isolated issue. Recent reports have highlighted that sustaining this project in its current form is not viable in the long term.

[传送门]()

- 优点：
  - 提供更高级的隔离和安全性，可以在不同的 V8 上下文中运行代码。
  - 具有更强大的隔离，可以限制对模块和全局对象的访问。
  - 更适合于运行不受信任的代码。
- 缺点：
  - 较复杂，学习曲线较陡。
  - 性能开销较大。

**Docker：**

- 优点：
  - 提供了完全的容器隔离，可以运行整个应用程序环境。
  - 适用于运行不受信任的代码以及其他应用程序的隔离需求。
- 缺点：
  - 较重量级，需要额外的系统资源。
  - 对于简单的隔离需求可能过于复杂

## 基于vm2开发个云函数

### 先看个小例子

再回到开篇说到的那个例子：

```javascript
// 示例：简单的云函数
exports.handler = async (event) => {
  const message = "第一个云函数";
  return {
    statusCode: 200,
    body: { message, event },
  };
};
```

下面是实现以上例子的code

```typescript
const Koa = require('koa');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const { NodeVM } = require('vm2');

const vm = new NodeVM({
  // wrapper: 'none',
});

const app = new Koa();
const router = new Router();

router.post('/cloud/test', async function (ctx) {
  const { script } = ctx.request.body;
  const a = vm.run(script);
  ctx.body = { result: a.handler() };
});

const serve = KoaStatic(path.join(__dirname, './public'));
app.use(serve);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8003);

```

使用postman测试，可以正常执行：
![image.png](https://cdn.geekbuluo.com/blog/20231010/e0ed49.png)

### 实现一个功能相对完善的云函数服务

![](https://cdn.geekbuluo.com/blog/20231010/202e04.png)

1. **先整一个云函数模版**

关键步骤：

1. 创建通配符路由：/cloud/:funcName，funcName：云函数名称
2. 实现一个通用关闭应用接口shutdown
3. 确定外部模块引入打标位置，示例为9，29（这个后面用到）

```javascript
const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const fs = require('fs');
const { NodeVM } = require('vm2');
/** 依赖库，打标位置 */

function query() {
  const jsonStr = fs.readFileSync(path.join(__dirname, `../db/func.json`)).toString();
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    return null;
  }
}

const app = new Koa();
const router = new Router();

const vm = new NodeVM({
  require: {
    external: true,
    root: './',
  },
  sandbox: {
    // 次数插入依赖， 打标位置
  },
  // wrapper: 'node',
});

router.post('/cloud/:funcName', async function (ctx) {
  const funcName = ctx.params.funcName;
  const { body } = ctx.request;
  const cloud = query() || {};
  const result = vm.run(cloud.script);

  try {
    ctx.body = await result.handler(body);
  } catch (error) {
    ctx.body = { message: error.message };
  }
});

router.post('/shutdown', (req, res) => {
  // 在这里执行关闭操作
  app.close(() => {
    console.log('Server has been shut down.');
  });
});

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8001);
```

2. **创建云函数**

参考上面koa标准模版，构建一个云函数管理服务
关键步骤：

1. 简单起见，我们直接使用json文件存储云函数
2. 创建成功后改函数名就不能被其他人在使用

```typescript
router.post('/cloud/create', async function (ctx) {
  const { body } = ctx.request;
  await save(`../db/func.json`, { funcName: body.funcName });
  ctx.body = { code: 0, msg: 'npm install sunccess' };
});
```

3. **实现云函数并运行**

关键步骤：

1. 校验云函数合法性
2. 把云函数实现内容存储到刚创建的云函数中
3. 通过child_process提供的spawn方法启动一个子进程运行刚创建的云函数服务

```javascript
router.post('/cloud/save', async function (ctx) {
  const { body } = ctx.request;
  // 校验逻辑省略
  const cloud = query(`../db/func.json`) || {};
  cloud.script = body.script;
  await save(`../db/func.json`, cloud);
  // 子进程启动node服务
  nodeStart(`../cloudFunction/vm2.js`);
  ctx.body = { code: 0, msg: 'func is run' };
});
```

4. **处理外部模块（npm包）**

vm2默认是隔离上下文当中的局部变量或函数的，此时如果不在程序中安装依赖云函数是无法正常运行的，NodeVM中提供sandbox参数可以注入依赖的模块,比如想使用dayjs包：

```javascript
const dayjs = require(dayjs);
vm = new NodeVM({
  sandbox: {
    dayjs
  },
});
```

关键步骤：

1. 创建安装依赖的接口
2. 创建安装依赖命令：npm install :npmName,并通过execSync执行到云函数所在目录
3. 关闭子进程中运行云函数Node服务
4. 获取刚创建的云函数主应用文件，并按行进行数组处理
5. 根据上面打标的位置，把这两个代码插入云函数源码对应的位置：
   1. const npmName = require('npmName');
   2. npmName: npmName,
6. 修改过的源码覆盖原来的代码；
7. 重新通过spawn('node', [path.join(__dirname, '云函数主入口路径')])重启云函数服务；

```javascript
router.post('/cloud/npminstall', async function (ctx) {
  const { body } = ctx.request;
  const { npmName } = body; // 版本
  const npmCommand = `npm install ${npmName}`;
  execSync(npmCommand, { cwd: '../cloudFunction' });
  await axios.post('http://localhost:8001/shutdown', {});
  const cloud = query(`../db/func.json`) || {};
  cloud.npmName = npmName;
  await save(`../db/func.json`, cloud);
  // 2.修改代码：：：当然，完整功能这里要保存代码快照，可以切换回滚
  // 读取需要添加配置行数
  const line = query(`../db/config.json`);
  const fileStr = fs.readFileSync(path.join(__dirname, `../cloudFunction/vm2.js`)).toString();
  const codeLines = fileStr.split('\n');
  codeLines.splice(line.requireLine, 0, `const ${npmName} = require('${npmName}');`);
  codeLines.splice(line.dependLine, 0, `${npmName},`);
  fs.writeFileSync(path.join(__dirname, `../cloudFunction/vm2.js`), codeLines.join('\n'), 'utf8');
  // 修改源文件可编辑行数
  // line.requireLine += 1;
  // line.dependLine += 1;
  save(`../db/config.json`, line);
  ctx.body = { code: 0, msg: 'npm install sunccess' };
});
```

至此，我们实现了一个简易版的云函数；这里操作云函数服务都是通过node的子进程实现的，在高并发下其实是挺吃内存的，如果想在生产上应用，把云函数部署到docker容器中是比较好的选择；docker能够完全实现隔离，并且不受主应用服务内存影响，稳定性也会比较高；

### 安全防护

1. **限制资源访问**：使用 **vm2** 的 **NodeVM**时，可以配置选项来限制代码对系统资源的访问权限。通过设置 **sandbox** 选项，可以限制脚本对全局对象的访问，以及禁用对某些敏感模块的访问。例如：

```javascript
const { NodeVM } = require('vm2');
const vm = new NodeVM({
  sandbox: {
    // 在沙箱中禁用全局对象访问
    console: 'off',
    process: 'off',
    timeout: 1000, //超时时间
    // 限制对 fs 模块的访问
    fs: {
      readFileSync: 'readonly',
      // 其他方法可设置为 'off'，禁止访问
    },
  },
});
```

2. **隔离环境**：使用 **NodeVM** 创建隔离的沙箱环境，以确保脚本的执行不会影响主应用程序。这可以通过创建多个独立的 **NodeVM** 实例来实现，每个实例都有自己的沙箱环境。
3. **限制运行时间**：使用 **timeout** 选项来限制代码的运行时间，以防止无限循环或长时间运行的代码占用资源。
4. **白名单方法**：只暴露给沙箱环境必要的方法和模块，通过白名单方式限制其它方法和模块的访问。
5. **监控和日志**：在沙箱环境中设置事件监听器，以便监控代码的行为。同时，记录代码执行的日志和错误信息，以便检查和排除问题。
6. **定期审查代码**：定期审查允许在沙箱中运行的代码，以确保其安全性和合规性。
7. **使用可信赖的库**：避免在沙箱中使用不受信任或不安全的第三方库，尽可能使用受信任的库。

# 总结

使用云函数模式开发有比较多的好处，每个云函数有独立的沙箱环境，与主程序隔离，灵活性大大提高，可拓展性也比较高，比如动态地添加、更新和删除云函数，而无需重新启动主应用程序。

# Q&A
