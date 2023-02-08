<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <img src="../../../assets/avatar.jpg" class="avatar" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="restore">还原数据</el-dropdown-item>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//退出登录
import { loginOutApi, restoreApi } from '@/api/user/user'
import useInstance from '@/hooks/useInstance'
import { cleanSession, getToken } from '@/utils/auth'

const { global } = useInstance()

const loginOut = async () => {
  let confirm = await global.$myConfirm('确定退出登录吗')
  if (confirm) {
    let param = {
      token: getToken()
    }
    let res = await loginOutApi(param)
    if (res && res.code == 200) {
      global.$message({ message: '退出登录成功', type: 'success' })
      //跳到登录
      location.reload()
      //清空session
      cleanSession()
    }
  }
}
//还原数据
const restore = async () => {
  let confirm = await global.$myConfirm('确定还原数据吗')
  if (confirm) {
    let res = await restoreApi()
    if (res && res.code == 200) {
      global.$message({ message: '还原数据成功', type: 'success' })
    }
  }
}
</script>

<style scoped>
.avatar {
  height: 42px;
  width: 42px;
  border-radius: 50%;
}
</style>
