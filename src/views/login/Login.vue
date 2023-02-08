<template>
  <div class="formContainer">
    <el-form ref="loginFormRef" :model="loginModel" :rules="rules" size="default" class="loginForm" label-width="80px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="loginModel.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="loginModel.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item prop="code" class="code" label="验证码">
        <el-input v-model="loginModel.code" placeholder="请输入验证码" class="codeInput" />
        <img :src="imgSrc" @click="getImage" class="code" />
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" @click="login" class="w-64">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useImage from '@/composables/login/useImage'
import useLogin from '@/composables/login/useLogin'
import loginRequest from '@/composables/login/loginRequest'
import useInstance from '@/hooks/useInstance'
import { ElForm } from 'element-plus'
//验证码业务逻辑
const { imgSrc, getImage } = useImage()
//登录业务逻辑
const { loginModel, rules } = useLogin()

const loginFormRef = ref<InstanceType<typeof ElForm>>()

const { global } = useInstance()
const { login } = loginRequest(loginModel)

const reset = () => {
  global.$resetForm(loginFormRef, loginModel)
}
onMounted(() => {
  getImage()
})
</script>

<style scoped lang="scss">
.formContainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .loginForm {
    height: 240px;
    width: 560px;
    border-radius: 10px;
    padding: 20px 35px 20px 4px;
    @apply shadow-card;
  }
  .button {
    display: inline-block;
    text-align: center;
  }
  .code {
    .codeInput {
      width: 210px;
      margin-right: 30px;
    }
    .code {
      width: 120px;
    }
  }
}
</style>
