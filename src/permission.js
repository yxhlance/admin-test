import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/cookie.js'

/* 路由权限
(1)
定义路由权限，首先定义一个不用计算权限的数组路由，默认是初始化这个路由；
然后再定义一个需要计算权限的数组路由，这个路由包含一些是否一直展示和隐藏路由的字段，然后meta对象中还有roles权限数组
路由有哪些受理的权限也是定义好的；然后拿到用户的操作权限，再跟每个路由的权限进行匹对，
如果有权限的话就将该路由存到一个数组，然后再通过router.addRoutes()添加路由

这里的所有操作都是在全局的路由拦截器中
先定义一个路由白名单数组，定义白名单是为了没权限时，不执行重定向(否则像登录路由会进入死循环)
const whiteList = ['/login']

每次初始或切换路由时都会去拿cookie判断，若cookie为空则去登录(还要根据路由权限白名单判断)
有cookie但没有admin权限时还要根据每个路由权限和当前用户的权限去判断路由是否展示



登录时将cookie存在浏览器和store中，但是刷新后浏览器的cookie还在，但是store的cookie却被清了,这里的例子是在store的token字段执行了getToken方法
*/

// 添加不用重定向的白名单，跳转的路由有在白名单下的不会再次重定向， 不然像跳转登录会进入死循环
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {

    const hasToken = getToken('Token')

    if (hasToken) {
        if (to.path == '/login') {
            next({path: '/'})
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // 请求用户信息并保存到 state
                    const { roles } = await store.dispatch('getInfo')
                    // 通过then res取得权限 || 也可以通过 await 修饰符获取到resolve或reject的值
                    // .then(res => {
                    //     console.log('dispatch getInfo ', res)
                    // })
                    const accessRoutes = await store.dispatch('generateRoutes', roles)
                    router.addRoutes(accessRoutes)
                    console.log('accessRoutes', accessRoutes)
                    next()
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next({path: '/login'})
        }
    }
})