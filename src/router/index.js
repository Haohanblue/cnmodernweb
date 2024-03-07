import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage from '@/views/SellerPage'
import SellerPage2 from '@/views/sellerpage2'
import TrendPage from '@/views/TrendPage'
import mapPage from '@/views/mapPage'
import mapPage2 from '@/views/mapPage2'
import rankPage from'@/views/rankPage'
import ScreenPage from '@/views/ScreenPage'

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
  {
    path: '/sellerpage',
    component: SellerPage
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
    path: '/mappage',
    component: mapPage
  },
  {
    path: '/mappage2',
    component: mapPage2
  },
  {
    path: '/rankpage',
    component: rankPage
  }
]

const router = new VueRouter({
  routes
})

export default router