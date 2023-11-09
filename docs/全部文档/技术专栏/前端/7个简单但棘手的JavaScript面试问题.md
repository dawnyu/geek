---
layout: Article
title: 7个简单但棘手的JavaScript面试问题
head:
  - - meta
    - name: description
      content: JavaScript面试问题
  - - meta
    - name: keywords
      content: 的JavaScript面试问题
date: 2023/10/27
tags: JavaScript
category: 技术专栏
intro: 7个简单但棘手的JavaScript面试问题
---

# 7个简单但棘手的JavaScript面试问题

## 1. 意外全局变量

**问题：** 在下面的代码中，我们想要分别输出变量 `a` 和 `b` 的类型：

```javascript
function foo() {
  let a = b = 0;
  a++;
  return a;
}
foo();
typeof a; // => ???
typeof b; // => ???
```

**分析：** 这段代码引发了一个常见的陷阱：意外创建的全局变量。在函数 `foo()` 中，我们声明了变量 `a`，但 `b` 并没有使用 `let` 或 `const` 进行声明。因此，`b` 变成了全局变量，而不是局部变量。

因此，`typeof a` 返回 `'undefined'`，因为变量 `a` 是 `foo()` 函数内的局部变量，而 `typeof b` 返回 `'number'`，因为变量 `b` 成为了全局变量。

## 2. 数组的 length 属性

**问题：** 下面的代码中，我们尝试清空一个数组 `clothes`，然后访问 `clothes[0]`。它的值会是什么？

```javascript
const clothes = ['jacket', 't-shirt'];
clothes.length = 0;
clothes[0]; // => ???
```

**分析：** 这个问题涉及到JavaScript中数组的 `length` 属性。当我们将数组的 `length` 设置为 `0` 时，实际上是在删除数组的所有元素。因此，`clothes[0]` 的值是 `undefined`，因为数组已被清空。

## 3. 鹰眼测试

**问题：** 下面的代码尝试在数组 `numbers` 中添加一些数字。`numbers` 的内容会是什么？

```javascript
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);
{
  numbers.push(i + 1);
}
numbers; // => ???
```

**分析：** 这个问题涉及到JavaScript中常见的`for`循环陷阱。在 `for` 循环的末尾存在一个意外的分号 `;`，导致循环体未执行。因此，`numbers` 数组将为空，其内容是 `[]`。

## 4. 自动分号插入

**问题：** 下面的函数 `arrayFromValue()` 接受一个参数，并将其放入数组中。它的返回值是什么？

```javascript
function arrayFromValue(item) {
  return
  [item];
}
arrayFromValue(10); // => ???
```

**分析：** 这个问题涉及到JavaScript中自动分号插入的行为。由于在 `return` 语句和数组 `[item]` 之间存在换行符，JavaScript会自动插入分号，将函数的返回值视为 `undefined`。因此，`arrayFromValue(10)` 的返回值是 `undefined`。

## 5. 经典问题:棘手的闭包

**问题：** 下面的代码尝试在一个`for`循环中使用闭包来记录不同的值。它将输出什么到控制台？

```javascript
let i;
for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  }
  setTimeout(log, 100);
}
```

**分析：** 这个问题涉及到JavaScript中的闭包和作用域。尽管我们可能期望输出是 `0`、`1` 和 `2`，但实际上它会输出 `3`、`3` 和 `3`。这是因为 `log` 函数是一个闭包，它捕获了变量 `i` 的最终值，而不是在每次迭代中的值。

## 6. 浮点数计算

**问题：** 下面的等式检查两个浮点数的相等性。它们相等吗？

```javascript
0.1 + 0.2 === 0.3 // => ???
```

**分析：** 这个问题涉及到JavaScript中浮点数的精度问题。尽管我们可能期望 `0.1 + 0.2` 等于 `0.3`，但实际上它返回 `false`。这是因为在二进制表示中，这些浮点数相加会产生舍入误差。

## 7. 变量提升

**问题：** 如果在变量声明前访问变量 `myVar` 和 `myConst`，会发生什么？

```javascript
myVar; // => ???
myConst; // => ???
var myVar = 'value';
const myConst = 3.14;
```

**分析：** 这个问题涉及到JavaScript中的变量提升和临时死区。在声明前访问 `myVar` 会返回 `undefined`，因为变量 `myVar` 在声明前已经提升，但尚未初始化。而在声明前访问 `myConst` 会引发 `ReferenceError`，因为 `const` 声明具有临时死区，直到声明行之后才能访问。