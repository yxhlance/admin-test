import request from '@/utils/request'

export function userLogin (data) {
    return request({
        url: '/userLogin',
        method: 'post',
        data
    })
}

export function getInfo (data) {
    return request({
        url: '/getInfo',
        method: 'post',
        data
    })
}

export function hospital (data) {
    return request({
        url: 'http://139.217.92.63:8080/hospital',
        method: 'post',
        data
    })
}

// get 请求里的参数key是用的params
export function getClinic (data) {
    return request({
        url: '/clinic/doctorInfo/myClinicInfo',
        method: 'get',
        params: data
    })
}