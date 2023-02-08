<template>
  <el-main>
    <div class="generalSituation">
      <div class="title">数据概况</div>
      <div class="wrapper">
        <div class="one item">
          <div class="item-title">帖子发表数</div>
          <div class="item-count">0</div>
          <div class="item-info">
            较前日
            <span class="text-theme-red">-12</span>
          </div>
        </div>
        <div class="two item">
          <div class="item-title">帖子回复数</div>
          <div class="item-count">3</div>
          <div class="item-info">
            较前日
            <span class="text-theme-red">-3</span>
          </div>
        </div>
        <div class="three item">
          <div class="item-title">我的点赞数</div>
          <div class="item-count">0</div>
          <div class="item-info">
            较前日
            <span class="text-theme-red">-6</span>
          </div>
        </div>
        <div class="four item">
          <div class="item-title">回复我的</div>
          <div class="item-count">4</div>
          <div class="item-info">
            较前日
            <span class="text-theme-red">-8</span>
          </div>
        </div>
        <div class="five item">
          <div class="item-title">点赞我的</div>
          <div class="item-count">110</div>
          <div class="item-info">
            较前日
            <span class="text-theme-green">+40</span>
          </div>
        </div>
        <div class="six item">
          <div class="item-title">收藏我的</div>
          <div class="item-count">1</div>
          <div class="item-info">
            较前日
            <span class="text-theme-red">-3</span>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex">
      <div style="flex: 1">
        <div class="card-header">
          <span>点赞统计</span>
        </div>
        <div ref="myChart" :style="{ width: '240px', height: '240px' }"></div>
      </div>
      <div style="flex: 1; margin-left: 30px">
        <div class="card-header">
          <span>回复统计</span>
        </div>
        <div ref="myChart1" :style="{ width: '240px', height: '240px' }"></div>
      </div>
      <div style="flex: 1; margin-left: 30px">
        <div class="card-header">
          <span>收藏统计</span>
        </div>
        <div ref="myChart2" :style="{ width: '240px', height: '240px' }"></div>
      </div>
    </div>
  </el-main>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, reactive, onBeforeUnmount } from 'vue'
import useInstance from '@/hooks/useInstance'
const { global } = useInstance()
const myChart = ref<HTMLElement>()
const myChart1 = ref<HTMLElement>()
const myChart2 = ref<HTMLElement>()

//柱状图
const charts1 = () => {
  const echartInstance = global.$echarts.init(myChart.value)
  let option = reactive({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: 30
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 0],
        type: 'bar'
      }
    ]
  })
  echartInstance.setOption(option)
}
//饼图
const charts2 = () => {
  const myChart = global.$echarts.init(myChart1.value)
  let option = reactive({
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        center: ['60%', '60%'],
        data: [
          { value: 1, name: 'Mon' },
          { value: 2, name: 'Tue' },
          { value: 9, name: 'Wed' },
          { value: 15, name: 'Thu' },
          { value: 12, name: 'Fri' },
          { value: 4, name: 'Sat' },
          { value: 0, name: 'Sun' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  myChart.setOption(option)
}
//环图
const charts3 = () => {
  const myChart = global.$echarts.init(myChart2.value)
  let option = reactive({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1, name: 'Mon' },
          { value: 7, name: 'Tue' },
          { value: 1, name: 'Wed' },
          { value: 2, name: 'Thu' },
          { value: 4, name: 'Fri' },
          { value: 1, name: 'Sat' },
          { value: 0, name: 'Sun' }
        ]
      }
    ]
  })
  myChart.setOption(option)
}

onMounted(() => {
  charts1()
  charts2()
  charts3()
})
</script>
<style scoped lang="scss">
.generalSituation {
  .title {
    @apply -mt-2 mb-3;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 290px);
    grid-template-rows: 126px 126px;
    grid-gap: 18px;
    margin-bottom: 16px;
    .item {
      background-color: #f7f8fa;
      padding: 20px;
      .item-title {
        @apply text-medium mb-2 text-shadow;
      }
      .item-count {
        @apply text-3xl font-semibold mb-2;
      }
      .item-info {
        @apply text-small text-shadow;
      }
    }
  }
}
</style>
