// export const constantRouterMap = [
//     // 登录页
//     { path: '/login', component: () => import('@/views/login/index'), hidden: true },
//     // 404错误页
//     { path: '/404', component: () => import('@/views/404'), hidden: true },
  
//     {
//       path: '/register',
//       name: 'register',
//       meta: {
//         title: 'Register - 注册',
//         hideInMenu: true
//       },
//       component: () => import('@/views/register/register.vue')
//     },
//     {
//       path: '/',
//       component: Layout,
//       redirect: '/home',
//       name: 'Home',
//       meta: { title: '首页', icon: 'home' },
//       children: [{
//         path: 'home',
//         meta: { title: '首页', icon: 'home-fill' },
//         component: () => import('@/views/home/home')
//       }]
//     },
  
//     // 模板
//     {
//       path: '/template',
//       component: Layout,
//       redirect: '/template/table',
//       name: 'Template',
//       meta: { title: '模板', icon: 'example' },
//       children: [
//         {
//           path: 'simpleTable',
//           name: 'SimpleTable',
//           component: () => import('@/views/template/simpleTable/simpleTable'),
//           meta: { title: '简单表格', icon: 'table' }
//         },
//         {
//           path: 'treeTable',
//           name: 'TreeTable',
//           component: () => import('@/views/template/treeTable/treeTable'),
//           meta: { title: '树表格', icon: 'table' }
//         }
//       ]
//     },
  
//     // 系统设置
//     {
//       path: '/system',
//       component: Layout,
//       redirect: '/system',
//       name: 'Example',
//       meta: { title: '系统设置', icon: 'example' },
//       children: [
//         {
//           path: 'user',
//           name: 'User',
//           component: () => import('@/views/system/user/user'),
//           meta: { title: '用户管理', icon: 'table' }
//         },
//         {
//           path: 'role',
//           name: 'Role',
//           component: () => import('@/views/system/role/role'),
//           meta: { title: '角色管理', icon: 'tree' }
//         },
//         {
//           path: 'department',
//           name: 'Department',
//           component: () => import('@/views/system/department/department'),
//           meta: { title: '部门管理', icon: 'example' }
//         }
//       ]
//     },
  
//     {
//       path: '/device_management',
//       name: '设备管理',
//       component: Layout,
//       redirect: '/device_management',
//       // name: 'Example',
//       meta: { title: '设备管理', icon: 'md-menu' },
//       children: [
//         {
//           path: 'device_list',
//           name: '设备列表',
//           component: () => import('@/views/device_management/device_list/device_list.vue'),
//           meta: { title: '设备列表', icon: 'ios-reverse-camera' }
//         },
//         {
//           path: 'device_setting',
//           name: '设备设置',
//           component: () => import('@/views/device_management/device_list/device_list.vue'),
//           meta: { title: '设备设置', icon: 'ios-settings' }
//         },
//       ]
//     },
  
//     { path: '*', redirect: '/404', hidden: true }
//   ]
  
//   export default new Router({
//     // mode: 'history', //后端支持可开
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRouterMap
//   })



import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true,
      icon:''
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register - 注册',
      hideInMenu: true,
      icon:''
    },
    component: () => import('@/views/register/register.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      icon:''
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/views/single-page/home')
      }
    ]
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//yueyi----------------------------------------------------------------------------------------------------------------------------
  {
    path: '/home',
    name: 'home',
    meta: {
      icon: 'md-menu',
      title: '设备管理'
    },
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          icon: 'md-home',
          title: '首页'
        },
        component: () => import('@/views/single-page/home')
      },
    ]
  },
  {
    path: '/device_management',
    name: 'device_management',
    meta: {
      icon: 'md-menu',
      title: '设备管理'
    },
    component: Main,
    children: [
      {
        path: 'device_list',
        name: 'device_list',
        meta: {
          icon: 'ios-reverse-camera',
          title: '设备列表'
        },
        component: () => import('@/views/device_management/device_list/device_list.vue')
      },
    ]
  },
  {
    path: '/attendance_management',
    name: 'attendance_management',
    meta: {
      icon: 'md-menu',
      title: '考勤管理'
    },
    component: Main,
    children: [
      {
        path: 'attendance_setting',
        name: 'attendance_setting',
        meta: {
          icon: 'md-settings',
          title: '考勤设置'
        },
        component: () => import('@/views/attendance_management/attendance_setting/attendance_setting.vue')
      },
      {
        path: 'attendance_record',
        name: 'attendance_record',
        meta: {
          icon: 'ios-bookmarks-outline',
          title: '考勤记录'
        },
        component: () => import('@/views/attendance_management/attendance_record/attendance_record.vue')
      }
    ]
  },
    {
        path: '/monitoring_management',
        name: 'monitoring_management',
        meta: {
        icon: 'md-menu',
        title: '人员管理'
        },
        component: Main,
        children: [
        {
            path: 'employee_list',
            name: 'employee_list',
            meta: {
            icon: 'md-man',
            title: '员工列表'
            },
            component: () => import('@/views/monitoring_management/employee_list/employee_list.vue')
        },
        {
            path: 'past_record',
            name: 'past_record',
            meta: {
            icon: 'ios-bookmarks-outline',
            title: '历史记录'
            },
            component: () => import('@/views/monitoring_management/past_record/past_record.vue')
        },
        {
          path: 'monitor_picture',
          name: 'monitor_picture',
          meta: {
          icon: 'ios-bookmarks-outline',
          title: '监控画面'
          },
          component: () => import('@/views/monitoring_management/monitor_picture/monitor_picture.vue')
      }
    ]
  },
  {
    path: '/person_detection',
    name: 'person_detection',
    meta: {
    icon: 'md-menu',
    title: '人员安全检测'
    },
    component: Main,
    children: [
        {
            path: 'p_monitor_portrait',
            name: 'p_monitor_portrait',
            meta: {
            icon: 'ios-bookmarks-outline',
            title: '监控画面'
            },
            component: () => import('@/views/person_detection/person_detection.vue')
        },
          {
            path: 'linger_detection',
            name: 'linger_detection',
            meta: {
              icon: 'ios-bookmarks-outline',
              title: '徘徊检测'
            },
            component: () => import('@/views/person_detection/linger_detection.vue')
          },
        {
          path: 'tumble_detection',
          name: 'tumble_detection',
          meta: {
            icon: 'ios-bookmarks-outline',
            title: '跌倒检测'
          },
          component: () => import('@/views/person_detection/tumble_detection.vue')
        },
        {
          path: 'person_detection_record',
          name: 'person_detection_record',
          meta: {
          icon: 'ios-information-circle',
          title: '报警记录'
          },
          component: () => import('@/views/person_detection/person_record.vue')
      }
    ]
},
    {
        path: '/region_invasion',
        name: 'region_invasion',
        meta: {
        icon: 'md-menu',
        title: '区域入侵'
        },
        component: Main,
        children: [
            {
                path: 'monitor_setting',
                name: 'monitor_setting',
                meta: {
                icon: 'md-man',
                title: '监控设置'
                },
                component: () => import('@/views/region_invasion/monitor_setting/monitor_setting.vue')
            },
            {
                path: 'monitor_portrait',
                name: 'monitor_portrait',
                meta: {
                icon: 'ios-bookmarks-outline',
                title: '监控画像'
                },
                component: () => import('@/views/region_invasion/monitor_portrait/monitor_portrait.vue')
            },
            {
                path: 'alarm_record',
                name: 'alarm_record',
                meta: {
                icon: 'ios-information-circle',
                title: '报警记录'
                },
                component: () => import('@/views/region_invasion/alarm_record/alarm_record.vue')
            }
        ]
    },

    {
        path: '/helmet_management',
        name: 'helmet_management',
        meta: {
        icon: 'md-menu',
        title: '安全帽管理'
        },
        component: Main,
        children: [
            {
                path: 'helmet_detect',
                name: 'helmet_detect',
                meta: {
                icon: 'ios-bookmarks-outline',
                title: '安全帽检测'
                },
                component: () => import('@/views/helmet_management/helmet_detect/helmet_detect.vue')
            },
            {
                path: 'helmet_alarm_record',
                name: 'helmet_alarm_record',
                meta: {
                icon: 'ios-information-circle',
                title: '报警记录'
                },
                component: () => import('@/views/helmet_management/helmet_alarm_record/helmet_alarm_record.vue')
            }
        ]
    },
    //
    {
      path: '/workclothes_detection',
      name: 'workclothes_detection',
      meta: {
      icon: 'md-menu',
      title: '安全帽管理'
      },
      component: Main,
      children: [
          {
              path: 'workclothes_detection',
              name: 'workclothes_detection',
              meta: {
              icon: 'ios-bookmarks-outline',
              title: '安全帽检测'
              },
              component: () => import('@/views/workclothes_detection/workclothes_detection.vue')
          },
          {
              path: 'workclothes_record',
              name: 'workclothes_record',
              meta: {
              icon: 'ios-information-circle',
              title: '报警记录'
              },
              component: () => import('@/views/workclothes_detection/workclothes_record.vue')
          }
      ]
  },
  {
    path: '/fire_detection',
    name: 'fire_detection',
    meta: {
    icon: 'md-menu',
    title: '明火检测'
    },
    component: Main,
    children: [
        {
            path: 'f_monitor_portrait',
            name: 'f_monitor_portrait',
            meta: {
            icon: 'ios-bookmarks-outline',
            title: '监控画面'
            },
            component: () => import('@/views/fire_detection/fire_detection.vue')
        },
        {
            path: 'fire_detection_record',
            name: 'fire_detection_record',
            meta: {
            icon: 'ios-information-circle',
            title: '报警记录'
            },
            component: () => import('@/views/fire_detection/fire_record.vue')
        }
    ]
},
//演示用
{
  path: '/monitor',
  name: 'monitor',
  meta: {
  icon: 'md-menu',
  title: '监控画面'
  },
  component: Main,
  children: [
      {
          path: 'monitor',
          name: 'monitor',
          meta: {
          icon: 'ios-bookmarks-outline',
          title: '监控画面'
          },
          component: () => import('@/views/monitor/monitor.vue')
      },
  ]
},
//
    {
        path: '/system_setting',
        name: 'system_setting',
        meta: {
        icon: 'md-menu',
        title: '系统设置'
        },
        component: Main,
        children: [
            {
                path: 'system_setting',
                name: 'system_setting',
                meta: {
                icon: 'md-menu',
                title: '系统设置'
                },
                component: () => import('@/views/system_setting/system_setting.vue')
            }
        ]
    },
//yueyi----------------------------------------------------------------------------------------------------------------------------

]
