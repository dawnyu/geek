---
layout: Article
title: ES6模版字符串最全讲解
date: 2023/10/10
tags: JavaScript
category: 技术专栏
preview: /common/12.jpg
intro: 模板字符串（template strings）是JS一个非常有用并且强大的特性。模板字符串不仅可以让字符串拼接更加简洁，还支持一些高级的用法，本文和大家深入探讨模板字符串的高级用法，分享如何利用它实现更加优雅和强大的字符串操作。

---

# ES6模版字符串最全讲解

>模板字符串（template strings）是JS一个非常有用并且强大的特性。模板字符串不仅可以让字符串拼接更加简洁，还支持一些高级的用法，本文和大家深入探讨模板字符串的高级用法，分享如何利用它实现更加优雅和强大的字符串操作。

## 什么是模板字符串？

模板字符串是ES6引入的一种新的字符串表示方式。它使用反引号（`）来定义字符串，并支持插值表达式，使字符串拼接更加方便。以下是一个简单的模板字符串示例：

```javascript
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting); // 输出 "Hello, Alice!"
```

在上面的示例中，`${name}` 是一个插值表达式，它会在运行时被替换为变量 `name` 的值。这使得在字符串中嵌入变量变得轻而易举。

## 1. 多行字符串

传统的字符串表示方式要创建多行字符串通常需要使用换行符（`\n`），而模板字符串允许您直接编写多行字符串，使代码更加清晰：

```javascript
const multiLineString = `
  This is a
  multi-line
  string.
`;
console.log(multiLineString);
```

这使得文本块的创建变得更加自然，无需手动添加换行符。

## 2. 嵌套模板字符串

模板字符串可以嵌套在其他模板字符串内部，这样可以构建复杂的字符串结构。这在创建HTML模板或其他嵌套字符串时非常有用：

```javascript
const firstName = "John";
const lastName = "Doe";

const fullNameHTML = `
  <div>
    <p>First Name: ${firstName}</p>
    <p>Last Name: ${lastName}</p>
  </div>
`;

console.log(fullNameHTML);
```

## 3. 函数调用

模板字符串也可以作为函数的参数传递，这为字符串处理提供了更多的灵活性。您可以定义一个函数，接收模板字符串作为参数，并在函数内部处理字符串，例如格式化字符串或执行其他操作：

```javascript
function formatCurrency(strings, ...values) {
  let result = "";
  values.forEach((value, index) => {
    result += `${strings[index]}${value}`;
  });
  result += strings[strings.length - 1];
  return result;
}

const price = 19.99;
const discount = 0.2;

const formattedPrice = formatCurrency`Price: ${price} (20%)`;

console.log(formattedPrice); // 输出 "Price: 19.99 (20%)"
```

这个例子中，`formatCurrency` 函数接收一个模板字符串以及值，然后将它们组合成一个新的字符串。这种方式可以用于国际化、文本格式化等场景。

## 4. 原始模板字符串

除了默认的模板字符串处理方式，您还可以使用原始模板字符串（raw template strings）。原始模板字符串不会对转义字符进行转义处理，而是保留它们的原始形式。要使用原始模板字符串，只需在模板字符串前加上一个 `String.raw` 函数：

```javascript
const filePath = String.raw`C:\Users\John\Desktop\file.txt`;
console.log(filePath); // 输出 "C:\Users\John\Desktop\file.txt"
```

这在处理正则表达式、文件路径等需要保留转义字符的场景中非常有用。

## 5. 标签模板字符串

标签模板字符串是一种特殊的模板字符串，它允许您定义一个标签函数，该函数可以处理模板字符串的内容。标签函数会接收模板字符串的各个部分，并返回最终的字符串结果。这样我们就可以自定义字符串的生成方式。

```javascript
function customTag(strings, ...values) {
  let result = "";
  strings.forEach((string, index) => {
    result += string;
    if (index < values.length) {
      result += values[index];
    }
  });
  return result.toUpperCase();
}

const name = "Alice";
const age = 30;

const formattedString = customTag`Name: ${name}, Age: ${age}`;

console.log(formattedString); // 输出 "NAME: ALICE, AGE: 30"
```

在这个例子中，`customTag` 函数将模板字符串的内容合并为一个大写的字符串。这种方式可用于自定义文本处理或创建特定格式的字符串。

## 6.高级用法：标签函数

标签函数是一种强大的工具，它们允许您在模板字符串的每个部分上执行自定义操作。这些函数接收字符串部分和插值表达式的值，使您能够根据需要进行文本处理、格式化或执行其他操作。

以下是一个更复杂的示例，展示了标签函数的强大功能：

```javascript
function highlight(strings, ...values) {
  let result = "";
  strings.forEach((string, index) => {
    result += string;
    if (index < values.length) {
      result += `<span class="highlight">${values[index]}</span>`;
    }
  });
  return result;
}

const keyword = "JavaScript";
const description = "a versatile programming language";

const highlightedText = highlight`Learn ${keyword} - ${description} today!`;

console.log(highlightedText);
```

在这个示例中，`highlight` 标签函数将模板字符串的各个部分合并，并将 `${values[index]}` 部分用 `<span class="highlight">` 包装，以实现文本高亮效果。

## 7. 模板字符串的性能

与传统字符串拼接相比，模板字符串具有更好的性能，因为JS引擎可以在编译时对模板字符串进行优化，从而降低了运行时的开销。当需要频繁进行字符串拼接操作时，建议大家尽量使用模板字符串。

## 总结

模板字符串是JS中一个强大且灵活的特性，它不仅简化了字符串拼接，还支持多行字符串、插值表达式、原始模板字符串、标签函数等高级用法。合理的运用模板字符串，可以提高代码的可读性和维护性。
