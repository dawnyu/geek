<script setup>
import DefaultTheme from 'vitepress/theme';
import Copyright from './components/Widget/Copyright.vue';
import { useData } from 'vitepress';
import Logo from './components/Widget/Logo.vue';
import md5 from 'blueimp-md5';

const { page } = useData();
const { Layout } = DefaultTheme;
</script>
<template>
  <Layout>
    <template #doc-footer-before>
      <ClientOnly>
        <Copyright :key="md5(page.relativePath)" />
      </ClientOnly>
    </template>
    <template #nav-bar-title>
      <ClientOnly>
        <Logo />
      </ClientOnly>
    </template>
  </Layout>
</template>
