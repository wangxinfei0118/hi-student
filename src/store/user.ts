import { defineStore } from 'pinia'
import { LoginParams, LoginResult } from '@/api/user/UserModel'
import { Result } from '@/http/request'
import { loginApi, getInfoApi } from '@/api/user/user'
import { setExpireTime, setToken, setUserId } from '@/utils/auth'
//定义state类型
export type UserState = {
  token: string
  userid: string | number
  permissions: string[]
}
//定义store
export const userStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      token: '',
      userid: '',
      permissions: []
    }
  },
  actions: {
    //登录
    login(loginParam: LoginParams) {
      return new Promise<Result>((resolve, reject) => {
        loginApi(loginParam)
          .then((res) => {
            //把token放到pinia和sessionStorage
            if (res.data.code === 200) {
              this.token = res.data.token
              this.userid = res.data.id
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
    },
    //获取用户登录信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfoApi()
          .then((res) => {
            if (res.code == 200) this.permissions = res.data.roles
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
  getters: {
    //获取用户权限
    getPermission(state: UserState) {
      return state.permissions
    }
  }
})
