//自定义按钮权限指令
import { Directive } from 'vue'
import { userStore } from '@/store/user'
export const permission: Directive = {
  mounted(el, binding) {
    //value按钮权限
    const { value } = binding
    //获取用户的所有权限
    const permissions = userStore().getPermission
    //判断传递过来的按钮权限是否存在
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      //判断传递进来的按钮权限字段是否存在当前用户的permissions中
      const hasPermission = permissions.some((role) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error("need roles! Like v-permission=\"['add','edit']\"")
    }
  }
}

//自定义输入框防抖指令
export const inputDebounce: Directive = {
  mounted(el, binding) {
    let timer: any = null
    el.addEventListener('input', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        if (el.value.length == 0) return
        binding.value()
      }, 1000)
    })
  }
}
