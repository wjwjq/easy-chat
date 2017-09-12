import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

export default class Nav extends Component {
    constructor(props){
        super(props);
    }

    render() {
        // const path = this.state.match.url;
        const pathname = '/message';
        return (
            <nav>
                <Link to="/messages" className={pathname === '/message' ? 'active' : ''} >
                    <i className="icon icon-message"></i>
                    <i className="icon icon-message-active"></i>
                    <span>消息</span>
                </Link>
                <Link to="/friends" className={pathname === '/friends' ? 'active' : ''}>
                    <i className="icon icon-friend"></i>
                    <i className="icon icon-friend-active"></i>
                    <span>好友</span>
                </Link>
                <Link to="/my" className={pathname === '/my' ? 'active' : ''} >
                    <i className="icon icon-my"></i>
                    <i className="icon icon-my-active"></i>
                    <span>我</span>
                </Link>
            </nav>
        );
    }

}