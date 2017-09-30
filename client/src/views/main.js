import React, { Component } from 'react';
import asyncComponent from '../routes/asyncComponent';

const Nav = asyncComponent(() =>
    System.import('../components/Nav/Nav').then((module) => module.default)
);
const NavPannel = asyncComponent(() =>
    System.import('../components/Nav/NavPannel').then((module) => module.default)
);
const MessageView = asyncComponent(() =>
    System.import('./Messages/').then((module) => module.default)
);
const FriendView = asyncComponent(() =>
    System.import('./Friend/').then((module) => module.default)
);
const MyView = asyncComponent(() =>
    System.import('./My/').then((module) => module.default)
);

import authenticate from '../components/Auth/';

@authenticate
export default class extends Component {
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