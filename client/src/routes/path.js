const global  = require('../../global');
let route;

if (global.activeServerSubdomain) {
    route = {
        signup: '/signup',
        signin: '/signin',
        messages: '/messages',
        friends: '/friends',
        add: `/add`,
        my: '/my',
        myDetail: '/my/detail',
        myAccountandsecurity: '/my/accountandsecurity',
        myBlacklist: '/my/blacklist',
        myHelp: '/my/help',
        myAbout: '/my/about',
        root: '/'
    };
} else {
    const APPNAME = global.APPNAME.replace(/\//g, '');
    
    const BASEROUTE = APPNAME ? `/${APPNAME}`: '';
    route = {
        signup: `${BASEROUTE}/signup`,
        signin: `${BASEROUTE}/signin`,
        messages: `${BASEROUTE}/messages`,
        friends: `${BASEROUTE}/friends`,
        add: `${BASEROUTE}/add`,
        my: `${BASEROUTE}/my`,
        myDetail: `${BASEROUTE}/my/detail`,
        myAccountandsecurity: `${BASEROUTE}/my/accountandsecurity`,
        myBlacklist: `${BASEROUTE}/my/blacklist`,
        myHelp: `${BASEROUTE}/my/help`,
        myAbout: `${BASEROUTE}/my/about`,
        root: `${BASEROUTE}/`
    };
    
}

export default route;