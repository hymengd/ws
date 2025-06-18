<script setup lang="ts">
</script>

<template>
    <!-- <h1>欢迎使用 Vite + Vue 3!</h1> -->
    <el-main>
      <router-view></router-view>
    </el-main>
</template>

<style scoped>
/* 删除未使用的 .logo 相关样式 */
* {
      margin: 0;
      padding: 0;
    }

    body,
    html {
      margin: 0;
    }

    html,
    body,
    #app {
      height: 100%;
      margin: 0px;
      padding: 0px;
    }
</style>
