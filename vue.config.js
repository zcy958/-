module.exports = {
    devServer: {
        open: true,
        port: 9901,     // 端口号
        // lintOnSave: false,
        proxy: {
            '/api': {
                target: 'http://localhost:9909', // 请求的接口的域名
                //secure: false,  // 如果是https接口，需要配置这个参数
                logLevel: 'debug',
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': '/'
                }
            },
            // '^/api': {
            //     target: 'http://localhost:9000',
            //     changeOrigin: true,
            //     secure:false,
            //     pathRewrite: {'^/api': '/api'},
            //     logLevel: 'debug' 
            // },
            // '/file': {
            //     target: 'http://118.25.42.197:9930', // 请求的接口的域名
            //     //secure: false,  // 如果是https接口，需要配置这个参数
            //     // changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            //     // pathRewrite: {
            //     //     '^/file': ''
            //     // }
            // }
        },
    },
}