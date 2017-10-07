const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成index.html


const getLocalIPv4 = () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    let details;
    for (let key in interfaces) {
        for (let i = 0; i < interfaces[key].length; i++) {
            details = interfaces[key][i];
            if (details.family === 'IPv4' && (key === 'en0' || key === 'eth0' || key === '以太网')) {
                return details.address;
            }
        }
    }
    return '127.0.0.1';
};

const getPort = () => {
    let port = 8080;
    process.argv.forEach((argv, idx, argvs) => {
        if (argv === '--port') {
            port = Number(argvs[idx + 1]) ? argvs[idx + 1] : port;
        }
    });
    return port;
};

module.exports = Merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[hash:8].[name].[ext]'
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
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': {
                target: `http://${ getLocalIPv4() }:3000`,
                changeOrigin: true
                // pathRewrite: { '^/api': '' }
            },
            '/images':{
                target: `http://${ getLocalIPv4() }:3000`,
                changeOrigin: true
            }
        },
        host: '0.0.0.0',
        public: `${ getLocalIPv4() }:${ getPort() }`, //允许其它主机访问
        port: getPort(),
        disableHostCheck: true,
        allowedHosts: [],
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        open: true,
        watchOptions: {
            poll: true
        }
    },

    //插件项
    plugins: [
        new HtmlWebpackPlugin({
            title: 'app',
            template: './index.html',
            chunksSortMode: 'dependency'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});