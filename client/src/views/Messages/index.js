import React, { Component } from 'react';

import Nav from '../../components/Nav/';
import Header from '../../components/Header/Header';
import MessageList from '../../components/Message/List';

export default class MessageListView extends Component {

    render() {
        return (
            <div className="container messages">
                <Header showTitle="消息"/>
                <MessageList />
                <Nav />
            </div>
        );
    }
}