<script setup>
import Attention from './Attention.vue';
</script>

<template>
  <aside class="sidebar h-fit ml-4 bg-white w-75">
    <div class="pos-fixed w-75">
      <Attention />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .sidebar {
    display: none;
  }
}
</style>
