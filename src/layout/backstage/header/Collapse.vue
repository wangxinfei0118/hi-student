<template>
  <div @click="changeFold">
    <el-icon class="fold" v-if="!status" :size="20"><Fold /></el-icon>
    <el-icon class="fold" v-else :size="20"><Expand /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { menuStore } from '@/store/menu'

const msStore = menuStore()

const status = ref(false) //默认为不折叠

//操作折叠
const changeFold = () => {
  status.value = !status.value
  msStore.changeStatus(status.value)
}
</script>

<style scoped>
.fold {
  cursor: pointer;
}
</style>
