<template>
  <div
    class="text-center mt-3 mb-8 text-1.25 border-b-1 border-b-gray"
  >
    <span class="mr-2.5">
      {{ date }}
    </span>
    <span class="mr-2.5">
      分类：
      <a class="tag-a cursor-pointer">{{ category }}&nbsp;</a>
    </span>
    <span class="mr-2.5">
      标签：
      <span v-for="(tag, index) in tags" :key="index">
        <a class="tag-a cursor-pointer" :title="tag">{{ tag }}&nbsp;</a>
      </span>
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
  author: frontmatter?.value?.userName || '大湿兄',
  link: frontmatter?.value?.link,
  date: dayjs(frontmatter?.value?.createTime || new Date()).format(
    'YYYY-MM-DD'
  ),
  tags: frontmatter?.value?.tags?.split(','),
  category: frontmatter.value?.category
});
const { author, date, tags, category } = toRefs(data);
</script>

<style scoped>
.iconfont {
  font-size: 14px;
}
</style>
