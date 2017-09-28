import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchFriend from  '../../components/SearchFriend/';
// import Result from '../../components/Result/';

import { queryFriend, addFriend } from '../../redux/actions/FriendActions';
import authenticate from '../../components/Auth/Auth';

@authenticate
@connect((store) => {
    return {
        friends: store.friends.friends, 
        querying: store.friends.querying, 
        queryed: store.friends.queryed, 
        result: store.friends.result, 
        queryMsg: store.friends.queryMsg,
        userId : store.user.user.username
    };
},{
    queryFriend,
    addFriend
})
export default class SearchFriendView extends Component {
    constructor(props) {
        super(props);
        this.handleQuery = this.handleQuery.bind(this);

        this.state = {
            queryError: ''
        };
    }

    handleQuery(friendId) {
        const { queryFriend, friends, userId } = this.props;
        if (friendId === userId) {
            this.setState({
                queryError: '已经是好友啦！'
            });
            return;
        } else {
            for (let i=0; i < friends.length; i++) {
                if (friends[i].username === friendId) {
                    this.setState({
                        queryError: '已经是好友啦！'
                    });
                    return;
                }
            }
        }
        this.setState({
            queryError: ''
        });
        queryFriend(friendId);
    }

    handleAdd(friendId) {
        const { addFriend } = this.props;
        addFriend(friendId);
    }

    render() {
        const { querying, queryed, result, queryMsg } = this.props;
        const { queryError } = this.state;
        return (
            <div>
                <SearchFriend onQuery={this.handleQuery}/>
                <div style={{ paddingTop: '.5rem' }}></div>
                { querying ? <div>加载中</div> : '' }
                {queryError ? <p>{queryError}</p> : '' }
                { queryMsg ? <div style={{ textAlign: 'center' }}>{queryMsg}</div> : '' }
                { queryed && result ? <div>
                    <p>{result.username}</p>
                    <button onClick={this.handleAdd.bind(this, result.username)}>添加好友</button>
                </div> : '' }
            </div>
        );
    }
}