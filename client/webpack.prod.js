const webpack = require('webpack');
const Merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成index.html

//设置APP打包文件夹名，方便服务器端多应用管理
let APPNAME = require('./global').APPNAME.replace(/\//g, '');

APPNAME = APPNAME ? `${APPNAME}/` : '';

module.exports = Merge(commonConfig, {
    // devtool: 'source-map',
    output: {
        filename: `${APPNAME}js/${commonConfig.output.filename}`,
        chunkFilename: `${APPNAME}js/[name].[hash].js`
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: `${APPNAME}images/[hash:8].[name].[ext]`
                    }
                }],
                exclude: /^node_modules$/
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: `${APPNAME}fonts/[name].[ext]`
                    }
                }]
            }
        ]
    },
    //插件项
    plugins: [
        //CSS文件单独打包
        new ExtractTextPlugin({
            filename: `${APPNAME}css/style.css`,
            disable: false,
            allChunks: true
        }),
        //文件压缩
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false,
            compress: {
                warnings: false,
                'drop_console': true
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
        }),
        //生成HTML文件
        new HtmlWebpackPlugin({
            title: 'app',
            template: './index.html',
            filename: `${APPNAME}index.html`,
            chunksSortMode: 'dependency'
        })
    ]
});