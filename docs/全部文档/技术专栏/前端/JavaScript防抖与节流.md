---
layout: Article
title: JavaScript防抖与节流
date: 2023/10/01
tags: JavaScript
category: 技术专栏
preview: /common/13.jpg
intro: 在前端开发中，性能优化是至关重要的。在处理用户输入、滚动事件、表单提交以及其他频繁触发的操作时，防抖和节流是两个常用的技术，用来减少不必要的资源消耗和提高用户体验。

---

# JavaScript防抖与节流

**引言：**

在前端开发中，性能优化是至关重要的。在处理用户输入、滚动事件、表单提交以及其他频繁触发的操作时，防抖和节流是两个常用的技术，用来减少不必要的资源消耗和提高用户体验。

**什么是防抖和节流？**

- **防抖**：它限制了一个函数在连续触发事件后的执行次数。如果在一段时间内多次触发同一事件，只有最后一次触发后，函数才会执行。也就是说如果用户连续快速点击按钮，只有最后一次点击会触发事件。

- **节流**：它确保一个函数在一定时间内只能执行一次。无论事件触发多频繁，都会按照设定的时间间隔执行函数。这对于滚动事件或输入框实时搜索等情况非常有用。

**防抖的实验原理：**

防抖的原理很简单。当事件被触发时，启动一个定时器，在指定的延迟时间后执行函数。如果在这段时间内再次触发事件，将清除前一个定时器并重新启动。这样，只有当事件停止触发一段时间后，函数才会执行。

**适用场景：**

- 按钮点击事件，防止用户多次快速点击。
- 窗口大小调整事件，以优化性能。
- 输入框输入事件，用于实时搜索建议。

**防抖例子：**

```javascript
function debounce(func, delay) {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// 用法示例：
const debouncedFn = debounce(() => {
  // 处理逻辑
}, 300);

// 绑定到按钮点击事件
document.getElementById('myButton').addEventListener('click', debouncedFn);
```

**节流的实验原理：**

节流的原理与防抖类似，但有一个关键区别：无论事件频率多高，函数都会按照指定的时间间隔执行。如果在执行期间再次触发事件，将被忽略，直到时间间隔结束。

**适用场景：**

- 滚动事件，以减少滚动时的事件处理次数。
- 鼠标移动事件，以减少鼠标移动时的资源消耗。
- 实时数据更新，以限制频繁更新。

**节流的JavaScript编码实现：**

```javascript
function throttle(func, delay) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    const context = this;
    const args = arguments;
    func.apply(context, args);
    setTimeout(() => {
      canRun = true;
    }, delay);
  };
}

// 用法示例：
const throttledFn = throttle(() => {
  // 处理逻辑
}, 300);

// 绑定到滚动事件
window.addEventListener('scroll', throttledFn);
```

**结论：**

防抖和节流是两种用来优化前端性能的重要技术。可以有效地优化代码性能，提高用户界面的流畅度。当然在实际开发中，要根据具体的应用场景选择合适的防抖或节流策略，以确保代码的最佳性能。
