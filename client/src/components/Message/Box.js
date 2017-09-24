//聊天窗口
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import ShowMessage from './Show';
import SendMessage from './Send';
import './Box.less';

import _ from 'lodash';

import { newMessage, addMessage } from '../../redux/actions/MessageActions';

@connect((store) => {
    return {
        messages: store.messages.messages,
        user: store.user.user
    };
},{
    newMessage,
    addMessage
})
export default class MessageBox extends Component {

    static propTypes = {
        friendId: PropTypes.string.isRequired,
        friend: PropTypes.object,
        message: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state={
            message: _.find(props.messages, { friendId: props.friendId })
        };
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend(data) {
        const { friendId, addMessage, newMessage } = this.props;
        const { message } = this.state;
        if (message) {
            addMessage(friendId, data);
        } else {
            newMessage(friendId, data);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            message: _.find(nextProps.messages, { friendId: nextProps.friendId })
        });
    }
 
    render() {
        const { friendId, friendAvatarUrl, user }  = this.props;
        const { userId, avatarUrl } = user;
        const { message } = this.state;
        return (
            <div className="message-box">
                <ShowMessage 
                    {...message}
                    friendId={friendId}
                    userId={userId}
                    userAvatarUrl={avatarUrl}
                    friendAvatarUrl={friendAvatarUrl}
                />
                <SendMessage 
                    friendId={friendId}
                    userId={userId}
                    onSend={this.handleSend} 
                />
            </div>
        );
    }

}