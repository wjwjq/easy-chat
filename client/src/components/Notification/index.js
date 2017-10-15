import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tips from '../share/Tips/';
import { clearNotificationMsg } from '../../redux/actions/FriendActions';

@connect(store => {
    return {
        sendFriendRequestSuccessMsg: store.friends.sendFriendRequestSuccessMsg,
        receiveANewFriendRequestMsg: store.friends.receiveANewFriendRequestMsg,
        receiveRefuseAddFriendRequestMsg: store.friends.receiveRefuseAddFriendRequestMsg,
        receiveAConfirmFriendRequestMsg: store.friends.receiveAConfirmFriendRequestMsg
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
        }, 1800);
    }

    show(text) {
        this.setState({
            showTips: true,
            text
        });
        this.autoHide();
    }

    componentWillReceiveProps(nextProps) {
        const { 
            sendFriendRequestSuccessMsg,  
            receiveANewFriendRequestMsg, 
            receiveAConfirmFriendRequestMsg,
            receiveRefuseAddFriendRequestMsg 
        } = nextProps;
        
        if ( sendFriendRequestSuccessMsg ) {
            this.show(sendFriendRequestSuccessMsg);
        } else if ( receiveANewFriendRequestMsg  ) {
            this.show(receiveANewFriendRequestMsg);
        }  else if ( receiveAConfirmFriendRequestMsg ) {
            this.show(receiveAConfirmFriendRequestMsg);
        } else if (receiveRefuseAddFriendRequestMsg ) {
            this.show(receiveRefuseAddFriendRequestMsg);
        }
    }

    render() {
        const { showTips, text } = this.state;

        return <div class="notification">
            { showTips ? <Tips>{text}</Tips> : ''}
        </div>;
    }
}