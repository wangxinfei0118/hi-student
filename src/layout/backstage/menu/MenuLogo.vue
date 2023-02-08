<template>
  <div class="logo">
    <img src="../../../assets/avatar.jpg" class="avatar rounded-full" />
    <div class="flex flex-col">
      <span class="user-name">有头发的秃子</span>
      <span class="user-position">前端小菜鸡</span>
    </div>
  </div>
  <div class="w-full text-center -mt-4 mb-2">
    <el-popover placement="right" :width="60" trigger="click">
      <template #reference>
        <el-button type="primary" class="w-44 text-small font-medium">写点什么</el-button>
      </template>
      <div class="flex flex-col justify-around h-36 items-center text-medium-x" @click="add">
        <div class="mb-1">
          <span class="iconfont icon-shoucangxinxianshi text-2xl -ml-3"></span>
          新鲜事
        </div>
        <div class="mb-1">
          <span class="iconfont icon-wenjuan text-2xl -ml-3"></span>
          提问题
        </div>
        <div class="mb-1">
          <span class="iconfont icon-chaoshi text-2xl -ml-3"></span>
          发闲置
        </div>
        <div class="mb-1">
          <span class="iconfont icon-shiwuzhaoling text-2xl -ml-3"></span>
          寻失物
        </div>
      </div>
    </el-popover>
    <AddEdit ref="addEdit" @onConfirm="onConfirm"></AddEdit>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref, toRefs } from 'vue'
import AddEdit from '@/components/AddEdit.vue'

const props = defineProps(['isCollapse'])
const { isCollapse } = toRefs(props) //通过结构赋值获取props 并要用toRrf保持响应式
const addEdit = ref()
const add = () => {
  addEdit.value.show('2')
}
const onConfirm = () => {}
//延迟控制展开或折叠logo的文字显示
const isShow = ref(false)
watchEffect(() => {
  if (!isCollapse?.value) {
    setTimeout(() => {
      isShow.value = true
    }, 300)
  } else isShow.value = false
})
</script>

<style lang="scss" scoped>
.logo {
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
  .user-name {
    @apply text-medium;
  }
  .user-position {
    color: #8a919f;
    @apply text-small;
  }
}
</style>
