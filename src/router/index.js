import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/a',
        name: 'a',
        hidden: false,
        component: () => import('@/components/HelloWorld.vue')
    },{
        path: '/login',
        name: 'login',
        hidden: false,
        component: () => import('@/views/login/index')
    },
    {
        path: "/",
        hidden: false,
        component: () => import("@/layout/index"),
        meta: {
            title: "自定义"
        }
    },
    {
        path: "/mySelf",
        name: "/mySelf",
        hidden: false,
        component: () => import("../views/mySelf"),
        meta: {
            title: "自定义"
        }
    }
]

export const asyncRoutes = [
    {
        path: '/permission',
        component:  () => import("@/layout/index"),
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        hidden: false,
        meta: {
          title: 'Permission',
          icon: 'lock',
          roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
            {
                path: 'page',
                component: () => import('@/views/permission/page'),
                name: 'PagePermission',
                hidden: false,
                meta: {
                  title: 'Page Permission',
                  icon: 'lock',
                  roles: ['admin'] // or you can only set roles in sub nav
                }
            }
        ]
    }, 
    {
        path: '/theme',
        hidden: false,
        component:  () => import("@/layout/index"),
        children: [
            {
                path: 'index',
                component: () => import('@/views/theme/index'),
                name: 'Theme',
                hidden: false,
                meta: { 
                    title: 'Theme', 
                    icon: 'theme' 
                }
            }
        ]
    }
]

const createRoutes = () => new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRoutes()

export default router
