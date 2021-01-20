import store from '../store'
import axios from 'axios'

console.log('process.env',process.env)

// 一个基于promise的http库，可以用在浏览器和node.js


// 跨域携带是否带上cookie信息 （如果前端配置了这个withCredentials=true，后段设置Access-Control-Allow-Origin不能为 " * ",必须是你的源地址啊）
axios.defaults.withCredentials = true

const service = axios.create({
    // baseURL: 'http://192.168.0.3:8080',//process.env, // BASE_URL
    timeout: 5000
})

service.interceptors.request.use(config => {
    if (store.state.userToken) {
        config['headers']['token'] = store.state.userToken
    }
    return config
}, err => {
    // 请求错误处理
    window.console.log('请求时的err', err) 
    window.console.log(err)
    return Promise.reject(err)
})

service.interceptors.response.use(response => {
    // if (response) {

    // }
    return response
}, error => {
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.indexOf('timeout') != -1) {
        window.console.log('网络请求超时', 'timeout')
    }

    if (error.response) {
        switch (error.response.status) {
            case 400:
                window.console.log('请求存在语法错误或参数错误', 400)
                break
            case 401:
                window.console.log('认证信息失败', 401)
                break
            case 403:
                window.console.log('登录过期，请重新登录', 403)
                break
            case 404:
                window.console.log('服务器找不到请求的资源', 404)
                break
            case 500:
                window.console.log('服务器发生错误', 500)
                break
            default:
                window.console.log('网络错误', 'Error')
        }
    }

    return Promise.reject()
})

// const get = (url, params) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const res = service.get(url, {
//                 params: params,
//                 cancelToken: params.cancelToken,
//             })
//             resolve(res)
//         } catch (err) {
//             reject(err)
//         }
//     })
// }


export default service
