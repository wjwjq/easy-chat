import React from 'react';

import Header from '../../components/Header/Header';
import MessageList from '../../components/Message/List';

export default function MessageListView() {
    return (
        <div className="messages">
            <Header title="消息"/>
            <MessageList />
        </div>
    );
}