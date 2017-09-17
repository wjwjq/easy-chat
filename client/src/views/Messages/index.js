import React, { Component } from 'react';

import Nav from '../../components/Nav/';
import Header from '../../components/Header/Header';
import MessageList from '../../components/Message/List';

import authenticate from '../../components/Auth/Auth';

@authenticate
export default class MessageListView extends Component {

    render() {
        return (
            <div className="container messages">
                <Header title="消息"/>
                <MessageList />
                <Nav />
            </div>
        );
    }
}