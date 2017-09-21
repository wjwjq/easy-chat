const global  = require('../../global');
let route;

if (global.activeServerSubdomain) {
    route = {
        welcome: '/welcome',
        signup: '/signup',
        signin: '/signin',
        messages: '/messages',
        friends: '/friends',
        my: '/my',
        myDetail: '/my/detail',
        myAccountandsecurity: '/my/accountandsecurity',
        myBlacklist: '/my/blacklist',
        myHelp: '/my/help',
        myAbout: '/my/about',
        root: '/'
    };
} else {
    const APPNAME = global.APPNAME.replace(/\//g, 'global');
    
    const BASEROUTE = APPNAME ? `/${APPNAME}`: '';
    route = {
        welcome: `${BASEROUTE}/welcome`,
        signup: `${BASEROUTE}/signup`,
        signin: `${BASEROUTE}/signin`,
        messages: `${BASEROUTE}/messages`,
        friends: `${BASEROUTE}/friends`,
        my: `${BASEROUTE}/my`,
        myDetail: `${BASEROUTE}/my/detail`,
        myAccountandsecurity: `${BASEROUTE}/my/accountandsecurity`,
        myBlacklist: `${BASEROUTE}/my/blacklist`,
        myHelp: `${BASEROUTE}/my/help`,
        myAbout: `${BASEROUTE}/about`,
        root: `${BASEROUTE}/`
    };
    
}

export default route;