import Vue from 'vue'
import VueRouter from 'vue-router'

import SellerPage2 from '@/views/sellerpage2'
import TrendPage from '@/views/TrendPage'
import mapPage2 from '@/views/mapPage2'
import rankPage from'@/views/rankPage'
import ScreenPage from '@/views/ScreenPage'
import zujian4Page from '@/views/zujian4Page.vue'
import DataPage from '@/views/DataPage.vue'
import BillboardPage from "@/views/BillboardPage.vue";
import AchievementPage from "@/views/AchievementPage.vue";


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/screen'
  },
  {
    path:'/screen',
    component:ScreenPage,
    keepAlive: true,
    children:[
      {
        path: '/sellerpage2',
        component: SellerPage2,
        keepAlive: true,
      },
      {
        path: '/trendpage',
        component: TrendPage,
        keepAlive: true,
      },
      {
        path: '/mappage2',
        component: mapPage2,
        keepAlive: true,
      },
      {
        path: '/rankpage',
        component: rankPage,
        keepAlive: true,
      },
      {
        path:'/zujian4page',
        component:zujian4Page,
        keepAlive: true,
      },
      {
        path:'/zujian5',
        component:zujian5Page,
        keepAlive: true,
      },
    ]
  },
  {path:'/billboard',
  component: BillboardPage
  },
  {path:'/data',
  component: DataPage
  },
  {path:'/achievement',
  component: AchievementPage
  },
]

const router = new VueRouter({
  routes
})

export default router
