import React, { Component } from 'react';
import Card from '../../share/Card/';

import { agreeAddRequest, refuseAddRequest } from '../../../redux/actions/FriendActions';


export default class FriendRequesNotificationItem extends Component {

    dealRequest(type, friendId) {
        type === 'agree' 
            ? agreeAddRequest(friendId)
            : refuseAddRequest(friendId);
    }
    render() {
        const { user } = this.props;
        return (
            <div className="friend-add-request-list-item">
                <div className="friend-add-request-list-item-user">
                    <Card 
                        classPrefix="user-info" 
                        nicknameShow={true}
                        countShow={true}
                        genderShow={true} 
                        userInfo={user}
                    />    
                </div>
                <div className="friend-add-request-list-item-handlers">
                    <button class="btn btn-green" onClick={this.dealRequest.bind(this, 'agree', user.username)}>同意</button>
                    <button class="btn btn-red" onClick={this.dealRequest.bind(this, 'refuse', user.username)}>拒绝</button>
                </div>
            </div>
        );
    }
}