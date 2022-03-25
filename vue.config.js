const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
// 复制用的插件
const CopyPlugin = require("copy-webpack-plugin");

let plugins = process.env.VUE_APP_MODE === 'utools' ?
    [
        new CopyPlugin([
            { from: 'src/config/plugin.json'},
            { from: 'src/assets/logo.png', to: './assets/logo.png' }
        ])
    ] : [];
module.exports = {
    publicPath: process.env.VUE_APP_PATH,
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('cfg', resolve('src/config'))
            .set('assets', resolve('src/assets'));
    },
    configureWebpack: {
        plugins: plugins,
    }
} 
