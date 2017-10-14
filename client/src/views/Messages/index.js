import React from 'react';

import Header from '../../components/Header/';
import MessageList from '../../components/Message/List';
import AddButton from '../../components/share/AddButton/';

export default function MessageListView() {
    return (
        <div className="messages">
            <Header title="消息"> 
                <AddButton />
            </Header>
            <MessageList />
        </div>
    );
}