import React, { Component } from 'react';

import Nav from '../../components/Nav/';
import Header from '../../components/Header/Header';
import FriendList from '../../components/Friend/List';

import authenticate from '../../components/Auth/Auth';

@authenticate
export default class FriendListView extends Component {
    
    render() {
        return (
            <div className="container messages">
                <Header title="好友"/>
                <FriendList />
                <Nav />
            </div>
        );
    }
}