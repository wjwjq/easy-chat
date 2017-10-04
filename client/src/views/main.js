import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { leaveNav } from '../redux/actions/NavActions';
import authenticate from '../components/Auth/';

@authenticate
@connect((store) => {
    return {
        ...store.nav
    };
},{
    leaveNav 
})
export default class extends Component {
    constructor(props) {
        super(props);
        this.saveCurrActiveIndex = this.saveCurrActiveIndex.bind(this);
        this.state ={
            defaultActiveIndex: props.activeIndex || 0
        };
    }

    saveCurrActiveIndex(currActiveIndex) {
        this.props.leaveNav(currActiveIndex);
    }

    render() {
        const { defaultActiveIndex } = this.state;
        return (
            <Nav  defaultActiveIndex={defaultActiveIndex} saveCurrActiveIndex={this.saveCurrActiveIndex} >
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