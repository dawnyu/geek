<script setup lang="ts">
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { data as posts } from '../posts.data.js';
import Aside from '../Aside/index.vue';
const { frontmatter: data } = useData();

const { page } = useData();
const route = useRoute();

function findCurrentIndex() {
  return posts.findIndex(
    (p) => `/${p.link}` === decodeURIComponent(route.path)
  );
}

const date = computed(() => {
  const index = findCurrentIndex();
  return posts[index].date;
});
const nextPost = computed(() => posts[findCurrentIndex() - 1]);
const prevPost = computed(() => posts[findCurrentIndex() + 1]);
</script>

<template>
  <div class="container max-w-full">
    <main class="main bg px-15 py-4 m-auto">
      <article class="vp-doc flex-1 pt-5 px-5 pb-8 bg-white rounded-2">
        <Content class="prose dark:prose-invert max-w-none" />
      </article>
      <Aside />
    </main>
  </div>
</template>
<style lang="scss" scoped>
.container {
  background-color: var(--vp-c-bg-alt);
}
.main {
  display: flex;
  min-height: 100vh;
  max-width: 1440px;
  background-color: #f7f7f7;
  color: #464646;
}
</style>
