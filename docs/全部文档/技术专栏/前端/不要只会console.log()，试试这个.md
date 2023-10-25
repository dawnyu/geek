---
​---
layout: Article
title: 不要只会console.log()，试试这个
head:
  - - meta
    - name: description
      content: console的多种用法
  - - meta
    - name: keywords
      content: console.time怎么用
date: 2023/10/25
tags: JavaScript
category: 技术专栏
intro: 无论你是前端刚入门还是经验丰富的老鸟，debug调试都是日常编程中必备的技能。你可能在代码中已经习惯使用console.log()和debugger，但是我要说，前端真的只有这俩货，我还有一些其他的调试技巧，这些技巧可以使我们的调试过程更加高效和有趣。

​---
---


# 不要只会console.log()，试试这个

无论你是前端刚入门还是经验丰富的老鸟，debug调试都是日常编程中必备的技能。你可能在代码中已经习惯使用`console.log()`和`debugger`，但是我要说，前端真的只有这俩货，我还有一些其他的调试技巧，这些技巧可以使我们的调试过程更加高效和有趣。

###  `console.log()` 的替代品

#### 1. `console.warn()` 和 `console.error()`

当你的代码有很多log输出，会让控制台消息非常混乱，很难快速定位到有效输出。这时候可以尝试使用`console.warn()`和`console.error()`。这样控制台可以更清晰地识别警告和错误信息。

```javascript
console.warn("这是一个警告");
console.error("这是一个错误");
```

#### 2. 计时操作：`console.time()` 和 `console.timeEnd()`

如果你想知道某段代码的执行时间，可以试下`console.time()`和`console.timeEnd()`。创建一个计时器，运行你想要测量的代码，然后停止计时并查看结果。

```javascript
console.time("循环计时器");
for (let i = 0; i < 10000; i++) {
    // 在这里放置你的代码
}
console.timeEnd("循环计时器");
```

![](https://cdn.geekbuluo.com/blog/20231025/331892.png)

这对于那些需要较长执行时间的CPU密集型应用程序非常有用，比如神经网络或HTML Canvas的操作。

#### 3. 跟踪代码调用链：`console.trace()`

如果你想弄清楚一个函数是如何被调用的，可以使用`console.trace()`。这个方法将显示函数的调用链，帮助你理解代码执行的路径。

```javascript
function trace() {
    console.trace();
}

function randomFunction() {
    trace();
}

randomFunction();
```

![](https://cdn.geekbuluo.com/blog/20231025/82b433.png)

### 整理控制台消息

控制台中的消息有时会让人眼花缭乱，这使得调试变得更加复杂。你可以使用分组控制台消息来提高可读性。

```javascript
console.log("消息1");

console.group("我的消息组");

console.log("消息2");
console.log("消息3");

console.groupEnd();
```

![](https://cdn.geekbuluo.com/blog/20231025/09a33b.png)

### 清空控制台

当控制台充满了大量消息时，使用`console.clear()`可以让控制台一片清爽，有助于更清晰地进行调试。

```javascript
console.clear();
```

### 数据可视化：使用表格

在某些情况下，你可能需要以更可视化的方式呈现数据，而不仅是文本输出。`console.table()`可以帮助你以表格的形式显示数据，使其更容易理解。

```javascript
const person1 = { name: "Weirdo", age: "-23", hobby: "singing" };
const person2 = { name: "SomeName", age: "Infinity", hobby: "programming" };

console.table({ person1, person2 });
```

![](https://cdn.geekbuluo.com/blog/20231025/7de95e.png)

### 控制台中的CSS？

没错，你甚至可以在控制台中应用CSS样式，让你的控制台消息看起来更漂亮和有吸引力。

```javascript
console.log("%c HelloWrold！", "color: red; background-color: lightblue; border: solid");
```

![](https://cdn.geekbuluo.com/blog/20231025/e1c401.png)

本文旨在向你展示更高级的JavaScript调试技巧，让你的调试过程更加有趣和高效。

### 参考资源

- [Window Console Object (w3schools.com)](https://www.w3schools.com/jsref/obj_console.asp)
