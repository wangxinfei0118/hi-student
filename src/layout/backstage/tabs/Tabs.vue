<template>
  <el-tabs v-model="activeTab" type="card" class="demo-tabs" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane v-for="item in tabsList" :key="item.path" :label="item.title" :name="item.path"></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { tabStore } from '@/store/tabs'
import { Tabs } from '@/store/type'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tbStore = tabStore()
//获取tabsList数据
const tabsList = computed(() => {
  return tbStore.tabsList
})

//设置当前激活的选项卡，与当前激活路由一样
const activeTab = ref('')

const addTab = () => {
  const { path, meta } = route
  const tab: Tabs = {
    path,
    title: meta.title as string
  }
  tbStore.addTab(tab)
}

const setActiveTab = () => {
  activeTab.value = route.path
}

watch(
  () => route.path,
  () => {
    //把当前路由添加到选项卡数据中
    addTab()
    //设置激活的选项卡
    setActiveTab()
  }
)
//解决vuex刷新数据丢失
const storeData = () => {
  if (route.path != '/login') {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('tabsData', JSON.stringify(tabsList.value))
    })
    let tabSession = sessionStorage.getItem('tabsData')
    if (tabSession) {
      tbStore.tabsList = JSON.parse(tabSession)
    }
  }
}

onMounted(() => {
  //读取刷新之前数据
  storeData()
  //把当前路由添加到选项卡数据中
  addTab()
  //设置激活的选项卡
  setActiveTab()
})

//移除选项卡
const removeTab = (targetName: string) => {
  //不能移除首页
  if (targetName === '/home') return
  const tabs = tabsList.value
  let activeName = activeTab.value
  if (activeName === targetName) {
    tabs.forEach((tab: Tabs, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  //重新设置当前激活的选项卡
  activeTab.value = activeName
  //重新设置选项卡数据
  tbStore.updateTabs(tabs.filter((tab: Tabs) => tab.path !== targetName))
  // store.state.tabsList = tabs.filter((tab:Tabs) => tab.path !== targetName)
  //转跳路由
  router.push({ path: activeName })
}

//点击选项卡跳转到相应路由
const clickTab = (tab: any) => {
  router.push({ path: tab.props.name })
}
</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
  margin: 0px;
}
:deep(.el-tabs__item) {
  height: 26px !important;
  line-height: 26px !important;
  text-align: center !important;
  border: 1px solid #d8dce5 !important;
  margin: 0px 3px !important;
  color: #495060;
  font-size: 12px !important;
  padding: 0 10px !important;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #42b983 !important;
  background-color: #42b983 !important;
  color: #fff !important;
}
:deep(.el-tabs__item:hover) {
  color: #495060 !important;
}
:deep(.is-active:hover) {
  color: #fff !important;
}
</style>
