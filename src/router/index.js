import Vue from 'vue'
import VueRouter from 'vue-router'

import SellerPage2 from '@/views/ScreenPageChildern/sellerpage2.vue'
import TrendPage from '@/views/ScreenPageChildern/TrendPage.vue'
import mapPage2 from '@/views/ScreenPageChildern/mapPage2.vue'
import rankPage from '@/views/ScreenPageChildern/rankPage.vue'
import ScreenPage from '@/views/ScreenPage'
import zujian4Page from '@/views/ScreenPageChildern/zujian4Page.vue'
import DataPage from '@/views/DataPage.vue'
import BillboardPage from "@/views/BillboardPage.vue";
import AchievementPage from "@/views/AchievementPage.vue";
import TimeLinePage from "@/views/TimeLinePage.vue";

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
  {path:'/timeline',
  component:TimeLinePage}
]

const router = new VueRouter({
  routes
})

export default router
