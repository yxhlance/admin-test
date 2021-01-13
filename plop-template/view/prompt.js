const { notEmpty, routeNotEmpty } = require('../utils')

module.exports = {
    descript: 'generate a view',
    prompts: [{
        type: 'input',
        name: 'name',
        message: '项目的vue文件名',
        validate: notEmpty('name') // 校验的值是 name，注意是字符串
    }, {
        type: 'checkbox',
        name: 'blocks',
        message: 'blocks:',
        choices: [{
            name: '<template>',
            value: 'template',
            checked: true // 默认选中
        }, {
            name: '<script>',
            value: 'script',
            checked: true
        }, {
            name: '<style>',
            value: 'style',
            checked: true
        }],
        validate: (value) => {
            if (value.indexOf('template') == -1 && value.indexOf('script') == -1) {
                return 'View require at least a <template> or <script> tag'
            }
            return true
        }
    }, {
        type: 'input',
        name: 'route',
        message: '路由地址 (goodsList/detail)',
        validate: routeNotEmpty('route')
    }, {
        type: 'input',
        name: 'metaName',
        message: '路由的name值'
    }, {
        type: 'input',
        name: 'metaTitle',
        message: '路由的title值'
    }],
    actions: data => {
        const name = '{{name}}'
        const route = '{{route}}'
        const metaName = '{{metaName}}'
        const metaTitle = '{{metaTitle}}'
        console.log(data)
        const actions = [{
            type: 'add', // 操作类型：修改，创建
            path: `src/views/${name}/index.vue`, // 文件生成的位置
            templateFile: 'plop-template/view/index.hbs', // 文件生成需要的模板位置
            data: {
                name: name,
                template: data.blocks.includes('template'),
                script: data.blocks.includes('script'),
                style: data.blocks.includes('style')
            }
        }, {
            // 配置路由文件
            type: 'modify',
            path: 'src/router/index.js',
            pattern: /\/\/---ROUTER_IMPORT---/, // 模式
            template: `{
                path: "/${route}",
                name: "/${metaName}",
                component: () => import("../pages/${name}.vue"),
                meta: {
                    title: "${metaTitle}"
                }
            }`
        }]
        return actions
    }
}