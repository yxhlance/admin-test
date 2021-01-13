import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constanceRoutes = [
    {
        path: '/a',
        name: 'a',
        component: () => import('@/components/HelloWorld.vue')
    },
    {
                path: "/mySelf",
                name: "/mySelf",
                component: () => import("../pages/mySelf"),
                meta: {
                    title: "自定义"
                }
            }
]

const createRoutes = () => new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constanceRoutes
})

const router = createRoutes()

export default router
