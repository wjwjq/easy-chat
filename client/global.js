/**
 * 全局APP配置
 *          作用于： src/routes/path.js 、 webpack.prod.js
 * activeServerSubdomain
 *          是否后端启动子域访问app,直接同APPNAME一起用于前端路由生成与访问规则
 *          详见：src/routes/path.js
 * APPNAME 
 *          设置APP名 将作为整个APP路由基本路径,
 *          且作用于build后的打包文件输出文件, 
 *          若为空为正常路由和打包路径
 */

module.exports = {
    activeServerSubdomain: true,
    APPNAME : 'easychat'
};