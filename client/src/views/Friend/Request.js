import React, { Component } from 'react';
import Header from '../../components/Header/';
import FriendRequestList from '../../components/Friend/RequestList/';

export default class FriendRequestView extends Component {
    render() {
        return (
            <div className="friend-request-container" style={{ paddingTop: '.4rem' }}>
                <Header title="好友请求"  arrowShow={true}  showBackButton={true} />
                <div className="friend-request-list-block">
                    <FriendRequestList />
                </div>
            </div>
        );
    }
}