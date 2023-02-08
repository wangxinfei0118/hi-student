<template>
  <MenuLogo :isCollapse="isCollapse"></MenuLogo>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
    :default-openeds="[1, 2, 3]">
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import MenuItem from './MenuItem.vue'
import MenuLogo from './MenuLogo.vue'
import { useRoute } from 'vue-router'
import { menuStore } from '@/store/menu'

const msStore = menuStore()
const route = useRoute()
const activeIndex = computed(() => {
  const { path } = route
  return path
})
// const menuList = computed(()=>{
//   return msStore.menuList
// })
let menuList = reactive([
  {
    path: '/backstage/home',
    component: 'Layout',
    meta: {
      title: '首页',
      icon: 'HomeFilled',
      roles: ['sys:manage']
    },
    children: []
  },
  {
    path: '/backstage/system',
    component: 'Layout',
    alwaysShow: true,
    name: 'system',
    meta: {
      title: '内容管理',
      icon: 'Management',
      roles: ['sys:manage'],
      parentId: 0
    },
    children: [
      {
        path: '/backstage/department',
        component: '/system/department/department',
        alwaysShow: false,
        name: 'department',
        meta: {
          title: '新鲜事',
          roles: ['sys:dept'],
          parentId: 17
        }
      },
      {
        path: '/backstage/userList',
        component: '/system/User/UserList',
        alwaysShow: false,
        name: 'userList',
        meta: {
          title: '我的提问',
          roles: ['sys:user'],
          parentId: 17
        }
      },
      {
        path: '/backstage/roleList',
        component: '/system/Role/RoleList',
        alwaysShow: false,
        name: 'roleList',
        meta: {
          title: '闲置管理',
          roles: ['sys:role'],
          parentId: 17
        }
      },
      {
        path: '/backstage/menuList',
        component: '/system/Menu/MenuList',
        alwaysShow: false,
        name: 'menuList',
        meta: {
          title: '失物招领',
          roles: ['sys:Menu'],
          parentId: 17
        }
      }
    ]
  },
  {
    path: '/backstage/goods',
    component: 'Layout',
    alwaysShow: true,
    name: 'goods',
    meta: {
      title: '回答管理',
      icon: 'Comment',
      roles: ['sys:goods'],
      parentId: 0
    },
    children: [
      {
        path: '/backstage/goodCategory',
        component: '/goods/goodsCategory/goodsCategoryList',
        alwaysShow: false,
        name: 'goodCategory',
        meta: {
          title: '我的回答',
          roles: ['sys:goodsCategory'],
          parentId: 34
        }
      }
    ]
  },
  {
    path: '/backstage/systenConfig',
    component: 'Layout',
    alwaysShow: true,
    name: 'systenConfig',
    meta: {
      title: '帮助中心',
      icon: 'Opportunity',
      roles: ['sys:systenConfig'],
      parentId: 0
    },
    children: [
      {
        path: '/backstage/document',
        component: '/system/config/systemDocument',
        alwaysShow: false,
        name: 'commonProblem',
        meta: {
          title: '常见问题',
          roles: ['sys:document'],
          parentId: 42
        }
      }
    ]
  }
])

//控制折叠
const isCollapse = computed(() => {
  return msStore.status
})
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
:deep(.el-menu-item.is-active) {
  color: #1e80ff !important;
}
</style>
