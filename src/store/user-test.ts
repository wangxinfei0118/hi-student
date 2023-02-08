import { defineStore } from 'pinia'
import { LoginParams } from '@/api/user/UserModel'
import { Result } from '@/http/request'
import { loginApi, getInfoApi } from '@/api/user/user'
import { setExpireTime, setToken, setUserId } from '@/utils/auth'
import { computed, ref } from 'vue'

export const userStore = defineStore('counter', () => {
  const token = ref<string>('')
  const userid = ref<string | number>('')
  const permissions = ref<string[]>([])
  const login = (loginParam: LoginParams) => {
    return new Promise<Result>((resolve, reject) => {
      loginApi(loginParam)
        .then((res) => {
          if (res.data.code === 200) {
            token.value = res.data.token
            userid.value = res.data.id
            setToken(res.data.token)
            setUserId(res.data.id)
            setExpireTime(res.data.expireTime)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //获取用户登录信息
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      getInfoApi()
        .then((res) => {
          if (res.code == 200) permissions.value = res.data.roles
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  //获取用户权限
  const getPermission = computed(() => {
    return permissions.value
  })
  return { token, userid, permissions, login, getInfo, getPermission }
})
