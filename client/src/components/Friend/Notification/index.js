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
export default class FriendRequesNotificationList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { latestFriendRequest, addMsg } = this.props;
        console.info('latestFriendRequest', latestFriendRequest);
        return (
            <div className='friend-add-request-notification'>
                {addMsg && <p style={{ textAlign: 'center', lineHeight: '.8rem', fontSize: '.12rem' }}>{addMsg}</p> }
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