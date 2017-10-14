import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pathConfigs from '../../../routes/path';
import './style.less';
export default class FriendRequest extends Component {
    render() {
        return (
            <div className="friend-request">
                <Link to={pathConfigs.friendsRequest}>
                    <i className="icon icon-add-user friend-request-icon"></i>
                    <span className="friend-request-text">新的朋友</span>
                </Link>
            </div>
        );
    }
} 