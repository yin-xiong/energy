import Vue from 'vue'
import App from './App'
import hansTabber from './pages/components/tabbar.vue'
Vue.component('hansTabber', hansTabber)

import nodata from './pages/components/nodata.vue'
Vue.component('nodata', nodata)

Vue.config.productionTip = false

// 挂载接口函数
import api  from './tool/api.js';
Vue.prototype.$api = api;
import tool  from './tool/tool.js';
Vue.prototype.$tool = tool;

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
