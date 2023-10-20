---
layout: Article
title: 浅析requestAnimationFrame的用法与优化
head:
  - - meta
    - name: description
      content: requestAnimationFrame的常见用法与优化
  - - meta
    - name: keywords
      content: requestAnimationFrame是什么,requestAnimationFrame怎么优化
date: 2023/10/20
tags: JavaScript
category: 技术专栏
intro: requestAnimationFrame是浏览器用于定时循环操作的一个API,通常用于动画和游戏开发。它会把每一帧中的所有DOM操作集中起来,在重绘之前一次性更新,并且关联到浏览器的重绘操作。
---

# 浅析requestAnimationFrame的用法与优化

## 介绍

### 什么是requestAnimationFrame

`requestAnimationFrame`是浏览器用于定时循环操作的一个API,通常用于动画和游戏开发。它会把每一帧中的所有DOM操作集中起来,在重绘之前一次性更新,并且关联到浏览器的重绘操作。

### 为什么使用requestAnimationFrame而不是setTimeout或setInterval

与`setTimeout`或`setInterval`相比,`requestAnimationFrame`具有以下优势:

- 通过系统时间间隔来调用回调函数，无需担心系统负载和阻塞问题，系统会自动调整回调频率。
- 由浏览器内部进行调度和优化，性能更高，消耗的CPU和GPU资源更少。
- 避免帧丢失现象，确保回调连续执行，实现更流畅的动画效果。
- 自动合并多个回调，避免不必要的开销。
- 与浏览器的刷新同步，不会在浏览器页面不可见时执行回调。

### requestAnimationFrame的优势和适用场景

`requestAnimationFrame`最适用于需要连续高频执行的动画,如游戏开发,数据可视化动画等。它与浏览器刷新周期保持一致,不会因为间隔时间不均匀而导致动画卡顿。

## 使用方法

### requestAnimationFrame的基本语法

`requestAnimationFrame`接收一个回调函数作为参数,该回调函数会在浏览器下一次重绘前执行。

```
const animation = () => {
  // 执行动画
  requestAnimationFrame(animation); 
}

requestAnimationFrame(animation); 
```

上面代码会不停调用`requestAnimationFrame`,在每次浏览器重绘前执行回调函数,实现连续动画效果。

### 如何在动画中使用requestAnimationFrame

可以在回调函数里更新动画的状态,然后清除上一帧,绘制新状态的这一帧:

```
let angle = 0; 

const render = () => {
  ctx.clearRect(0, 0, width, height); // 清除上一帧

  // 更新状态
  angle += delta;
  
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, angle); 
  ctx.stroke();

  requestAnimationFrame(render);
}
```

这样通过在每次回调中更新参数,就可以实现对象的连续动画了。

### requestAnimationFrame的回调函数参数

`requestAnimationFrame`的回调函数会收到一个参数,这个参数是一个时间戳,单位为毫秒,代表`requestAnimationFrame`被触发的时间。可以根据这个时间戳计算两帧的时间间隔,来调整动画速度。

```
let prevTimestamp;
const render = timestamp => {
  if (!prevTimestamp) prevTimestamp = timestamp;
  const delta = timestamp - prevTimestamp;

  // 根据时间间隔计算速度
  x += speed * delta;

  prevTimestamp = timestamp;
  requestAnimationFrame(render);
}
```

## 性能优化

### 避免在requestAnimationFrame回调函数中进行大量计算

由于`requestAnimationFrame`的回调会在一个高优先级的线程中被同步执行,如果回调函数中有大量计算,会导致此线程被阻塞,从而引起页面卡顿。

也就是如果 `requestAnimationFrame` 的回调函数执行时间超过一帧（通常是 16.67 毫秒，因为浏览器通常以每秒约 60 帧的速度刷新），则可能会导致动画性能下降，可能出现掉帧的情况，最终影响用户体验。这是因为浏览器每帧的时间是有限的，如果回调函数执行时间过长，就会导致下一帧的准备和绘制时间受到压缩，导致动画卡顿。

通常，应该尽量避免在 `requestAnimationFrame` 的回调函数中执行耗时的操作。为了解决这个问题，可以采取以下一些策略：

1. **优化回调函数**: 使回调函数尽可能简短，避免不必要的计算或循环。在回调中只执行与动画相关的必要操作。

2. **分帧处理**: 如果动画需要处理大量数据或计算复杂的操作，可以将这些操作分散到多个 `requestAnimationFrame` 回调中，以避免长时间的占用。

3. **Web Workers**: 将耗时的计算放在独立的 Web Worker 线程中执行，以不影响主线程和动画渲染。

4. **帧率控制**: 如果回调函数耗时较长，可以根据回调函数的实际执行时间来控制动画的帧率。减小动画对象的速度或者减少渲染质量，以适应当前性能。

5. **监测性能**: 使用浏览器开发者工具来监测性能，以找出哪些操作导致了回调函数执行时间过长。

总之，确保 `requestAnimationFrame` 回调函数的执行时间尽量短，以确保动画的流畅性和性能。

### 使用硬件加速优化动画性能

启用`GPU`加速渲染,可以显著提升动画性能。

```
.animated {
  transform: translateZ(0); /* 开启硬件加速 */  
}
```

### 如何在不同设备上实现平滑的动画效果

可根据`requestAnimationFrame`回调的时间戳,计算这一帧与上一帧的间隔时间`delta`,并根据`delta`的值采取不同的优化手段:

- `delta`特别小,说明这一帧花费时间过长,可能导致掉帧,可以降低动画对象的移动速度或图像质量
- `delta`逐渐变大,说明动画逐渐卡顿,可以降低动画对象数量或复杂度
- `delta`波动较大,说明系统资源不足,可以采用简单的动画作为降级策略

## 与其他动画库的比较

### requestAnimationFrame与setTimeout/setInterval的区别

- `setTimeout/setInterval`是固定时间间隔触发, `requestAnimationFrame`依赖系统刷新调度
- `setTimeout/setInterval`会无视页面是否可见, `requestAnimationFrame`会停止刷新
- `setTimeout/setInterval`难以避免丢帧问题,`requestAnimationFrame`与刷新同步避免丢帧

### requestAnimationFrame与CSS动画的结合使用

`requestAnimationFrame`可用于更新动画状态,实现复杂动画逻辑,而CSS动画用于声明式定义动画的样式变化,两者可配合实现更丰富的动画效果。

## 实际应用

### 使用requestAnimationFrame实现常见动画效果

可使用 `requestAnimationFrame` 实现对象轨迹动画、SVG图形动画、加载动画等效果。

```
// 小球拖尾效果
const positions = [];

const render = () => {
  // 添加新位置
  positions.push({x, y});

  if (positions.length > 10){
    positions.shift(); 
  }

  // 渲染小球
  ctx.clearRect(0, 0, width, height);
  positions.forEach(pos => ctx.fillRect(pos.x, pos.y, 10, 10));

  requestAnimationFrame(render);
}
// SVG绘制动画
let length = 0;

const render = () => {
  length += 4;

  svgLine.setAttribute("stroke-dasharray", length);

  if (length < 300) {
    requestAnimationFrame(render);
  }
}

requestAnimationFrame(render); 
// 进度条加载动画  
let progress = 0;

const render = () => {
  progress += 1; 
  loadBar.style.width = progress + '%';

  if(progress < 100) {
    requestAnimationFrame(render);
  }
}

requestAnimationFrame(render);
```

### requestAnimationFrame在游戏开发中的应用

游戏需要非常流畅的画面和实时的响应,这正是`requestAnimationFrame`的优势,它可用于实现游戏中的物体移动、碰撞检测、帧数控制等操作。

```
// 飞机射击动画
const update = () => {
  // 子弹位置更新
  bullets.forEach(bullet => {
    bullet.position += speed;
  })

  // 飞机位置更新
  aircraft.position += delta * speed;

  // 绘制所有元素
  render(bullets, aircraft);
  
  requestAnimationFrame(update);
}
```

### requestAnimationFrame在响应式设计中的应用

可使用`requestAnimationFrame`来更平滑地执行响应式布局的变化,避免布局突然大幅移动带来的视觉冲击感。

```
let width = 500;

const resize = () => {
  width = container.clientWidth;

  box.style.width = width + "px";

  requestAnimationFrame(resize);
}

window.addEventListener("resize", resize);
```

## 兼容性和后续发展

### requestAnimationFrame的浏览器兼容性

`requestAnimationFrame`现在已经得到了广泛支持,可以直接使用。对于不支持的浏览器,可以用`setTimeout`模拟`requestAnimationFrame`。

```
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               (cb => setTimeout(cb, 1000/60));
```

### requestAnimationFrame的未来发展趋势

未来`requestAnimationFrame`可能会支持设置帧率、增强调度算法等,提升动画性能。Web工作者线程也可带来更多优化空间。

浏览器厂商也在继续改进相关API,比如`setTimeout`和`requestIdleCallback`也在朝着更精确的调度方向发展。

### 如何在不支持requestAnimationFrame的浏览器中实现类似效果

可以通过自己实现一个`polyfill`:

```
window.requestAnimationFrame = window.requestAnimationFrame || 
                               window.webkitRequestAnimationFrame ||
                               (cb => setTimeout(cb, 1000/60));
```

这样就可以在大多数浏览器中使用 `requestAnimationFrame` 了。对于老旧浏览器，可以使用 `setInterval` 模拟，但效果会比较粗糙。

## 总结

`requestAnimationFrame`是实现复杂动画的好帮手,必须掌握其用法与优化技巧,才能发挥其最大效用。同时结合其他技术如CSS动画、Web Worker等也可以实现更好的性能。随着浏览器的不断进步,`requestAnimationFrame`还具有很大的拓展潜力。

![wechat](/public/wechat.png)