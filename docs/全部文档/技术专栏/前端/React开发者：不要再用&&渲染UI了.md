---
layout: Article
title: React开发者：不要再用&&渲染UI了
head:
  - - meta
    - name: description
      content: react陷阱
  - - meta
    - name: keywords
      content: react陷阱,react渲染
date: 2023/10/27
tags: React
category: 技术专栏
intro: 首先我们来聊下React中可能引发UI错误问题。假设你需要从服务器端获取数据，然后以列表的形式展示它们。如果数据为空，你可能会尝试使用以下代码：
---


**React开发者：不要再用&&渲染UI了**

### 由`&&`引发错误

首先我们来聊下React中可能引发UI错误问题。假设你需要从服务器端获取数据，然后以列表的形式展示它们。如果数据为空，你可能会尝试使用以下代码：

```jsx
const App = () => {
  const [list, setList] = React.useState([]);
  const fetchList = () => {
    setTimeout(() => {
      setList([]);
    }, 1000);
  };

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    list.length && (
      <div className="name-list-container">
        {list.map((name) => {
          return <div className="name-list-item">{name}</div>;
        })}
      </div>
    )
  );
};
```

你期望当`list`为空数组时，不会渲染任何内容，但实际上，页面会显示一个0。对很多初级开发者来说，这可能会有点摸不着头脑，接下来我们分析下为何会出现这个情况。

### `&&`操作符

首先我们要知道，这不是React本身的问题，而是涉及到JavaScript的工作原理。`&&`是逻辑与（logical AND）操作符，只有在所有操作数都为`true`时才会返回`true`，否则返回`false`。

### 正确的解决方法

为了避免这个问题，我们应该使用条件渲染。以下是正确处理上述情况的代码示例：

```jsx
const App = () => {
  const [list, setList] = React.useState([]);
  const fetchList = () => {
    setTimeout(() => {
      setList([]);
    }, 1000);
  };

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="name-list-container">
      {list.length ? (
        list.map((name) => {
          return <div className="name-list-item">{name}</div>;
        })
      ) : (
        <div>No names to display</div>
      )}
    </div>
  );
};
```

这个修改后的代码使用了条件渲染，当`list`为空时，将显示一条消息，而不是渲染0。这样你可以确保UI行为符合你的预期，不再担心`&&`操作符引发的问题。	
