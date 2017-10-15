import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../../components/Header/';
import FriendDetail from '../../components/Friend/Detail/';
import pathConfigs from '../../routes/path';
import { deleteFriend } from '../../redux/actions/FriendActions';

@connect((store, ownProps) => {
    return {
        friend: _.find(store.friends.friends, { username: ownProps.match.params.id }),
        userId: store.user.user.username
    };
})
export default class FriendDetailView extends Component {
    
    constructor(props) {
        super(props);
    }
    handleDelete(friendId) {
        deleteFriend(friendId);
    }
    render() {
        const { friend, userId } = this.props;
        const { username } = friend;
        return (
            <div>
                <Header 
                    title={ friend['remark'] || friend.nickname} 
                    showBackButton={true} 
                    arrowShow={true} 
                />
                <FriendDetail { ...friend}/>
                <div className="btn-group">
                    <Link to={`${pathConfigs.messages}/${username}`} className="btn btn-green">发消息</Link>
                    {
                        username !== userId 
                            ? <span className="btn btn-red" onClick={this.handleDelete.bind(this, username)}>删除好友</span>
                            : ''
                    }
                </div>
            </div>
        );
    }

}