<template>
  <div class="meta-wrapper">
    <span class="">
      <i class="iconfont icon-renxiang mr-0.5 text-3"></i>
      {{ author }}
    </span>
    <span class="ml-2">
      <i class="iconfont icon-time mr-1 text-3.5"></i>
      {{ date }}
    </span>
    <span v-for="(tag, index) in tags" :key="index">
      <a class="tag-a" :title="tag">{{ tag }}</a>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { useData } from 'vitepress';
import dayjs from 'dayjs';

// 定义文章属性
const props: any = defineProps({
  article: Object
});

// 初始化文章元数据信息
const { frontmatter } = useData();
const data = reactive({
  author: frontmatter?.value?.userName,
  link: frontmatter?.value?.link,
  date: dayjs(frontmatter?.value?.createTime || new Date()).format(
    'YYYY-MM-DD'
  ),
  tags: frontmatter?.value?.tags?.split(',')
});
const { author, date, tags } = toRefs(data);
</script>

<style scoped>
.iconfont {
  font-size: 14px;
}
</style>
