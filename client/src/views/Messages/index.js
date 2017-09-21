import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import MessageList from '../../components/Message/List';

export default class MessageListView extends Component {
    render() {
        return (
            <div className="messages">
                <Header title="消息"/>
                <MessageList />
            </div>
        );
    }
}