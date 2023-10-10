---
layout: Article
title: let和const如何实现块级作用域
date: 2023/10/10
tags: JavaScript
category: 技术专栏
preview: /common/8.jpg
intro: 使用let 和 const 声明变量早已经习以为常了。笔者作为面试官面试过上百人，能准确理解let/const块级作用域以及的候选人不足一二。本文将深入研究 let 和 const 的实现原理，以及多种方式来模拟私有变量，希望本文能给初中级前端小伙伴们一点帮助。
---

# let和const如何实现块级作用域

>使用let 和 const 声明变量早已经习以为常了。笔者作为面试官面试过上百人，能准确理解let/const块级作用域以及的候选人不足一二。本文将深入研究 let 和 const 的实现原理，以及多种方式来模拟私有变量，希望本文能给初中级前端小伙伴们一点帮助。

## 一、`let` 和 `const` 的实现原理

### 1.1 JavaScript 的作用域链

在深入了解 `let` 和 `const` 前，让我们首先回顾一下 JavaScript 中的作用域。作用域是一个决定变量可见性和访问性的概念。JavaScript 具有两种主要的作用域：全局作用域和函数作用域。

全局作用域是整个程序的顶层作用域，其中声明的变量可以在程序的任何地方访问。函数作用域限定了变量的作用范围，只有在函数内部才能访问这些变量。

### 1.2 词法环境和变量对象

JavaScript 引擎使用词法环境来管理变量和函数的作用域。词法环境包括两个重要部分：词法环境记录和对外部词法环境的引用。

词法环境记录是一个内部数据结构，用于存储变量和函数声明。全局环境的词法环境记录包含全局变量和函数，而函数环境的词法环境记录包含局部变量和参数。

### 1.3 `let` 和 `const` 的块级作用域

ES6 引入了 `let` 和 `const`，它们引入了块级作用域的概念。块级作用域允许我们在 `{}` 内部创建独立的作用域，使得变量仅在该块内有效。

```javascript
if (true) {
  let x = 10;
  const y = 20;
}
console.log(x); // 报错：x is not defined
console.log(y); // 报错：y is not defined
```

在上面例子中，`x` 和 `y` 只在 `if` 语句块内可见，外部无法访问它们。

### 1.4 `let` 和 `const` 的临时死区

`let` 和 `const` 引入了“临时死区”（Temporal Dead Zone，TDZ）的概念。TDZ 是指在变量声明之前，变量无法被访问或赋值的状态。

```javascript
console.log(x); // 报错：Cannot access 'x' before initialization
let x = 10;
```

在上面例子中，由于 `x` 在声明之前被访问，触发了 TDZ，导致报错。

### 1.5 `const` 的不可变性

`const` 声明的变量是不可变的，一旦赋值后不能再重新赋值。但需要注意的是，对于引用类型的变量，虽然变量本身不可重新赋值，但其属性仍然可以修改。

```javascript
const pi = 3.14159;
pi = 3.14; // 报错：Assignment to constant variable.

const person = { name: 'John' };
person.name = 'Alice'; // 可行
```

在上面例子中，`pi` 由于是基本数据类型，不能被重新赋值。而 `person` 是一个对象，虽然不能重新赋值 `person`，但可以修改其属性。

## 二、模拟私有变量

### 2.1 闭包的基本原理

闭包是 js 中的一个概念，它允许函数访问其外部作用域的变量，即使外部作用域已经执行完毕。闭包通过将内部函数引用到外部函数的变量来实现。

```javascript
function createCounter() {
  let count = 0;

  // 内部函数 increment 闭包了外部函数 createCounter 的变量 count
  function increment() {
    count++;
    console.log(count);
  }

  return increment;
}

const counter = createCounter();
counter(); // 输出 1
counter(); // 输出 2
```

在上面例子中，`createCounter` 函数返回了一个内部函数 `increment`，该内部函数能够访问并修改外部函数的 `count` 变量。这就是闭包的基本原理。

### 2.2 使用函数闭包

通过函数闭包，我们可以封装变量并模拟实现私有变量的行为。我们可以创建一个函数，该函数包含了需要保护的变量，并返回用于访问和修改这些变量的方法。

```javascript
function createPrivateVariable(initialValue) {
  let value = initialValue;

  return {
    getValue: function () {
      return value;
    },
    setValue: function (newValue) {
      value = newValue;
    },
  };
}

const privateVar = createPrivateVariable(42);
console.log(privateVar.getValue()); // 输出 42
privateVar.setValue(100);
console.log(privateVar.getValue()); // 输出 100
```

在上面例子中，`createPrivateVariable` 函数返回了一个对象，该对象包含了两个方法 `getValue` 和 `setValue`，用于访问和修改私有变量 `value`。这样，我们成功地模拟出了一个私有变量的效果，外部无法直接访问或修改它。

### 2.3 模块模式

模块模式是一种常见的实现私有变量的方式，特别适用于大型应用程序的模块化设计。模块模式利用了函数作用域和闭包的特性，将私有变量和方法封装在一个函数内部，并返回一个包含公有方法的对象。

```javascript
const myModule = (function () {
  // 私有变量
  let privateVar = 0;

  // 私有方法
  function privateFunction() {
    // 可以访问 privateVar
    privateVar++;
  }

  // 公有方法
  return {
    increment: function () {
      privateFunction();
    },
    getValue: function () {
      return privateVar;
    },
  };
})();

myModule.increment();
console.log(myModule.getValue()); // 输出 1
```

在上面例子中，`myModule` 是一个立即执行函数，它创建了一个闭包，包含了私有变量 `privateVar` 和私有方法 `privateFunction`。然后，通过返回一个包含公有方法的对象，我们可以访问和操作私有变量，同时将其封装起来，不会受到外部的干扰。

### 2.4 ES6 中的 Symbol

ES6 引入了 Symbol 数据类型，它可以用于创建唯一的属性键，从而实现私有属性。每个 Symbol 值都是唯一的，不会与其他属性键冲突。

```javascript
const privateVariable = Symbol('privateVar');

const obj = {
  [privateVariable]: 42,
};

console.log(obj[privateVariable]); // 输出 42
```

在这个示例中，我们使用 Symbol 创建了一个私有属性键 `privateVariable`，然后将其作为对象的属性。这个私有属性对外部是不可见的，只能通过使用相同的 Symbol 才能访问。

## 三、总结

深入理解 js 的 `let` 和 `const` 变量声明以及模拟实现私有变量的方法，我们可以更好地掌握 JavaScript 的核心概念。
本文我们探讨了 js 的作用域、块级作用域、闭包、`let` 和 `const` 的行为，以及模拟私有变量的多种方式,希望能够帮助读者更好的理解js的核心概念。如果本文对你有帮助，记得点赞关注我哦~
