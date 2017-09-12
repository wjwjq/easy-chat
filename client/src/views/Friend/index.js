import React, { Component } from 'react';

import Nav from '../../components/Nav/';
import Header from '../../components/Header/Header';
import FriendList from '../../components/Friend/List';

export default class FriendListView extends Component {
    
    render() {
        return (
            <div className="container messages">
                <Header showTitle="好友"/>
                <FriendList />
                <Nav />
            </div>
        );
    }
}