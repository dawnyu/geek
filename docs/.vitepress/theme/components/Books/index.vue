<template>
  <div class="flex">
    <div class="flex ml-4">
      <img class="w-45 h-55 object-contain" :src="props.src" alt="" />
      <div class="ml-5 pt-1 text-3.5">
        <span class="text-5.5 font-600 c-gray-800">{{ props.name }}</span>
        <div class="my-3">
          <span class="mr-3 c-gray-500">作者</span
          ><span class="text-4 c-blue-800">{{ props.author }}</span>
        </div>
        <div class="my-3">
          <span class="mr-3 c-stone-500">出版时间</span
          ><span class="c-stone-700 text-4">{{ props.date }}</span>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
  date: string;
  author: string;
  name: string;
}>();
</script>

<style lang="scss" scoped></style>
