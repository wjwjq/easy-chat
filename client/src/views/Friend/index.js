import React from 'react';

import Header from '../../components/Header/Header';
import FriendList from '../../components/Friend/List';

export default function FriendListView() {
    return (
        <div className="messages">
            <Header title="好友"/>
            <FriendList />
        </div>
    );
} 