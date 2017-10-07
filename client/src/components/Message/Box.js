//聊天窗口
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShowMessage from './Show';
import SendMessage from './Send';
import './Box.less';

import { addMessage } from '../../redux/actions/MessageActions';

@connect((store) => {
    return {
        messages: store.messages.messages,
        user: store.user.user
    };
},{
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
            message: props.messages[props.friendId]
        };
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend(data) {
        const { friendId, addMessage } = this.props;
        addMessage({ friendId, data });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            message: nextProps.messages[nextProps.friendId]
        });
    }
 
    render() {
        const { friendId, friendAvatarUrl, user }  = this.props;
        const { username, avatarUrl } = user;
        const { message } = this.state;
        return (
            <div className="message-box">
                <ShowMessage 
                    msgs={message}
                    friendId={friendId}
                    userId={username}
                    userAvatarUrl={avatarUrl}
                    friendAvatarUrl={friendAvatarUrl}
                />
                <SendMessage 
                    friendId={friendId}
                    userId={username}
                    onSend={this.handleSend} 
                />
            </div>
        );
    }

}