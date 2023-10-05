import { h, nextTick, onMounted, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import md5 from 'blueimp-md5';
import 'uno.css'
import DefaultTheme from 'vitepress/theme';
import '../theme/assets/iconfont/iconfont.css';
import './assets/styles/index.css';

import Logo from './components/Logo.vue';
import Valine from '../components/Valine.vue';
import ArticleMetadata from '../components/ArticleMetadata.vue'
import LogoAfter from './components/LogoAfter.vue';
import Copyright from './components/Copyright.vue';
import Category from '../components/Category.vue';
import Home from '../components/Home.vue';

export default {
  ...DefaultTheme,
  Layout() {
    const { page } = useData();
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title': () => h(Logo),
      'doc-footer-before': () => h(Copyright, { key: md5(page.value.relativePath) }),
      // 'doc-after': () => h(Valine)
      // 'nav-bar-title-after': () => h(LogoAfter)
    });
  },
  enhanceApp({ app }) {
    app.component('H', Home)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('Cat', Category)
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
