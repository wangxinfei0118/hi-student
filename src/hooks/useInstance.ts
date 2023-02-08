import { getCurrentInstance, ComponentInternalInstance } from 'vue'

export default function useInstance() {
  const { proxy, appContext } = getCurrentInstance() as ComponentInternalInstance
  const global = appContext.config.globalProperties

  return { proxy, global }
}
