import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tips from '../share/Tips/';
import { clearNotificationMsg } from '../../redux/actions/FriendActions';

@connect(store => {
    return {
        receiveANewFriendRequest: store.friends.receiveANewFriendRequest,
        receiveAConfirmFriendRequest: store.friends.receiveAConfirmFriendRequest
    };
},{
    clearNotificationMsg
})
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTips: false,
            text: ''
        };
    }

    autoHide() {
        setTimeout(() => {
            this.setState({
                showTips: false,
                text: ''
            });
            this.props.clearNotificationMsg();
        }, 3000);
    }

    show(text) {
        this.setState({
            showTips: true,
            text
        });
        this.autoHide();
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.receiveANewFriendRequest ) {
            this.show('收到新的好友请求');
        } else if ( nextProps.receiveAConfirmFriendRequest ) {
            this.show('成功添加好友');
        }
    }

    render() {
        const { showTips, text } = this.state;

        return <div class="notification">
            { showTips ? <Tips>{text}</Tips> : ''}
        </div>;
    }
}