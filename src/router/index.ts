import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import backLayout from '@/layout/backstage/Index.vue'
import frontLayout from '@/layout/front/index.vue'
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'front',
    component: frontLayout,
    redirect: '/front',
    children: [
      {
        path: '/front',
        component: () => import('@/views/front/home/Home.vue'),
        name: 'front',
        meta: {
          title: '首页'
        }
      },
      {
        path: '/lost-and-found',
        component: () => import('@/views/front/lostAndFound/LostAndFound.vue'),
        name: 'lost-and-found',
        meta: {
          title: '失物招领'
        }
      },
      {
        path: '/news',
        component: () => import('@/views/front/news/News.vue'),
        name: 'news',
        meta: {
          title: '每日新鲜事'
        }
      },
      {
        path: '/questions-and-answers',
        component: () => import('@/views/front/questionsAndAnswers/QuestionsAndAnswers.vue'),
        name: 'questions-and-answers',
        meta: {
          title: '校园问答'
        }
      },
      {
        path: '/flea-market',
        component: () => import('@/views/front/fleaMarket/FleaMarket.vue'),
        name: 'flea-market',
        meta: {
          title: '跳蚤市场'
        }
      },
      {
        path: '/detail',
        component: () => import('@/views/front/detail/Detail.vue'),
        name: 'detail',
        meta: {
          title: '帖子详情'
        }
      }
    ]
  },
  {
    path: '/backstage',
    component: backLayout,
    redirect: '/backstage/home',
    children: [
      {
        path: '/backstage/home',
        component: () => import('@/layout/backstage/home/Index2.vue'),
        name: 'home',
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login-Register.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})
export default router
