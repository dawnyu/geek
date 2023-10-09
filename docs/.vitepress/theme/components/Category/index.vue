<template>
  <div class="container max-w-full">
    <main class="main bg px-15 py-4 m-auto">
      <article class="flex-1 pt-5 px-5 pb-8 bg-white rounded-2">
        <Posts :data="renderData" />
      </article>
      <Aside />
    </main>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '../posts.data.js';
import Posts from '../Widget/Posts.vue';
import Aside from '../Aside/index.vue';

let renderData = [];
if (typeof window !== 'undefined') {
  const category = window.location.search.slice(3);
  renderData = posts.filter(
    (v) => v.category === decodeURIComponent(category)
  );
}
</script>

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
