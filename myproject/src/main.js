// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import global_ from '../config/global.js'
import moment from 'moment'
import echarts from "echarts"

import $ from 'jquery'
import {setCookie,getCookie,delCookie} from '@/cookie.js';

import 'babel-polyfill'
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http=Axios
Vue.prototype.$echarts = echarts;

Vue.prototype.GLOBAL = global_;

Vue.prototype.$cookie ={
  setCookie,
  getCookie,
  delCookie
}
Vue.filter('dataFmt',(input,formatString = 'YYYY-MM-DD') => {
  return moment(input).format(formatString)
})
/* eslint-disable no-new */
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

router.beforeEach((to, from, next) => {
  let isLogin = getCookie('u_id')
  if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
    if (isLogin) { // 判断是否已经登录
      next()
    }else if(to.path==="login") {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next()
  }
})
Vue.config.warnHandler = function (msg) {
  if (!msg.includes('Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.')) { // uniApp bug: https://ask.dcloud.net.cn/question/71966
    return console.warn && console.warn(msg)
  }
}

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
