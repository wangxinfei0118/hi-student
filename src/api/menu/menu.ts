import http from '@/http/http'
enum Api {
  getMenuLis = '/api/sysUser/getMenuList'
}
//获取左侧菜单
export const getMenuListApi = async () => {
  return await http.get(Api.getMenuLis)
}
