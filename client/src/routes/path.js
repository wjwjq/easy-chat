const global  = require('../../global');
let route;

if (global.activeServerSubdomain) {
    route = {
        welcome: '/welcome',
        signup: '/signup',
        signin: '/signin',
        messagesid: '/messages/:id',
        messages: '/messages',
        friendsid: '/friends/:id',
        friends: '/friends',
        my: '/my',
        myDetail: '/my/detail',
        myAccountandsecurity: '/my/accountandsecurity',
        myBlacklist: '/my/blacklist',
        myHelp: '/my/help',
        myAbout: '/my/about'
    };
} else {
    const APPNAME = global.APPNAME.replace(/\//g, 'global');
    
    const BASEROUTE = APPNAME ? `/${APPNAME}`: '';
    route = {
        welcome: `${BASEROUTE}/welcome`,
        signup: `${BASEROUTE}/signup`,
        signin: `${BASEROUTE}/signin`,
        messagesid: `${BASEROUTE}/messages/:id`,
        messages: `${BASEROUTE}/messages`,
        friendsid: `${BASEROUTE}/friends/:id`,
        friends: `${BASEROUTE}/friends`,
        my: `${BASEROUTE}/my`,
        myDetail: `${BASEROUTE}/my/detail`,
        myAccountandsecurity: `${BASEROUTE}/my/accountandsecurity`,
        myBlacklist: `${BASEROUTE}/my/blacklist`,
        myHelp: `${BASEROUTE}/my/help`,
        myAbout: `${BASEROUTE}/about`
    };
    
}

export default route;