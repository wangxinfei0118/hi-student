<template>
  <template v-for="(menu, index) in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="index">
      <template #title>
        <div class="text-shadow">
          <el-icon v-if="menu.meta.icon"><component :is="menu.meta.icon"></component></el-icon>
          <span>{{ menu.meta.title }}</span>
        </div>
      </template>
      <!--递归-->
      <menu-item :menu-list="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" style="height: 40px" :class="[menu.meta.icon ? 'text-shadow' : 'text-shadow-x']">
      <!--动态组件-->
      <el-icon v-if="menu.meta.icon"><component :is="menu.meta.icon"></component></el-icon>
      <div v-else style="display: inline-block; width: 10px"></div>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>

<style scoped lang="scss">
:deep(.el-sub-menu__title) {
  height: 40px;
}
</style>
