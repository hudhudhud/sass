const path = require('path')
module.exports = {
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                //向所有 Sass 样式传入共享的全局变量
                data: `@import "@/assets/style/variables.scss";`
            }
        }
    },
    // chainWebpack: config => {
    //     const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    //     types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
    // },
}

// function addStyleResource (rule) {
//     rule.use('style-resource')
//         .loader('style-resources-loader')
//         .options({
//             patterns: [
//                 path.resolve(__dirname, './src/assets/style/common.scss'),
//             ],
//         })
// }