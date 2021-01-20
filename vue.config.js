module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: './',
    // outputDir: 'dist',
    assetsDir: './',

    // devServer: {
    //     proxy: {
    //         '/hospital': {
    //             target: 'http://139.217.92.63:8080',
    //             ws: true,
    //             changeOrigin: true
    //             // pathRewrite: {
    //             //   '/hospital': 'nodejsmonitor/hospital'
    //             // }
    //         },
    //         '/clinic': {
    //             target: 'http://192.168.0.3:8080',
    //             ws: true,
    //             changeOrigin: true
    //             // pathRewrite: {
    //             //   '/hospital': 'nodejsmonitor/hospital'
    //             // }
    //         },
    //     }
    // }
}