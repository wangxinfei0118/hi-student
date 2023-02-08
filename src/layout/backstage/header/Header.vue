<template>
  <div style="display: flex; align-items: center">
    <Collapse class="coll"></Collapse>
    <Breadcrumb></Breadcrumb>
  </div>
  <UserInfo></UserInfo>
</template>

<script setup lang="ts">
import Collapse from '@/layout/backstage/header/Collapse.vue'
import Breadcrumb from '@/layout/backstage/header/Breadcrumb.vue'
import UserInfo from './UserInfo.vue'
</script>

<style scoped>
.coll {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
</style>
