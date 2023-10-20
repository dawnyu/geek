<template>
  <section class="p-3.5 flex flex-col bg-white rounded-2">
    <h4 class="title flex items-center font-600">
      关注公众号，更多惊喜🤣
    </h4>
    <div class="flex justify-center mt-4 mb-1">
      <img
        class="w-45 h-45 rounded-1 object-contain pointer-events-none"
        src="/qrcode.jpg"
        alt=""
      />
    </div>
    <!-- <div class="w-full">
      <p class="text-3 font-600 text-center my-1 c-rose-500">
        <a href="/">热门城市工作内推 &gt;&gt;&gt;</a>
      </p>
      <p class="text-3 font-600 text-center my-1 c-rose-500">
        <a href="/">大厂面试真题&资料 &gt;&gt;&gt;</a>
      </p>
      <p class="text-3 font-600 text-center my-1 c-rose-500">
        <a href="/"> 前端&全栈技术交流 &gt;&gt;&gt;</a>
      </p>
    </div> -->
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.title {
  &::before {
    content: '';
    flex: 1;
    display: block;
    margin-left: 6px;
    border-top: 2px solid rgba(0, 0, 0, 0.05);
  }
  &::after {
    content: '';
    flex: 1;
    display: block;
    margin-left: 6px;
    border-top: 2px solid rgba(0, 0, 0, 0.05);
  }
}
</style>
