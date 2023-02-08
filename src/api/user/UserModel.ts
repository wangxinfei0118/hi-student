/**
 * 登录请求参数类型
 */
export interface LoginParams {
  username: string
  password: string
  code: string
}
/**
 * 登录成功返回值类型
 */
export interface LoginResult {
  id: number
  token: string
  code: number
  expireTime: number
}
export interface Userinfo {
  avatar: string
  id: string
  introduction: string
  name: string
  roles: Array<string>
}
/**
 * 用户列表查询参数
 */
export interface UserListParam {
  deptId: string | number
  loginName: string
  currentPage: number
  pageSize: number
  total: number
}

/**
 *表单提交的参数
 */
export interface AddUserModel {
  id: string | number
  type: string
  deptId: string | number
  deptName: string
  loginName: string
  mobile: string
  nickName: string
  email: string
  username: string
  password: string
  sex: string
}
//删除的参数
export interface DeleteUserModel {
  id: number
}
/**
 * 分配角色列表参数
 */
export interface AssignRoleListParam {
  currentPage: number
  pageSize: number
  userId: string | number
  total: number
}
//保存分配角色参数
export interface AssignRoleSaveParam {
  roleId: string | number
  userId: string | number
}
