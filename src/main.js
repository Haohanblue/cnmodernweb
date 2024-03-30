import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.less'
import './assets/font/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import timelineCarousel from 'timeline-carousel'

// import '../public/static/css/iconfont.css'
const AXIOSURL = require('../config/config.json').AXIOSURL;
axios.defaults.baseURL = AXIOSURL
Vue.prototype.$http = axios
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(timelineCarousel)
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
