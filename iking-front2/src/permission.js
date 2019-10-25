import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { userService } from '@/api/service'

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach(async(to, from, next) => {
//   NProgress.start()
//   if (getToken()) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // if current page is home will not trigger	afterEach hook, so manually handle it
//     } else {
//       if (store.getters.roles.length === 0) {
//         // 获取用户信息
//         const response = await userService.getInfo(store.getters.token)
//         const data = response.resultData
//         console.info(response.resultData)
//         if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
//           store.commit('SET_ROLES', data.roles)
//         }
//         if (data.permissions && data.permissions.length > 0) { // 验证返回的roles是否是一个非空数组
//           store.commit('SET_PERMISSIONS', data.permissions)
//         }
//         store.commit('SET_NAME', data.nickName)
//         store.commit('SET_AVATAR', data.headPhoto)
//         next()
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })
