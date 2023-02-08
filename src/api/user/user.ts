import http from '@/http/http'
import {
  AddUserModel,
  AssignRoleListParam,
  AssignRoleSaveParam,
  DeleteUserModel,
  LoginParams,
  LoginResult,
  Userinfo,
  UserListParam
} from '@/api/user/UserModel'
import { h } from 'vue'

enum Api {
  getImg = '/api/sysUser/image',
  login = '/api/user/login',
  getInfo = '/api/sysUser/getInfo',
  loginOut = '/api/sysUser/loginOut',
  restore = '/api/backup/restore'
}
//获取验证码
export async function getImageApi() {
  return await http.getImage(Api.getImg)
}
//登录
export async function loginApi(params: LoginParams) {
  return await http.login<LoginResult>(Api.login, params)
}
//获取用户信息
export const getInfoApi = async () => {
  return await http.get<Userinfo>(Api.getInfo)
}

//退出登录
export const loginOutApi = async (param: any) => {
  return await http.post(Api.loginOut, param)
}
//数据库还原
export async function restoreApi() {
  return await http.post(Api.restore, null)
}
