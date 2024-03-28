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
    component:ScreenPage
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
