const webpack = require('webpack');
const Merge = require('webpack-merge');
const commonConfig = require('./webpack.common');


const getLocalIPv4 = () => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    let details;
    for (let key in interfaces) {
        for (let i = 0; i < interfaces[key].length; i++){
            details = interfaces[key][i];
            if (details.family === 'IPv4' && (key === 'eth0' || key === '以太网')) {
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

    devtool: 'inline-source-map',
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
                // pathRewrite: { '^/api': '' }
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});