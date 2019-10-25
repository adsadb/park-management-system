import Vue from 'vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import enLocale from 'element-ui/lib/locale/lang/en' // lang i18n
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css

import VueRouter from 'vue-router';



import App from './App'
import store from './store'
import router from './router'
import i18n from '@/locale'

import { formatJs } from './utils/utils.js'
import QCloud from './utils/qcloud/qcloud.js'
import '@/icons' // icon
import '@/permission' // permission control
import { baseInfo } from '@/config' // 项目变量配置
import EleMultiCascader from 'ele-multi-cascader' // elment-ui级联多选控件

import axios from 'axios'
/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data
import Cookies from "js-cookie";//挂载cookie
 
Vue.use(iview,{
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(VueRouter);
Vue.use(ElementUI, { size: 'mini', zhLocale })
Vue.use(EleMultiCascader)

// 挂载到全局变量中
Vue.prototype.Cookies = Cookies;
Vue.prototype.baseInfo = baseInfo
Vue.config.productionTip = false
Vue.prototype.QCloud = QCloud
global.pictureURL = baseInfo.qCloudHost + 'files/v2/' + baseInfo.qCloudAppid + '/' + baseInfo.qCloudBucket
Vue.prototype.fmt = formatJs
require('@/mock/data.js')
Vue.prototype.$axios = axios

Vue.prototype.getConfigJson=function(){
  axios.get("serverconfig.json").then((result)=>{
      //用一个全局字段保存ApiUrl  也可以用sessionStorage存储
      Vue.prototype.websocket_url=result.data.websocket_url;
      Vue.prototype.EasyNVR_url=result.data.EasyNVR_url;
      Vue.prototype.apiUrl=result.data.apiUrl;
  }).catch((error)=>{console.log(error)});
}   

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
