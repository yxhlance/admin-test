const mockjs = require("mockjs");


/*
安装了mockjs后，在根目录创建 mock文件夹，添加index.js文件，引入mockjs
生成接口的方式 可以看看官方文档 http://mockjs.com/examples.html

(1)
只是想简单的测试一下请求及处理请求数据，所以我按下面的方式直接定义请求响应的数据
然后通过 mockjs库提供的 mock方法定义后台响应的接口，
mockjs.mock('/getInfo', 'post', userInfo)

(2)
定义好后台响应接口及受理的请求方式后，还需要暴露前端这边的请求接口
也是在根目录下创建api目录，定义.js文件，再暴露出各种请求的方法，例如登录，获取用户信息的方法
这里是通过 dispatch vuex的action去触发对应的请求
export function getInfo (data) {
    return request({
        url: '/getInfo',
        method: 'post',
        data
    })
}
action_getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
        getInfo({'token': state.token}).then((res) => {})
    })
}

(3)
最后再main.js中 引入刚刚定义的 mock模拟数据js
require('./mock/index.js')
*/

// const Random = Mock.Random;

// const allTitle = [
//     "关于深化增值税改革有关政策的公告",'关于深化增值税改革有关事项的公告','关于调整增值税纳税申报有关事项的公告','关于实施小微企业普惠性税收减免政策的通知','这是测试数据','555555','99999'
// ]

const allKey = [
    "政策",'增值税','税纳','税收减免','这是测试数据','555555','测试'
]

const produceNewDate = function () {
    let articles = []
    for (let i=0; i<7; i++) {
        let newArticleObj = {
            lawEffectId: 53,
            lawNo: "财政部 税务总局 海关总署公告",
            oldDocId: null,
            provinceId: 732,
            publishDate: "2019-03-20",
        }
        articles.push(newArticleObj)
    }
    return {
        code: 200,
        data: {
            articles: articles
        }
    }
}

const keysData = function () {
    let articles = []
    for (let i=0; i<7; i++) {
        articles.push(allKey[i])
    }
    return {
        code: 200,
        data: {
            articles:articles
        }
    }
}

const userInfo = function () {
    return {
        code: 200,
        data: {
            avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            introduction: "I am an editor",
            name: "Normal Editor",
            roles: ['editor']
        }
    }
}

mockjs.mock('/searchKey', 'post', keysData)
mockjs.mock('/search', 'post', produceNewDate)
mockjs.mock('/userLogin', 'post', require('./json/user.json'))
mockjs.mock('/getInfo', 'post', userInfo)
