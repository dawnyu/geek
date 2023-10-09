<template>
  <div class="container max-w-full">
    <main class="main bg px-15 py-4 m-auto">
      <div>
        <HomeHead />
        <Posts :data="renderData" />
      </div>
      <Aside />
    </main>
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '../posts.data.js';
import Posts from '../Widget/Posts.vue';
import HomeHead from './HomeHead.vue';
import Aside from '../Aside/index.vue';

let renderData;
if (typeof window !== 'undefined') {
  renderData = posts.filter((v) => !!v.category);
}
</script>

<style lang="scss" scoped>
.container {
  background-color: var(--vp-c-bg-alt);
}
.main {
  display: flex;
  min-height: 100vh;
  font-size: 16px;
  max-width: 100%;
  background-color: #f7f7f7;
  color: #464646;
}
</style>
