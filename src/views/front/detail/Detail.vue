<template>
  <div class="flex justify-between">
    <div class="wrapper">
      <div class="main">
        <div class="avatar">
          <img src="../../../assets/avatar.jpg" />
        </div>
        <div class="content">
          <div class="userName flex justify-between">
            <div class="text-theme-title mb-2">
              {{ data.author }}
            </div>
            <div class="text-small text-shadow">{{ data.time }}</div>
          </div>
          <div class="title font-semibold">{{ data.title }}</div>
          <div class="text text-medium">
            {{ data.text }}
          </div>
          <div class="classify mt-2">
            <span class="rounded-full text-theme-yellow text-small p-1 bg-shadow-y">每日新鲜事</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <div>
          <span class="iconfont icon-dianzan"></span>
          <span class="text-medium ml-0.5">0</span>
        </div>
        <div>
          <span class="iconfont icon-pinglun"></span>
          <span class="text-medium ml-0.5">1</span>
        </div>
        <div>
          <span class="iconfont icon-shoucang"></span>
          <span class="text-medium ml-0.5">0</span>
        </div>
      </div>
      <div class="comment">
        <div class="title">全部评论</div>
        <div class="comment-list">
          <div class="item flex">
            <div>
              <img src="../../../assets/avatar.jpg" />
            </div>
            <div>
              <div class="userName text-small text-theme-title mb-2">有头发的秃子</div>
              <div class="content text-small-x mb-2">顶顶顶顶顶顶</div>
              <div class="info text-small text-shadow">10-04 13:28</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="creationCenter bg-green-50"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const dataList = [
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
  { title: '有人晚上一起去打球吗', author: '有头发的秃子', text: '晚上七点左右，篮球场见', id: '5474', time: '10-03 19:33' }
]
let id = useRoute().query.id
let data = ref(
  dataList.find((item) => {
    return item.id === id
  })
)
</script>

<style scoped lang="scss">
.wrapper {
  width: 696px;
  @apply bg-white rounded-medium shadow-card;
  .main {
    padding: 15px 18px;
    border-bottom: 1px solid #f4f5f5;
    @apply flex;
    .avatar {
      margin-right: 10px;
      img {
        height: 35px;
        min-width: 35px;
        @apply rounded-full;
      }
    }
  }
  .footer {
    @apply flex;
    div {
      flex: 1;
      border-right: 1px solid #f4f5f5;
      border-bottom: 1px solid #f4f5f5;
      text-align: center;
      height: 30px;
      line-height: 30px;
      span {
        @apply opacity-40;
      }
    }
  }
  .comment {
    .title {
      line-height: 48px;
      @apply h-12 bg-bg-card pl-4 text-medium font-semibold;
    }
    .comment-list {
      .item {
        padding: 15px 18px;
        img {
          height: 35px;
          min-width: 35px;
          margin-right: 10px;
          @apply rounded-full;
        }
      }
    }
  }
}
.aside {
  width: 300px;
  @apply rounded-medium;
}
</style>
