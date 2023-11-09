import { defineConfig } from 'vitepress';
import Unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import nav from './config/nav.js';
import sidebar from './config/sidebar.js'
import markdown from './config/markdown.js'
import { createAlgolia } from './config/setting.js';

export default defineConfig({
  base: '/',
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
    ['script', {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?97bef4a5f23e8d6596d413bbf5c4cc4e";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })()`
    ],
  ],
  lastUpdated: true,
  useWebFonts: false,
  cleanUrls: false,
  title: '极客部落',
  description: '专注于分享最有价值的互联网技术干货',
  lang: 'zh-CN',
  markdown,
  sitemap: {
    hostname: 'https://geekbuluo.com'
  },
  themeConfig: {
    siteTitle: '极客部落',
    outline: 'deep',
    outlineTitle: '本文目录', // 右侧大纲标题文本配置
    lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
    docFooter: { prev: '上一篇', next: '下一篇' },
    // editLink: {
    //   pattern: `${github}/blob/main/doc全部文档/:path`,
    //   text: '在 GitHub 上编辑此页面'
    // },
    footer: {
      message: `网站地图 - 友情链接 - 版权说明 - 侵删联系 - <a target="_blank" href="https://beian.miit.gov.cn/">皖ICP备17005424号-2</a>`,
      copyright: `CopyRight © 2020-2023 <a target="_blank" href="//geekbuluo.com">极客部落</a> All Rights Reserved`
    },
    // socialLinks: createSocialLinks(),
    // algolia: createAlgolia(),

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
    // '全部文档/recommended-book全部文档/:a/:b.md': ':a/:b.md',
    // '全部文档/recommended-book全部文档/:a/:b/:c.md': ':a/:c.md',



    /** 面试题路径重写 */
    '全部文档/前端面试题/:a/:b.md': `interview-question/:b.md`,
    '全部文档/前端面试题/:a/:b/:c.md': `interview-question/:c.md`,

    /** 书籍推荐 */
    '全部文档/书籍推荐/:b.md': 'article/:b.md',
    '全部文档/书籍推荐/:b/:c.md': 'article/:c.md',
    '全部文档/书籍推荐/:b/:c/:d.md': 'article/:d.md',

    /** 技术专栏路径重写 */
    '全部文档/技术专栏/:a.md': `article/:a.md`,
    '全部文档/技术专栏/:a/:b.md': `article/:b.md`,
    '全部文档/技术专栏/:a/:b/:c.md': `article/:c.md`,
  }
});
