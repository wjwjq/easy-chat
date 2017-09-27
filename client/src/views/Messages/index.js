import React from 'react';

import Header from '../../components/Header/';
import MessageList from '../../components/Message/List';
import AddButton from '../../components/share/AddButton/';

// import asyncComponent from '../../routes/asyncComponent';
// const Header = asyncComponent(() =>
//     System.import('../../components/Header/').then((module) => module.default)
// );
// const MessageList = asyncComponent(() =>
//     System.import('../../components/Message/List').then((module) => module.default)
// );
// const AddButton = asyncComponent(() =>
//     System.import('../../components/share/AddButton/').then((module) => module.default)
// );

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