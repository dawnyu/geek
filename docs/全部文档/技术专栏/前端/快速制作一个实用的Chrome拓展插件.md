---
layout: Article
title: 快速制作一个实用的Chrome拓展插件
date: 2023/10/10
tags: 插件
category: 技术专栏
preview: /common/1.jpg
intro: Chrome插件是一种用于Chrome浏览器的小型软件程序，可以增强浏览器的功能，提供额外的功能和工具，以满足用户的特定需求，本文将详细演示如何构建一个生成二维码的推展程序，让0基础的小白也能10分钟制作一个属于自己的Chrome插件应用。

---

# 快速制作一个实用的Chrome拓展插件

> Chrome插件是一种用于Chrome浏览器的小型软件程序，可以增强浏览器的功能，提供额外的功能和工具，以满足用户的特定需求，本文将详细演示如何构建一个生成二维码的推展程序，让0基础的小白也能10分钟制作一个属于自己的Chrome插件应用。

## 步骤1：准备工作

必要条件：安装chrome浏览器，代码编辑器随意。

### 创建项目根目录

在您的工作目录中创建一个新文件夹，命名为`my-chrome-extension`，并在其中创建以下文件和文件夹：

- `manifest.json`：插件清单文件，用于定义插件的基本信息和权限。
- `index.html`：弹出式页面的HTML文件
- `index.js`：弹出式页面的JavaScript文件
- `qrcode.js`：一个在浏览器生成二维码的库：[直接打开](https://cdn.bootcdn.net/ajax/libs/qrcodejs/1.0.0/qrcode.min.js)复制到qrcode.js文件即可
- `icon.png`：插件图标 随便搞个小图标

## 步骤2：创建插件清单

在`manifest.json`文件中定义插件的基本信息和权限。以下是一个示例`manifest.json`文件：

```json
{
  "manifest_version": 3,
  "name": "生成二维码",
  "version": "1.0",
  "description": "一个生成二维码的浏览器插件",
  "permissions": [
    "activeTab"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    }
  },
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "browser_action": {
    "default_title": "点击生产二维码"
  }
}
```

在这个清单中，我们定义了插件的名称、版本、描述、所需的权限以及弹出式页面的配置。

## 步骤3：创建弹出式页面

弹出式页面是插件的用户界面。在`index.html`中，创建一个简单的HTML页面：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>二维码生成工具</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="qrcode.js"></script>
    <script src="index.js"></script>
  </head>
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 210px;
    }
    .textarea {
      width: 200px;
      padding: 5px;
      border: 1px solid #ccc;
    }
    #qrcode {
      margin: 20px 0;
    }
    .button {
      width: 210px;
      text-align: center;
      color: white;
      background-color: #04aa6d !important;
      border-radius: 6px;
      font-size: 16px;
      padding: 6px 0px;
      cursor: pointer;
    }
  </style>
  <body>
    <div class="container">
      <textarea
        class="textarea"
        rows="3"
        placeholder="输入内容生成二维码"
        id="text"
      ></textarea>
      <div id="qrcode"></div>
      <div class="button" id="clickMe">生成二维码</div>
    </div>
  </body>
</html>
```

然后，在`index.js`中，添加下面js代码：

```javascript
document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("clickMe");
  button.addEventListener("click", function () {
     const el = document.getElementById("qrcode");
     const text = document.getElementById("text").value;
     el.innerHTML = "";
     if (!text) {
      alert('请输入内容');
      return;
     }
     
     return new QRCode(el, {
       text,
       width: 150,
       height: 150,
       colorDark: "#000000",
       colorLight: "#ffffff",
       correctLevel: QRCode.CorrectLevel.H,
     });
  });
});
```

## 步骤4：加载插件

现在我们需要将插件加载到Chrome浏览器中进行测试。

1. 打开Chrome浏览器，浏览器输入`chrome://extensions/`跳转到插件拓展页面。

2. 在右上角启用“开发者模式”。

3. 点击“加载已解压的扩展”，然后选择您的`my-chrome-extension`文件夹。

4. 插件图标已经出现在Chrome工具栏中了。

## 步骤5：测试插件

现在点击插件图标来测试插件，点击后弹出输入框，我们输入“你真棒”看看效果：

![](https://files.mdnice.com/user/1107/a330da70-7958-4a33-b774-1624b25f9c8b.png)

现在拿出手机随便扫一下验证一下

## 步骤6：打包插件

最后要把插件发布到Chrome Web Store，您需要将插件打包成一个CRX文件。在项目根目录中创建一个文件夹，并将插件文件复制到其中，然后执行以下步骤：

1. 在`my-chrome-extension`文件夹中创建一个文件夹，命名为`packaged`。

2. 打开Chrome浏览器，转到`chrome://extensions/`。

3. 点击插件左侧的“详细信息”按钮。
![](https://files.mdnice.com/user/1107/159bba11-a96a-49a0-b31c-324c8d90d217.png)

4. 在详细信息页面的顶部，启用“开发者模式”。

5. 点击“打包扩展程序”。
![](https://files.mdnice.com/user/1107/331f855a-6d82-49d9-a943-bf9cca0021af.png)

6. 在弹出窗口中，选择`my-chrome-extension`文件夹作为根目录，并选择输出目录为`my-chrome-extension/packaged`。

7. 点击“打包扩展程序”。

8. 插件的CRX文件将生成在`my-chrome-extension/packaged`文件夹中。

## 步骤7：发布插件

要将插件发布到Chrome Web Store，需要注册Google开发者帐户并`5美刀的注册费`（真坑）。您可以在[Chrome Web Store开发者控制台](https://chrome.google.com/webstore/developer/dashboard)上创建新项目并上传CRX文件，如果开发的插件自用的话，就放本地文件夹也是可以的。

插件发布之后，其他用户就可以在Chrome应用商店中找到你的插件。

## 总结

至此，我们已经成功构建并发布了一个二位生产二维码的Chrome插件！当然，这只是一个入门示例，Chrome插件可以实现更复杂的功能和交互，您可以根据自己的需求进一步扩展插件。
