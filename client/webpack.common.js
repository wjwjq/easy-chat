const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //在每次build之前，清空dist目录及其子目录
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const APP_FILE = path.resolve(APP_PATH, 'app.js');
const BUILD_PATH = path.join(__dirname, 'dist');

module.exports = {
    //页面入口文件配置
    entry: {
        app: [
            APP_FILE
        ],
        common: [
            'react',
            'react-dom',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'redux-promise-middleware',
            // 'immutable',
            'axios',
            'lodash'
        ]
    },
    //入口文件输出配置
    output: {
        publicPath: '/', //编译好的文件，在服务器的路径,这是静态资源引用路径
        path: BUILD_PATH, //发布文件地址
        filename: '[name].[hash].js', //编译后的文件名字
        chunkFilename: '[name].[hash].js'
    },

    //配置文件模块解析
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader', 'eslint-loader'],
            include: [APP_PATH],
            exclude: /node_modules/
        },
        {
            test: /\.less$/,
            use: process.env.NODE_ENV === 'production' 
                ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true, //生成样式表link,添加到html head中
                            modules: false,
                            importLoaders: 1,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },'postcss-loader','less-loader'],
                    publicPath: 'dist'
                })
                : ['style-loader',  {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true, //生成样式表link,添加到html head中
                        modules: false,
                        importLoaders: 1,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }, 'postcss-loader', 'less-loader'],
            include: [APP_PATH]
        },
        {
            test: /\.html$/,
            use: ['html-loader'],
            include: [APP_PATH]
        }
        ]
    },

    //引入第三方类库
    externals: {
        //"jquery": "jQuery"
    },

    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css'] //后缀名自动补全
    },
    
    //插件
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ]
};