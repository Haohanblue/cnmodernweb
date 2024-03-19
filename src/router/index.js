import Vue from 'vue'
import VueRouter from 'vue-router'

import SellerPage2 from '@/views/sellerpage2'
import TrendPage from '@/views/TrendPage'
import mapPage2 from '@/views/mapPage2'
import rankPage from'@/views/rankPage'
import ScreenPage from '@/views/ScreenPage'
import HomePage from "@/views/HomePage.vue"
import zujian4Page from '@/views/zujian4Page.vue'
import zujian5Page from '@/views/zujian5Page.vue'


Vue.use(VueRouter)

const routes = [
  {path:'/home',
  component: HomePage
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/screen',
    component:ScreenPage
  },
  {
    path: '/sellerpage2',
    component: SellerPage2
  },
  {
    path: '/trendpage',
    component: TrendPage
  },

  {
    path: '/mappage2',
    component: mapPage2
  },
  {
    path: '/rankpage',
    component: rankPage
  },
  {
    path:'/zujian4page',
    component:zujian4Page
  },
  {
    path:'/zujian5',
    component:zujian5Page
  }
]

const router = new VueRouter({
  routes
})

export default router
