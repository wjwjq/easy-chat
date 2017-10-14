import React from 'react';
import Header from '../../components/Header/';
import FriendList from '../../components/Friend/List/';
import FriendRequest from '../../components/Friend/Request/';
import AddButton from '../../components/share/AddButton/';

export default function FriendListView() {
    return (
        <div className="messages">
            <Header title="好友"> 
                <AddButton />
            </Header>
            <FriendRequest />
            <FriendList />
        </div>
    );
} 