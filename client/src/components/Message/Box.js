//聊天窗口
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import ShowMessage from './Show';
import SendMessage from './Send';
import './Box.less';

import _ from 'lodash';
import config from '../../configs/config';

import { addMessage } from '../../redux/actions/MessageActions';



@connect((store, ownProps) => {
    return {
        friend: _.find(store.friends.friends, { userId: ownProps.userId }),
        messages: store.messages.messages
    };
})
export default class MessageBox extends Component {
    
    static propTypes = {
        userId: PropTypes.string.isRequired,
        friend: PropTypes.object,
        message: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend( data) {
        this.props.dispatch(addMessage(this.props.userId, data));
    }

    render() {
        const { friend, messages, userId }  = this.props;
        let message = _.find(messages, { userId });

        return (
            <div className="message-box">
                <ShowMessage {...message} avatarUrl= {friend.avatarUrl || config.defaultAvatar} />
                <SendMessage onSend={this.handleSend} />
            </div>
        );
    }

}