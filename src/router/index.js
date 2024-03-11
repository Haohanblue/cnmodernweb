import Vue from 'vue'
import VueRouter from 'vue-router'
import SellerPage2 from '@/views/sellerpage2'
import TrendPage from '@/views/TrendPage'
import mapPage2 from '@/views/mapPage2'
import rankPage from'@/views/rankPage'
import ScreenPage from '@/views/ScreenPage'
import HomePage from "@/views/HomePage.vue";

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
  }
]

const router = new VueRouter({
  routes
})

export default router
