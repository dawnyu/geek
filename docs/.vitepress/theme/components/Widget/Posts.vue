<script setup lang="ts">
const props = defineProps<{
  data: {
    date: string;
    title: string;
    tags: string[];
    preview: string;
    userName: string;
    link: string;
    intro: string;
  }[];
}>();
</script>

<template>
  <div class="bg-white px-3">
    <article
      v-for="art in props.data"
      :key="art.link"
      class="group flex mx-4 py-5 border-b-solid border-slate-100"
    >
      <a class="flex-shrink-0 overflow-hidden" :href="art.link">
        <img
          class="w-57 h-36 group-hover:transform-scale-120 transition-1000 rounded pointer-events-none"
          :src="art.preview"
          alt=""
        />
      </a>
      <section class="flex ml-5 flex flex-col">
        <header>
          <a class="c-dark-700 flex" :href="art.link">
            <span class="tag fw-600">{{ art.tags[0] }}</span>
            <h2>
              <span class="fw-600 group-hover:c-sky-500">{{
                art.title
              }}</span>
            </h2>
          </a>
        </header>
        <p class="font-size-3 c-dark-50 my-2">
          <span class="mr-1.5"
            ><i class="iconfont icon-renxiang text-3 mr-0.5"></i>
            {{ art.userName }}</span
          >
          <span class="mr-1.5"
            ><i class="iconfont icon-time text-3 mx-0.5"></i
            >{{ art.date }}</span
          >
        </p>
        <p class="font-size-4 line-clamp-3 c-gray-700">
          {{ art.intro }}
        </p>
      </section>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  color: #fff;
  background-color: #45bcf9;
  padding: 1px 6px;
  font-size: 12px;
  display: inline-block;
  position: relative;
  top: -2px;
  margin-right: 6px;
  border-radius: 4px;
  ::after {
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: -4px;
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    border-left: 4px solid #45bcf9;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }
}
</style>
