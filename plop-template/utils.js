module.exports.notEmpty = (n) => {
    !n || n.trim() == '' ? `${n} is required` : true
}

module.exports.routeNotEmpty = (v) => {
    !v ? '请输入路由地址' : true
}