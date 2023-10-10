---
layout: Article
title: JS单线程与事件循环，看这篇就够了
date: 2023/10/10
tags: JavaScrpit
category: 技术专栏
preview: /common/9.jpg
intro: JavaScript是一种单线程语言，它在任何给定时间只能执行一个任务。然而js确能够处理异步操作，这得益于其事件循环（Event Loop）机制。今天这篇文章带领大家深入理解JavaScript单线程特性，以及讲解事件循环和js多线程知识。
---

# JS单线程与事件循环，看这篇就够了

JavaScript是一种单线程语言，它在任何给定时间只能执行一个任务。然而js确能够处理异步操作，这得益于其事件循环（Event Loop）机制。今天这篇文章带领大家深入理解JavaScript单线程特性，以及讲解事件循环和js多线程知识。

## 一、背景：为什么JS是单线程？

在最开始设计中，JS的主要用途是处理浏览器中的用户界面事件。由于JS交互直接进行DOM操作，如果允许多线程对DOM进行并行操作，可能会导致竞态条件，例如一个线程正在读取节点，而另一个线程正在修改它。这将导致程序的不可预测性，因此，JS被设计为单线程语言，以避免这种复杂性。

## 二、事件循环

事件循环的核心思想是：JS引擎首先执行当前的同步任务，然后检查任务队列（Task Queue）中是否有待处理的异步任务。如果有，它会按照顺序将这些异步任务添加到执行队列，并在当前任务执行完毕后依次执行它们。在这个过程中，宏任务和微任务是两种不同类型的异步任务，它们在事件循环中的处理方式有所不同。

![](https://cdn.geekbuluo.com/blog/20231010/743d54.png)

### 2.1 宏任务（MacroTask）

宏任务是指那些需要在下一个事件循环周期执行的任务。常见的宏任务包括：

- `setTimeout`
- `setInterval`
- `setImmediate`（Node.js 独有）
- I/O 操作（Node.js 独有）
- UI 渲染（浏览器独有）

当事件循环执行到一个宏任务时，它会将该任务添加到宏任务队列中。在当前事件循环周期结束时，JS引擎会检查宏任务队列，并将队列中的任务依次执行。

### 2.2 微任务（MicroTask）

微任务是指那些在当前事件循环周期内执行的任务。常见的微任务包括：

- `Promise.then` 和 `Promise.catch`
- `async/await`（实际上是基于 Promise 的语法糖）
- `process.nextTick`（Node.js 独有）
- `MutationObserver`（浏览器独有）

当事件循环执行到一个微任务时，它会将该任务添加到微任务队列中。与宏任务不同，微任务会在当前事件循环周期内立即执行，而不是等待下一个事件循环周期。

### 2.3 事件循环处理宏任务和微任务的顺序

1. 从宏任务队列中取出一个任务并执行。
2. 检查微任务队列，如果有任务，则依次执行所有微任务。
3. 检查宏任务队列，如果有任务，则返回步骤1，否则等待新任务。

这意味着，在一个事件循环周期中，微任务会在宏任务之间执行。换句话说，当一个宏任务执行完毕后，JS引擎会检查微任务队列，并在执行下一个宏任务之前执行所有的微任务。

下面是一个简单的示例，展示了宏任务和微任务在事件循环中的执行顺序：

```javascript
console.log('Start'); // 同步任务

setTimeout(() => {
    console.log('setTimeout'); // 宏任务
}, 0);

Promise.resolve().then(() => {
    console.log('Promise'); // 微任务
});

console.log('End'); // 同步任务
```

输出顺序为：

```
Start
End
Promise
setTimeout
```

这是因为在执行到 `setTimeout` 时，它被添加到宏任务队列中。而在执行到 `Promise` 时，它被添加到微任务队列中。在当前事件循环周期结束之前，JS引擎会先执行微任务队列中的所有任务，然后再执行宏任务队列中的任务。

事件循环是JavaScript运行时环境的核心组件，负责处理宏任务和微任务。了解宏任务和微任务在事件循环中的执行顺序，有助于我们更好地理解和编写异步代码。

## 三、 异步编程

1. **回调函数**：最基本的异步编程模型，将一个函数作为参数传递给另一个函数，当异步操作完成时，回调函数被执行。

```javascript
function downloadFile(url, callback) {
    // 模拟异步操作
    setTimeout(() => {
        console.log(`Downloaded file from ${url}`);
        callback();
    }, 2000);
}

downloadFile('https://example.com/file.txt', function() {
    console.log('File download complete');
});
```

2. **Promise**：Promise是一种更高级的异步编程模型，它表示一个异步操作的最终结果。Promise有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

```javascript
function downloadFile(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Downloaded file from ${url}`);
            resolve();
        }, 2000);
    });
}

downloadFile('https://example.com/file.txt')
    .then(() => {
        console.log('File download complete');
    });
```

3. **async/await**：async/await是基于Promise的一种更简洁的异步编程模型。通过使用async关键字声明一个函数为异步函数，然后在函数内部使用await关键字等待Promise的结果。

```javascript
async function downloadFile(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Downloaded file from ${url}`);
            resolve();
        }, 2000);
    });
}

(async () => {
    await downloadFile('https://example.com/file.txt');
    console.log('File download complete');
})();
```

## 三、单线程的优缺点

### 3.1 优点

1. 避免了多线程下的复杂性，如死锁。
2. 简化了异步操作，使得异步编程更易于构建和理解。

### 3.2 缺点

1. 长时间运行的任务可能会阻塞线程，影响用户体验。
2. 无法充分利用多核CPU的计算能力。

## 四、实现多线程的方法

尽管JS是单线程，但我们可以通过Web Workers在浏览器中创建多个线程。Web Workers运行在后台线程中，不影响主线程，它们之间通过postMessage来进行通信。

### 4.1 Web Workers

这是一个简单的Web Worker示例，演示了多个进程之间的通信：

```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage('Hello, Worker!');

worker.onmessage = function(event) {
    console.log('Message from worker:', event.data);
};

// worker.js
self.onmessage = function(event) {
    console.log('Message from main thread:', event.data);
    self.postMessage('Hello, Main Thread!');
};
```

### 4.2 SharedArrayBuffer与Atomics

为了实现更高级的多线程编程，JS引入了SharedArrayBuffer和Atomics对象。SharedArrayBuffer允许多个Web Workers共享同一块内存，而Atomics对象提供了一组原子操作，确保在多线程环境下对共享内存的操作是安全的。

以下是一个使用SharedArrayBuffer和Atomics的示例：

```javascript
// main.js
const worker = new Worker('worker.js');
const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

worker.postMessage(sharedBuffer);

Atomics.store(sharedArray, 0, 1);
console.log('Main thread set value:', sharedArray[0]);

worker.onmessage = function(event) {
    console.log('Message from worker:', event.data);
};

// worker.js
self.onmessage = function(event) {
    const sharedBuffer = event.data;
    const sharedArray = new Int32Array(sharedBuffer);

    console.log('Worker thread initial value:', sharedArray[0]);
    Atomics.add(sharedArray, 0, 1);
    console.log('Worker thread updated value:', sharedArray[0]);

    self.postMessage('SharedArrayBuffer updated');
};
```

### 4.3 使用Web Workers的注意事项

1. Web Workers无法访问主线程的全局变量和函数。
2. Web Workers无法直接操作DOM。
3. 通信开销：Web Workers之间的通信需要通过postMessage和onmessage事件进行，这会带来一定的性能开销。

## 总结

JS的单线程特性使得编程模型简单易懂，但也带来了一些限制。通过使用事件循环、异步编程模型和Web Workers，我们可以在很大程度上克服这些限制，进而实现高性能的Web应用。
