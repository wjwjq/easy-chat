import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import FriendList from '../../components/Friend/List';

export default class FriendListView extends Component {
    
    render() {
        return (
            <div className="messages">
                <Header title="好友"/>
                <FriendList />
            </div>
        );
    }
}