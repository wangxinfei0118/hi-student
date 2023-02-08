<template>
  <div>
    <div ref="commonEchartsRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import useEcharts from '@/hooks/useEcharts'
import { onMounted, ref, watchEffect } from 'vue'
//接受父组件传来的参数 withDefaults设置默认值
const props = withDefaults(
  defineProps<{
    width?: string
    height: string
    options: any
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)
//定义ref属性
const commonEchartsRef = ref<HTMLElement>()

onMounted(() => {
  //!断定肯定会存在
  const { setOptions, resize } = useEcharts(commonEchartsRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })

  //自适应
  window.addEventListener('resize', () => {
    resize()
  })
})
</script>

<style scoped></style>
