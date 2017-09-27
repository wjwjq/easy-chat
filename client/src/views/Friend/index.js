import React from 'react';
import Header from '../../components/Header/';
import FriendList from '../../components/Friend/List';
import AddButton from '../../components/share/AddButton/';

// import asyncComponent from '../../routes/asyncComponent';
// const Header = asyncComponent(() =>
//     System.import('../../components/Header/').then((module) => module.default)
// );
// const FriendList = asyncComponent(() =>
//     System.import('../../components/Friend/List').then((module) => module.default)
// );
// const AddButton = asyncComponent(() =>
//     System.import('../../components/share/AddButton/').then((module) => module.default)
// );

export default function FriendListView() {
    return (
        <div className="messages">
            <Header title="好友"> 
                <AddButton />
            </Header>
            <FriendList />
        </div>
    );
} 