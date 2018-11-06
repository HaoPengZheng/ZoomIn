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
import Utils from "@/utils/common.js";
// 滚动条插件
import vuescroll from 'vuescroll/dist/vuescroll-native';
// 导入css文件
import 'vuescroll/dist/vuescroll.css';
//封装axios方法
import {post,toDelete,get,patch,put} from './api/http.js'
//引入VueX
import store from './store/store.js';   


//定义全局变量
Vue.prototype.$store = store;
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$utils = Utils
Vue.prototype.$toDelete = toDelete
Vue.prototype.$echarts = echarts 
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs


//这是啥？
Vue.component('icon', Icon)

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(GeminiScrollbar)
Vue.use(vuescroll)


Vue.config.productionTip = false

const root = document.createElement('div')
document.body.appendChild(root)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})