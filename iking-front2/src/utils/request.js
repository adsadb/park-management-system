import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { baseInfo } from '@/config'
import qs from 'qs'
import Vue from 'vue'
// 创建axios实例
const service = axios.create({
  baseURL: Vue.prototype.apiUrl, // api 的 base_url  
  timeout: 10000 // 请求超时时间
})
//获取serverconfig.json中的apiurl设置为axios的默认请求
      axios.get("serverconfig.json").then((result)=>{
        //用一个全局字段保存ApiUrl  也可以用sessionStorage存储
        service.defaults.baseURL = result.data.apiUrl
        console.log(result.data)
      }).catch((error)=>{console.log(error)});
      console.log(service.defaults)

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['accessToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    console.log(service.defaults)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    console.log(res,'res===')
    console.log(res.status)
    if (res.status !== 'success') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Message
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default {
  get: async(url = '') => {
    return await service({
      url: url,
      method: 'get',
      headers:{'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json'}
    })
  },
  post: async(url = '', data = {}) => {
    return await service({
      url: url,
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },
  postForm: async(url = '', data = {}) => {
    return await service({
      url: url,
      method: 'post',
      data,
      transformRequest: [function(data) {
        return qs.stringify(data)
      }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },
  putForm: async(url = '', data = {}) => {
    return await service({
      url: url,
      method: 'put',
      data,
      transformRequest: [function(data) {
        return qs.stringify(data)
      }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },
  delete: async(url = '') => {
    return await service({
      url: url,
      method: 'delete'
    })
  },
  faceCamerRequest: async(url = '', data = {}) => {
    return await service({
      url: url,
      method: 'post',
      data,
      transformRequest: [function(data) {
        return qs.stringify(data)
      }],
      headers: {  
      }
    })
  },
}
