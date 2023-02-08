<template>
  <el-container class="layout">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-container class="content">
      <el-aside width="auto" class="aside">
        <MenuBar></MenuBar>
      </el-aside>
      <el-main class="main">
        <Tabs></Tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from '@/layout/front/Header.vue'
import MenuBar from '@/layout/backstage/menu/MenuBar.vue'
import Tabs from '@/layout/backstage/tabs/Tabs.vue'
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .header {
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    @apply py-4 px-40 bg-theme;
    .aside {
      height: calc(100vh - 86px);
      @apply bg-white rounded-medium;
    }
    .main {
      padding-top: 0;
      padding-left: 0 !important;
      padding-right: 0 !important;
      @apply bg-white ml-6 rounded-medium;
    }
  }
}
</style>
