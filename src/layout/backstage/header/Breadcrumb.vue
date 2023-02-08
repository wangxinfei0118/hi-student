<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { Ref, ref, watch } from 'vue'
const route = useRoute()
const tabs: Ref<RouteLocationMatched[]> = ref([])

//获取面包屑导航数据
const getPath = () => {
  //取出所有包含title的数据
  let matched = route.matched.filter((item) => {
    return item.meta && item.meta.title
  })
  //判断第一个是否为首页
  if (matched[0] && matched[0].path !== '/home') {
    matched = [{ path: '/home', meta: { title: '首页' } } as any].concat(matched)
  }
  tabs.value = matched
}
getPath()
//监测对象的属性要用箭头函数
watch(
  () => route.path,
  () => {
    getPath()
  }
)
</script>

<style scoped></style>
