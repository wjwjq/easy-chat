import React, { PureComponent } from 'react';
import Nav from '../components/Nav/Nav';
import NavPannel from '../components/Nav/NavPannel';

import MessageView from './Messages/';
import FriendView from './Friend/';
import MyView from './My/';

import authenticate from '../components/Auth/Auth';

@authenticate
export default class extends PureComponent {
    render() {
        return (
            <Nav  defaultActiveIndex={0}>
                <NavPannel
                    order = "0"
                    icons ="icon icon-message icon-message-active"
                    tab={<span>消息</span>}
                >
                    <MessageView />
                </NavPannel>    
                <NavPannel
                    order = "1"
                    icons ="icon icon-friend icon-friend-active"
                    tab={<span>好友</span>}
                >
                    <FriendView />
                </NavPannel>    
                <NavPannel
                    order = "2"
                    icons ="icon icon-my icon-my-active"
                    tab={<span>我</span>}
                >
                    <MyView />
                </NavPannel>
            </Nav>
        );
    }
}