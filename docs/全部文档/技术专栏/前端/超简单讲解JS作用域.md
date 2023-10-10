---
layout: Article
title: 超简单讲解JS作用域
date: 2023/10/10
tags: JavaScript
category: 技术专栏
preview: /common/57.jpg
intro: JavaScript的作用域是一个非常基础且重要的概念，对于初学者来说，经常会觉得有些混乱搞不清楚。本文会详细介绍JavaScript作用域，包括全局作用域、函数作用域和块级作用域，以及ES6+新增的`let`、`const`和`block scope`等特性，让你彻底搞懂作用域。
---

# 超简单讲解JS作用域

JavaScript的作用域是一个非常基础且重要的概念，对于初学者来说，经常会觉得有些混乱搞不清楚。本文会详细介绍JavaScript作用域，包括全局作用域、函数作用域和块级作用域，以及ES6+新增的`let`、`const`和`block scope`等特性，让你彻底搞懂作用域。

## 1. JavaScript作用域简介

在JavaScript中，作用域是指在代码中定义变量的区域。这个区域定义了变量的可见性和生命周期。JavaScript有两种主要的作用域类型：全局作用域和函数作用域。

```javascript
var globalVar = "I'm global!"; // 全局作用域

function someFunction() {
  var functionVar = "I'm local!"; // 函数作用域
  console.log(globalVar); // 可以访问全局变量
  console.log(functionVar); // 可以访问函数内的变量
}

console.log(globalVar); // 可以访问全局变量
console.log(functionVar); // 报错，不能访问函数内的变量
```

## 2. 全局作用域

在代码的任何地方都能访问到的变量被定义在全局作用域。在浏览器环境中，全局变量被定义在`window`对象上。

## 3. 函数作用域

在函数内部定义的变量只能在函数内部访问，这就是函数作用域。这意味着，如果你在一个函数内部定义了一个变量，那么这个变量在函数外部是不可见的。

## 4. ES6+ 块级作用域

ES6引入了两种新的声明方式：`let`和`const`，它们与`var`相比，最大的区别就是它们具有块级作用域。块级作用域是指变量在最近的`{}`代码块内有效。

```javascript
if (true) {
  var varVar = "I'm var!"; // 函数作用域
  let letVar = "I'm let!"; // 块级作用域
  const constVar = "I'm const!"; // 块级作用域
}

console.log(varVar); // 输出 "I'm var!"
console.log(letVar); // 报错，letVar未定义
console.log(constVar); // 报错，constVar未定义
```

## 5. `let`和`const`

`let`和`const`都是块级作用域，它们的作用范围被限制在最近的一对花括号`{}`内。`let`允许你重新赋值，而`const`定义的是一个常量，一旦赋值就不能改变。

```javascript
let letVar = "I'm let!";
letVar = "I've changed!"; // 没有问题

const constVar = "I'm const!";
constVar = "I'm trying to change!"; // 报错，不能改变const变量的值
```

## 6. 作用域链

当你在一个函数内部尝试访问一个变量时，JavaScript会首先在当前的作用域查找。如果没有找到，它会去外层的作用域查找，直到找到为止。这就是作用域链。

```javascript
var outerVar = "I'm outer!";

function innerFunction() {
  console.log(outerVar); // 输出 "I'm outer!"
}

innerFunction();
```

## 7. 闭包

闭包是JavaScript中一个重要的概念。当一个函数能够记住并访问所在的词法作用域，即使该函数在词法作用域外部执行，这就产生了闭包。

```javascript
functionouterFunction() {
  var outerVar = "I'm outer!";
  function innerFunction() {
    console.log(outerVar); // 输出 "I'm outer!"
  }
  return innerFunction;
}

var myFunction = outerFunction();
myFunction(); // 即使在outerFunction()执行完后，innerFunction()仍然可以访问outerVar，这就是闭包
```

## 8. 作用域深度解读

理解了JavaScript作用域的基础后，我们通过一些小栗子来巩固下这个概念。

### 练习1：变量提升

考虑以下代码，试着预测输出结果，并解释原因。

```javascript
var name = "John";

function sayName() {
  console.log(name);
  var name = "Jane";
  console.log(name);
}

sayName();
```

输出结果为：

```
undefined
Jane
```

这是因为JavaScript存在变量提升（hoisting）的机制，`var name = "Jane";`会被提升到`sayName`函数的顶部，但只提升变量名，不提升赋值操作。所以第一个`console.log(name);`打印出的是`undefined`。

### 练习2：使用闭包创建私有变量

闭包可以用来创建私有变量，从而实现封装和数据隐藏。思考下如何使用闭包来创建私有变量。

```javascript
function createCounter() {
  var count = 0;
  return function() {
    return ++count;
  };
}

var counter = createCounter();
console.log(counter()); // 输出1
console.log(counter()); // 输出2
```

在这个例子中，`count`就是一个私有变量。外部无法直接访问`count`，只能通过`counter`函数来操作。

## 9. 应用在异步编程中

在异步编程中，作用域起着非常重要的作用。现在考虑下面代码：

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

这段代码的输出会让很多初学者感到意外，它会打印出五个5，而不是0到4。这是因为`setTimeout`中的回调函数是在循环结束后才执行的，而此时的`i`已经变成了5。

如果我们想要打印出0到4，我们可以使用`let`来创建块级作用域：

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

或者我们也可以使用闭包来创建一个新的作用域：

```javascript
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  })(i);
}
```

## 10. 总结

理解作用域对于编写可维护的代码非常重要。希望本文能帮助你理解全局作用域、函数作用域、块级作用域`let`、`const`及闭包等重要概念。
