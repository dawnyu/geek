---
layout: Article
title: 纯CSS实现红丝带
head:
  - - meta
    - name: description
      content: CSS实现红丝带动效
  - - meta
    - name: keywords
      content: CSS实现动效,CSS酷炫效果,CSS红丝带效果
date: 2023/10/10
tags: CSS
category: 技术专栏
preview: https://cdn.geekbuluo.com/blog/20231010/ribbon_99lkjhbr0p.gif
intro: 在本文中，我们将探讨如何使用 CSS 以最少的代码来创造一条精美的 CSS 丝带,并最终实现下面这个效果：
---

# 纯CSS实现红丝带

## **前言**

在本文中，我们将探讨如何使用 CSS 以最少的代码来创造一条精美的 CSS 丝带,并最终实现下面这个效果：
![](https://cdn.geekbuluo.com/blog/20231010/ribbon_99lkjhbr0p.gif)

​下面通过html和css来实现这个效果，并且使用自适应布局方式，不用担心里面的文字长度。本文介绍两种丝带：左侧的丝带称为“折叠丝带”，右侧的丝带称为“旋转丝带”。
![](https://cdn.geekbuluo.com/blog/20231010/image_8q557qzljl.png)

## **通过CSS创建折叠丝带形状**

首先要实现折叠 CSS 丝带，先定义形状的变量。

```css
.ribbon {
  --r: 20px; /* 控制丝带的切割效果 */
  --s: 20px; /* 折叠部分的尺寸 */
  --c: #d81a14; /* 颜色控制 */
}

```

`--r`和`--s`这两个变量控制形状，`--c`控制颜色。

如果要在CSS中实现多边形，我们可以使用css的 `clip-path` 属性。我们提前在图形上添加一些填充内容避免文本被切割，然后使用`clip-path`：

```css
.ribbon {
  --r: 20px; /* 控制丝带的切割效果 */
  --s: 20px; /* 折叠部分的尺寸 */
  --c: #d81a14; /* 颜色控制 */

  line-height: 1.6; /* 控制高度 */
  padding-inline: 1.2lh calc(var(--r) + .2lh);
  background: var(--c);
  clip-path: polygon(1lh 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, 100% 100%, 0 100%, 0 100%);
}

```

### 使用 CSS lh 单位

很多同学可能不知道 `lh` 单位是什么，它是与 `line-height` 值相对应的新单位。由于这里使用了一行文本，所以设置 `line-height` 来控制元素的高度，因此 `1lh` 就等于元素的高度。所以在 `clip-path` 中，我们使用这个高度来切割等腰三角形的形状。如下图：

![](https://cdn.geekbuluo.com/blog/20231010/image3_k3hjj7jfu7.png)

接着我们需要创建折叠部分，需要使用 `clip-path` 更新上面的多边形。 `clip-path` 可以切割元素边界的外部区域，包括盒子阴影、轮廓、伪元素等。

在下面示例中，利用 `box-shadow` 配合`clip-path` 来实现切割。通过更新 `Xi` 和 `Yi` 来切割多边形的四个新点，其中三个点位于元素的外部区域。因为我们要切割的部分在外部，但是它是不可见的，这里我们添加了大的 `box-shadow` 让元素变得可见。代码如下：

```css
.ribbon {
  --r: 20px; /* 控制丝带的切割效果 */
  --s: 20px; /* 折叠部分的尺寸 */
  --c: #d81a14; /* 颜色控制 */

  line-height: 1.6; /* 控制高度 */
  padding-inline: 1.2lh calc(var(--r) + .2lh);
  background: var(--c);
  clip-path: polygon(1lh 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, 1lh 100%, 1lh calc(100% + var(--s)), .5lh calc(100% + var(--s) + var(--r)), 0 calc(100% + var(--s)), 0 100%);
  box-shadow: 0 0 0 999px var(--c); /* 较大的阴影扩散半径 */
}

```

最后通过引入渐变和另一个框阴影，就实现了阴影效果。到这里我们的 CSS 丝带形状已经成型了。

现在介绍如何创建第二种形状（绿色丝带）。这里使用相同的方法，用第一个多边形并将其反转一下。

这样写：

```css
clip-path: polygon(X1 Y1, X2 Y2, ..., Xn Yn)

```

要获得相反的形状，我们将所有 `Xi` 更改为 `100% - Xi`！在查看代码之前，大家尝试单独使用第一个形状的多边形来实现这一点。

在上面的动画中，当鼠标悬停在形状上时，可以看到漂亮的展开收起动画。为了实现这一点，需要通过偏移一些点来更新悬停时的多边形。这里不需要重新编写整个多边形，可以重新定义一个 CSS 变量来控制偏移。

如果大家关注动画部分，就会注意到有三个点向左移动，同时有三个点向下和向左移动。

![](https://cdn.geekbuluo.com/blog/20231010/image_9nbz64ea65.png)

修改 `Xi` 的点向左移动，修改 `Yi` 的点向下和向左移动来实现这一点。然后再修改 `d` 以控制这一运动：

```css
.ribbon {
  --d: 0px; /* 这将控制偏移量 */
  clip-path: polygon(calc(1lh + var(--d)) 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, calc(1lh + var(--d)) 100%, calc(1lh + var(--d)) calc(100% + var(--s) + var(--d)), calc(.5lh + var(--d)) calc(100% + var(--s) + var(--r) + var(--d)), var(--d) calc(100% + var(--s) + var(--d)), var(--d) 100%);
}
.ribbon:hover {
  --d: .2lh;
}

```

部分同学第一次看到这种多边形，可能会感到困惑，因为它看起来有些复杂。我们从一个简单的多边形开始，然后逐步添加更多点和计算，最终得到这个复杂的多边形。

## **创建旋转的 CSS 丝带形状**

现在让我们处理第二种形状。对于这种形状，我们将使用新的三角函数以及 CSS 变量和 `calc()`，方法与前一个形状类似。为了理解这个形状背后的逻辑，让我们旋转它并确保文本保持在一条直线上。

![](https://cdn.geekbuluo.com/blog/20231010/image1_q70zy2ug7l.png)

下面添加了一些透明度以查看主要元素背后的部分，然后使用伪元素来创建这些部分。这里添加了蓝色轮廓来说明元素的区域。该形状将由两个变量控制：

```css
.ribbon {
  --r: 30px;  /* 控制丝带的切割效果 */
  --a: 15deg; /* 控制旋转角度 */
}

```

其中 `r` 的作用与前一个形状相同。`a` 将控制主要元素的旋转。

下面我们从主要元素开始说。从图中我们可以看到，我们需要从每一面切割它，但是这次不能使用 `clip-path`，我们将使用渐变颜色，其中需要切割的部分需要使用透明的颜色：

```css
.ribbon {
  --r: 30px;  /* 控制丝带的切割效果 */
  --a: 15deg; /* 控制旋转角度 */

  background:
    linear-gradient(calc(90deg + var(--a)),
      #0000 calc(1lh*sin(var(--a))),
      var(--c) 0 calc(100% - 1lh*sin(var(--a))),
      #0000 0
    );
}

```

效果如图：

![](https://cdn.geekbuluo.com/blog/20231010/image2_o5kmev5rtn.png)

这里的高度等于 `1lh/cos(a)`。宽度等于 `(100% - x)*cos(a)`，其中 `100%` 是主要元素的宽度，`x` 是我们带有透明度的那一小部分，它等于 `1lh*tan(a)`。

两个伪元素具有相同的尺寸，代码如下：

```css
.ribbon:before,
.ribbon:after {
  content: "";
  position: absolute;
  height: calc(1lh/cos(var(--a)));
  width: calc(100%*cos(var(--a)) - 1lh*sin(var(--a)));
}

```

在确定尺寸后，我们需要正确定位每个伪元素，并对其进行旋转和切割：

```css
.ribbon:before,
.ribbon:after {
  content: "";
  position: absolute;
  transform: translate3d(0,0,-1px);
  rotate: var(--a);
  height: calc(1lh/cos(var(--a)));
  width: calc(100%*cos(var(--a)) - 1lh*sin(var(--a)));
  background: color-mix

(in srgb,var(--c),#000 40%);
}
h1:before {
  right: 0;
  top: 0;
  transform-origin: top right;
  clip-path: polygon(0 0,100% 0,100% 100%,0 100%,var(--r) 50%);
}
h1:after {
  left: 0;
  bottom: 0;
  transform-origin: bottom left;
  clip-path: polygon(0 0,100% 0,calc(100% - var(--r)) 50%,100% 100%,0 100%);
}

```

这里代码应该比较清晰易懂，`clip-path` 的值应该也容易理解。要注意的是，我们使用了 `color-mix()` 函数，这个属性允许创建主颜色的深色版本。现在如果我们将元素旋转相反的方向，就会得到旋转的 CSS 丝带形状。

## **完整代码**

```html
<h1>I am a ribbon</h1>
<h1 class="alt">I am a ribbon</h1>
```

```css
@property --a {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

h1 {
  --r: 30px;  /* control the cutout of the ribbon */
  --a: 15deg; /* control the rotation (only positive values) */
  --c: #d81a14;
  
  line-height: 1.6; /* this will control the height */
  padding-inline: .5lh; /* OR calc(tan(var(--a))*1.5lh) */
  color: #fff;
  background:
    linear-gradient(calc(90deg + var(--a)),
      #0000 calc(1lh*sin(var(--a)) - 1px),
      var(--c) calc(1lh*sin(var(--a))) calc(100% - 1lh*sin(var(--a))),
      #0000 calc(100% - 1lh*sin(var(--a)) + 1px)
    );
  position: relative;
  rotate: calc(-1*var(--a));
  transform-style: preserve-3d;
  transition: --a .5s;
  cursor: pointer;
  white-space: nowrap;
}
h1.alt {
  --c: #8FBE00;
  rotate: var(--a);
  background:
    linear-gradient(calc(90deg - var(--a)),
      #0000 calc(1lh*sin(var(--a)) - 1px),
      var(--c) calc(1lh*sin(var(--a))) calc(100% - 1lh*sin(var(--a))),
      #0000 calc(100% - 1lh*sin(var(--a)) + 1px)
    );
}
h1:before,
h1:after{
  content: "";
  position: absolute;
  transform: translate3d(0,0,-1px);
  rotate: var(--a);
  height: calc(1lh/cos(var(--a)));
  width: calc(100%*cos(var(--a)) - 1lh*sin(var(--a))) ;
  background: color-mix(in srgb,var(--c),#000 40%);
  pointer-events: none;
}
h1.alt:before,
h1.alt:after {
  rotate: calc(-1*var(--a));
}
h1:before {
  right: 0;
  top: 0;
  transform-origin: top right;
  clip-path: polygon(0 0,100% 0,100% 100%,0 100%,var(--r) 50%);
}
h1.alt:before {
  bottom: 0;
  top: auto;
  transform-origin: bottom right;
}
h1:after {
  left: 0;
  bottom: 0;
  transform-origin: bottom left;
  clip-path: polygon(0 0,100% 0,calc(100% - var(--r)) 50%,100% 100%,0 100%);
}
h1.alt:after {
  top: 0;
  bottom: auto;
  transform-origin: top left;
}

h1:hover {
  --a: 0deg;
}

/* we fallback to something else if lh is not supported
   1lh = 1.6em (the line-height value)
*/
@supports not (height:1lh) {
  h1 {
    padding-inline: .8em; 
    background:
      linear-gradient(calc(90deg + var(--a)),
        #0000 calc(1.6em*sin(var(--a)) - 1px),
        var(--c) calc(1.6em*sin(var(--a))) calc(100% - 1.6em*sin(var(--a))),
        #0000 calc(100% - 1.6em*sin(var(--a)) + 1px)
      );
  }
  h1.alt {
    background:
      linear-gradient(calc(90deg - var(--a)),
        #0000 calc(1.6em*sin(var(--a)) - 1px),
        var(--c) calc(1.6em*sin(var(--a))) calc(100% - 1.6em*sin(var(--a))),
        #0000 calc(100% - 1.6em*sin(var(--a)) + 1px)
      );
  }
  h1:before,
  h1:after{
    height: calc(1.6em/cos(var(--a)));
    width: calc(100%*cos(var(--a)) - 1.6em*sin(var(--a))) ;
  }
}


body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-content: center;
  grid-auto-flow: column;
  gap: 50px;
}

h1 {
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 2.5rem;
}
```
