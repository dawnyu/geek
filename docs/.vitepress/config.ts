import { defineConfig } from 'vitepress';
import Unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import nav from './config/nav.js';
import sidebar from './config/sidebar.js'
import markdown from './config/markdown.js'
import { createAlgolia } from './config/setting.js';

export default defineConfig({
  base: '/geekbuluo/',
  outDir: './.vitepress/dist',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ],
  ],
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: true,
  description: '专注于分享最有价值的互联网技术干货',
  lang: 'zh-CN',
  markdown,
  themeConfig: {
    siteTitle: '极客部落',
    outline: 'deep',
    outlineTitle: '本文目录', // 右侧大纲标题文本配置
    lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
    docFooter: { prev: '上一篇', next: '下一篇' },
    // editLink: {
    //   pattern: `${github}/blob/main/docs/:path`,
    //   text: '在 GitHub 上编辑此页面'
    // },
    footer: {
      message: `网站地图 - 友情链接 - 版权说明 - 侵删联系 - 皖ICP备17005424号-2`,
      copyright: `CopyRight © 2020-2023 <a target="_blank" href="//geekbuluo.com">极客部落</a> All Rights Reserved`
    },
    // socialLinks: createSocialLinks(),
    algolia: createAlgolia(),

    nav,
    sidebar,
  },
  vite: {
    server: {
      port: 8000
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    },
    plugins: [
      Unocss(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },
  rewrites: {
    // 推荐书籍模块路径重写
    // 's/recommended-books/:a/:b.md': ':a/:b.md',
    // 's/recommended-books/:a/:b/:c.md': ':a/:c.md',

    // 其他模块路径重写
    's/书籍推荐/:b.md': ':b.md',
    's/书籍推荐/:b/:c.md': ':c.md',
    's/书籍推荐/:b/:c/:d.md': ':d.md',

    /** 面试题路径重写 */
    's/前端面试题/:a/:b.md': 'interview-question/:b.md',
    's/前端面试题/:a/:b/:c.md': 'interview-question/:c.md',
  }
});
