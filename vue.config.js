// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/random-password/'
    : '/'
    // publicPath: './',
    // productionSourceMap: false,
}