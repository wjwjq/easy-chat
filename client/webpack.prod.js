const webpack = require('webpack');
const Merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = Merge(commonConfig, {
    // devtool: 'source-map',
    //插件项
    plugins: [
        //CSS文件单独打包
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: false,
            allChunks: true
        }),
        //文件压缩
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false,
            compress: {
                warnings: false
            }
        }),
        //加载器最小化
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            context: __dirname,
            debug: false
        }),
        //生成文件顶部加入注释
        new webpack.BannerPlugin({
            banner: 'This file is created by eagleagle, ' + new Date(),
            raw: false,
            entryOnly: true
        })
    ]
});