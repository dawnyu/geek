import { h, nextTick, onMounted, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import 'uno.css'
import DefaultTheme from 'vitepress/theme';
import '../theme/assets/iconfont/iconfont.css';
import './assets/styles/index.css';

import ArticleMetadata from './components/Article/ArticleMetadata.vue'
import Category from './components/Category/index.vue';
import Article from './components/Article/index.vue'
import Home from './components/Home/index.vue';
import Books from './components/Books/index.vue';
import MyLayout from './Layout.vue'


export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('Home', Home)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('Cat', Category)
    app.component('Article', Article) // 自定义布局
    app.component('Books', Books)
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      (mediumZoom as unknown as Function)('.main img', {
        background: 'var(--vp-c-bg)',
      });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  }
};
