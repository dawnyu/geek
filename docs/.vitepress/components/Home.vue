<template>
  <div class="container">
    <main class="main mt-4">
      <HomeHead />
      <Posts :data="docData" />
    </main>
    <aside class="sidebar mt-4">
      <Attention />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useDocs } from '../useDocs.js';
import Posts from './Posts.vue';
import HomeHead from './HomeHead.vue';
import Attention from './Attention.vue';

const { docData } = useDocs();
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
