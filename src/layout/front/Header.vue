<template>
  <div class="header w-full bg-white flex justify-between items-center px-28">
    <div class="left flex items-center">
      <div class="logo">
        <img src="@/assets/logo-big.png" class="h-8" />
      </div>
      <div class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/news">每日新鲜事</router-link>
        <router-link to="/questions-and-answers">校园问答</router-link>
        <router-link to="/lost-and-found">失物招领</router-link>
        <router-link to="/flea-market">跳蚤市场</router-link>
      </div>
    </div>
    <div class="right">
      <div v-if="!token">
        <el-button type="primary" plain @click="toLogin">登录 | 注册</el-button>
      </div>
      <div v-else>
        <UserInfo></UserInfo>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import UserInfo from '@/layout/backstage/header/UserInfo.vue'
import { getToken } from '@/utils/auth'

const toLogin = () => {
  router.push('/login')
}
let token = getToken()
</script>

<style scoped lang="scss">
.header {
  height: 52px;
  border-bottom: 1px solid #f4f5f5;
  .nav {
    @apply pl-4 text-nav font-semibold;
    a {
      @apply pl-4;
    }
  }
}
</style>
