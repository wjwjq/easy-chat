import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

import pathConfigs from '../../routes/path';

export default class Nav extends Component {
    constructor(props){
        super(props);
    }

    render() {
        // const path = this.state.match.url;
        const { messages, friends, my } = pathConfigs;
        const pathname = messages;
        
        return (
            <nav>
                <Link to={messages} className={pathname === messages ? 'active' : ''} >
                    <i className="icon icon-message"></i>
                    <i className="icon icon-message-active"></i>
                    <span>消息</span>
                </Link>
                <Link to={friends} className={pathname === friends ? 'active' : ''}>
                    <i className="icon icon-friend"></i>
                    <i className="icon icon-friend-active"></i>
                    <span>好友</span>
                </Link>
                <Link to={my} className={pathname === my ? 'active' : ''} >
                    <i className="icon icon-my"></i>
                    <i className="icon icon-my-active"></i>
                    <span>我</span>
                </Link>
            </nav>
        );
    }

}