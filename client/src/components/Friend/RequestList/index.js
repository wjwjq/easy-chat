import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendRequesNotificationItem from './Item';

import './style';

@connect(store => {
    return {
        latestFriendRequest: store.friends.latestFriendRequest,
        addMsg: store.friends.addMsg
    };
})
export default class FriendRequestList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { latestFriendRequest } = this.props;
        console.info('latestFriendRequest', latestFriendRequest);
        return (
            <div className='friend-add-request-list'>
                {
                    latestFriendRequest && latestFriendRequest.map((user, idx) => {
                        return (
                            <FriendRequesNotificationItem
                                key={`${idx}`} 
                                user={user} />
                        );    
                    })
                }
            </div>
        );
    }
}