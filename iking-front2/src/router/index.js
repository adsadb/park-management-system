import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/layout/main'
import parentView from '../views/layout/parent-view'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
//   // 登录页
//   { path: '/login', component: () => import('@/views/login/index'), hidden: true },
//   // 404错误页
//   { path: '/404', component: () => import('@/views/404'), hidden: true },

//   {
//     path: '/register',
//     name: 'register',
//     meta: {
//       title: 'Register - 注册',
//       hideInMenu: true
//     },
//     component: () => import('@/views/register/register.vue')
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/home',
//     name: 'Home',
//     meta: { title: '首页', icon: 'home' },
//     children: [{
//       path: 'home',
//       meta: { title: '首页', icon: 'home-fill' },
//       component: () => import('@/views/home/home')
//     }]
//   },

//   // 模板
//   {
//     path: '/template',
//     component: Layout,
//     redirect: '/template/table',
//     name: 'Template',
//     meta: { title: '模板', icon: 'example' },
//     children: [
//       {
//         path: 'simpleTable',
//         name: 'SimpleTable',
//         component: () => import('@/views/template/simpleTable/simpleTable'),
//         meta: { title: '简单表格', icon: 'table' }
//       },
//       {
//         path: 'treeTable',
//         name: 'TreeTable',
//         component: () => import('@/views/template/treeTable/treeTable'),
//         meta: { title: '树表格', icon: 'table' }
//       }
//     ]
//   },

//   // 系统设置
//   {
//     path: '/system',
//     component: Layout,
//     redirect: '/system',
//     name: 'Example',
//     meta: { title: '系统设置', icon: 'example' },
//     children: [
//       {
//         path: 'user',
//         name: 'User',
//         component: () => import('@/views/system/user/user'),
//         meta: { title: '用户管理', icon: 'table' }
//       },
//       {
//         path: 'role',
//         name: 'Role',
//         component: () => import('@/views/system/role/role'),
//         meta: { title: '角色管理', icon: 'tree' }
//       },
//       {
//         path: 'department',
//         name: 'Department',
//         component: () => import('@/views/system/department/department'),
//         meta: { title: '部门管理', icon: 'example' }
//       }
//     ]
//   },

//   {
//     path: '/device_management',
//     name: '设备管理',
//     component: Layout,
//     redirect: '/device_management',
//     // name: 'Example',
//     meta: { title: '设备管理', icon: 'md-menu' },
//     children: [
//       {
//         path: 'device_list',
//         name: '设备列表',
//         component: () => import('@/views/device_management/device_list/device_list.vue'),
//         meta: { title: '设备列表', icon: 'ios-reverse-camera' }
//       },
//       {
//         path: 'device_setting',
//         name: '设备设置',
//         component: () => import('@/views/device_management/device_list/device_list.vue'),
//         meta: { title: '设备设置', icon: 'ios-settings' }
//       },
//     ]
//   },

//   { path: '*', redirect: '/404', hidden: true }

// {
//     path: '/login',
//     name: 'login',
//     meta: {
//       title: 'Login - 登录',
//       hideInMenu: true
//     },
//     component: () => import('@/views/login/login.vue')
//   }
  {
    path: '/',
    redirect: '/login',
  },
  { path: '/login', component: () => import('@/views/login/login.vue'), hidden: true },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register - 注册',
      hideInMenu: true
    },
    component: () => import('@/views/register/register.vue')
  },
  {
    path: '/home',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
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
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: '_qq',
          title: 'QQ群'
        },
        component: () => import('@/views/join-page.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/views/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/views/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/views/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/views/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/views/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/views/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/views/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/views/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/views/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/views/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/views/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/views/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/views/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/views/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/views/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/views/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/views/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/views/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/views/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/views/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/views/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/views/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/views/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/views/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/views/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/views/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/views/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/views/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  },

//yueyi----------------------------------------------------------------------------------------------------------------------------
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
      {
        path: 'device_setting',
        name: 'device_setting',
        meta: {
          icon: 'ios-settings',
          title: '设备设置'
        },
        component: () => import('@/views/update/update-table.vue')
      }
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
        title: '监控管理'
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
                icon: 'ios-bookmarks-outline',
                title: '报警记录'
                },
                component: () => import('@/views/helmet_management/helmet_alarm_record/helmet_alarm_record.vue')
            }
        ]
    },
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

export default new Router({
  mode: 'hash', //后端支持可开
  base:'Test',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
