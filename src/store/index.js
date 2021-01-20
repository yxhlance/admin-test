import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { userLogin, getClinic, getInfo } from '@/api/user'
import { setToken, getToken } from '@/utils/cookie' //, removeToken  getToken,
import { constantRoutes, asyncRoutes } from '@/router'
import defaultSettings from '@/settings'
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings
import variables from '@/styles/element-variables.scss'

Vue.use(Vuex)
console.log('getters', getters)

export default new Vuex.Store({
    state: {
        token: getToken('Token'),
        // start  getters 用的
        app: {
            sidebar: '',
            size: '',
            device: '',
            visitedViews: '',
            cachedViews: '',
            avatar: '',
            name: '',
            introduction: '',
            roles: '',
            permission_routes: '',
            errorLogs: '',
        },
        // end  getters 用的

        // start settings
        tagsView: {
            cachedViews: []
        },
        permission: {
            routes: ''
        },
        settings: {
            theme: variables.theme,
            showSettings: showSettings,
            tagsView: tagsView,
            fixedHeader: fixedHeader,
            sidebarLogo: sidebarLogo
        },
        user: {
            avatar: '',
            name: '',
            introduction: '',
            roles: '',
        }
    },
    mutations: {
        setToken (state, v) {
            state.token = v
            console.log('token => ', state.token)
        },
        SET_ROLES (state, v) {
            state.user.roles = v
        },
        SET_NAME (state, v) {
            state.user.name = v
        },
        SET_AVATAR (state, v) {
            state.user.avatar = v
        },
        SET_INTRODUCTION (state, v) {
            state.user.introduction = v
        },
        // settings
        CHANGE_SETTING: (state, { key, value }) => {
            // eslint-disable-next-line no-prototype-builtins
            if (state.hasOwnProperty(key)) {
            state[key] = value
            }
        },
        SET_ROUTES (state, routes) {
            state.addRoutes = routes //这个貌似没用到
            state.permission.routes = constantRoutes.concat(routes)
        }
    },
    actions: {
        // 第一个参数默认应该是vuex
        login ({commit}, userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                userLogin({username: username.trim(), password: password.trim()})
                    .then(res => {
                        commit('setToken', res.data.data.token) // vuex存token，cookie也存token
                        setToken('Token', res.data.data.token)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log('登录失败')
                        reject(err)
                    })
            })
        },
        login2 ({commit}) {
            // const { username, password } = userInfo
            // return new Promise((resolve, reject) => {
            //     hospital({cmd_type: 'getRealtimeLogin', admin_id: "90", 'hospital_id': '127', admin_name: 'admin',playform_id:'91'})
            //         .then(res => {
            //             commit('setToken', 'login-true')
            //             resolve(res)
            //         })
            //         .catch(err => {
            //             commit('setToken', 'login-false')
            //             reject(err)
            //         })
            // })
            return new Promise((resolve, reject) => {
                getClinic({doctorId: '10589', hospitalId: "9354"})
                    .then(res => {
                        commit('setToken', 'login-true')
                        resolve(res)
                    })
                    .catch(err => {
                        commit('setToken', 'login-false')
                        reject(err)
                    })
            })
            
        },
        // settings
        changeSetting({ commit }, data) {
            commit('CHANGE_SETTING', data)
        },
        getInfo ({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo({'token': state.token}).then((res) => {
                    console.log('getInfo', res)
                    const { data } = res.data
                    const { name, avatar, roles, introduction } = data
                    commit('SET_NAME', name)
                    commit('SET_ROLES', roles)
                    commit('SET_AVATAR', avatar)
                    commit('SET_INTRODUCTION', introduction)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        // 路由生成器，生成需要计算权限的路由
        generateRoutes ({ commit}, roles) {
            return new Promise((resolve) => {
                let accessedRoutes
                console.log('asyncRoutes', asyncRoutes)
                if (roles.includes('admin')) { // 有admin权限不需计算
                    accessedRoutes = asyncRoutes || []
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                commit('SET_ROUTES', accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    },
    modules: {

    },
    getters
})

function hasPermission (roles, route) {
    if (route.meta && route.meta.roles) { // 有路由权限字段根据权限字段来，不需计算权限的直接返回true
        return roles.some(function(role){ // 这里之前忘记 return了，注意细节
            return route.meta.roles.includes(role)
        })
    } else {
        return true
    }
}

export function filterAsyncRoutes (routes, roles) {
    const res = []

    routes.forEach(function (route){
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) { // 判断有权限属性的路由及子路由，该用户是否有权限
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp) // 存有权限的路由
        }
    })
    return res
}