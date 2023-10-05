<template>
  <div class="container">
    <main class="main mt-4">
      <Posts :data="renderData" />
    </main>
    <aside class="sidebar mt-4">
      <Attention />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useDocs } from '../useDocs.js';
import Posts from './Posts.vue';
import Attention from './Attention.vue';

const { docData } = useDocs();
let renderData = [];
if (typeof window !== 'undefined') {
  const category = window.location.search.slice(3);
  renderData = docData.filter(
    (v) => v.category === decodeURIComponent(category)
  );
}

console.log(44, renderData);
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100vh;
  font-size: 16px;
  padding: 0 60px;
  max-width: 100%;
  font-family: HiraginoSansGB-W3, Microsoft Yahei, Tahoma, Arial,
    sans-serif;
  background-color: #f7f7f7;
  color: #464646;
}
.main {
  flex: 1;
}
.sidebar {
  width: 360px;
}
@media screen and (max-width: 1024px) {
  .container {
  }
  .sidebar {
    display: none;
  }
}
</style>
