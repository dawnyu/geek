<template>
  <section class="ml-4 p-3 flex bg-white rounded-1">
    <img
      class="w-40 h-40 rounded-1 object-contain pointer-events-none"
      src="/qrcode.jpg"
      alt=""
    />
    <div class="w-full">
      <p class="text-6 font-600 text-center mt-3 title-color">
        关注公众号
      </p>
      <p class="text-4 font-600 text-center my-3 c-rose-500">
        <a href="/">工作内推 &gt;</a>
      </p>
      <p class="text-4 font-600 text-center my-3 c-rose-500">
        <a href="/"> 技术交流 &gt;</a>
      </p>
      <p class="text-4 font-600 text-center my-3 c-rose-500">
        <a href="/">面试资料 &gt;</a>
      </p>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss">
.title-color {
  font-family: Comic Sans MS;
  background-image: linear-gradient(
    to right,
    #eea2a2 0%,
    #bbc1bf 19%,
    #57c6e1 42%,
    #b49fda 79%,
    #7ac5d8 100%
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  color: transparent !important;
}
</style>
