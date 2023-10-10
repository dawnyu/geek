---
layout: Article
title: 手写Promise
date: 2023/10/02
tags: JavaScrpit
category: 技术专栏
preview: /common/79.jpg
intro: Promise是ES6中处理异步操作的重要工具，它的实现原理让我们的代码更加简洁高效。本文将为你揭开ES6 Promise的神秘面纱，让你彻底了解其实现原理，同时展示如何运用Promise优化代码。
---

# 手写Promise

Promise是ES6中处理异步操作的重要工具，它的实现原理让我们的代码更加简洁高效。本文将为你揭开ES6 Promise的神秘面纱，让你彻底了解其实现原理，同时展示如何运用Promise优化代码。

### 什么是Promise？

Promise是一种用于处理异步操作的对象，表示一个异步操作的最终完成或失败。Promise有三种状态：Pending（进行中）、Fulfilled（已成功）、Rejected（已失败）。一旦Promise的状态从Pending变为Fulfilled或Rejected，它就不会再改变。

### Promise的实现原理

Promise的实现原理涉及了一些JavaScript的核心概念，包括闭包、回调函数和事件循环。让我们逐步了解Promise的实现细节：

#### 1. 构造函数

首先，我们需要一个Promise构造函数，它接受一个函数作为参数，该函数有两个参数：resolve和reject。这个函数通常称为执行器函数。

```javascript
function Promise(executor) {
  // ...
}
```

#### 2. 状态管理

Promise需要管理自己的状态（Pending、Fulfilled、Rejected）。我们可以使用闭包来保存状态，并提供方法来改变状态。

```javascript
function Promise(executor) {
  let state = 'pending';
  let value = null;

  function resolve(result) {
    state = 'fulfilled';
    value = result;
  }

  function reject(error) {
    state = 'rejected';
    value = error;
  }
}
```

#### 3. then方法

Promise对象上有一个then方法，它接受两个回调函数作为参数，分别用于处理Promise状态变为Fulfilled和Rejected时的情况。

```javascript
function Promise(executor) {
  // ...

  this.then = function (onFulfilled, onRejected) {
    // ...
  };
}
```

#### 4. 异步操作

Promise需要支持异步操作，所以我们需要使用事件循环来处理异步任务，确保then方法中的回调在适当的时间执行。

```javascript
function Promise(executor) {
  // ...

  setTimeout(function () {
    // 执行executor函数
    executor(resolve, reject);
  }, 0);
}
```

#### 5. 处理链式调用

最后，我们需要处理链式调用。当then方法被调用时，它应该返回一个新的Promise对象，以支持链式调用。

```javascript
function Promise(executor) {
  // ...

  this.then = function (onFulfilled, onRejected) {
    // 返回新的Promise对象
    return new Promise(function (resolve, reject) {
      // ...
    });
  };
}
```

到这里就实现了Promise的基本轮廓。完整代码如下：

```javascript
function Promise(executor) {
  let state = 'pending';
  let value = null;

  function resolve(result) {
    if (state === 'pending') {
      state = 'fulfilled';
      value = result;
    }
  }

  function reject(error) {
    if (state === 'pending') {
      state = 'rejected';
      value = error;
    }
  }

  this.then = function (onFulfilled, onRejected) {
    if (state === 'fulfilled') {
      onFulfilled(value);
    } else if (state === 'rejected') {
      onRejected(value);
    }
  };

  // 执行executor函数
  executor(resolve, reject);
}

```

我们测试上面的方法：

```javascript
// 示例用法
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的结果');
    // 或者
    // reject('失败的原因');
  }, 1000);
});

myPromise.then(
  result => {
    console.log('成功：', result);
  },
  error => {
    console.error('失败：', error);
  }
);
```

#### 6.实现all方法

```javascript
function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError('参数必须是一个 Promise 数组'));
      return;
    }

    const results = new Array(promises.length);
    let completedPromises = 0;

    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = result;
          completedPromises++;

          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// 示例用法
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

PromiseAll([promise1, promise2, promise3])
  .then((results) => {
    console.log('全部成功：', results); // 输出 [1, 2, 3]
  })
  .catch((error) => {
    console.error('出错：', error);
  });

```

### 总结

Promise是一项强大的工具，它使异步编程更加清晰和可控。通过理解Promise状态和回调的概念，并掌握示例代码中的使用方式，我们可以更好地运用Promise来提升代码的可读性和性能。快来试试吧！

关注公众号「全栈小课堂」，海量教程免费领~
