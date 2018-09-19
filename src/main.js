// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'vue-awesome/icons/index.js'
import qs from 'qs'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import echarts from 'echarts'
import './icon/iconfont.js'
import './icon/icon.css'
import './assets/icons/zhp-icon/iconfont.js'
import './assets/icons/zhp-icon/iconfont.css'
import GeminiScrollbar from 'vue-gemini-scrollbar'

// 自定义公共方法
import Utils from './components/common/common.js'

// 滚动条插件
import vuescroll from 'vuescroll/dist/vuescroll-native';
// 导入css文件
import 'vuescroll/dist/vuescroll.css';

import {post,fetch,patch,put} from './api/http.js'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;



Vue.component('icon', Icon)

Vue.config.productionTip = false
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = '120.79.146.91:8000'

const root = document.createElement('div')
document.body.appendChild(root)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(GeminiScrollbar)
Vue.use(vuescroll)

Vue.prototype.$utils = Utils
Vue.prototype.$echarts = echarts 
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})