import { defineStore } from 'pinia'
import { Tabs } from '@/store/type'
//定义state类型
export type TabsState = {
  tabsList: Array<Tabs>
}
//定义store
export const tabStore = defineStore('tabStore', {
  state: (): TabsState => {
    return {
      tabsList: []
    }
  },
  actions: {
    addTab(tab: Tabs) {
      if (this.tabsList.some((item) => item.path === tab.path)) return
      this.tabsList.push(tab)
    },
    updateTabs(tabs: any) {
      this.tabsList = tabs
    }
  }
})
