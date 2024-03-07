import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.less'
import './assets/font/iconfont.css'
// import '../public/static/css/iconfont.css'
const AXIOSURL = require('../config/config.json').AXIOSURL;
axios.defaults.baseURL = AXIOSURL
Vue.prototype.$http = axios

Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
