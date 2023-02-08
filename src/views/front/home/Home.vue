<template>
  <div class="content flex justify-between">
    <div class="main">
      <div class="content-nav h-12 flex items-center font-semibold text-shadow">
        <div>最新</div>
        <div>最热</div>
      </div>
      <div class="content-main">
        <div class="list h-full px-5">
          <ScrollList :list="list" :item-size="98" @updata="update" @click="update"></ScrollList>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="creationCenter h-52 bg-white">
        <div class="p-4">
          <span class="iconfont icon-chuangzuo"></span>
          <span class="ml-2 text-medium">创作中心</span>
        </div>
        <div class="w-full flex justify-around my-2">
          <div class="flex flex-col items-center text-small">
            <div class="icon-wrapper bg-card-blue"><span class="iconfont icon-wenjuan text-2xl"></span></div>
            <div class="my-2">回答问题</div>
          </div>
          <div class="flex flex-col items-center text-small">
            <div class="icon-wrapper bg-card-orange"><span class="iconfont icon-shoucangxinxianshi text-2xl"></span></div>
            <div class="my-2">新鲜事</div>
          </div>
          <div class="flex flex-col items-center text-small">
            <div class="icon-wrapper bg-card-yellow"><span class="iconfont icon-chaoshi text-2xl"></span></div>
            <div class="my-2">跳蚤市场</div>
          </div>
          <div class="flex flex-col items-center text-small">
            <div class="icon-wrapper bg-card-green"><span class="iconfont icon-shiwuzhaoling text-2xl"></span></div>
            <div class="my-2">失物招领</div>
          </div>
        </div>
        <div class="text-center">
          <el-button type="primary" class="w-64" size="large" plain @click="enterCreate">进入创作中心</el-button>
        </div>
      </div>
      <div class="campus bg-white">
        <el-image :src="imgUrl" fit="fill" style="width: 300px; height: 300px" class="rounded-medium" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import ScrollList from '@/components/ScrollList.vue'

const list = ref([
  {
    title: '学校哪家理发店比较好？',
    author: '有头发的秃子',
    text: '东苑，西苑，软件园哪里理发好一点',
    id: '5468',
    time: '10-04 13:28'
  },
  { title: '学校哪里能取外卖', author: '有头发的秃子', text: '有人知道软件园哪里可以取外卖吗', id: '5469', time: '10-04 11:22' },
  { title: '出一本高数书，全新', author: '有头发的秃子', text: '有要的吗，加我', id: '5470', time: '10-04 10:56' },
  {
    title: '有人看到猫学长了吗',
    author: '喵学长',
    text: '好几天没有看到学长了，前一阵子还能在图书馆周围看到',
    id: '5471',
    time: '10-04 08:21'
  },
  { title: '学校游泳馆现在开门了吗？', author: 'admin', text: '如题', id: '5472', time: '10-03 20:26' },
  { title: '国庆电影院放什么电影', author: '有头发的秃子', text: '是不是每天的电影都不一样啊', id: '5473', time: '10-03 20:43' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5474', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5475', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5476', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5477', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5478', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5479', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5480', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5481', time: '10-03 19:33' },
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5482', time: '10-03 19:33' },
  { title: '有人晚上1', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5483', time: '10-03 19:33' },
  { title: '有人晚上2', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5484', time: '10-03 19:33' },
  { title: '有人晚上3', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5485', time: '10-03 19:33' },
  { title: '有人晚上4', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5486', time: '10-03 19:33' },
  { title: '有人晚上5', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5487', time: '10-03 19:33' },
  { title: '有人晚上6', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5488', time: '10-03 19:33' },
  { title: '有人晚上7', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5489', time: '10-03 19:33' },
  { title: '有人晚上8', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5490', time: '10-03 19:33' },
  { title: '有人晚上9', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5491', time: '10-03 19:33' },
  { title: '有人晚上10', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5492', time: '10-03 19:33' },
  { title: '有人晚上11', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5493', time: '10-03 19:33' },
  { title: '有人晚上12', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5494', time: '10-03 19:33' },
  { title: '有人晚上13', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5495', time: '10-03 19:33' },
  { title: '有人晚上14', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5496', time: '10-03 19:33' },
  { title: '有人晚上15', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5497', time: '10-03 19:33' },
  { title: '有人晚上16', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5498', time: '10-03 19:33' },
  { title: '有人晚上17', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5499', time: '10-03 19:33' },
  { title: '有人晚上18', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5500', time: '10-03 19:33' },
  { title: '有人晚上19', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5501', time: '10-03 19:33' },
  { title: '有人晚上20', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5502', time: '10-03 19:33' },
  { title: '有人晚上21', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5503', time: '10-03 19:33' },
  { title: '有人晚上22', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5504', time: '10-03 19:33' },
  { title: '有人晚上23', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5505', time: '10-03 19:33' },
  { title: '有人晚上24', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5506', time: '10-03 19:33' },
  { title: '有人晚上25', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5507', time: '10-03 19:33' },
  { title: '有人晚上26', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5508', time: '10-03 19:33' },
  { title: '有人晚上27', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5509', time: '10-03 19:33' },
  { title: '有人晚上28', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5510', time: '10-03 19:33' },
  { title: '有人晚上29', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5511', time: '10-03 19:33' },
  { title: '有人晚上30', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5512', time: '10-03 19:33' },
  { title: '有人晚上31', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5513', time: '10-03 19:33' },
  { title: '有人晚上32', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5514', time: '10-03 19:33' },
  { title: '有人晚上33', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5515', time: '10-03 19:33' }
])
const imgUrl = new URL('../../../assets/campus.jpeg', import.meta.url).href
const enterCreate = () => {
  router.push('/backstage')
}
const toDetail = (id: any) => {
  router.push({ path: '/detail', query: { id } })
}
const update = () => {}
</script>

<style scoped lang="scss">
.main {
  width: 696px;
  @apply bg-white rounded-medium shadow-card;
  .content-nav {
    border-bottom: 1px solid #f4f5f5;
    div {
      @apply px-4;
    }
  }
  .listItem {
    border-bottom: 1px solid #f4f5f5;
    @apply py-2;
  }
}
.aside {
  width: 300px;
  @apply rounded-medium;
  .creationCenter {
    .icon-wrapper {
      width: 40px;
      height: 40px;
      @apply flex justify-center items-center rounded-full;
    }
  }
  .campus {
    height: 300px;
    margin-top: 12px;
  }
}
</style>
