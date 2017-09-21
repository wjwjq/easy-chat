import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.less';
import classnames from 'classnames';

import pathConfigs from '../../routes/path';

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const path = this.state.match.url;
        const { messages, friends, my } = pathConfigs;
        const pathname = messages;
        let messageClaeses = classnames({
            icon: true,
            'icon-message': !(pathname === messages) ,
            'icon-message-active': pathname === messages  
        });
        let friendClaeses = classnames({
            icon: true,
            'icon-friend': !(pathname === friends) ,
            'icon-friend-active': pathname === friends  
        });
        let myClaeses = classnames({
            icon: true,
            'icon-my': !(pathname === my) ,
            'icon-my-active': pathname === my  
        });

        return (
            <nav>
                <Link to={messages} className={pathname === messages ? 'active' : ''} >
                    <i className={messageClaeses}></i>
                    <span>消息</span>
                </Link>
                <Link to={friends} className={pathname === friends ? 'active' : ''}>
                    <i className={friendClaeses}></i>
                    <span>好友</span>
                </Link>
                <Link to={my} className={pathname === my ? 'active' : ''} >
                    <i className={myClaeses}></i>
                    <span>我</span>
                </Link>
            </nav>
        );
    }

}