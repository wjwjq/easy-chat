//聊天窗口
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShowMessage from './Show';
import SendMessage from './Send';
import './Box.less';

import config from '../../configs/config';

import { query } from '../../components/utils/';

import { addMessage } from '../../redux/actions/MessageActions';

@connect((store) => {
    return {
        messages: store.messages.messages
    };
})
export default class MessageBox extends Component {
    
    static propTypes = {
        userId: PropTypes.string.isRequired
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
        const { userId, avatarUrl, messages  }  = this.props;
        const msgs = query(messages, userId);

        return (
            <div className="message-box">
                <ShowMessage {...msgs} avatarUrl= {avatarUrl || config.defaultAvatar} />
                <SendMessage onSend={this.handleSend} />
            </div>
        );
    }

}