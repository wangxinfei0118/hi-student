import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css'
import { cleanSession, getToken } from '@/utils/auth'
import resetForm from './utils/resetForm'
import objCopy from './utils/objCopy'
import myConfirm from './utils/myConfirm'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { inputDebounce, permission } from '@/directives/permission'
import * as echarts from 'echarts'
import { createPinia } from 'pinia'
import { menuStore } from '@/store/menu'
import { userStore } from '@/store/user'
import './index.css'
// vue virtual scroller
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css' // 引入它的 css
import VueVirtualScroller from 'vue-virtual-scroller' // 引入它

const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).use(VueVirtualScroller).use(ElementPlus, { locale }).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//注册按钮权限
app.directive('permission', permission)
app.directive('inputDebounce', inputDebounce)

//清空表单
app.config.globalProperties.$resetForm = resetForm
//对象复制
app.config.globalProperties.$objCopy = objCopy
//确定弹框
app.config.globalProperties.$myConfirm = myConfirm
//echarts
app.config.globalProperties.$echarts = echarts

//权限验证处理：全局守卫路由

//白名单
const whiteList = ['/login', '/front', '/lost-and-found', '/news', '/questions-and-answers', '/flea-market']

router.beforeEach(async (to, from, next) => {
  const msStore = menuStore()
  const usStore = userStore()

  //获取token
  let token = getToken()
  if (token) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/' })
    } else {
      let hasRoles = usStore.permissions
      if (hasRoles && hasRoles.length > 0) {
        next()
      } else {
        try {
          //vuex中不存在权限，从服务器获取
          await usStore.getInfo()
          await msStore.getMenuList(router)
          //确保动态添加的路由已经被完全加载上去
          next({ ...to, replace: true })
        } catch (error) {
          cleanSession()
          next({ path: '/login' })
        }
      }
    }
  } else {
    //判断是否在白名单中
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
