import { defineStore } from 'pinia'
import { getMenuListApi } from '@/api/menu/menu'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/backstage/Index.vue'
const modules = import.meta.glob('@/views/**/*.vue')
//定义store类型
export type MenuState = {
  count: number
  status: boolean
  menuList: any
}
//定义store
export const menuStore = defineStore('menuStore', {
  state: (): MenuState => {
    return {
      count: 0,
      status: false,
      menuList: [
        {
          path: '/backstage/home',
          component: 'Layout',
          meta: {
            title: '首页',
            icon: 'HomeFilled',
            roles: ['sys:manage']
          },
          children: []
        }
      ]
    }
  },

  actions: {
    changeStatus(status: boolean) {
      this.status = status
    },
    getMenuList(router: any) {
      return new Promise((resolve, reject) => {
        getMenuListApi()
          .then((res) => {
            let accessedRoutes
            if (res.code == 200) {
              //动态生成路由
              let data = [
                {
                  path: '/backstage/system',
                  component: 'Layout',
                  name: 'system',
                  meta: {
                    title: '内容管理',
                    icon: 'Management',
                    roles: ['sys:manage']
                  },
                  children: [
                    {
                      path: '/backstage/department',
                      component: '/system/department/department',
                      name: 'department',
                      meta: {
                        title: '新鲜事',
                        roles: ['sys:dept']
                      }
                    },
                    {
                      path: '/backstage/userList',
                      component: '/system/User/UserList',
                      name: 'userList',
                      meta: {
                        title: '我的提问',
                        roles: ['sys:user']
                      }
                    },
                    {
                      path: '/backstage/roleList',
                      component: '/system/Role/RoleList',
                      name: 'roleList',
                      meta: {
                        title: '闲置管理',
                        roles: ['sys:role']
                      }
                    },
                    {
                      path: '/backstage/menuList',
                      component: '/system/Menu/MenuList',
                      name: 'menuList',
                      meta: {
                        title: '失物招领',
                        roles: ['sys:Menu']
                      }
                    }
                  ]
                },
                {
                  path: '/backstage/goods',
                  component: 'Layout',
                  name: 'goods',
                  meta: {
                    title: '回答管理',
                    icon: 'Comment',
                    roles: ['sys:goods']
                  },
                  children: [
                    {
                      path: '/backstage/goodCategory',
                      component: '/goods/goodsCategory/goodsCategoryList',
                      name: 'goodCategory',
                      meta: {
                        title: '我的回答',
                        roles: ['sys:goodsCategory']
                      }
                    }
                  ]
                },
                {
                  path: '/backstage/systenConfig',
                  component: 'Layout',
                  name: 'systenConfig',
                  meta: {
                    title: '帮助中心',
                    icon: 'Opportunity',
                    roles: ['sys:systenConfig']
                  },
                  children: [
                    {
                      path: '/backstage/document',
                      component: '/system/config/systemDocument',
                      name: 'commonProblem',
                      meta: {
                        title: '常见问题',
                        roles: ['sys:document']
                      }
                    }
                  ]
                }
              ]
              accessedRoutes = filterAsyncRoutes(data, router)
              //设置到menuList
              this.menuList = this.menuList.concat(accessedRoutes)
            }
            resolve(accessedRoutes)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export function filterAsyncRoutes(routes: any, router: any) {
  const res: Array<RouteRecordRaw> = []
  routes.forEach((route: any) => {
    const tmp = { ...route }
    const component = tmp.component
    if (route.component) {
      if (component == 'Layout') {
        tmp.component = Layout
      } else {
        tmp.component = import.meta.glob('@/views/**/*.vue')[`../views${component}.vue`]
      }
    }
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, router)
    }
    router.addRoute(tmp)
    res.push(tmp)
  })
  return res
}
